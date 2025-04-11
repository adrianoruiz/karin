import { createError, defineEventHandler } from 'h3';
import { query } from '../../../db';

// Presume-se que você tenha uma tabela 'analyses' com colunas 'created_at' e 'content'
// Se a estrutura for diferente, ajuste a query.

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    try {
      const { rows } = await query(
        'SELECT content, created_at FROM analyses WHERE agent = $1 AND type = $2 ORDER BY created_at DESC LIMIT 1',
        ['Oliver', 'weekly'] // Filtra por agente e tipo
      );

      if (rows.length === 0) {
        // Pode retornar 404 ou um objeto vazio/padrão
        // throw createError({ statusCode: 404, message: 'Nenhuma análise encontrada.' });
        return { content: null, created_at: null }; 
      }

      return rows[0];

    } catch (error) {
      console.error('Erro ao buscar última análise semanal:', error);
      throw createError({
        statusCode: 500,
        message: 'Erro interno ao buscar a última análise semanal.'
      });
    }
  }

  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  });
}) 