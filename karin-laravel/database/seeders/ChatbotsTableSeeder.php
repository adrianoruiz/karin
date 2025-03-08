<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\{
    Chatbot,
    User
};



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
            // Mensagens de boas-vindas
            Chatbot::create([
                'user_id' => $adminUser->id,
                'message_type' => 'welcome',
                'name' => 'Boas-vindas padrão',
                'message' => 'Olá {nome}, seja bem-vindo(a) ao atendimento da Dra. Karin Boldarini. Como posso ajudar você hoje?',
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
        }
    }
}
