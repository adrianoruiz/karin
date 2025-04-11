import { createError, defineEventHandler } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      // Obter data de hoje no formato ISO (YYYY-MM-DD)
      const today = new Date()
      const isoDate = today.toISOString().split('T')[0]
      
      const { rows } = await query(
        'SELECT * FROM tasks WHERE due_date = $1 ORDER BY priority DESC',
        [isoDate]
      )
      
      return rows
    } catch (error) {
      console.error('Erro ao buscar tarefas de hoje:', error)
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao buscar tarefas de hoje'
      })
    }
  }

  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 