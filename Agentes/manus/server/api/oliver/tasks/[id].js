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
    try {
      const body = await readBody(event)
      const { status } = body
      
      // Validar status
      if (status && !['Pendente', 'Em andamento', 'Concluída'].includes(status)) {
        throw createError({
          statusCode: 400,
          message: 'Status inválido. Use "Pendente", "Em andamento" ou "Concluída".'
        })
      }
      
      // Verificar se a tarefa existe
      const { rows: existingTask } = await query(
        'SELECT id FROM tasks WHERE id = $1',
        [id]
      )
      
      if (existingTask.length === 0) {
        throw createError({
          statusCode: 404,
          message: 'Tarefa não encontrada.'
        })
      }
      
      // Atualizar tarefa
      const { rows } = await query(
        'UPDATE tasks SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, id]
      )
      
      // Registrar log da atualização
      await query(
        'INSERT INTO task_logs(task_id, status, notes) VALUES($1, $2, $3)',
        [id, status, `Status alterado para "${status}"`]
      )
      
      return rows[0]
    } catch (error) {
      if (error.statusCode) throw error
      
      console.error('Erro ao atualizar tarefa:', error)
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao atualizar tarefa.'
      })
    }
  }
  
  if (event.node.req.method === 'DELETE') {
    try {
      // Verificar se a tarefa existe
      const { rows: existingTask } = await query(
        'SELECT id FROM tasks WHERE id = $1',
        [id]
      )
      
      if (existingTask.length === 0) {
        throw createError({
          statusCode: 404,
          message: 'Tarefa não encontrada.'
        })
      }
      
      // Remover logs da tarefa
      await query('DELETE FROM task_logs WHERE task_id = $1', [id])
      
      // Remover tarefa
      const { rows } = await query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *',
        [id]
      )
      
      return {
        message: 'Tarefa removida com sucesso.',
        task: rows[0]
      }
    } catch (error) {
      if (error.statusCode) throw error
      
      console.error('Erro ao remover tarefa:', error)
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao remover tarefa.'
      })
    }
  }
  
  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 