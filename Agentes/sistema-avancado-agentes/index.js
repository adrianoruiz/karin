const { StateGraph, END } = require("@langchain/langgraph");
const { RunnableLambda } = require("@langchain/core/runnables");
const { decidirAgente } = require("./gerente");
const { agendarConsulta } = require("./agentes/agendamento");
const { consultarPlano } = require("./agentes/planos");
const { verificarPagamento } = require("./agentes/pagamentos");
const { adicionarMemoria, obterMemoria, buscarInformacaoMemoria } = require("./memoria");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// --- Definição do Estado do Grafo ---
const graphState = {
  userInput: { value: null },
  userId: { value: null },
  decisao: { value: null }, // agendamento, planos, pagamentos, desconhecido
  dadosAgente: { value: null }, // Dados extraídos para o agente
  resultadoAgente: { value: null },
  erro: { value: null },
};

// --- Nós do Grafo ---

// 1. Nó Gerente: Decide qual agente chamar
const nodeGerente = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Gerente ---");
    const decisao = await decidirAgente(state.userInput);
    // TODO: Adicionar lógica para extrair dados relevantes para o agente (e.g., data, hora, nome)
    // Por enquanto, passamos null
    return { decisao: decisao, dadosAgente: null };
  },
}).withConfig({ runName: "nodeGerente" });

// 2. Nó Agente de Agendamento
const nodeAgendamento = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Agendamento ---");
    try {
      // Tenta obter paciente da memória, senão usa um padrão ou extrai do input
      let paciente = await obterMemoria(state.userId, "paciente");
      // TODO: Extrair data e hora do state.userInput ou state.dadosAgente
      const data = "2024-07-20"; // Placeholder
      const hora = "10:00"; // Placeholder
      if (!paciente) {
          // Tentar extrair o nome do paciente do userInput se não estiver na memória
          // Exemplo simples: (precisa de lógica mais robusta de extração)
          const match = state.userInput.match(/para (o|a) paciente (.+?)(?: em| às| amanhã|$)/i);
          paciente = match ? match[2].trim() : "Cliente Padrão";
          console.log(`Paciente não encontrado na memória, extraído/padrão: ${paciente}`);
      }

      const result = await agendarConsulta({ data, hora, paciente });
      if (result.success) {
        await adicionarMemoria(state.userId, "ultimo_agendamento_status", "sucesso");
        await adicionarMemoria(state.userId, "paciente", paciente); // Guarda/atualiza paciente na memória
      } else {
        await adicionarMemoria(state.userId, "ultimo_agendamento_status", "falha");
      }
      return { resultadoAgente: result };
    } catch (error) {
      console.error("Erro no nó de agendamento:", error);
      return { erro: error.message, resultadoAgente: { success: false, message: "Erro interno no agendamento." } };
    }
  },
}).withConfig({ runName: "nodeAgendamento" });

// 3. Nó Agente de Planos
const nodePlanos = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Planos ---");
    try {
      // TODO: Extrair tipo de plano do state.userInput ou state.dadosAgente
      const tipo = "premium"; // Placeholder
      const result = await consultarPlano({ tipo });
      return { resultadoAgente: result };
    } catch (error) {
      console.error("Erro no nó de planos:", error);
      return { erro: error.message, resultadoAgente: { success: false, message: "Erro interno na consulta de planos." } };
    }
  },
}).withConfig({ runName: "nodePlanos" });

// 4. Nó Agente de Pagamentos
const nodePagamentos = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Pagamentos ---");
    try {
      // Tenta obter paciente da memória, senão usa um padrão ou extrai
      let paciente = await obterMemoria(state.userId, "paciente");
       if (!paciente) {
          const match = state.userInput.match(/(?:pagamento|situação) d[eo] (.+?)(?: está|$)/i);
          paciente = match ? match[1].trim() : "Cliente Padrão";
          console.log(`Paciente não encontrado na memória, extraído/padrão: ${paciente}`);
      }
      const result = await verificarPagamento({ paciente });
       if (result.success) {
        await adicionarMemoria(state.userId, "paciente", paciente); // Guarda/atualiza paciente na memória
      }
      return { resultadoAgente: result };
    } catch (error) {
      console.error("Erro no nó de pagamentos:", error);
      return { erro: error.message, resultadoAgente: { success: false, message: "Erro interno na verificação de pagamentos." } };
    }
  },
}).withConfig({ runName: "nodePagamentos" });

// 5. Nó de Resposta Desconhecida/Fallback
const nodeDesconhecido = new RunnableLambda({
  func: async (state) => {
    console.log("--- Nó Desconhecido ---");
    // Tenta buscar algo relevante na memória com base no input do usuário
    const infoMemoria = await buscarInformacaoMemoria(state.userId, state.userInput);
    let message = "Desculpe, não entendi sua solicitação.";
    if (infoMemoria) {
      // Formata a informação da memória para a resposta (exemplo simples)
      message += ` Lembrei que falamos sobre: ${JSON.stringify(infoMemoria)}. Isso ajuda?`;
    }
    return { resultadoAgente: { success: false, message: message } };
  },
}).withConfig({ runName: "nodeDesconhecido" });


// --- Lógica Condicional (Roteamento) ---
function router(state) {
  console.log("--- Roteador ---");
  console.log("Decisão para roteamento:", state.decisao);
  switch (state.decisao) {
    case "agendamento":
      return "executar_agendamento";
    case "planos":
      return "executar_planos";
    case "pagamentos":
      return "executar_pagamentos";
    case "desconhecido":
    default:
      return "responder_desconhecido";
  }
}

// --- Construção do Grafo ---
const workflow = new StateGraph({
  channels: graphState,
});

// Adiciona os nós
workflow.addNode("gerente", nodeGerente);
workflow.addNode("executar_agendamento", nodeAgendamento);
workflow.addNode("executar_planos", nodePlanos);
workflow.addNode("executar_pagamentos", nodePagamentos);
workflow.addNode("responder_desconhecido", nodeDesconhecido);

// Define o ponto de entrada
workflow.setEntryPoint("gerente");

// Adiciona as arestas condicionais
workflow.addConditionalEdges(
  "gerente", // Nó de origem
  router,    // Função de roteamento
  {
    "executar_agendamento": "executar_agendamento",
    "executar_planos": "executar_planos",
    "executar_pagamentos": "executar_pagamentos",
    "responder_desconhecido": "responder_desconhecido",
  }
);

// Adiciona arestas para o final (END)
workflow.addEdge("executar_agendamento", END);
workflow.addEdge("executar_planos", END);
workflow.addEdge("executar_pagamentos", END);
workflow.addEdge("responder_desconhecido", END);

// Compila o grafo
const app = workflow.compile();

// --- Função para Executar e Interagir ---
async function iniciarConversa() {
  console.log("\nBem-vindo ao Sistema Avançado de Agentes!");
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

      console.log("\n--- Resultado Final ---");
      if (finalState.erro) {
        console.error("Ocorreu um erro:", finalState.erro);
      }
      if (finalState.resultadoAgente) {
        console.log("Resposta:", finalState.resultadoAgente.message);
        if (finalState.resultadoAgente.errors) {
           console.warn("Detalhes da validação:", finalState.resultadoAgente.errors);
        }
      } else {
        console.log("Não foi possível obter um resultado final claro.");
      }
    } catch (e) {
      console.error("\nErro crítico ao executar o grafo:", e);
    }

    readline.prompt();
  }).on("close", () => {
    console.log("\nSessão encerrada. Até logo!");
    process.exit(0);
  });
}

// --- Inicialização ---
// Verifica se as chaves API estão presentes
if (!process.env.GEMINI_API_KEY) {
  console.warn("AVISO: GEMINI_API_KEY não definida no .env. O gerente pode não funcionar corretamente.");
}
if (!process.env.MEM0_API_KEY) {
  console.warn("AVISO: MEM0_API_KEY não definida no .env. A memória não funcionará.");
}

iniciarConversa(); 