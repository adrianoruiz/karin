const { StateGraph, END } = require("@langchain/langgraph");
const { RunnableLambda } = require("@langchain/core/runnables");
const { decidirAgente } = require("./gerente");
const { processarSolicitacaoNeusa } = require("./agentes/neusa");
const { processarSolicitacaoCarla } = require("./agentes/carla");
const { buscarNaMemoria } = require("./memoria");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// --- Definição do Estado do Grafo ---
const graphState = {
  userInput: { value: null },
  userId: { value: null },
  agente: { value: null }, // neusa, carla, desconhecido
  resposta: { value: null },
  erro: { value: null },
  conversationHistory: { value: [] },
};

// --- Nós do Grafo ---

// 1. Nó Gerente: Decide qual agente chamar
const nodeGerente = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Gerente (Adriano) ---");
    const agenteDesignado = await decidirAgente(state.userInput, state.userId);
    console.log(`Gerente decidiu encaminhar para: ${agenteDesignado}`);
    return { agente: agenteDesignado };
  },
}).withConfig({ runName: "nodeGerente" });

// 2. Nó Secretária (Neusa)
const nodeNeusa = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Secretária (Neusa) ---");
    try {
      // Busca histórico de conversa recente na memória para contexto
      const historico = state.conversationHistory || [];
      
      // Processa a solicitação através do agente Neusa
      const resultado = await processarSolicitacaoNeusa({
        userId: state.userId,
        userInput: state.userInput,
        conversationHistory: historico
      });
      
      if (resultado.success) {
        return { resposta: resultado.message };
      } else {
        return { 
          erro: resultado.error || "Erro ao processar solicitação na Neusa",
          resposta: resultado.message 
        };
      }
    } catch (error) {
      console.error("Erro no nó Neusa:", error);
      return { 
        erro: error.message, 
        resposta: "Desculpe, tive um problema ao processar sua solicitação. Por favor, tente novamente em alguns instantes." 
      };
    }
  },
}).withConfig({ runName: "nodeNeusa" });

// 3. Nó Financeiro (Carla)
const nodeCarla = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Financeiro (Carla) ---");
    try {
      // Busca histórico de conversa recente na memória para contexto
      const historico = state.conversationHistory || [];
      
      // Processa a solicitação através do agente Carla
      const resultado = await processarSolicitacaoCarla({
        userId: state.userId,
        userInput: state.userInput,
        conversationHistory: historico
      });
      
      if (resultado.success) {
        return { resposta: resultado.message };
      } else {
        return { 
          erro: resultado.error || "Erro ao processar solicitação na Carla",
          resposta: resultado.message 
        };
      }
    } catch (error) {
      console.error("Erro no nó Carla:", error);
      return { 
        erro: error.message, 
        resposta: "Desculpe, tive um problema ao processar informações financeiras. Por favor, tente novamente em alguns instantes." 
      };
    }
  },
}).withConfig({ runName: "nodeCarla" });

// 4. Nó Desconhecido (Fallback)
const nodeDesconhecido = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Desconhecido (Fallback) ---");
    try {
      // Tenta buscar algo relevante na memória com base no input do usuário
      let message = "Desculpe, não entendi sua solicitação. Posso ajudar com agendamentos de consulta ou informações sobre valores e pagamentos.";
      
      try {
        const memoriaResult = await buscarNaMemoria(state.userId, state.userInput);
        console.log("Resultado da busca na memória:", memoriaResult);
        
        // Se encontrar algo relevante na memória, adiciona à resposta
        if (memoriaResult && memoriaResult.length > 0 && memoriaResult[0].memory) {
          const memoriaRelevante = memoriaResult[0].memory;
          const ultimaRespostaAssistente = memoriaRelevante.findLast(m => m.role === 'assistant')?.content;
          
          if (ultimaRespostaAssistente) {
            message += ` Notei que falamos sobre algo parecido anteriormente. Talvez isso ajude: "${ultimaRespostaAssistente}"`;
          }
        }
      } catch (memoriaError) {
        console.error("Erro ao buscar na memória no nó desconhecido:", memoriaError);
      }
      
      return { resposta: message };
    } catch (error) {
      console.error("Erro no nó Desconhecido:", error);
      return { 
        erro: error.message, 
        resposta: "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente com uma pergunta sobre agendamentos ou valores." 
      };
    }
  },
}).withConfig({ runName: "nodeDesconhecido" });

// 5. Nó de Histórico - Busca histórico de conversa antes de qualquer processamento
const nodeHistorico = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Histórico (Carregando contexto) ---");
    try {
      // Busca histórico relevante na memória com base no input do usuário
      const memoriaResult = await buscarNaMemoria(state.userId, state.userInput);
      
      let historico = [];
      if (memoriaResult && memoriaResult.length > 0 && memoriaResult[0].memory) {
        // Limita a 5 pares de mensagens (10 mensagens no total) para não sobrecarregar o contexto
        historico = memoriaResult[0].memory.slice(-10);
        console.log(`Carregados ${historico.length} mensagens do histórico para contexto`);
      }
      
      return { conversationHistory: historico };
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      return { conversationHistory: [] }; // Retorna array vazio em caso de erro
    }
  },
}).withConfig({ runName: "nodeHistorico" });

// --- Lógica Condicional (Roteamento) ---
function router(state) {
  console.log("--- Roteador ---");
  console.log("Agente escolhido para roteamento:", state.agente);
  
  switch (state.agente) {
    case "neusa":
      return "processar_neusa";
    case "carla":
      return "processar_carla";
    case "desconhecido":
    default:
      return "processar_desconhecido";
  }
}

// --- Construção do Grafo ---
const workflow = new StateGraph({
  channels: graphState,
});

// Adiciona os nós
workflow.addNode("historico", nodeHistorico);
workflow.addNode("gerente", nodeGerente);
workflow.addNode("processar_neusa", nodeNeusa);
workflow.addNode("processar_carla", nodeCarla);
workflow.addNode("processar_desconhecido", nodeDesconhecido);

// Define o ponto de entrada e sequência inicial
workflow.setEntryPoint("historico");
workflow.addEdge("historico", "gerente");

// Adiciona as arestas condicionais após o gerente
workflow.addConditionalEdges(
  "gerente",     // Nó de origem
  router,        // Função de roteamento
  {
    "processar_neusa": "processar_neusa",
    "processar_carla": "processar_carla",
    "processar_desconhecido": "processar_desconhecido",
  }
);

// Adiciona arestas para o final (END)
workflow.addEdge("processar_neusa", END);
workflow.addEdge("processar_carla", END);
workflow.addEdge("processar_desconhecido", END);

// Compila o grafo
const app = workflow.compile();

// --- Função para Executar e Interagir ---
async function iniciarConversa() {
  console.log("\nBem-vindo ao Sistema Multiagente da Clínica da Dra. Karin Boldarini!");
  console.log("Digite sua solicitação (ou 'sair' para terminar):");

  const userId = `user_${Date.now()}`; // ID de usuário simples para teste
  console.log(`ID de usuário para esta sessão: ${userId}`);

  readline.prompt();

  readline.on("line", async (input) => {
    if (input.toLowerCase() === "sair") {
      readline.close();
      return;
    }

    console.log(`\nProcessando: "${input}"`);
    try {
      const initialState = { userInput: input, userId: userId };
      const finalState = await app.invoke(initialState);

      console.log("\n--- Resposta Final ---");
      if (finalState.erro) {
        console.error("Ocorreu um erro:", finalState.erro);
      }
      if (finalState.resposta) {
        console.log(finalState.resposta);
      } else {
        console.log("Não foi possível obter uma resposta clara.");
      }
    } catch (e) {
      console.error("\nErro crítico ao executar o grafo:", e);
    }

    console.log("\n--- Aguardando sua próxima mensagem ---");
    readline.prompt();
  }).on("close", () => {
    console.log("\nSessão encerrada. Até logo!");
    process.exit(0);
  });
}

// --- Inicialização ---
// Verifica se as chaves API estão presentes
if (!process.env.GEMINI_API_KEY) {
  console.warn("AVISO: GEMINI_API_KEY não definida no .env. O sistema pode não funcionar corretamente.");
}
if (!process.env.MEM0_API_KEY) {
  console.warn("AVISO: MEM0_API_KEY não definida no .env. A funcionalidade de memória não funcionará.");
}

iniciarConversa(); 