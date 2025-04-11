import { createError, defineEventHandler } from 'h3'
import { query } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      // Criar tabela messages se não existir
      await query(`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          sub_category TEXT,
          sent_at TIMESTAMP,
          response TEXT,
          effectiveness INTEGER,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `)
      
      // Criar tabela special_dates se não existir
      await query(`
        CREATE TABLE IF NOT EXISTS special_dates (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          date DATE NOT NULL,
          type TEXT NOT NULL,
          importance INTEGER CHECK (importance BETWEEN 1 AND 5),
          notes TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `)
      
      // Obter data de hoje no formato ISO (YYYY-MM-DD)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      // 1. Mensagens enviadas hoje
      const { rows: todayRows } = await query(`
        SELECT COUNT(*) as count 
        FROM messages 
        WHERE DATE(sent_at) = CURRENT_DATE
      `)
      const messagesCount = parseInt(todayRows[0]?.count || 0)
      
      // 2. Próximas datas especiais (nos próximos 30 dias)
      const { rows: datesRows } = await query(`
        SELECT COUNT(*) as count 
        FROM special_dates 
        WHERE date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '30 days')
      `)
      const upcomingDates = parseInt(datesRows[0]?.count || 0)
      
      // 3. Última categoria de mensagem
      const { rows: categoryRows } = await query(`
        SELECT category 
        FROM messages 
        WHERE category IS NOT NULL 
        ORDER BY sent_at DESC 
        LIMIT 1
      `)
      const lastCategory = categoryRows.length > 0 ? categoryRows[0].category : '-'
      
      // 4. Média de efetividade
      const { rows: effRows } = await query(`
        SELECT AVG(effectiveness) as avg_effectiveness 
        FROM messages 
        WHERE effectiveness IS NOT NULL
      `)
      const avgEffectiveness = Math.round(effRows[0]?.avg_effectiveness || 0)
      
      return {
        messagesCount,
        upcomingDates,
        lastCategory,
        avgEffectiveness
      }
      
    } catch (error) {
      console.error('Erro ao calcular estatísticas da Amanda:', error)
      // Em vez de falhar, retornar estatísticas vazias
      return {
        messagesCount: 0,
        upcomingDates: 0,
        lastCategory: '-',
        avgEffectiveness: 0
      }
    }
  }
  
  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 