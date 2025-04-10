import { createError, defineEventHandler, readBody } from 'h3'
import { query, specialDateSchema } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { rows } = await query(
      'SELECT * FROM special_dates ORDER BY date ASC'
    )
    return rows
  }
  
  if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    
    // Validar dados com Zod
    const validated = specialDateSchema.safeParse(body)
    if (!validated.success) {
      throw createError({
        statusCode: 400, 
        message: JSON.stringify(validated.error.errors)
      })
    }
    
    const { name, date, type, importance, notes } = validated.data
    
    const { rows } = await query(
      'INSERT INTO special_dates(name, date, type, importance, notes) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [name, date, type, importance, notes]
    )
    
    return rows[0]
  }
}) 