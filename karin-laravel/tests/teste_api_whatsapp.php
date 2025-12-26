<?php

// Script para testar a API de chat-logs sem autenticação
// Executar com: php tests/teste_api_whatsapp.php

// Função para fazer uma requisição HTTP
function fazerRequisicao($url, $metodo = 'GET', $dados = [])
{
    $curl = curl_init();

    $opcoes = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => $metodo,
    ];

    if ($metodo === 'POST' || $metodo === 'PUT') {
        $opcoes[CURLOPT_POSTFIELDS] = json_encode($dados);
        $opcoes[CURLOPT_HTTPHEADER] = [
            'Content-Type: application/json',
            'Accept: application/json',
        ];
    }

    curl_setopt_array($curl, $opcoes);

    $resposta = curl_exec($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $erro = curl_error($curl);

    curl_close($curl);

    return [
        'status' => $statusCode,
        'resposta' => json_decode($resposta, true),
        'erro' => $erro,
    ];
}

// URL da API
$baseUrl = 'http://127.0.0.1:8000/api'; // Ajuste conforme necessário

// Gerar um número de telefone aleatório para o teste
$telefone = '+5547999'.rand(100000, 999999);
echo "Número de telefone para teste: $telefone\n\n";

// Dados para a requisição
$dados = [
    'doctor_id' => 1, // Ajuste para um ID de médico válido no seu banco
    'phone_user' => $telefone,
    'message_type' => 'text',
    'sender_type' => 'user',
    'message' => 'Esta é uma mensagem de teste enviada via API',
];

echo "Enviando requisição para criar mensagem e usuário...\n";
$resultado = fazerRequisicao($baseUrl.'/chat-logs-test', 'POST', $dados);

echo "Status da resposta: {$resultado['status']}\n";

if ($resultado['status'] >= 200 && $resultado['status'] < 300) {
    echo "Sucesso! Mensagem criada.\n";

    if (isset($resultado['resposta']['data']['id'])) {
        echo "ID da mensagem: {$resultado['resposta']['data']['id']}\n";
        echo "Telefone do usuário: {$resultado['resposta']['data']['phone_user']}\n";
        echo 'ID do usuário associado: '.($resultado['resposta']['data']['user_id'] ?? 'Nenhum')."\n";
    }

    // Verificar se um usuário foi criado
    echo "\nVerificando se o usuário foi criado...\n";
    $verificacao = fazerRequisicao($baseUrl.'/whatsapp/list-whats-users', 'GET');

    if ($verificacao['status'] >= 200 && $verificacao['status'] < 300) {
        $usuariosWhatsapp = $verificacao['resposta']['data'] ?? [];
        $encontrado = false;

        foreach ($usuariosWhatsapp as $usuario) {
            if ($usuario['phone'] === $telefone) {
                $encontrado = true;
                echo "SUCESSO: Usuário foi criado com ID: {$usuario['id']}\n";
                echo "Nome: {$usuario['name']}\n";
                echo "Email: {$usuario['email']}\n";
                break;
            }
        }

        if (! $encontrado) {
            echo "ERRO: Usuário não foi encontrado na lista de usuários do WhatsApp.\n";
        }
    } else {
        echo "Erro ao verificar usuários do WhatsApp: {$verificacao['status']}\n";
        if (isset($verificacao['resposta']['error'])) {
            echo "Mensagem de erro: {$verificacao['resposta']['error']}\n";
        }
    }
} else {
    echo "Erro ao criar mensagem:\n";
    if (isset($resultado['resposta']['errors'])) {
        foreach ($resultado['resposta']['errors'] as $campo => $erros) {
            echo "$campo: ".implode(', ', $erros)."\n";
        }
    } elseif (isset($resultado['resposta']['error'])) {
        echo "Erro: {$resultado['resposta']['error']}\n";
    } elseif ($resultado['erro']) {
        echo "Erro CURL: {$resultado['erro']}\n";
    }
}

echo "\nTeste concluído.\n";
