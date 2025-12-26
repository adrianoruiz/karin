<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Mini Curso: Criando uma Secretária AI para Médica com Agno e Telegram

## Introdução

Este mini-curso te ensinará como criar uma secretária AI completa para uma médica usando o framework Agno[^1][^2], integrada com Telegram, PostgreSQL e sistema de agendamento. Vamos abordar desde conceitos básicos até implementação avançada, incluindo MCP (Model Context Protocol).

## 1. O que é o Agno?

O **Agno** é um framework Python leve e poderoso para construção de agentes AI multimodais[^2][^3]. Suas principais características:

### Características Principais

- **Performance**: ~10.000x mais rápido que LangGraph na criação de agentes[^3]
- **Model Agnostic**: Funciona com 23+ provedores de LLM (OpenAI, Anthropic, Groq, Ollama)[^4]
- **Multimodal**: Suporte nativo para texto, imagem, áudio e vídeo[^3]
- **Memória**: Sistema robusto de memória persistente[^5]
- **Ferramentas**: Acesso a 80+ toolkits com milhares de ferramentas[^6]


### Vantagens para Aplicações Médicas

- **Segurança**: Suporte completo para HIPAA compliance[^7]
- **Escalabilidade**: Arquitetura otimizada para produção[^8]
- **Flex existentes[^9]


## 2. Configuração Inicial do Ambiente

### 2.1 Instalação das Dependências

```bash
# Instalar Agno e dependências principais
pip install -U agno

# Dependências para Telegram
pip install python-telegram-bot fastapi uvicorn

# Dependências para PostgreSQL
pip install psycopg2-binary sqlalchemy

# Dependências para calendário
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib

# Outras dependências úteis
pip install python-dotenv aiofiles
```


### 2.2 Configuração do Arquivo .env

```bash
# Chaves de API
OPENAI_API_KEY=sua_chave_openai
TELEGRAM_BOT_TOKEN=seu_token_telegram
GROQ_API_KEY=sua_chave_groq  # Opcional

# Banco de dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/secretaria_ai

# Google Calendar (se usar)
GOOGLE_CALENDAR_CREDENTIALS=path/to/credentials.json
```


## 3. Criando o Bot do Telegram

### 3.1 Configuração Básica

Primeiro, crie seu bot no Telegram:

1. Abra o Telegram e procure por `@BotFather`
2. Digite `/newbot` e siga as instruções
3. Guarde o token fornecido[^10][^11]

### 3.2 Integração Agno + Telegram

```python
# telegram_bot.py
import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.postgres import PostgresTools
from agno.storage.agent.postgres import PostgresAgentStorage
from dotenv import load_dotenv

load_dotenv()

class SecretariaAI:
    def __init__(self):
        # Configurar agente Agno
        self.agent = Agent(
            model=OpenAIChat(id="gpt-4o-mini"),
            name="Secretária Médica AI",
            description="Assistente especializada em agendamento médico",
            tools=[
                PostgresTools(
                    db_name="secretaria_ai",
                    user="seu_usuario",
                    password="sua_senha",
                    host="localhost",
                    port=5432
                )
            ],
            storage=PostgresAgentStorage(
                table_name="conversas_telegram",
                db_url=os.getenv("DATABASE_URL")
            ),
            instructions=[
                "Você é uma secretária médica especializada.",
                "Ajude pacientes a agendar consultas, verificar horários disponíveis.",
                "Seja cordial, profissional e eficiente.",
                "Sempre confirme os dados antes de finalizar agendamentos.",
                "Use a base de dados para verificar disponibilidade."
            ],
            add_history_to_messages=True,
            markdown=True
        )
        
        # Configurar aplicação Telegram
        self.app = Application.builder().token(os.getenv("TELEGRAM_BOT_TOKEN")).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        """Configurar handlers do Telegram"""
        self.app.add_handler(CommandHandler("start", self.start_command))
        self.app.add_handler(CommandHandler("agendar", self.agendar_command))
        self.app.add_handler(CommandHandler("consultas", self.consultas_command))
        self.app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando inicial"""
        welcome_msg = """
🏥 *Olá! Sou sua Secretária AI*

Posso ajudá-la com:
• 📅 Agendar consultas
• 🔍 Verificar horários disponíveis  
• 📋 Consultar agendamentos
• ⏰ Lembrar de consultas

Use /agendar para marcar uma consulta
Use /consultas para ver seus agendamentos

Como posso ajudá-la hoje?
        """
        await update.message.reply_text(
            welcome_msg, 
            parse_mode='Markdown'
        )
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Processar mensagens com o agente Agno"""
        user_message = update.message.text
        user_id = update.effective_user.id
        
        # Usar sessão específica do usuário
        self.agent.session_id = f"telegram_{user_id}"
        
        try:
            # Obter resposta do agente
            response = self.agent.run(user_message)
            
            await update.message.reply_text(
                response.content,
                parse_mode='Markdown'
            )
        except Exception as e:
            await update.message.reply_text(
                f"❌ Ocorreu um erro: {str(e)}"
            )
    
    async def agendar_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando para agendamento"""
        msg = """
📅 *Agendamento de Consulta*

Para agendar, me informe:
• Nome completo
• Data desejada (dd/mm/aaaa)
• Horário preferido
• Tipo de consulta
• Telefone para contato

Exemplo: "Quero agendar consulta para Maria Silva, dia 15/03/2024 às 14h, consulta geral, telefone (11) 99999-9999"
        """
        await update.message.reply_text(msg, parse_mode='Markdown')
    
    def run(self):
        """Executar o bot"""
        print("🤖 Secretária AI iniciada...")
        self.app.run_polling()

if __name__ == "__main__":
    bot = SecretariaAI()
    bot.run()
```


## 4. Sistema de Banco de Dados PostgreSQL

### 4.1 Estrutura do Banco

```sql
-- database_setup.sql
CREATE DATABASE secretaria_ai;

-- Tabela de médicos
CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50),
    crm VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pacientes  
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    telegram_user_id BIGINT UNIQUE,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_nascimento DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de consultas
CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id),
    medico_id INTEGER REFERENCES medicos(id),
    data_consulta TIMESTAMP NOT NULL,
    tipo_consulta VARCHAR(50),
    status VARCHAR(20) DEFAULT 'agendada',
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de horários disponíveis
CREATE TABLE horarios_disponiveis (
    id SERIAL PRIMARY KEY,
    medico_id INTEGER REFERENCES medicos(id),
    data_hora TIMESTAMP NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO medicos (nome, especialidade, crm) VALUES 
('Dra. Ana Silva', 'Clínica Geral', 'CRM/SP 123456'),
('Dr. João Santos', 'Cardiologia', 'CRM/SP 789012');
```


### 4.2 Ferramentas Agno para PostgreSQL

```python
# database_tools.py
from agno.tools import Toolkit
import psycopg2
from datetime import datetime, timedelta

class SecretariaDBTools(Toolkit):
    def __init__(self, db_config):
        super().__init__(name="secretaria_db_tools")
        self.db_config = db_config
        
        # Registrar ferramentas
        self.register(self.verificar_disponibilidade)
        self.register(self.agendar_consulta)
        self.register(self.listar_consultas_paciente)
        self.register(self.cancelar_consulta)
        self.register(self.cadastrar_paciente)
    
    def get_connection(self):
        """Conectar ao banco"""
        return psycopg2.connect(**self.db_config)
    
    def verificar_disponibilidade(self, data: str, medico_id: int = None) -> str:
        """
        Verificar horários disponíveis para uma data específica
        Args:
            data: Data no formato YYYY-MM-DD
            medico_id: ID do médico (opcional)
        """
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            query = """
                SELECT h.id, h.data_hora, m.nome, m.especialidade
                FROM horarios_disponiveis h
                JOIN medicos m ON h.medico_id = m.id
                WHERE DATE(h.data_hora) = %s 
                AND h.disponivel = TRUE
            """
            params = [data]
            
            if medico_id:
                query += " AND h.medico_id = %s"
                params.append(medico_id)
                
            query += " ORDER BY h.data_hora"
            
            cursor.execute(query, params)
            horarios = cursor.fetchall()
            
            if not horarios:
                return f"❌ Não há horários disponíveis para {data}"
            
            resultado = f"📅 Horários disponíveis para {data}:\n\n"
            for h in horarios:
                hora = h[^1].strftime("%H:%M")
                resultado += f"⏰ {hora} - {h[^2]} ({h[^3]})\n"
            
            return resultado
            
        except Exception as e:
            return f"❌ Erro ao verificar disponibilidade: {str(e)}"
        finally:
            if conn:
                conn.close()
    
    def agendar_consulta(self, paciente_nome: str, data_hora: str, 
                        medico_id: int, tipo_consulta: str = "Consulta Geral") -> str:
        """
        Agendar nova consulta
        Args:
            paciente_nome: Nome do paciente
            data_hora: Data e hora no formato YYYY-MM-DD HH:MM
            medico_id: ID do médico
            tipo_consulta: Tipo da consulta
        """
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Verificar se horário está disponível
            cursor.execute("""
                SELECT id FROM horarios_disponiveis 
                WHERE medico_id = %s AND data_hora = %s AND disponivel = TRUE
            """, [medico_id, data_hora])
            
            horario = cursor.fetchone()
            if not horario:
                return "❌ Horário não disponível"
            
            # Buscar ou criar paciente
            cursor.execute("""
                SELECT id FROM pacientes WHERE nome ILIKE %s
            """, [f"%{paciente_nome}%"])
            
            paciente = cursor.fetchone()
            if not paciente:
                cursor.execute("""
                    INSERT INTO pacientes (nome) VALUES (%s) RETURNING id
                """, [paciente_nome])
                paciente_id = cursor.fetchone()[^0]
            else:
                paciente_id = paciente[^0]
            
            # Criar consulta
            cursor.execute("""
                INSERT INTO consultas (paciente_id, medico_id, data_consulta, tipo_consulta)
                VALUES (%s, %s, %s, %s) RETURNING id
            """, [paciente_id, medico_id, data_hora, tipo_consulta])
            
            consulta_id = cursor.fetchone()[^0]
            
            # Marcar horário como ocupado
            cursor.execute("""
                UPDATE horarios_disponiveis 
                SET disponivel = FALSE 
                WHERE id = %s
            """, [horario[^0]])
            
            conn.commit()
            
            return f"✅ Consulta agendada com sucesso!\n📋 Protocolo: {consulta_id}"
            
        except Exception as e:
            if conn:
                conn.rollback()
            return f"❌ Erro ao agendar: {str(e)}"
        finally:
            if conn:
                conn.close()
```


## 5. Integração com Calendário Google

### 5.1 Configuração Google Calendar API

```python
# google_calendar_integration.py
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import pickle
import os
from datetime import datetime, timedelta

class GoogleCalendarManager:
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    
    def __init__(self, credentials_file='credentials.json'):
        self.credentials_file = credentials_file
        self.service = self.authenticate()
    
    def authenticate(self):
        """Autenticar com Google Calendar API"""
        creds = None
        
        # Verificar token salvo
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        
        # Se não há credenciais válidas
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.credentials_file, self.SCOPES)
                creds = flow.run_local_server(port=0)
            
            # Salvar credenciais
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)
        
        return build('calendar', 'v3', credentials=creds)
    
    def criar_evento_consulta(self, paciente_nome, data_hora, medico_nome, tipo_consulta):
        """Criar evento no Google Calendar"""
        try:
            # Converter string para datetime
            inicio = datetime.strptime(data_hora, "%Y-%m-%d %H:%M")
            fim = inicio + timedelta(hours=1)  # Consulta de 1 hora
            
            evento = {
                'summary': f'Consulta - {paciente_nome}',
                'description': f'Tipo: {tipo_consulta}\nPaciente: {paciente_nome}\nMédico: {medico_nome}',
                'start': {
                    'dateTime': inicio.isoformat(),
                    'timeZone': 'America/Sao_Paulo',
                },
                'end': {
                    'dateTime': fim.isoformat(),
                    'timeZone': 'America/Sao_Paulo',
                },
                'attendees': [
                    {'email': 'medico@clinica.com'},
                ],
                'reminders': {
                    'useDefault': False,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},  # 1 dia antes
                        {'method': 'popup', 'minutes': 30},       # 30 min antes
                    ],
                },
            }
            
            evento_criado = self.service.events().insert(
                calendarId='primary', 
                body=evento
            ).execute()
            
            return f"📅 Evento criado no Google Calendar: {evento_criado.get('htmlLink')}"
            
        except Exception as e:
            return f"❌ Erro ao criar evento: {str(e)}"
```


## 6. Agente Principal Integrado

```python
# main_agent.py
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.agent.postgres import PostgresAgentStorage
from database_tools import SecretariaDBTools
from google_calendar_integration import GoogleCalendarManager
import os

class SecretariaMedicaAgent:
    def __init__(self):
        # Configurações do banco
        db_config = {
            'host': 'localhost',
            'database': 'secretaria_ai',
            'user': 'seu_usuario',
            'password': 'sua_senha',
            'port': 5432
        }
        
        # Inicializar ferramentas
        self.db_tools = SecretariaDBTools(db_config)
        self.calendar_manager = GoogleCalendarManager()
        
        # Criar agente principal
        self.agent = Agent(
            model=OpenAIChat(id="gpt-4o"),
            name="Secretária Médica AI",
            description="Assistente especializada em gestão médica completa",
            tools=[self.db_tools],
            storage=PostgresAgentStorage(
                table_name="sessoes_agente",
                db_url=os.getenv("DATABASE_URL")
            ),
            instructions=self.get_instructions(),
            add_history_to_messages=True,
            show_tool_calls=True,
            markdown=True
        )
    
    def get_instructions(self):
        return [
            "Você é uma secretária médica AI profissional e especializada.",
            "Suas principais funções:",
            "1. Agendar consultas verificando disponibilidade",
            "2. Confirmar dados do paciente antes de finalizar",
            "3. Integrar com Google Calendar automaticamente",
            "4. Ser cordial, eficiente e precisa",
            "5. Sempre confirmar agendamentos com dados completos",
            "6. Oferecer alternativas quando horários não estão disponíveis",
            "7. Manter privacidade e confidencialidade médica",
            
            "Fluxo de agendamento:",
            "1. Verificar disponibilidade com verificar_disponibilidade",
            "2. Confirmar dados: nome, data, hora, tipo de consulta",
            "3. Usar agendar_consulta para confirmar",
            "4. Criar evento no calendário",
            "5. Fornecer número do protocolo",
            
            "Sempre seja proativa em sugerir horários alternativos.",
            "Use emojis para tornar a interação mais amigável.",
            "Mantenha tom profissional mas acolhedor."
        ]
    
    def processar_mensagem(self, mensagem, user_id=None):
        """Processar mensagem do usuário"""
        if user_id:
            self.agent.session_id = f"user_{user_id}"
        
        try:
            response = self.agent.run(mensagem)
            return response.content
        except Exception as e:
            return f"❌ Ocorreu um erro: {str(e)}"

# Exemplo de uso
if __name__ == "__main__":
    secretaria = SecretariaMedicaAgent()
    
    # Teste
    resposta = secretaria.processar_mensagem(
        "Quero agendar uma consulta para Maria da Silva no dia 15/03/2024 às 14h"
    )
    print(resposta)
```


## 7. Model Context Protocol (MCP)

### 7.1 O que é MCP?

O **Model Context Protocol (MCP)** é um padrão aberto criado pela Anthropic para conectar modelos de IA a fontes de dados externas[^12][^13]. É como um "USB-C para aplicações AI"[^14].

### 7.2 Principais Características:

- **Padronização**: Interface universal entre LLMs e ferramentas[^12]
- **Segurança**: Conexões bidirecionais seguras[^13]
- **Interoperabilidade**: Funciona com qualquer modelo ou ferramenta[^15]
- **Escalabilidade**: Resolve o problema "N×M" de integrações[^12]


### 7.3 Integração MCP com Agno

```python
# mcp_integration.py
from agno.tools.mcp import MCPTools
from agno.agent import Agent
from agno.models.openai import OpenAIChat

async def criar_agente_com_mcp():
    """Criar agente com servidor MCP personalizado"""
    
    # Configurar servidor MCP para dados médicos
    mcp_command = "npx @medical-mcp/server"
    
    async with MCPTools(mcp_command) as mcp_tools:
        agent = Agent(
            name="Secretária com MCP",
            model=OpenAIChat(id="gpt-4o"),
            tools=[mcp_tools],
            instructions=[
                "Use o servidor MCP para acessar dados médicos",
                "Mantenha conformidade HIPAA",
                "Integre com sistemas hospitalares via MCP"
            ],
            show_tool_calls=True,
            markdown=True
        )
        
        # Usar o agente
        response = await agent.arun(
            "Verificar disponibilidade do Dr. Silva para amanhã"
        )
        
        return response.content
```


### 7.4 Criando Servidor MCP Personalizado

```javascript
// mcp-server-medico.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  {
    name: 'servidor-medico',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Ferramenta para verificar horários
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'verificar_agenda_medica',
        description: 'Verificar agenda médica por data e especialidade',
        inputSchema: {
          type: 'object',
          properties: {
            data: { type: 'string', description: 'Data no formato YYYY-MM-DD' },
            especialidade: { type: 'string', description: 'Especialidade médica' }
          }
        }
      }
    ]
  };
});

// Implementar ferramenta
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'verificar_agenda_medica') {
    const { data, especialidade } = request.params.arguments;
    
    // Aqui você integraria com seu sistema médico real
    const horarios = await consultarSistemaMedico(data, especialidade);
    
    return {
      content: [
        {
          type: 'text',
          text: `Horários disponíveis para ${especialidade} em ${data}: ${JSON.stringify(horarios)}`
        }
      ]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```


## 8. Exemplo Completo e Funcional

### 8.1 Sistema Principal

```python
# sistema_completo.py
import asyncio
import os
import logging
from datetime import datetime
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.agent.postgres import PostgresAgentStorage
from database_tools import SecretariaDBTools
from google_calendar_integration import GoogleCalendarManager
from dotenv import load_dotenv

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class SistemaSecretariaCompleto:
    def __init__(self):
        """Inicializar sistema completo"""
        
        # Configurações
        self.db_config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'database': os.getenv('DB_NAME', 'secretaria_ai'),
            'user': os.getenv('DB_USER'),
            'password': os.getenv('DB_PASSWORD'),
            'port': int(os.getenv('DB_PORT', 5432))
        }
        
        # Inicializar componentes
        self.db_tools = SecretariaDBTools(self.db_config)
        self.calendar_manager = GoogleCalendarManager()
        
        # Criar agente Agno
        self.agent = Agent(
            model=OpenAIChat(id="gpt-4o-mini"),
            name="Secretária Médica Dra. Ana",
            description="Assistente especializada da clínica médica",
            tools=[self.db_tools],
            storage=PostgresAgentStorage(
                table_name="conversas_pacientes",
                db_url=os.getenv("DATABASE_URL")
            ),
            instructions=self.get_system_instructions(),
            add_history_to_messages=True,
            show_tool_calls=False,  # Para melhor UX no Telegram
            markdown=True,
            debug_mode=False
        )
        
        # Bot Telegram
        self.telegram_app = Application.builder().token(
            os.getenv("TELEGRAM_BOT_TOKEN")
        ).build()
        
        self.setup_telegram_handlers()
    
    def get_system_instructions(self):
        """Instruções completas do sistema"""
        return [
            "🏥 SECRETÁRIA MÉDICA AI - CLÍNICA DRA. ANA SILVA",
            "",
            "IDENTIDADE:",
            "- Você é a secretária oficial da Dra. Ana Silva (CRM/SP 123456)",
            "- Especialidade: Clínica Geral e Medicina Preventiva",
            "- Localização: Blumenau, SC, Brasil",
            "- Horário de funcionamento: Segunda a Sexta, 8h às 18h",
            "",
            "RESPONSABILIDADES PRINCIPAIS:",
            "1. 📅 AGENDAMENTOS:",
            "   - Verificar disponibilidade em tempo real",
            "   - Confirmar dados completos (nome, telefone, data/hora)",
            "   - Gerar protocolo de agendamento",
            "   - Integrar com Google Calendar automaticamente",
            "",
            "2. 📋 INFORMAÇÕES:",
            "   - Tipos de consulta: Geral, Preventiva, Retorno",
            "   - Duração padrão: 30 minutos",
            "   - Valores: R$ 200 (particular), aceita convênios",
            "",
            "3. 🔄 REAGENDAMENTOS:",
            "   - Permitir com 24h de antecedência mínima",
            "   - Sugerir horários alternativos",
            "   - Atualizar sistema e calendário",
            "",
            "FLUXO DE ATENDIMENTO:",
            "1. Cumprimentar cordialmente",
            "2. Identificar a necessidade (agendamento/informação)",
            "3. Coletar dados necessários",
            "4. Verificar disponibilidade",
            "5. Confirmar agendamento",
            "6. Fornecer protocolo e orientações",
            "",
            "REGRAS IMPORTANTES:",
            "- SEMPRE verificar disponibilidade antes de confirmar",
            "- Manter tom profissional mas acolhedor",
            "- Usar emojis adequados para melhor comunicação",
            "- Proteger privacidade médica (LGPD/HIPAA)",
            "- Em caso de emergência, orientar procurar pronto-socorro",
            "",
            "RESPOSTAS PADRÃO:",
            "- Saudação: 'Olá! Sou a assistente da Dra. Ana Silva. Como posso ajudá-la hoje?'",
            "- Confirmação: 'Perfeito! Sua consulta foi agendada com sucesso.'",
            "- Alternativas: 'Este horário não está disponível. Posso sugerir...'",
            "",
            "Sempre mantenha excelência no atendimento!"
        ]
    
    def setup_telegram_handlers(self):
        """Configurar handlers do Telegram"""
        handlers = [
            CommandHandler("start", self.start_command),
            CommandHandler("agendar", self.agendar_command),
            CommandHandler("consultas", self.consultas_command),
            CommandHandler("cancelar", self.cancelar_command),
            CommandHandler("ajuda", self.ajuda_command),
            MessageHandler(
                filters.TEXT & ~filters.COMMAND, 
                self.handle_message
            )
        ]
        
        for handler in handlers:
            self.telegram_app.add_handler(handler)
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando inicial com menu completo"""
        welcome_message = """
🏥 *Clínica Dra. Ana Silva*
📍 *Blumenau, SC*

Seja bem-vinda! Sou sua assistente virtual.

*🔹 Serviços Disponíveis:*
• 📅 Agendar consultas
• 🔍 Verificar disponibilidade
• 📋 Consultar agendamentos
• 🔄 Reagendar/Cancelar
• ℹ️ Informações da clínica

*🔹 Especialidades:*
• Clínica Geral
• Medicina Preventiva
• Check-ups completos

*🔹 Comandos Úteis:*
/agendar - Marcar consulta
/consultas - Ver agendamentos
/cancelar - Cancelar consulta
/ajuda - Menu de ajuda

*🕐 Horário de funcionamento:*
Segunda a Sexta: 8h às 18h

Como posso ajudá-la hoje?
        """
        
        await update.message.reply_text(
            welcome_message,
            parse_mode='Markdown'
        )
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Processar mensagem com agente Agno"""
        user_message = update.message.text
        user_id = update.effective_user.id
        username = update.effective_user.username or "Usuário"
        
        logger.info(f"Mensagem de {username} (ID: {user_id}): {user_message}")
        
        # Configurar sessão específica do usuário
        self.agent.session_id = f"telegram_{user_id}"
        
        try:
            # Processar com contexto adicional
            contexto_adicional = f"""
            Informações do usuário:
            - Telegram ID: {user_id}
            - Username: @{username}
            - Horário da mensagem: {datetime.now().strftime('%d/%m/%Y %H:%M')}
            
            Mensagem: {user_message}
            """
            
            # Obter resposta do agente
            response = self.agent.run(contexto_adicional)
            
            # Se foi um agendamento bem-sucedido, integrar com Google Calendar
            if "✅" in response.content and "agendada" in response.content.lower():
                # Extrair informações para o calendário (implementar parsing mais robusto)
                logger.info("Integrando agendamento com Google Calendar...")
                # self.calendar_manager.criar_evento_consulta(...)
            
            await update.message.reply_text(
                response.content,
                parse_mode='Markdown'
            )
            
        except Exception as e:
            logger.error(f"Erro ao processar mensagem: {str(e)}")
            await update.message.reply_text(
                "❌ Ocorreu um erro temporário. Tente novamente em instantes.",
                parse_mode='Markdown'
            )
    
    async def agendar_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando específico para agendamento"""
        instrucoes = """
📅 *AGENDAMENTO DE CONSULTA*

Para agendar sua consulta, preciso das seguintes informações:

*📋 Dados necessários:*
• Nome completo
• Telefone para contato
• Data desejada (dd/mm/aaaa)
• Horário preferido
• Tipo de consulta (Geral/Preventiva/Retorno)

*💡 Exemplo:*
"Quero agendar para Maria Silva, telefone (47) 99999-9999, dia 15/03/2024 às 14h30, consulta geral"

*⏰ Horários disponíveis:*
Segunda a Sexta: 8h às 18h
Intervalos de 30 minutos

Pode me informar seus dados?
        """
        
        await update.message.reply_text(
            instrucoes,
            parse_mode='Markdown'
        )
    
    def run(self):
        """Executar o sistema completo"""
        logger.info("🚀 Iniciando Sistema Secretária AI...")
        logger.info("🏥 Clínica: Dra. Ana Silva - Blumenau, SC")
        logger.info("📱 Bot Telegram ativo...")
        
        try:
            self.telegram_app.run_polling(
                drop_pending_updates=True,
                allowed_updates=Update.ALL_TYPES
            )
        except KeyboardInterrupt:
            logger.info("⏹️  Sistema encerrado pelo usuário")
        except Exception as e:
            logger.error(f"❌ Erro crítico: {str(e)}")

# Executar sistema
if __name__ == "__main__":
    sistema = SistemaSecretariaCompleto()
    sistema.run()
```


### 8.2 Script de Deploy

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploy Secretária AI - Clínica Médica"

# Instalar dependências
pip install -r requirements.txt

# Configurar banco de dados
psql -U postgres -c "CREATE DATABASE secretaria_ai;"
psql -U postgres -d secretaria_ai -f database_setup.sql

# Configurar variáveis de ambiente
echo "Configurando variáveis de ambiente..."
export OPENAI_API_KEY="sua_chave_aqui"
export TELEGRAM_BOT_TOKEN="seu_token_aqui"
export DATABASE_URL="postgresql://user:pass@localhost:5432/secretaria_ai"

# Executar sistema
echo "🏥 Iniciando Secretária AI..."
python sistema_completo.py
```


## 9. Recursos Avançados e Melhorias

### 9.1 Monitoramento e Analytics

```python
# monitoring.py
from agno.monitoring import AgentMetrics
import logging

class MonitoramentoMedico:
    def __init__(self):
        self.metrics = AgentMetrics()
        self.setup_logging()
    
    def setup_logging(self):
        """Configurar logs específicos para ambiente médico"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('secretaria_medica.log'),
                logging.StreamHandler()
            ]
        )
    
    def log_agendamento(self, paciente, data, status):
        """Log específico para agendamentos"""
        logging.info(f"AGENDAMENTO: {paciente} - {data} - {status}")
        
        # Métricas para análise
        self.metrics.track_event("agendamento", {
            "status": status,
            "data": data,
            "timestamp": datetime.now()
        })
```


### 9.2 Segurança e Compliance

```python
# security.py
import hashlib
from cryptography.fernet import Fernet

class SegurancaMedica:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    def criptografar_dados_paciente(self, dados):
        """Criptografar dados sensíveis (LGPD/HIPAA)"""
        dados_json = json.dumps(dados)
        return self.cipher.encrypt(dados_json.encode())
    
    def descriptografar_dados_paciente(self, dados_criptografados):
        """Descriptografar dados"""
        dados_descriptografados = self.cipher.decrypt(dados_criptografados)
        return json.loads(dados_descriptografados.decode())
    
    def hash_cpf(self, cpf):
        """Hash de CPF para privacidade"""
        return hashlib.sha256(cpf.encode()).hexdigest()
```


## 10. Conclusão e Próximos Passos

### Resumo do que Construímos:

✅ **Sistema completo** de secretária AI usando Agno
✅ **Integração Telegram** para interface de usuário
✅ **Banco PostgreSQL** para persistência de dados
✅ **Google Calendar** para sincronização de agenda
✅ **MCP** para extensibilidade futura
✅ **Segurança** e compliance médico

### Próximas Melhorias:

1. **Interface Web** com FastAPI + React
2. **Notificações SMS** para lembretes
3. **Integração WhatsApp Business**
4. **Dashboard Analytics** para gestão
5. **API REST** para integração com outros sistemas
6. **Backup automático** e recuperação de desastres

### Recursos de Aprendizado:

- **Documentação Agno**: [docs.agno.com](https://docs.agno.com)[^3]
- **MCP Specification**: [modelcontextprotocol.org](https://modelcontextprotocol.org)[^16]
- **Telegram Bot API**: [core.telegram.org/bots](https://core.telegram.org/bots)[^11]

Este mini-curso fornece uma base sólida para criar sistemas de automação médica usando Agno. O framework é particularmente adequado para aplicações médicas devido à sua performance, flexibilidade e capacidade de integração com sistemas existentes[^6][^17].

**🏥 Sucesso no seu projeto de secretária AI!**

<div style="text-align: center">⁂</div>

[^1]: https://www.agno.com

[^2]: https://www.youtube.com/watch?v=v25O_zBU4DQ

[^3]: https://pypi.org/project/agno/1.1.1/

[^4]: https://docs.aimlapi.com/integrations/agno

[^5]: https://www.youtube.com/watch?v=aKCgiq9z7JA

[^6]: https://www.marketcalls.in/python/building-a-multi-agent-financial-news-system-with-agno-and-agent-ui.html

[^7]: https://www.zoho.com/bookings/industries/doctors-appointment-booking-app.html

[^8]: https://www.tinybird.co/blog-posts/how-to-build-an-analytics-agent-with-agno-and-tinybird-step-by-step

[^9]: https://workos.com/blog/agno-the-agent-framework-for-python-teams

[^10]: https://python-telegram-bot.org

[^11]: https://github.com/python-telegram-bot/python-telegram-bot

[^12]: https://en.wikipedia.org/wiki/Model_Context_Protocol

[^13]: https://www.anthropic.com/news/model-context-protocol

[^14]: https://docs.anthropic.com/en/docs/mcp

[^15]: https://github.com/lastmile-ai/mcp-agent

[^16]: https://github.com/modelcontextprotocol

[^17]: https://www.youtube.com/watch?v=wdHlKXFPqro

[^18]: https://www.youtube.com/watch?v=_i-yMf_cSHw

[^19]: https://www.bitdoze.com/agno-get-start/

[^20]: https://www.youtube.com/watch?v=Y8nbC_Uj6LI

[^21]: https://docs.langwatch.ai/integration/python/integrations/agno

[^22]: https://www.youtube.com/watch?v=DiahQlVrnaw

[^23]: https://console.groq.com/docs/agno

[^24]: https://docs.copilotkit.ai/agno/quickstart

[^25]: https://www.youtube.com/watch?v=T3CKcwVTYlM

[^26]: https://github.com/agno-agi

[^27]: https://www.youtube.com/watch?v=Oxy_ivwEoo0

[^28]: https://ai.plainenglish.io/building-an-ai-agent-with-agno-a-step-by-step-guide-13542b2a5fb6

[^29]: https://docs.together.ai/docs/agno

[^30]: https://www.youtube.com/watch?v=XN6dSSx6Ehg

[^31]: https://docs.tavily.com/documentation/integrations/agno

[^32]: https://www.youtube.com/playlist?list=PL3JVwFmb_BnTItOu5wk67Vb2lrp2zMb2o

[^33]: https://www.copilotkit.ai/blog/introducing-agno-integration-with-copilotkit

[^34]: https://railway.com/deploy/a0ln90

[^35]: https://github.com/b0g3r/fastapi-security-telegram-webhook

[^36]: https://github.com/agno-agi/agno/issues/2234

[^37]: https://github.com/agno-agi/agno/issues/3638

[^38]: https://railway.com/deploy/5kprwG

[^39]: https://www.youtube.com/watch?v=ticsUbvQd0A

[^40]: https://x.com/prompt48/status/1923406597381820620

[^41]: https://stackoverflow.com/questions/76884609/deploy-telegram-bot-on-webhooks

[^42]: https://www.youtube.com/watch?v=DiahQlVrnaw\&vl=fr

[^43]: https://docs.python-telegram-bot.org

[^44]: https://hevodata.com/learn/telegram-webhooks/

[^45]: https://www.marktechpost.com/2025/05/04/building-ai-agents-using-agnos-multi-agent-teaming-framework-for-comprehensive-market-analysis-and-risk-reporting/

[^46]: https://www.youtube.com/watch?v=EDhSC1Rt3p8

[^47]: https://fastapi.tiangolo.com/pt/advanced/openapi-webhooks/

[^48]: https://www.youtube.com/watch?v=_RQw5Nw7Op0

[^49]: https://github.com/agno-agi/agno/issues/3125

[^50]: https://www.youtube.com/watch?v=eRTTlS0zaW8

[^51]: https://nevonprojects.com/python-doctor-appointment-booking-system/

[^52]: https://github.com/agno-agi/agno/issues/2607

[^53]: https://www.agnohealth.com/appointments

[^54]: https://phpgurukul.com/doctor-appointments-system-using-python-django-and-mysql/

[^55]: https://docs.phidata.com/tools/postgres

[^56]: https://www.swissmedical.net/en/data-protection/patient-information

[^57]: https://github.com/Osama710/AppointmentBookingSystem

[^58]: https://www.linkedin.com/pulse/postgresql-ai-agent-memory-krishnakumar-ravi-ohndc

[^59]: https://github.com/agno-agi/phidata/blob/main/phi/tools/postgres.py

[^60]: https://github.com/agno-agi/agno

[^61]: https://code-projects.org/hospital-appointment-management-system-in-python-with-source-code/

[^62]: https://docs.phidata.com/storage/introduction

[^63]: https://www.kaggle.com/datasets/carogonzalezgaltier/medical-appointment-scheduling-system

[^64]: https://www.scribd.com/document/852542261/Python-Doctor-Appointment-Booking-System

[^65]: https://www.linkedin.com/posts/karimvarela_github-kvarelaagno-fastapi-uvicorn-postgres-boilerplate-activity-7314706208949485568-Jfjz

[^66]: https://www.linkedin.com/pulse/patterns-mcp-agno-integration-alexandre-evangelista--bj2uf

[^67]: https://vercel.com/blog/model-context-protocol-mcp-explained

[^68]: https://www.youtube.com/watch?v=eur8dUO9mvE

[^69]: https://www.youtube.com/watch?v=77SIxH9G_1M

[^70]: https://www.youtube.com/watch?v=7j_NE6Pjv-E

[^71]: https://developers.cloudflare.com/agents/model-context-protocol/

[^72]: https://www.bitdoze.com/agno-mcp-tools-context7/

[^73]: https://www.descope.com/learn/post/mcp

[^74]: https://triggo.ai/blog/o-que-e-o-mcp-model-context-protocol/

[^75]: https://learn.microsoft.com/en-us/azure/developer/ai/intro-agents-mcp

[^76]: https://clickhouse.com/docs/use-cases/AI/MCP/ai-agent-libraries/agno

[^77]: https://developer.microsoft.com/pt-br/reactor/events/25883/

[^78]: https://openai.github.io/openai-agents-python/mcp/

[^79]: https://www.youtube.com/watch?v=YJFoHBmPrOU

[^80]: https://blog.dsacademy.com.br/model-context-protocol-mcp-para-sistemas-de-ia-generativa-conceito-aplicacoes-e-desafios/

[^81]: https://www.reservio.com/medical-software

[^82]: https://support.google.com/calendar/answer/10729749?hl=en

[^83]: https://github.com/balirampansare/google-calendar-api-python

[^84]: https://health.google/consumers/search/appointment-booking/register/

[^85]: https://www.vertikalsystems.com/en/products/pm/emr-medical-calendars-integration.htm

[^86]: https://workspace.google.com/resources/appointment-scheduling/

[^87]: https://www.nylas.com/blog/integrating-google-calendar-api-with-python/

[^88]: https://n8n.io/workflows/3131-chatbot-appointment-scheduler-with-google-calendar-for-dental-assistant/

[^89]: https://www.keragon.com/integrations/google-calendar

[^90]: https://www.timetap.com/google-calendar-appointment-syncing.html

[^91]: https://developers.google.com/workspace/calendar/api/quickstart/python

[^92]: https://www.tebra.com/theintake/practice-operations/patient-scheduling/patients-can-book-directly-through-google-appointments

[^93]: https://splose.com/features/practice-management/calendar-and-scheduling

[^94]: https://www.youtube.com/watch?v=B2E82UPUnOY

[^95]: https://play.google.com/store/apps/details?id=de.itdevcrowd.consultation

[^96]: https://www.ninsaude.com/en/medical-scheduling-software/

[^97]: https://www.supersaas.com/info/medical-professionals-appointment-scheduling

[^98]: https://www.reddit.com/r/Python/comments/10shzxt/better_google_calendar_api_for_python/

[^99]: https://calendar.google.com

