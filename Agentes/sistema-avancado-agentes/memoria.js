// Simulação da memória (Mem0AI removido temporariamente)
const memoriaLocal = {};

async function adicionarMemoria(userId, key, value) {
  console.log(`[Memoria Local] Adicionando para ${userId}: ${key}=${value}`);
  if (!memoriaLocal[userId]) {
    memoriaLocal[userId] = {};
  }
  memoriaLocal[userId][key] = value;
  // Simula uma operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 10));
}

async function obterMemoria(userId, key) {
  console.log(`[Memoria Local] Obtendo ${key} para ${userId}`);
  const value = memoriaLocal[userId] ? memoriaLocal[userId][key] : null;
  console.log(`[Memoria Local] Valor encontrado para ${key}: ${value}`);
  // Simula uma operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 10));
  return value;
}

// Função buscarInformacaoMemoria removida/simplificada
async function buscarInformacaoMemoria(userId, query) {
  console.log(`[Memoria Local] Buscando informação para ${userId}: "${query}"`);
  console.log("[Memoria Local] Funcionalidade de busca não implementada na simulação.");
  await new Promise(resolve => setTimeout(resolve, 10));
  return null;
}

module.exports = { adicionarMemoria, obterMemoria, buscarInformacaoMemoria }; 