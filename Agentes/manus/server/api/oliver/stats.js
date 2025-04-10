import { defineEventHandler } from 'h3'
import { query } from '../../db'

export default defineEventHandler(async () => {
  // Obter estatísticas das tarefas
  const tasksToday = await query(`
    SELECT COUNT(*) as count 
    FROM tasks 
    WHERE due_date = CURRENT_DATE
  `)
  
  const pendingTasks = await query(`
    SELECT COUNT(*) as count 
    FROM tasks 
    WHERE status = 'Pendente'
  `)
  
  const completedTasks = await query(`
    SELECT COUNT(*) as count 
    FROM tasks 
    WHERE status = 'Concluída'
  `)
  
  const totalActiveTasks = await query(`
    SELECT COUNT(*) as count 
    FROM tasks 
    WHERE status != 'Concluída'
  `)
  
  // Calcular progresso (tarefas concluídas / total de tarefas)
  const total = Number(totalActiveTasks.rows[0].count) + Number(completedTasks.rows[0].count)
  const progress = total > 0 
    ? Math.round((Number(completedTasks.rows[0].count) / total) * 100) 
    : 0
  
  return {
    tasksToday: Number(tasksToday.rows[0].count),
    pending: Number(pendingTasks.rows[0].count),
    completed: Number(completedTasks.rows[0].count),
    progress
  }
}) 