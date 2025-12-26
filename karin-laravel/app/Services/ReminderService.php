<?php

namespace App\Services;

use App\Models\ChatLog;
use App\Models\Reminder;
use App\Models\User;
use App\Services\Integration\WhatsApp\MessageHandlerService;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReminderService
{
    protected MessageHandlerService $whatsappService;

    public function __construct(MessageHandlerService $whatsappService)
    {
        $this->whatsappService = $whatsappService;
    }

    /**
     * Cria um lembrete respeitando a estrutura de empresas/funcionários.
     *
     * @param  array  $data
     * @param  User  $creator
     * @return Reminder
     *
     * @throws \Exception
     */
    public function createReminder(array $data, User $creator): Reminder
    {
        return DB::transaction(function () use ($data, $creator) {
            // Cria o lembrete
            $reminder = Reminder::create([
                'created_by' => $creator->id,
                'company_id' => $data['company_id'] ?? $creator->id,
                'title' => $data['title'],
                'message' => $this->formatMessageForWhatsApp($data['message']),
                'type' => $data['type'] ?? 'general',
                'priority' => $data['priority'] ?? 'normal',
                'remind_at' => $data['remind_at'],
                'recurrence' => $data['recurrence'] ?? null,
                'is_active' => true,
            ]);

            // Define destinatários
            $recipients = $this->resolveRecipients($data, $creator);
            
            if ($recipients->isEmpty()) {
                throw new \Exception('Nenhum destinatário válido encontrado para o lembrete');
            }

            $reminder->recipients()->attach($recipients);

            return $reminder;
        });
    }

    /**
     * Resolve destinatários baseado no contexto.
     *
     * @param  array  $data
     * @param  User  $creator
     * @return Collection
     */
    protected function resolveRecipients(array $data, User $creator): Collection
    {
        // Lembrete individual
        if (!empty($data['recipient_ids'])) {
            return User::whereIn('id', $data['recipient_ids'])
                       ->whereNotNull('phone')
                       ->where('status', true)
                       ->get()
                       ->pluck('id');
        }

        // Lembrete corporativo - todos os pacientes da empresa
        if (!empty($data['send_to_all_patients'])) {
            $companyId = $data['company_id'] ?? $creator->id;

            return User::whereHas('clientCompanies', function ($q) use ($companyId) {
                $q->where('company_id', $companyId);
            })
            ->whereNotNull('phone')
            ->where('status', true)
            ->get()
            ->pluck('id');
        }

        // Lembrete para funcionários
        if (!empty($data['send_to_employees'])) {
            $companyId = $data['company_id'] ?? $creator->id;

            return User::whereHas('employeeCompanies', function ($q) use ($companyId) {
                $q->where('company_id', $companyId);
            })
            ->whereNotNull('phone')
            ->where('status', true)
            ->get()
            ->pluck('id');
        }

        return collect();
    }

    /**
     * Envia lembretes pendentes via WhatsApp.
     *
     * @return void
     */
    public function sendPendingReminders(): void
    {
        $reminders = Reminder::due()
            ->with(['recipients' => function ($q) {
                $q->wherePivot('sent_at', null);
            }, 'creator', 'company'])
            ->get();

        Log::info('Processando lembretes pendentes', ['count' => $reminders->count()]);

        foreach ($reminders as $reminder) {
            $this->sendReminder($reminder);
            $this->handleRecurrence($reminder);
        }
    }

    /**
     * Envia um lembrete específico.
     *
     * @param  Reminder  $reminder
     * @return void
     */
    protected function sendReminder(Reminder $reminder): void
    {
        foreach ($reminder->recipients as $recipient) {
            // Pula se já foi enviado
            if ($recipient->pivot->sent_at) {
                continue;
            }

            try {
                // Normaliza o telefone
                $normalizedPhone = $this->whatsappService->normalizePhone($recipient->phone);
                
                if (!$normalizedPhone) {
                    Log::warning('Telefone inválido para lembrete', [
                        'reminder_id' => $reminder->id,
                        'recipient_id' => $recipient->id,
                        'phone' => $recipient->phone
                    ]);
                    continue;
                }

                // Usa o serviço existente de WhatsApp
                $sent = $this->whatsappService->sendMessage(
                    $normalizedPhone,
                    $reminder->message,
                    $reminder->company_id ?? $reminder->created_by
                );

                // Atualiza status
                $reminder->recipients()->updateExistingPivot($recipient->id, [
                    'sent_at' => now(),
                    'delivered' => $sent,
                    'error_message' => $sent ? null : 'Falha no envio do WhatsApp'
                ]);

                // Log no ChatLog para histórico
                $this->logInChatHistory($reminder, $recipient, $sent);

                Log::info('Lembrete enviado', [
                    'reminder_id' => $reminder->id,
                    'recipient_id' => $recipient->id,
                    'phone' => $normalizedPhone,
                    'sent' => $sent
                ]);

            } catch (\Exception $e) {
                Log::error('Erro ao enviar lembrete', [
                    'reminder_id' => $reminder->id,
                    'recipient_id' => $recipient->id,
                    'error' => $e->getMessage()
                ]);

                $reminder->recipients()->updateExistingPivot($recipient->id, [
                    'error_message' => $e->getMessage()
                ]);
            }
        }
    }

    /**
     * Manipula a recorrência de um lembrete.
     *
     * @param  Reminder  $reminder
     * @return void
     */
    protected function handleRecurrence(Reminder $reminder): void
    {
        if (!$reminder->isRecurrent()) {
            return;
        }

        try {
            $recurrence = $reminder->recurrence;
            $nextDate = $this->calculateNextDate($reminder->remind_at, $recurrence);

            if ($nextDate) {
                // Cria um novo lembrete para a próxima ocorrência
                $newReminder = $reminder->replicate();
                $newReminder->remind_at = $nextDate;
                $newReminder->save();

                // Copia os destinatários
                $recipientIds = $reminder->recipients()->pluck('user_id');
                $newReminder->recipients()->attach($recipientIds);

                Log::info('Próxima ocorrência do lembrete criada', [
                    'original_reminder_id' => $reminder->id,
                    'new_reminder_id' => $newReminder->id,
                    'next_date' => $nextDate
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Erro ao processar recorrência', [
                'reminder_id' => $reminder->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Calcula a próxima data baseada na recorrência.
     *
     * @param  Carbon  $currentDate
     * @param  array  $recurrence
     * @return Carbon|null
     */
    protected function calculateNextDate(Carbon $currentDate, array $recurrence): ?Carbon
    {
        $type = $recurrence['type'] ?? null;
        $interval = $recurrence['interval'] ?? 1;
        $endDate = isset($recurrence['end_date']) ? Carbon::parse($recurrence['end_date']) : null;

        $nextDate = clone $currentDate;

        switch ($type) {
            case 'daily':
                $nextDate->addDays($interval);
                break;
            case 'weekly':
                $nextDate->addWeeks($interval);
                break;
            case 'monthly':
                $nextDate->addMonths($interval);
                break;
            default:
                return null;
        }

        // Verifica se não passou da data final
        if ($endDate && $nextDate->greaterThan($endDate)) {
            return null;
        }

        return $nextDate;
    }

    /**
     * Registra o lembrete no histórico de chat.
     *
     * @param  Reminder  $reminder
     * @param  User  $recipient
     * @param  bool  $sent
     * @return void
     */
    protected function logInChatHistory(Reminder $reminder, User $recipient, bool $sent): void
    {
        try {
            ChatLog::create([
                'user_id' => $recipient->id,
                'phone_user' => $recipient->phone,
                'doctor_id' => $reminder->company_id ?? $reminder->created_by,
                'message_type' => 'text',
                'sender_type' => 'doctor',
                'message' => "[LEMBRETE] {$reminder->title}\n\n{$reminder->message}",
                'is_read' => false,
                'is_bot_active' => false,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao registrar lembrete no chat log', [
                'reminder_id' => $reminder->id,
                'recipient_id' => $recipient->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Formata mensagem para WhatsApp.
     *
     * @param  string  $message
     * @return string
     */
    protected function formatMessageForWhatsApp(string $message): string
    {
        // Adiciona emojis baseado no conteúdo
        $message = str_replace(
            ['[urgente]', '[importante]', '[lembrete]'],
            ['🚨 *URGENTE*', '⚠️ *IMPORTANTE*', '📌 *LEMBRETE*'],
            $message
        );

        // Garante que a mensagem termine com uma quebra de linha
        $message = trim($message);
        
        return $message;
    }

    /**
     * Obtém estatísticas de lembretes.
     *
     * @param  User  $user
     * @return array
     */
    public function getStatistics(User $user): array
    {
        $query = Reminder::query();

        // Se for empresa, filtra por lembretes da empresa
        if ($user->hasRole('clinic') || $user->hasRole('doctor')) {
            $query->where(function ($q) use ($user) {
                $q->where('company_id', $user->id)
                  ->orWhere('created_by', $user->id);
            });
        } else {
            // Paciente vê apenas seus lembretes
            $query->whereHas('recipients', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }

        $total = $query->count();
        $active = $query->where('is_active', true)->count();
        $pending = $query->where('remind_at', '>', now())->where('is_active', true)->count();
        $sent = $query->whereHas('recipients', function ($q) {
            $q->whereNotNull('sent_at');
        })->count();

        return [
            'total' => $total,
            'active' => $active,
            'pending' => $pending,
            'sent' => $sent,
        ];
    }

    /**
     * Atualiza um lembrete existente.
     *
     * @param  Reminder  $reminder
     * @param  array  $data
     * @param  User  $user
     * @return Reminder
     *
     * @throws \Exception
     */
    public function updateReminder(Reminder $reminder, array $data, User $user): Reminder
    {
        // Verifica permissões
        if ($reminder->created_by !== $user->id && $reminder->company_id !== $user->id) {
            throw new \Exception('Você não tem permissão para editar este lembrete');
        }

        return DB::transaction(function () use ($reminder, $data, $user) {
            $reminder->update([
                'title' => $data['title'] ?? $reminder->title,
                'message' => isset($data['message']) ? $this->formatMessageForWhatsApp($data['message']) : $reminder->message,
                'type' => $data['type'] ?? $reminder->type,
                'priority' => $data['priority'] ?? $reminder->priority,
                'remind_at' => $data['remind_at'] ?? $reminder->remind_at,
                'recurrence' => $data['recurrence'] ?? $reminder->recurrence,
                'is_active' => $data['is_active'] ?? $reminder->is_active,
            ]);

            // Atualiza destinatários se fornecido
            if (isset($data['recipient_ids']) || isset($data['send_to_all_patients']) || isset($data['send_to_employees'])) {
                $recipients = $this->resolveRecipients($data, $user);
                $reminder->recipients()->sync($recipients);
            }

            return $reminder;
        });
    }

    /**
     * Remove um lembrete.
     *
     * @param  Reminder  $reminder
     * @param  User  $user
     * @return bool
     *
     * @throws \Exception
     */
    public function deleteReminder(Reminder $reminder, User $user): bool
    {
        // Verifica permissões
        if ($reminder->created_by !== $user->id && $reminder->company_id !== $user->id) {
            throw new \Exception('Você não tem permissão para excluir este lembrete');
        }

        return $reminder->delete();
    }
} 