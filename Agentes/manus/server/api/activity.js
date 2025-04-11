import { createError, defineEventHandler } from 'h3'
import { query } from '../db'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      // Criar tabelas para armazenar atividades se não existirem
      await query(`
        CREATE TABLE IF NOT EXISTS activities (
          id SERIAL PRIMARY KEY,
          agent TEXT NOT NULL,
          text TEXT NOT NULL,
          type TEXT NOT NULL,
          related_id INTEGER,
          timestamp TIMESTAMP DEFAULT NOW()
        )
      `)

      // Buscar atividades recentes - limitado a 10
      const { rows } = await query(`
        SELECT * FROM activities 
        ORDER BY timestamp DESC 
        LIMIT 10
      `)
      
      // Se não houver atividades, retornar algumas atividades demonstrativas
      if (rows.length === 0) {
        const defaultActivities = [
          {
            id: 1,
            agent: 'Oliver',
            text: 'Análise semanal gerada automaticamente',
            type: 'analysis',
            timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hora atrás
          },
          {
            id: 2,
            agent: 'Amanda',
            text: 'Mensagem motivacional enviada',
            type: 'message',
            timestamp: new Date(Date.now() - 7200000).toISOString() // 2 horas atrás
          },
          {
            id: 3,
            agent: 'Oliver',
            text: 'Nova tarefa adicionada: "Revisar documentação"',
            type: 'task',
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 dia atrás
          }
        ]
        return defaultActivities
      }
      
      return rows
      
    } catch (error) {
      console.error('Erro ao buscar atividades recentes:', error)
      // Em vez de falhar, retornar um array vazio
      return []
    }
  }
  
  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 