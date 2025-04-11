import { createError, defineEventHandler } from 'h3'
import { query } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      // Obter data de hoje no formato ISO (YYYY-MM-DD)
      const today = new Date()
      const isoDate = today.toISOString().split('T')[0]
      
      // 1. Tarefas para hoje
      const { rows: todayRows } = await query(
        'SELECT COUNT(*) as count FROM tasks WHERE due_date = $1',
        [isoDate]
      )
      const tasksToday = parseInt(todayRows[0]?.count || 0)
      
      // 2. Tarefas concluídas
      const { rows: completedRows } = await query(
        'SELECT COUNT(*) as count FROM tasks WHERE status = $1',
        ['Concluída']
      )
      const completed = parseInt(completedRows[0]?.count || 0)
      
      // 3. Tarefas pendentes
      const { rows: pendingRows } = await query(
        'SELECT COUNT(*) as count FROM tasks WHERE status != $1',
        ['Concluída']
      )
      const pending = parseInt(pendingRows[0]?.count || 0)
      
      // 4. Calcular progresso (% de tarefas concluídas do total)
      let progress = 0
      const total = completed + pending
      
      if (total > 0) {
        progress = Math.round((completed / total) * 100)
      }
      
      return {
        tasksToday,
        progress,
        pending,
        completed
      }
      
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error)
      // Em vez de falhar, retornar estatísticas vazias
      return {
        tasksToday: 0,
        progress: 0,
        pending: 0,
        completed: 0,
        error: 'Falha ao carregar estatísticas'
      }
    }
  }
  
  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 