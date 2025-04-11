import { createError, defineEventHandler } from 'h3';
import { query } from '../../../db';

// Presume-se que você tenha uma tabela 'analyses' com colunas 'created_at' e 'content'
// Se a estrutura for diferente, ajuste a query.

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      // Verificar se a tabela analyses existe
      try {
        // Criar tabela se não existir
        await query(`
          CREATE TABLE IF NOT EXISTS analyses (
            id SERIAL PRIMARY KEY,
            agent TEXT DEFAULT 'Oliver',
            type TEXT DEFAULT 'weekly',
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `);
      } catch (tableError) {
        console.error('Erro ao verificar/criar tabela analyses:', tableError);
        // Continue mesmo se esta parte falhar
      }

      // Tentativa 1: versão com campos agent e type (mais recente)
      try {
        const { rows: newRows } = await query(
          'SELECT content, created_at FROM analyses WHERE agent = $1 AND type = $2 ORDER BY created_at DESC LIMIT 1',
          ['Oliver', 'weekly']
        );
        
        if (newRows.length > 0) {
          return newRows[0];
        }
      } catch (queryError) {
        console.log('Erro na consulta com campos agent/type, tentando versão simplificada:', queryError.message);
        // Continue para próxima tentativa
      }

      // Tentativa 2: versão sem campos agent e type (versão antiga)
      try {
        const { rows: oldRows } = await query(
          'SELECT content, created_at FROM analyses ORDER BY created_at DESC LIMIT 1'
        );
        
        if (oldRows.length > 0) {
          return oldRows[0];
        }
      } catch (simpleError) {
        console.error('Erro na consulta simplificada:', simpleError.message);
        // Continue para resposta padrão
      }

      // Nenhuma análise encontrada ou erro em ambas consultas
      console.log('Nenhuma análise encontrada, retornando objeto vazio');
      return { content: null, created_at: null };

    } catch (error) {
      console.error('Erro global ao buscar última análise:', error);
      // Em vez de falhar com 500, retorne um objeto vazio para não quebrar o frontend
      return { 
        content: "Não foi possível recuperar a última análise. O sistema está sendo configurado.", 
        created_at: new Date().toISOString() 
      };
    }
  }

  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  });
}) 