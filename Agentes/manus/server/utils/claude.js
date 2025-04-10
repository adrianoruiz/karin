import axios from 'axios'

export async function generateMessage(prompt) {
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2024-03-01' // Atualize para a versão mais recente disponível
      }
    })
    
    return response.data.content[0].text
  } catch (error) {
    console.error('Erro ao gerar mensagem com Claude:', error)
    return "Não foi possível gerar a mensagem."
  }
}
