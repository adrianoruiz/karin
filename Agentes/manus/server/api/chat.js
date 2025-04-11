import { createError, defineEventHandler, readBody } from 'h3'
import { generateMessage } from '../utils/claude'

export default defineEventHandler(async (event) => {
  // Apenas aceita requisições POST
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Método não permitido'
    })
  }

  try {
    // Ler corpo da requisição
    const body = await readBody(event)
    
    if (!body.message || typeof body.message !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Mensagem inválida'
      })
    }

    // Criar prompt para o Claude
    const prompt = `Você é um assistente de IA útil e amigável em um chat. Responda à seguinte mensagem do usuário de forma informativa, prestativa e concisa (1-3 frases).
    
Mensagem do usuário: "${body.message}"

Resposta:`

    // Gerar resposta usando a API Claude
    const aiResponse = await generateMessage(prompt)
    
    // Log para fins de depuração
    console.log('Chat - Mensagem do usuário:', body.message)
    console.log('Chat - Resposta da IA:', aiResponse)
    
    return { 
      response: aiResponse,
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('Erro no chat:', error)
    
    // Se já for um erro HTTP, repassar
    if (error.statusCode) {
      throw error
    }
    
    // Caso contrário, retornar erro 500
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao processar mensagem'
    })
  }
}) 