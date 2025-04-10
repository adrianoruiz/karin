import pg from 'pg'
import { z } from 'zod'
const { Pool } = pg

// Criando pool de conexão PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Função utilitária para queries
export async function query(text, params) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

// Exportar schemas Zod
export const taskSchema = z.object({
  title: z.string().min(3, "Título precisa ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  priority: z.enum(['Alta', 'Média', 'Baixa']),
  status: z.enum(['Pendente', 'Em andamento', 'Concluída']),
  due_date: z.string().optional(),
})

export const messageSchema = z.object({
  content: z.string().min(1, "Mensagem não pode estar vazia"),
  category: z.string(),
  sub_category: z.string().optional(),
})

export const specialDateSchema = z.object({
  name: z.string().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  date: z.string(),
  type: z.string(),
  importance: z.number().min(1).max(5),
  notes: z.string().optional(),
}) 