import { Cron } from 'croner'
import { defineNitroPlugin } from 'nitropack/runtime'
import { query } from './db'
import { generateMessage } from './utils/claude'
import { sendMessage } from './utils/whatsapp'

export default defineNitroPlugin(() => {
  // Oliver: Planejamento diário (7:00)
  Cron('0 7 * * *', async () => {
    try {
      // Buscar tarefas do dia
      const { rows: tarefas } = await query(
        "SELECT * FROM tasks WHERE status != 'Concluída' AND due_date = CURRENT_DATE"
      )
      
      if (tarefas.length > 0) {
        // Formatar mensagem
        let mensagem = "🤖 *OLIVER | AGENDA DO DIA*\n\n"
        tarefas.forEach((tarefa, index) => {
          mensagem += `${index + 1}. ${tarefa.title}\n`
        })
        
        // Enviar via WhatsApp
        await sendMessage(process.env.WHATSAPP_NUMBER, mensagem)
      }
    } catch (error) {
      console.error('Erro no job de planejamento diário:', error)
    }
  })
  
  // Amanda: Mensagem carinhosa (14:00)
  Cron('0 14 * * *', async () => {
    try {
      // Verificar última categoria usada
      const { rows } = await query(
        "SELECT category FROM messages ORDER BY sent_at DESC LIMIT 1"
      )
      
      const categoria = rows.length > 0 ? 
        (rows[0].category === 'carinhosa' ? 'motivacional' : 'carinhosa') : 
        'carinhosa'
      
      const prompt = `Você é Amanda, assistente emocional. Gere uma mensagem ${categoria} curta (1-2 frases) para uma parceira, usando o apelido "Barbie" ou "Princesa", com tom afetuoso.`
      
      const mensagem = await generateMessage(prompt)
      
      // Enviar via WhatsApp
      await sendMessage(process.env.WHATSAPP_NUMBER, mensagem)
      
      // Registrar no banco
      await query(
        'INSERT INTO messages(content, category, sub_category, sent_at) VALUES($1, $2, $3, NOW())',
        [mensagem, categoria, 'diária']
      )
    } catch (error) {
      console.error('Erro no job de mensagem carinhosa:', error)
    }
  })
  
  // Verificação de datas especiais (8:00)
  Cron('0 8 * * *', async () => {
    try {
      // Buscar datas especiais para hoje
      const { rows: datas } = await query(`
        SELECT * FROM special_dates 
        WHERE 
          EXTRACT(DAY FROM date) = EXTRACT(DAY FROM CURRENT_DATE) AND 
          EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM CURRENT_DATE)
      `)
      
      if (datas.length > 0) {
        for (const data of datas) {
          const prompt = `Você é Amanda, assistente emocional. Hoje é uma data especial: ${data.name}. Gere uma mensagem comemorativa para esta data importante, usando um tom afetuoso e mencionando a importância desta data.`
          
          const mensagem = await generateMessage(prompt)
          
          // Enviar via WhatsApp
          await sendMessage(process.env.WHATSAPP_NUMBER, mensagem)
          
          // Registrar no banco
          await query(
            'INSERT INTO messages(content, category, sub_category, sent_at) VALUES($1, $2, $3, NOW())',
            [mensagem, 'especial', data.type]
          )
        }
      }
    } catch (error) {
      console.error('Erro no job de verificação de datas especiais:', error)
    }
  })
}) 