import { createError, defineEventHandler, getQuery, readBody } from 'h3'
import { query, taskSchema } from '../../db'

export default defineEventHandler(async (event) => {
  // GET - Listar tarefas com filtros
  if (event.node.req.method === 'GET') {
    const queryParams = getQuery(event)
    const { after, from, to, status } = queryParams
    
    let sqlQuery = 'SELECT * FROM tasks'
    const sqlParams = []
    const conditions = []
    
    // Filtro por data (após uma data específica)
    if (after) {
      conditions.push('due_date >= $' + (sqlParams.length + 1))
      sqlParams.push(after)
    }
    
    // Filtro por período (de uma data até outra)
    if (from) {
      conditions.push('due_date >= $' + (sqlParams.length + 1))
      sqlParams.push(from)
    }
    
    if (to) {
      conditions.push('due_date <= $' + (sqlParams.length + 1))
      sqlParams.push(to)
    }
    
    // Filtro por status
    if (status) {
      conditions.push('status = $' + (sqlParams.length + 1))
      sqlParams.push(status)
    }
    
    // Adicionar WHERE se houver condições
    if (conditions.length > 0) {
      sqlQuery += ' WHERE ' + conditions.join(' AND ')
    }
    
    // Ordenar por data
    sqlQuery += ' ORDER BY due_date ASC'
    
    try {
      const { rows } = await query(sqlQuery, sqlParams)
      return rows
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao buscar tarefas'
      })
    }
  }
  
  // POST - Criar nova tarefa
  if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    
    // Validar dados com Zod
    const validated = taskSchema.safeParse(body)
    if (!validated.success) {
      throw createError({
        statusCode: 400, 
        message: JSON.stringify(validated.error.errors)
      })
    }
    
    const { title, description, priority, status, due_date } = validated.data
    
    try {
      const { rows } = await query(
        'INSERT INTO tasks(title, description, priority, status, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [title, description, priority, status, due_date]
      )
      
      return rows[0]
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao criar tarefa'
      })
    }
  }
  
  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  })
}) 