<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\DoctorAvailability;
use App\Models\PaymentMethod;
use App\Models\Plan;
use App\Models\User;
use App\Models\UserData;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PatientAppointmentController extends Controller
{
    /**
     * Lista os horários disponíveis para agendamento
     */
    public function getAvailableTimes(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $query = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->where('status', 'available');

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        $availabilities = $query->orderBy('date')
            ->orderBy('time')
            ->get();

        // Formatar os dados para facilitar o uso no frontend
        $formattedAvailabilities = [];
        foreach ($availabilities as $availability) {
            $date = $availability->date->format('Y-m-d');
            $time = $availability->time->format('H:i');

            if (! isset($formattedAvailabilities[$date])) {
                $formattedAvailabilities[$date] = [];
            }

            $formattedAvailabilities[$date][] = [
                'id' => $availability->id,
                'time' => $time,
                'datetime' => $date.' '.$time.':00',
            ];
        }

        return response()->json([
            'availabilities' => $formattedAvailabilities,
        ]);
    }

    /**
     * Agenda uma consulta para um paciente
     */
    public function bookAppointment(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cpf' => 'required|string',
            'phone' => 'required|string',
            'birthday' => 'required|date',
            'doctor_id' => 'required|exists:users,id',
            'appointment_datetime' => 'required|date',
            'observations' => 'nullable|string',
            'is_online' => 'nullable|boolean',
            'plan_id' => 'required|exists:plans,id',
            'payment_method_id' => 'nullable|exists:payment_methods,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verifica se o horário está disponível
        $appointmentDate = date('Y-m-d', strtotime($request->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($request->appointment_datetime));

        $availability = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->where('status', 'available')
            ->first();

        if (! $availability) {
            return response()->json([
                'message' => 'Horário indisponível para agendamento',
                'errors' => ['appointment_datetime' => ['O horário selecionado não está disponível']],
            ], 422);
        }

        $role = RoleService::findSlug(ValidRoles::PATIENT);

        // Limpa CPF e telefone para conter apenas números
        $cpf = preg_replace('/[^0-9]/', '', $request->cpf);
        $phone = preg_replace('/[^0-9]/', '', $request->phone);

        // Procura usuário pelo CPF
        $userData = UserData::where('cpf', $cpf)->first();
        $user = null;

        if ($userData) {
            // Encontrou pelo CPF
            $user = User::find($userData->user_id);

            // Atualiza dados do usuário se necessário
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $phone,
            ]);

            // Atualiza dados adicionais
            $userData->update([
                'birthday' => $request->birthday,
            ]);
        } else {
            // Procura usuário pelo telefone
            $user = User::where('phone', $phone)->first();

            if ($user) {
                // Atualiza dados do usuário
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);

                // Cria dados adicionais se não existirem
                if (! $user->userData) {
                    $user->userData()->create([
                        'cpf' => $cpf,
                        'birthday' => $request->birthday,
                    ]);
                }
            } else {
                // Não encontrou, então cria um novo usuário
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $phone,
                    'is_whatsapp_user' => false,
                    'status' => true,
                    'password' => bcrypt(substr($cpf, -4)), // Usa os 4 últimos dígitos do CPF como senha inicial
                ]);

                // Cria os dados adicionais do usuário
                $userData = [
                    'user_id' => $user->id,
                    'cpf' => $cpf,
                    'birthday' => $request->birthday,
                ];
                $user->userData()->create($userData);

                $user->roles()->sync([$role]);
            }
        }

        // Cria o agendamento
        $appointmentData = [
            'user_id' => $user->id,
            'doctor_id' => $request->doctor_id,
            'plan_id' => $request->plan_id,
            'payment_method_id' => $request->payment_method_id,
            'appointment_datetime' => $request->appointment_datetime,
            'status' => 'agendada',
            'observations' => $request->observations,
            'is_online' => $request->is_online ?? false,
        ];

        $appointment = Appointment::create($appointmentData);

        // Marca o horário como reservado
        $availability->markAsBooked();

        // Busca o plano selecionado para retornar informações de preço
        $plan = Plan::findOrFail($request->plan_id);

        // Busca a forma de pagamento, se informada
        $paymentMethod = null;
        if ($request->payment_method_id) {
            $paymentMethod = PaymentMethod::findOrFail($request->payment_method_id);
        }

        return response()->json([
            'message' => 'Consulta agendada com sucesso',
            'appointment' => $appointment,
            'plan' => [
                'name' => $plan->name,
                'price' => $plan->price,
                'modality' => $plan->modality,
                'type' => $plan->type,
                'installments' => $plan->installments,
            ],
            'payment_method' => $paymentMethod ? [
                'name' => $paymentMethod->name,
                'slug' => $paymentMethod->slug,
            ] : null,
        ], 201);
    }

    /**
     * Verifica a disponibilidade de um horário específico
     */
    public function checkAvailability(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'appointment_datetime' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointmentDate = date('Y-m-d', strtotime($request->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($request->appointment_datetime));

        $isAvailable = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->where('status', 'available')
            ->exists();

        return response()->json([
            'is_available' => $isAvailable,
        ]);
    }

    /**
     * Retorna os planos disponíveis de um médico específico
     */
    public function getAvailablePlans(int $doctorId): JsonResponse
    {
        // Verifica se o médico existe
        $doctor = User::findOrFail($doctorId);

        // Busca os planos ativos do médico
        $plans = Plan::where('user_id', $doctorId)
            ->where('is_active', true)
            ->orderBy('type')
            ->orderBy('price')
            ->get();

        // Formata os planos para o frontend
        $formattedPlans = $plans->map(function ($plan) {
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'price' => $plan->price,
                'duration' => $plan->duration,
                'type' => $plan->type,
                'consultations' => $plan->consultations,
                'modality' => $plan->modality,
                'installments' => $plan->installments,
            ];
        });

        return response()->json([
            'doctor' => [
                'id' => $doctor->id,
                'name' => $doctor->name,
            ],
            'plans' => $formattedPlans,
        ]);
    }

    /**
     * Retorna as formas de pagamento aceitas por um médico específico
     */
    public function getDoctorPaymentMethods(int $doctorId): JsonResponse
    {
        // Verifica se o médico existe
        $doctor = User::findOrFail($doctorId);

        // Busca as formas de pagamento ativas aceitas pelo médico
        $paymentMethods = $doctor->paymentMethods()
            ->where('is_active', true)
            ->get();

        // Se o médico não tiver formas de pagamento específicas, retorna todas as formas ativas
        if ($paymentMethods->isEmpty()) {
            $paymentMethods = PaymentMethod::where('is_active', true)->get();
        }

        // Formata as formas de pagamento para o frontend
        $formattedPaymentMethods = $paymentMethods->map(function ($method) {
            return [
                'id' => $method->id,
                'name' => $method->name,
                'slug' => $method->slug,
                'icon' => $method->icon,
                'description' => $method->description,
            ];
        });

        return response()->json([
            'doctor' => [
                'id' => $doctor->id,
                'name' => $doctor->name,
            ],
            'payment_methods' => $formattedPaymentMethods,
        ]);
    }

    /**
     * Retorna as consultas em aberto (status = agendada) de um paciente
     * Filtrando por CPF ou telefone.
     *
     * @return JsonResponse
     */
    public function myAppointments(Request $request)
    {
        // Necessita ao menos cpf ou phone
        $validator = Validator::make($request->all(), [
            'cpf' => 'required_without:phone|string',
            'phone' => 'required_without:cpf|string',
            'doctor_id' => 'sometimes|exists:users,id', // opcional filtrar médico
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cpf = $request->cpf ? preg_replace('/[^0-9]/', '', $request->cpf) : null;
        $phone = $request->phone ? preg_replace('/[^0-9]/', '', $request->phone) : null;

        // Tenta localizar o usuário
        $user = null;
        if ($cpf) {
            $userData = UserData::where('cpf', $cpf)->first();
            $user = $userData ? $userData->user : null;
        }

        if (! $user && $phone) {
            $user = User::where('phone', $phone)->first();
        }

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Paciente não encontrado.',
            ], 404);
        }

        // Consulta agendamentos abertos
        $appointmentsQuery = Appointment::with(['doctor', 'plan', 'paymentMethod'])
            ->where('user_id', $user->id)
            ->where('status', 'agendada')
            ->orderBy('appointment_datetime', 'desc');

        if ($request->filled('doctor_id')) {
            $appointmentsQuery->where('doctor_id', $request->doctor_id);
        }

        $appointments = $appointmentsQuery->get();

        return response()->json([
            'success' => true,
            'patient' => [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'cpf' => $cpf ?? ($user->userData->cpf ?? null),
            ],
            'appointments' => $appointments,
        ]);
    }
}
