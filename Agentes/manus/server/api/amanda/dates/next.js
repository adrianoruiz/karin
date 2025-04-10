import { defineEventHandler } from 'h3'
import { query } from '../../../db'

export default defineEventHandler(async () => {
  const { rows } = await query(`
    SELECT * FROM special_dates
    WHERE 
      date >= CURRENT_DATE
    ORDER BY 
      CASE
        WHEN EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE) THEN 0
        ELSE 1
      END,
      date
    LIMIT 1
  `)
  
  if (rows.length === 0) {
    return {}
  }
  
  return rows[0]
}) 