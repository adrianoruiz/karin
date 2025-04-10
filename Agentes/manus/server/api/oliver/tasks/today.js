import { defineEventHandler } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async () => {
  const { rows } = await query(`
    SELECT * FROM tasks 
    WHERE due_date = CURRENT_DATE 
    ORDER BY 
      CASE 
        WHEN priority = 'Alta' THEN 1 
        WHEN priority = 'Média' THEN 2 
        WHEN priority = 'Baixa' THEN 3 
      END,
      CASE 
        WHEN status = 'Em andamento' THEN 1 
        WHEN status = 'Pendente' THEN 2 
        WHEN status = 'Concluída' THEN 3 
      END
  `)
  
  return rows
}) 