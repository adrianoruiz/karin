import { createError, defineEventHandler, getQuery, readBody } from 'h3'
import { messageSchema, query } from '../../db'
import { generateMessage } from '../../utils/claude'
import { sendMessage } from '../../utils/whatsapp'

export default defineEventHandler(async (event) => {
  // Lógica GET
  if (event.node.req.method === 'GET') {
    const queryParams = getQuery(event)
    const limit = queryParams.limit ? parseInt(String(queryParams.limit), 10) : 50; // Garante que limit é number

    // Validação simples para limit (opcional, mas boa prática)
    if (isNaN(limit) || limit <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Parâmetro \'limit\' inválido.'
      });
    }
    
    try {
      const { rows } = await query(
        'SELECT * FROM messages ORDER BY created_at DESC LIMIT $1',
        [limit]
      )
      return rows
    } catch (dbError) {
      console.error("Erro ao buscar mensagens:", dbError);
      throw createError({
        statusCode: 500,
        message: 'Erro interno do servidor ao buscar mensagens.'
      });
    }
  }
  
  // Lógica POST
  if (event.node.req.method === 'POST') {
    let body;
    try {
      body = await readBody(event);
    } catch (readError) {
      console.error("Erro ao ler o corpo da requisição POST:", readError);
      throw createError({
        statusCode: 400,
        message: 'Corpo da requisição inválido.'
      });
    }
    
    // Validar dados com Zod APENAS para POST
    const validated = messageSchema.safeParse(body)
    if (!validated.success) {
      console.error("Erro de validação Zod (POST):");
      console.error(JSON.stringify(validated.error.errors, null, 2));
      throw createError({
        statusCode: 400, 
        message: `Erro de validação: ${validated.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      })
    }
    
    const { content, category, sub_category, target_number } = validated.data // Inclui content aqui
    
    try {
      // Se o content não veio no body, geramos com Claude
      let finalContent = content;
      if (!finalContent) {
        const prompt = `Você é Amanda, assistente emocional. Gere uma mensagem ${category} curta (1-2 frases) para uma parceira, usando o apelido "Barbie" ou "Princesa", com tom afetuoso e carinhoso.`
        finalContent = await generateMessage(prompt)
      }

      // Enviar mensagem via WhatsApp se tiver número de destino
      if (target_number) {
        await sendMessage(target_number, finalContent)
      }
      
      // Salvar no banco
      const { rows } = await query(
        'INSERT INTO messages(content, category, sub_category, sent_at) VALUES($1, $2, $3, NOW()) RETURNING *',
        [finalContent, category, sub_category]
      )
      
      return rows[0]
    } catch (processError) {
      console.error("Erro no processamento POST (Claude/WhatsApp/DB):", processError);
      throw createError({
        statusCode: 500,
        message: 'Erro interno do servidor ao processar a mensagem.'
      });
    }
  }

  // Método não permitido
  throw createError({
    statusCode: 405,
    message: 'Método não permitido'
  });
}) 