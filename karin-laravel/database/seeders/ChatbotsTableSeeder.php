<?php

namespace Database\Seeders;

use App\Models\Chatbot;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatbotsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Busca os usuários para associar aos chatbots
        $adminUser = User::where('email', 'karin@drakarin.com.br')->first();

        if ($adminUser) {

            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'greeting',
                'name' => 'Saudação padrão',
                'message' => 'Olá {nome}, 😊 sou Neusa da equipe Clínica Dra. Karin Boldarini. Como posso ajudar com seu atendimento hoje?',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'greeting',
                'name' => 'Saudação padrão',
                'message' => 'Olá {nome}, 😊 sou Neusa da equipe Clínica Dra. Karin Boldarini. Como posso ajudar com seu atendimento hoje?',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'welcome',
                'name' => 'Boas-vindas para pacientes retornando',
                'message' => 'Olá {nome}, que bom ver você novamente! Como posso ajudar com seu atendimento hoje?',
                'order' => 2,
                'is_active' => true,
                'is_default' => false,
            ]);

            // Mensagens de agendamento
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'appointment',
                'name' => 'Confirmação de agendamento',
                'message' => 'Sua consulta foi agendada com sucesso para o dia {data} às {hora}. Lembre-se de chegar com 10 minutos de antecedência.',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'appointment',
                'name' => 'Lembrete de consulta',
                'message' => 'Olá {nome}, lembrete amigável sobre sua consulta amanhã, dia {data}, às {hora}. Confirma sua presença?',
                'order' => 2,
                'is_active' => true,
                'is_default' => false,
            ]);

            // Mensagens de ausência
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'absence',
                'name' => 'Ausência temporária',
                'message' => 'Olá {nome}, no momento estou em atendimento e não posso responder. Retornarei assim que possível.',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            // Mensagens de catálogo
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'catalog',
                'name' => 'Catálogo de serviços',
                'message' => 'Confira nossos serviços disponíveis em {link}. Estamos à disposição para esclarecer qualquer dúvida!',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            // Mensagens de catálogo com promoção
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'catalog_promotion',
                'name' => 'Catálogo com promoção',
                'message' => 'Confira nossos serviços em {link}. Aproveite nossa promoção especial: consultas com desconto para agendamentos online!',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            // Mensagens de loja fechada
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'closed_store',
                'name' => 'Consultório fechado',
                'message' => 'Olá {nome}, nosso consultório está fechado no momento. {horario_atendimento} Aguardamos seu contato em nosso horário de atendimento!',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            // Mensagens de loja fechada com promoção
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'closed_store_promotion',
                'name' => 'Consultório fechado com promoção',
                'message' => 'Olá {nome}, nosso consultório está fechado no momento. {horario_atendimento} Mas você já pode agendar pelo link {link} e garantir um desconto especial!',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);

            // Mensagens de feriado
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'closed_holiday',
                'name' => 'Fechado por feriado',
                'message' => 'Olá {nome}, nosso consultório está fechado hoje devido ao feriado. Retornaremos ao atendimento normal no próximo dia útil. Para agendar sua consulta, acesse {link}.',
                'order' => 1,
                'is_active' => true,
                'is_default' => true,
            ]);
        }
    }
}
