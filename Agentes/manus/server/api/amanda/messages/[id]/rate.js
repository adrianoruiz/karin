import { createError, defineEventHandler, readBody } from 'h3'
import { query } from '../../../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Método não permitido'
    })
  }
  
  const id = event.context.params.id
  const body = await readBody(event)
  
  if (!body.effectiveness || typeof body.effectiveness !== 'number' || body.effectiveness < 1 || body.effectiveness > 5) {
    throw createError({
      statusCode: 400,
      message: 'Eficácia deve ser um número entre 1 e 5'
    })
  }
  
  try {
    const { rows } = await query(
      'UPDATE messages SET effectiveness = $1 WHERE id = $2 RETURNING *',
      [body.effectiveness, id]
    )
    
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Mensagem não encontrada'
      })
    }
    
    return rows[0]
  } catch {
    throw createError({
      statusCode: 500,
      message: 'Erro ao avaliar mensagem'
    })
  }
}) 