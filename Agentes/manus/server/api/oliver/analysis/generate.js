import { defineEventHandler } from 'h3'
import { query } from '../../../db'
import { generateMessage } from '../../../utils/claude'

export default defineEventHandler(async () => {
  try {
    // Obter dados para análise
    const completedTasks = await query(`
      SELECT COUNT(*) as count 
      FROM tasks 
      WHERE 
        status = 'Concluída' AND 
        created_at >= NOW() - INTERVAL '7 days'
    `)
    
    const pendingTasks = await query(`
      SELECT COUNT(*) as count 
      FROM tasks 
      WHERE 
        status != 'Concluída'
    `)
    
    const highPriorityTasks = await query(`
      SELECT COUNT(*) as count 
      FROM tasks 
      WHERE 
        priority = 'Alta' AND
        status != 'Concluída'
    `)
    
    const taskLogs = await query(`
      SELECT 
        DATE(created_at) as day,
        COUNT(*) as count
      FROM task_logs
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY day
      ORDER BY day
    `)
    
    // Criar prompt para o Claude
    const prompt = `
      Você é Oliver, um assistente operacional e estratégico. 
      Forneça uma análise semanal baseada nos seguintes dados:
      
      - Tarefas concluídas na última semana: ${completedTasks.rows[0].count}
      - Tarefas pendentes atualmente: ${pendingTasks.rows[0].count}
      - Tarefas de alta prioridade pendentes: ${highPriorityTasks.rows[0].count}
      - Atividade diária: ${JSON.stringify(taskLogs.rows)}
      
      Forneça insights sobre produtividade, áreas de melhoria, e recomendações estratégicas.
      Seja conciso, objetivo e profissional. Use formato de relatório com seções claras.
      A análise deve ter no máximo 300 palavras.
    `
    
    // Gerar análise com Claude
    const analysisContent = await generateMessage(prompt)
    
    // Salvar no banco
    await query(
      'INSERT INTO analyses(content) VALUES($1) RETURNING id',
      [analysisContent]
    )
    
    return { content: analysisContent }
  } catch (error) {
    console.error('Erro ao gerar análise:', error)
    return { 
      content: 'Não foi possível gerar a análise. Tente novamente mais tarde.',
      error: error.message 
    }
  }
}) 