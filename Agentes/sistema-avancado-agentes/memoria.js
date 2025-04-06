require('dotenv').config(); // Carrega variáveis de ambiente do .env
const { MemoryClient } = require('mem0ai'); // Corrigido: Usando destructuring

// Inicializa o cliente Mem0AI com a chave da API do .env
const apiKey = process.env.MEM0_API_KEY;
if (!apiKey) {
  console.error("Erro: MEM0_API_KEY não encontrada no arquivo .env. A funcionalidade de memória não funcionará.");
  // Lida com a ausência da chave - pode lançar um erro ou usar um cliente mock/desabilitado
}
const client = new MemoryClient({ apiKey: apiKey });

// Remove a simulação local
// const memoriaLocal = {};

async function salvarMensagens(userId, messages) {
  if (!client) {
    console.error("Cliente Mem0AI não inicializado.");
    return; // Ou lançar erro
  }
  console.log(`[Mem0AI] Adicionando ${messages.length} mensagens para o usuário ${userId}`);
  try {
    const result = await client.add(messages, { user_id: userId });
    console.log("[Mem0AI] Mensagens adicionadas:", result);
    return result;
  } catch (error) {
    console.error("[Mem0AI] Erro ao adicionar mensagens:", error);
    throw error; // Propaga o erro para tratamento superior
  }
}

// Remove a função obterMemoria antiga
// async function obterMemoria(userId, key) { ... }

// Renomeia e implementa a busca usando mem0ai
async function buscarNaMemoria(userId, query) {
  if (!client) {
    console.error("Cliente Mem0AI não inicializado.");
    return null; // Ou lançar erro
  }
  console.log(`[Mem0AI] Buscando na memória para ${userId}: "${query}"`);
  try {
    const results = await client.search(query, { user_id: userId });
    console.log("[Mem0AI] Resultados da busca:", results);
    return results;
  } catch (error) {
    console.error("[Mem0AI] Erro ao buscar na memória:", error);
    throw error; // Propaga o erro
  }
}

// Exporta as novas funções
module.exports = { salvarMensagens, buscarNaMemoria }; 