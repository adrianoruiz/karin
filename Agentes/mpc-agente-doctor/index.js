const OpenAI = require("openai");
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");
require("dotenv").config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Assistant configuration
const ASSISTANT_ID = "asst_yaiOoAWzskadn9xRSo8WgRym";

async function main() {
  try {
    // Connect to MCP server
    const client = await connectMCPClient();
    console.log("MCP client connected!");
    
    // Example usage
    await processUserRequest(
      client, 
      "Agende uma consulta para amanhã às 14h para o paciente João Silva"
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

async function connectMCPClient() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["server.js"]
  });

  const client = new Client(
    { name: "Cliente OpenAI", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  await client.connect(transport);
  return client;
}

async function processUserRequest(mcpClient, userInput) {
  try {
    // Create a thread with the user message
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userInput
    });

    // Start the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    });

    // Poll for completion and handle tool actions
    await handleRunCompletion(thread.id, run.id, mcpClient);
  } catch (error) {
    console.error("Error processing user request:", error);
  }
}

async function handleRunCompletion(threadId, runId, mcpClient) {
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  
  while (["queued", "in_progress", "requires_action"].includes(runStatus.status)) {
    if (runStatus.status === "requires_action") {
      await handleToolActions(threadId, runId, runStatus, mcpClient);
    }
    
    // Wait before checking again
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(`Run status: ${runStatus.status}`);
  }

  // Process final result
  if (runStatus.status === "completed") {
    await displayAssistantResponse(threadId);
  } else {
    console.log(`Run ended with status: ${runStatus.status}`);
    if (runStatus.last_error) {
      console.error("Run error:", runStatus.last_error);
    }
  }
}

async function handleToolActions(threadId, runId, runStatus, mcpClient) {
  const toolCalls = runStatus.required_action?.submit_tool_outputs?.tool_calls;
  if (!toolCalls || toolCalls.length === 0) return;

  const toolOutputs = [];

  for (const toolCall of toolCalls) {
    if (toolCall.function.name === "agendarConsulta") {
      try {
        const args = JSON.parse(toolCall.function.arguments);
        console.log(`Calling tool agendarConsulta with args: ${JSON.stringify(args)}`);
        
        const result = await mcpClient.callTool({
          name: "agendarConsulta",
          arguments: args
        });
        
        console.log(`Tool result: ${JSON.stringify(result)}`);
        toolOutputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify(result)
        });
      } catch (error) {
        console.error(`Error processing tool call ${toolCall.id}:`, error);
        toolOutputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify({ error: `Tool processing error: ${error.message}` })
        });
      }
    }
  }

  if (toolOutputs.length > 0) {
    await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
      tool_outputs: toolOutputs
    });
  }
}

async function displayAssistantResponse(threadId) {
  const messages = await openai.beta.threads.messages.list(threadId, { 
    order: 'asc' 
  });
  
  const lastMessage = messages.data.slice(-1)[0];
  
  if (lastMessage?.role === 'assistant' && lastMessage?.content[0]?.type === 'text') {
    console.log("Assistant response:", lastMessage.content[0].text.value);
  } else {
    console.log("Could not retrieve assistant's final response");
    console.log("Last message:", lastMessage);
  }
}

main();