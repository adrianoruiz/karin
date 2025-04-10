import { createError, defineEventHandler, readBody } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  if (event.node.req.method === 'GET') {
    const { rows } = await query('SELECT * FROM tasks WHERE id = $1', [id])
    
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Tarefa não encontrada'
      })
    }
    
    return rows[0]
  }
  
  if (event.node.req.method === 'PATCH') {
    const body = await readBody(event)
    
    // Verificar se a tarefa existe
    const { rows: existingTask } = await query('SELECT * FROM tasks WHERE id = $1', [id])
    
    if (existingTask.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Tarefa não encontrada'
      })
    }
    
    // Construir a query de atualização dinamicamente
    const updates = []
    const values = []
    let paramIndex = 1
    
    for (const [key, value] of Object.entries(body)) {
      if (['title', 'description', 'priority', 'status', 'due_date'].includes(key)) {
        updates.push(`${key} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    }
    
    if (updates.length === 0) {
      return existingTask[0]
    }
    
    // Adicionar o ID como último parâmetro
    values.push(id)
    
    const { rows } = await query(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    )
    
    // Se houve uma mudança de status, registrar no log
    if (body.status && body.status !== existingTask[0].status) {
      await query(
        'INSERT INTO task_logs(task_id, status, notes) VALUES($1, $2, $3)',
        [id, body.status, body.notes || `Status alterado para ${body.status}`]
      )
    }
    
    return rows[0]
  }
  
  if (event.node.req.method === 'DELETE') {
    const { rows } = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Tarefa não encontrada'
      })
    }
    
    return {
      message: 'Tarefa removida com sucesso',
      task: rows[0]
    }
  }
}) 