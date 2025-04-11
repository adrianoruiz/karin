import Anthropic from "@anthropic-ai/sdk";

export async function generateMessage(prompt) {
  try {
    // Verificar se a chave API está definida
    if (!process.env.CLAUDE_API_KEY) {
      console.log('Chave API Claude não configurada');
      throw new Error('Chave API Claude não configurada');
    }

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }]
    });
    
    return response.content[0].text;
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
    console.error('Erro completo:', error);
    
    // Retornar mensagem de erro
    return "Não foi possível conectar à API do Claude. Por favor, verifique sua conexão e tente novamente.";
  }
}
