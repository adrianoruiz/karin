const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");

// Criar o servidor MCP
const server = new McpServer({
  name: "Agendamento",
  version: "1.0.0"
});

// Definir o schema da ferramenta de agendamento
const agendamentoSchema = z.object({
  data: z.string(),
  hora: z.string(),
  paciente: z.string()
});

// Adicionar a ferramenta de agendamento
server.tool(
  "agendarConsulta",
  // agendamentoSchema, // Comentado para teste
  async ({ data, hora, paciente }) => {
    // Simula o agendamento (você pode adicionar lógica real aqui depois)
    console.log(`Agendando consulta para ${paciente} em ${data} às ${hora}`);
    return {
      content: [{ type: "text", text: "Consulta agendada com sucesso!" }]
    };
  }
);

// Conectar o servidor via stdio
const transport = new StdioServerTransport();
server.connect(transport).then(() => console.log("Servidor MCP rodando!"));