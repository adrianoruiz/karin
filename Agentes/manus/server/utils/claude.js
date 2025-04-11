import axios from 'axios';

export async function generateMessage(prompt) {
  try {
    // Verificar se a chave API está definida
    if (!process.env.CLAUDE_API_KEY) {
      console.log('Chave API Claude não configurada');
      throw new Error('Chave API Claude não configurada');
    }

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    });
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Erro detalhado ao gerar mensagem com Claude:');
    if (error.response) {
      // O servidor respondeu com um status fora do range 2xx
      console.error('Dados da resposta:', error.response.data);
      console.error('Status da resposta:', error.response.status);
      console.error('Cabeçalhos da resposta:', error.response.headers);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Requisição feita, mas sem resposta:', error.request);
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Erro na configuração da requisição:', error.message);
    }
    console.error('Configuração do Axios:', error.config);
    
    // Retornar mensagem de erro em vez de usar fallback local
    return "Não foi possível conectar à API do Claude. Por favor, verifique sua conexão e tente novamente.";
  }
}
