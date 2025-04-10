import { createError, defineEventHandler } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  if (event.node.req.method === 'DELETE') {
    const { rows } = await query('DELETE FROM special_dates WHERE id = $1 RETURNING *', [id])
    
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Data especial não encontrada'
      })
    }
    
    return {
      message: 'Data especial removida com sucesso',
      date: rows[0]
    }
  }
  
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 