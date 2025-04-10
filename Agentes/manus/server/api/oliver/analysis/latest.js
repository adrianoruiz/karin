import { defineEventHandler } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async () => {
  try {
    // Criar tabela de análises se não existir
    await query(`
      CREATE TABLE IF NOT EXISTS analyses (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    // Buscar última análise
    const { rows } = await query(`
      SELECT * FROM analyses 
      ORDER BY created_at DESC 
      LIMIT 1
    `)
    
    if (rows.length === 0) {
      return { content: null }
    }
    
    return { content: rows[0].content }
  } catch (error) {
    console.error('Erro ao buscar análise:', error)
    return { content: null, error: 'Erro ao buscar análise' }
  }
}) 