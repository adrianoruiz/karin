import { defineEventHandler } from 'h3'
import { query } from '../../db'

export default defineEventHandler(async () => {
  // Obter contagem de mensagens enviadas hoje
  const messagesCount = await query(`
    SELECT COUNT(*) as count 
    FROM messages 
    WHERE DATE(sent_at) = CURRENT_DATE
  `)
  
  // Obter a última categoria utilizada
  const lastCategory = await query(`
    SELECT category 
    FROM messages 
    ORDER BY sent_at DESC 
    LIMIT 1
  `)
  
  // Obter média de eficácia das mensagens
  const avgEffectiveness = await query(`
    SELECT COALESCE(AVG(effectiveness), 0) as avg 
    FROM messages 
    WHERE effectiveness IS NOT NULL
  `)
  
  // Obter contagem de datas especiais próximas (próximos 7 dias)
  const upcomingDates = await query(`
    SELECT COUNT(*) as count 
    FROM special_dates 
    WHERE 
      (date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '7 days')
      OR
      (
        EXTRACT(DAY FROM date) = EXTRACT(DAY FROM CURRENT_DATE) AND 
        EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM CURRENT_DATE)
      )
  `)
  
  return {
    messagesCount: Number(messagesCount.rows[0].count),
    lastCategory: lastCategory.rows.length > 0 ? lastCategory.rows[0].category : '-',
    avgEffectiveness: Number(avgEffectiveness.rows[0].avg).toFixed(1),
    upcomingDates: Number(upcomingDates.rows[0].count)
  }
}) 