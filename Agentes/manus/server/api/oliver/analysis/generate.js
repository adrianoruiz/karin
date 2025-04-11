import { createError, defineEventHandler } from 'h3';
import { query } from '../../../db';
import { generateMessage } from '../../../utils/claude';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    try {
      // Criar tabela analyses se não existir
      await query(`
        CREATE TABLE IF NOT EXISTS analyses (
          id SERIAL PRIMARY KEY,
          agent TEXT DEFAULT 'Oliver',
          type TEXT DEFAULT 'weekly',
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

      // 1. Buscar dados relevantes (ex: tarefas da última semana)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { rows: tasks } = await query(
        'SELECT title, status, priority, due_date FROM tasks WHERE created_at >= $1',
        [sevenDaysAgo.toISOString()]
      );

      if (tasks.length === 0) {
        const message = "Nenhuma tarefa encontrada na última semana para gerar análise.";
        // Salvar mesmo que não haja tarefas, para manter histórico
        await query(
          'INSERT INTO analyses(agent, type, content) VALUES($1, $2, $3) RETURNING id',
          ['Oliver', 'weekly', message]
        );
        return { content: message };
      }

      // 2. Montar o prompt para o Claude
      let taskSummary = tasks.map(t => 
        `- ${t.title} (Status: ${t.status}, Prioridade: ${t.priority}, Prazo: ${t.due_date ? new Date(t.due_date).toLocaleDateString() : 'N/D'})`
      ).join('\n');

      const prompt = `Você é Oliver, assistente estratégico.
Baseado nas tarefas da última semana listadas abaixo, gere uma análise concisa (3-5 frases) sobre a produtividade, identificando possíveis gargalos ou sucessos e sugerindo um foco para a próxima semana.

Tarefas da Última Semana:
${taskSummary}

Análise:`;

      // 3. Chamar o Claude para gerar a análise
      const analysisContent = await generateMessage(prompt);

      // 4. Salvar a análise gerada
      await query(
        'INSERT INTO analyses(agent, type, content) VALUES($1, $2, $3) RETURNING id',
        ['Oliver', 'weekly', analysisContent]
      );
      
      console.log("Análise semanal gerada com sucesso:", analysisContent);
      return { content: analysisContent };

    } catch (error) {
      console.error('Erro ao gerar análise semanal:', error);
      // Retornar erro mais informativo
      return {
        content: "Não foi possível gerar a análise. " + (error.message || "Tente novamente mais tarde."),
        error: error.message || "Erro desconhecido"
      };
    }
  }

  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  });
}) 