import { defineEventHandler } from 'h3'
import { query } from '../db'

export default defineEventHandler(async () => {
  // Buscar últimas atividades do sistema
  // 1. Tarefas atualizadas recentemente
  const taskLogs = await query(`
    SELECT 
      tl.id,
      t.title as task_title,
      tl.status,
      tl.created_at as timestamp,
      'Oliver' as agent,
      CASE 
        WHEN tl.status = 'Concluída' THEN 'Concluiu a tarefa: ' || t.title
        WHEN tl.status = 'Em andamento' THEN 'Iniciou a tarefa: ' || t.title
        WHEN tl.status = 'Pendente' THEN 'Adicionou a tarefa: ' || t.title
      END as text
    FROM task_logs tl
    JOIN tasks t ON tl.task_id = t.id
    ORDER BY tl.created_at DESC
    LIMIT 5
  `)
  
  // 2. Mensagens enviadas recentemente
  const messages = await query(`
    SELECT 
      id,
      category,
      sent_at as timestamp,
      'Amanda' as agent,
      'Enviou uma mensagem ' || category as text
    FROM messages
    WHERE sent_at IS NOT NULL
    ORDER BY sent_at DESC
    LIMIT 5
  `)
  
  // Juntar as atividades e ordenar por data
  const activities = [
    ...taskLogs.rows.map(item => ({ 
      ...item, 
      type: 'task',
      timestamp: new Date(item.timestamp)
    })),
    ...messages.rows.map(item => ({ 
      ...item, 
      type: 'message',
      timestamp: new Date(item.timestamp)
    }))
  ]
  
  // Ordenar por data (mais recente primeiro)
  activities.sort((a, b) => b.timestamp - a.timestamp)
  
  return activities.slice(0, 10)
}) 