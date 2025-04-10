import { createError, defineEventHandler, readBody } from 'h3'
import { query, taskSchema } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { rows } = await query('SELECT * FROM tasks ORDER BY due_date ASC')
    return rows
  }
  
  if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    
    // Validar dados com Zod
    const validated = taskSchema.safeParse(body)
    if (!validated.success) {
      throw createError({
        statusCode: 400, 
        message: JSON.stringify(validated.error.errors)
      })
    }
    
    const { title, description, priority, status, due_date } = validated.data
    
    const { rows } = await query(
      'INSERT INTO tasks(title, description, priority, status, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [title, description, priority, status, due_date]
    )
    
    return rows[0]
  }
}) 