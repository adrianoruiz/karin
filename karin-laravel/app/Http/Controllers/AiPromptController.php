<?php

namespace App\Http\Controllers;

use App\Models\AiConfig;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AiPromptController extends Controller
{
    /**
     * Gera e retorna o system prompt para um usuário específico
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSystemPrompt(Request $request)
    {
        // Validar o request
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);
        
        $userId = $request->input('user_id');
        
        // Encontrar a configuração da IA para o usuário
        $aiConfig = AiConfig::where('user_id', $userId)
                          ->where('is_active', true)
                          ->first();
        
        if (!$aiConfig) {
            return response()->json([
                'success' => false,
                'message' => 'Configuração de IA não encontrada ou inativa para este usuário',
                'system_prompt' => null
            ], 404);
        }
        
        // Gerar o system prompt
        $systemPrompt = $this->generateSystemPrompt($aiConfig);
        
        return response()->json([
            'success' => true,
            'message' => 'System prompt gerado com sucesso',
            'system_prompt' => $systemPrompt
        ]);
    }
    
    /**
     * Gera o system prompt com base nas configurações do usuário
     *
     * @param AiConfig $aiConfig
     * @return string
     */
    private function generateSystemPrompt(AiConfig $aiConfig)
    {
        $prompt = "";
        
        // Informações do profissional
        $professionalData = $aiConfig->professional_data;
        $nome = $professionalData['nome'] ?? '';
        $especialidade = $professionalData['especialidade'] ?? '';
        $formacao = $professionalData['formacao'] ?? '';
        $endereco = $professionalData['endereco'] ?? '';
        $atendimentos = $professionalData['atendimentos'] ?? [];
        $formasPagamento = $professionalData['formasPagamento'] ?? [];
        $reembolso = $professionalData['reembolso'] ?? false;
        
        // Configurações do assistente
        $nomeAssistente = $aiConfig->assistant_name;
        $emojis = $aiConfig->emojis;
        $duracaoConsulta = $aiConfig->consultation_duration;
        
        // Respostas personalizadas
        $respostas = $aiConfig->custom_responses;
        
        // Regras especiais
        $regras = $aiConfig->special_rules;
        
        // Construindo o prompt com base no segmento
        if ($aiConfig->segment_type === 'clinica_medica') {
            $prompt = "Você é a secretária virtual d" . $this->obterArtigo($nome) . ", {$nome}, ";
            $prompt .= "médic" . $this->obterGenero($nome) . " {$especialidade} com pós-graduação. ";
            $prompt .= "Seu nome é {$nomeAssistente}.\n\n";
        } else if ($aiConfig->segment_type === 'salao_beleza') {
            $prompt = "Você é a secretária virtual do {$nome}, ";
            $prompt .= "especializado em {$especialidade}. ";
            $prompt .= "Seu nome é {$nomeAssistente}.\n\n";
        } else if ($aiConfig->segment_type === 'clinica_odontologica') {
            $prompt = "Você é a secretária virtual d" . $this->obterArtigo($nome) . ", {$nome}, ";
            $prompt .= "dentista especializado em {$especialidade}. ";
            $prompt .= "Seu nome é {$nomeAssistente}.\n\n";
        }
        
        // Identidade e comunicação - comum a todos os segmentos
        $prompt .= "IDENTIDADE E COMUNICAÇÃO:\n";
        $prompt .= "- Seja cordial, prestativa e mantenha respostas concisas (máximo 2-3 frases curtas).\n";
        $prompt .= "- Use emojis moderadamente (1-2 por mensagem): {$emojis}\n";
        $prompt .= "- Não mencione que você é uma IA; aja como parte real da equipe.\n";
        $prompt .= "- Seja calorosa e acolhedora, mantendo o profissionalismo.\n";
        $prompt .= "- Use linguagem simples e direta, evitando termos técnicos.\n\n";
        
        // Regras especiais
        $prompt .= "REGRAS ESPECIAIS DE ALTA PRIORIDADE:\n";
        
        if (isset($regras['urgencia']) && $regras['urgencia']) {
            $prompt .= "1. **URGÊNCIA MÉDICA** - Se o paciente mencionar \"é urgente\", \"emergência\", ou qualquer variação, SEMPRE responda EXATAMENTE com:\n";
            $prompt .= "   \"Irei verificar com " . $this->obterTratamento($nome) . " como está sua disponibilidade para agendar especificamente para você um horário extra hoje, no período noturno, ok?\n";
            $prompt .= "   Só peço que aguarde um momento, pois assim que possível " . $this->obterTratamento($nome) . " responderá, e te darei um retorno.\n";
            if ($aiConfig->segment_type === 'clinica_medica') {
                $prompt .= "   Porém, se você está se sentindo mal no exato momento, com desejo de suicídio ou sensação de morte iminente, em crise de ansiedade ou psicose, por favor vá até o serviço de emergência de um hospital para poder receber atendimento médico imediatamente.\"\n\n";
            } else {
                $prompt .= "   Porém, se você está se sentindo mal no exato momento ou é uma emergência, por favor procure atendimento especializado imediatamente.\"\n\n";
            }
        }
        
        if (isset($regras['falarComDra']) && $regras['falarComDra']) {
            $prompt .= "2. **SOLICITAÇÃO PARA FALAR COM " . $this->obterTratamentoMaiusculo($nome) . "** - Se o paciente disser \"preciso falar com " . $this->obterTratamento($nome) . "\", \"quero falar com " . $this->obterTratamento($nome) . "\" ou similar, SEMPRE responda EXATAMENTE com:\n";
            $prompt .= "   \"Se sinta à vontade para relatar seu problema ou dúvida, tudo aqui é confidencial.\n";
            $prompt .= "   " . $this->obterTratamento($nome) . " visualizará assim que tiver tempo e te responderá com toda a atenção merecida.\n";
            $prompt .= "   Para facilitar a visualização mais rápida e consequentemente um retorno mais rápido, escreva sua dúvida em forma de texto.\n";
            $prompt .= "   Enquanto isso, eu posso te ajudar a marcar sua consulta ou esclarecer demais dúvidas sobre o atendimento. Basta me perguntar!\"\n\n";
        }
        
        // Serviços e limitações
        $prompt .= "SERVIÇOS E LIMITAÇÕES:\n";
        
        if ($aiConfig->segment_type === 'clinica_medica') {
            $prompt .= "- Você agenda consultas exclusivamente para " . $this->obterTratamento($nome) . ", que atende casos de " . (is_array($atendimentos) ? implode(", ", $atendimentos) : $atendimentos) . ".\n";
            $prompt .= "- Sempre recomende atendimento por " . $this->obterTratamento($nome) . ", elogiando sua competência; se o assunto for de outra área, informe que não trabalhamos com isso.\n";
            $prompt .= "- Nunca forneça conselhos médicos, diagnósticos ou intervenções terapêuticas.\n";
            $prompt .= "- Se alguém mencionar sintomas ou pedir ajuda médica, demonstre empatia e sugira agendar uma consulta.\n";
            $prompt .= "- Seu papel é agendar consultas e esclarecer dúvidas administrativas (horários, valores, formas de pagamento).\n";
            $prompt .= "- Por enquanto ofereça pacotes apenas consulta avulsa.\n\n";
        } else if ($aiConfig->segment_type === 'salao_beleza') {
            $prompt .= "- Você agenda serviços exclusivamente para o {$nome}, que oferece " . (is_array($atendimentos) ? implode(", ", $atendimentos) : $atendimentos) . ".\n";
            $prompt .= "- Sempre recomende os serviços do {$nome}, elogiando sua qualidade; se o serviço for de outra área, informe que não trabalhamos com isso.\n";
            $prompt .= "- Seu papel é agendar serviços e esclarecer dúvidas administrativas (horários, valores, formas de pagamento).\n\n";
        } else if ($aiConfig->segment_type === 'clinica_odontologica') {
            $prompt .= "- Você agenda consultas exclusivamente para " . $this->obterTratamento($nome) . ", que atende casos de " . (is_array($atendimentos) ? implode(", ", $atendimentos) : $atendimentos) . ".\n";
            $prompt .= "- Sempre recomende atendimento por " . $this->obterTratamento($nome) . ", elogiando sua competência; se o assunto for de outra área, informe que não trabalhamos com isso.\n";
            $prompt .= "- Nunca forneça conselhos odontológicos, diagnósticos ou intervenções terapêuticas.\n";
            $prompt .= "- Se alguém mencionar problemas dentários ou pedir ajuda, demonstre empatia e sugira agendar uma consulta.\n";
            $prompt .= "- Seu papel é agendar consultas e esclarecer dúvidas administrativas (horários, valores, formas de pagamento).\n\n";
        }
        
        // Informações práticas
        $prompt .= "INFORMAÇÕES PRÁTICAS:\n";
        
        if ($reembolso) {
            $prompt .= "- Planos de saúde: \"No momento, não trabalhamos com convênios; oferecemos reembolso caso o plano permita.\n";
        } else {
            $prompt .= "- Planos de saúde: \"No momento, não trabalhamos com convênios ou reembolso.\n";
        }
        
        $prompt .= "- Formas de pagamento: " . (is_array($formasPagamento) ? implode(", ", $formasPagamento) : $formasPagamento) . ".\n";
        $prompt .= "- Endereço presencial: {$endereco}.\n";
        $prompt .= "- Formação: \"" . $this->obterTratamento($nome) . " é formad" . $this->obterGenero($nome) . " por {$formacao}.\"\n";
        $prompt .= "- Consultas online: Por videochamada (duração média de {$duracaoConsulta} minutos).\n";
        $prompt .= "- Consultas presenciais: Requerem 30 minutos de deslocamento antes e depois (total de " . ($duracaoConsulta + 60) . " minutos).\n\n";
        
        // Respostas padrão
        $prompt .= "RESPOSTAS PADRÃO:\n";
        $prompt .= "- Renovação de receita: \"" . ($respostas['receita'] ?? "Para renovação de receita, precisamos que agende uma consulta. Posso ajudar a marcar um horário.") . "\"\n";
        $prompt .= "- Sintomas/medicamentos: \"" . ($respostas['sintomas'] ?? "Entendo sua preocupação. " . $this->obterTratamento($nome) . " poderá avaliar seus sintomas durante a consulta. Podemos agendar um horário?") . "\"\n";
        $prompt .= "- Desconto: \"" . ($respostas['desconto'] ?? "Infelizmente não oferecemos descontos no momento, mas temos várias formas de pagamento disponíveis.") . "\"\n";
        $prompt .= "- Problemas psicológicos: \"" . ($respostas['problemas'] ?? "Compreendo que esteja passando por um momento difícil. " . $this->obterTratamento($nome) . " poderá te ajudar durante a consulta. Posso agendar um horário para você?") . "\"\n";
        $prompt .= "- Pedido de ajuda médica: \"" . ($respostas['ajuda'] ?? "Entendo sua preocupação. Para uma avaliação adequada, " . $this->obterTratamento($nome) . " precisa fazer uma consulta. Posso agendar um horário para você?") . "\"\n";
        $prompt .= "- Pagamento: \"" . ($respostas['pagamento'] ?? "Aceitamos " . (is_array($formasPagamento) ? implode(", ", $formasPagamento) : $formasPagamento) . ". O pagamento é realizado no dia da consulta.") . "\"\n";
        
        return $prompt;
    }
    
    /**
     * Obtém o artigo correto (o/a) com base no nome
     *
     * @param string $nome
     * @return string
     */
    private function obterArtigo($nome)
    {
        // Simplificação: nomes que terminam com 'a' são femininos
        if (substr($nome, -1) === 'a' && !in_array(substr($nome, -2), ['ra', 'pa', 'ma'])) {
            return 'a';
        }
        return 'o';
    }
    
    /**
     * Obtém o gênero correto (o/a) com base no nome
     *
     * @param string $nome
     * @return string
     */
    private function obterGenero($nome)
    {
        // Simplificação: nomes que terminam com 'a' são femininos
        if (substr($nome, -1) === 'a' && !in_array(substr($nome, -2), ['ra', 'pa', 'ma'])) {
            return 'a';
        }
        return 'o';
    }
    
    /**
     * Obtém o tratamento adequado (Dr./Dra.) com base no nome
     *
     * @param string $nome
     * @return string
     */
    private function obterTratamento($nome)
    {
        // Simplificação: nomes que terminam com 'a' são femininos
        if (substr($nome, -1) === 'a' && !in_array(substr($nome, -2), ['ra', 'pa', 'ma'])) {
            return 'Dra. ' . explode(' ', $nome)[0];
        }
        return 'Dr. ' . explode(' ', $nome)[0];
    }
    
    /**
     * Obtém o tratamento adequado (DR./DRA.) com base no nome (em maiúsculas)
     *
     * @param string $nome
     * @return string
     */
    private function obterTratamentoMaiusculo($nome)
    {
        // Simplificação: nomes que terminam com 'a' são femininos
        if (substr($nome, -1) === 'a' && !in_array(substr($nome, -2), ['ra', 'pa', 'ma'])) {
            return 'DRA';
        }
        return 'DR';
    }
} 