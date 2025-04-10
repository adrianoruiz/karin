# Task List – Projeto Agentes IA (Oliver e Amanda) com Nuxt.js

## 1. Objetivo do Projeto

Desenvolver uma aplicação fullstack em Nuxt.js para gerenciar dois agentes de IA personalizados:

- **Oliver:** Agente operacional e estratégico que gerencia tarefas, monitora progresso e gera análises estratégicas.
- **Amanda:** Agente emocional e motivacional que envia mensagens personalizadas, monitora datas especiais e sugere momentos para conexão.

### Funcionalidades Principais:
- **Interface Web:** Dashboard para visualizar e gerenciar os agentes
- **Automação:** Sistema de cron jobs para tarefas recorrentes
- **Comunicação:** Integração com WhatsApp para entrega de mensagens
- **IA:** Integração com API Claude para geração de conteúdo personalizado
- **Banco de Dados:** PostgreSQL para armazenar todos os dados do sistema

---

## 2. Pré-requisitos e Ambiente

- **Node.js:** Versão LTS (16+)
- **PostgreSQL:** Banco de dados instalado e configurado (ou Supabase como alternativa)
- **Conta Claude API:** API key para integração com IA
- **Conta WhatsApp Business API:** Para envio de mensagens (ou whatsapp-web.js para versão inicial)
- **Editor de código:** VS Code ou similar

---

## 3. Estrutura do Projeto

```
manus/
├── components/
│   ├── shared/         # Componentes compartilhados (botões, cards, etc)
│   ├── dashboard/      # Componentes da dashboard principal
│   ├── oliver/         # Componentes específicos do Oliver
│   └── amanda/         # Componentes específicos da Amanda
├── composables/        # Lógica compartilhada
│   ├── useOliver.js    # Hook para funcionalidades do Oliver
│   ├── useAmanda.js    # Hook para funcionalidades da Amanda
│   ├── useWhatsapp.js  # Hook para interação com WhatsApp
│   └── useClaude.js    # Hook para chamadas à API Claude
├── server/             # Backend do Nuxt
│   ├── api/            # Endpoints de API
│   │   ├── oliver/     # Endpoints do Oliver
│   │   └── amanda/     # Endpoints da Amanda
│   ├── db/             # Conexão e modelos do banco de dados
│   │   ├── index.js    # Configuração do Postgres
│   │   ├── schemas/    # Schemas Zod para validação
│   │   └── models/     # Modelos do banco
│   ├── utils/          # Utilitários de servidor
│   │   ├── claude.js   # Cliente da API Claude
│   │   └── whatsapp.js # Cliente WhatsApp
│   └── cron.js         # Configuração dos cron jobs
├── pages/
│   ├── index.vue       # Dashboard principal
│   ├── oliver/         # Páginas do Oliver
│   │   ├── index.vue   # Dashboard do Oliver
│   │   ├── tasks.vue   # Gerenciamento de tarefas
│   │   └── reports.vue # Relatórios e análises
│   └── amanda/         # Páginas da Amanda
│       ├── index.vue   # Dashboard da Amanda
│       ├── messages.vue # Histórico de mensagens
│       └── dates.vue   # Gerenciamento de datas especiais
├── assets/             # Arquivos estáticos
│   └── img/            # Imagens (avatares dos agentes, etc)
├── nuxt.config.ts      # Configuração do Nuxt
└── package.json
```

---

## 4. Setup Inicial

1. **Iniciar projeto Nuxt.js**
   ```bash
   npx nuxi init manus
   cd manus
   ```

2. **Instalar dependências**
   ```bash
   [x] npm install pg @nuxtjs/supabase @nuxtjs/tailwindcss axios zod croner whatsapp-web.js
   ```

3. **Configurar banco de dados**
   - Criar arquivo `.env` com as variáveis:
     ```
     DATABASE_URL=postgres://manus:manus123@localhost:5432/manus
     CLAUDE_API_KEY=
     WHATSAPP_NUMBER=5545999110509
     ```
   - Definir a estrutura das tabelas:
     ```sql
     -- Oliver Tables
     CREATE TABLE tasks (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       description TEXT,
       priority TEXT CHECK (priority IN ('Alta', 'Média', 'Baixa')),
       status TEXT CHECK (status IN ('Pendente', 'Em andamento', 'Concluída')),
       due_date DATE,
       created_at TIMESTAMP DEFAULT NOW()
     );
     
     CREATE TABLE task_logs (
       id SERIAL PRIMARY KEY,
       task_id INTEGER REFERENCES tasks(id),
       status TEXT,
       notes TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     );
     
     -- Amanda Tables
     CREATE TABLE messages (
       id SERIAL PRIMARY KEY,
       content TEXT NOT NULL,
       category TEXT NOT NULL,
       sub_category TEXT,
       sent_at TIMESTAMP,
       response TEXT,
       effectiveness INTEGER,
       created_at TIMESTAMP DEFAULT NOW()
     );
     
     CREATE TABLE special_dates (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       date DATE NOT NULL,
       type TEXT NOT NULL,
       importance INTEGER CHECK (importance BETWEEN 1 AND 5),
       notes TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     );
     
     CREATE TABLE preferences (
       id SERIAL PRIMARY KEY,
       category TEXT NOT NULL,
       items TEXT[] NOT NULL,
       last_used TIMESTAMP,
       interest_level INTEGER CHECK (interest_level BETWEEN 1 AND 5),
       notes TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     );
     ```

---

## 5. Implementação do Backend

### 5.1 Conexão com o Banco de Dados

Criar arquivo `server/db/index.js`:

```javascript
import { Pool } from 'pg'
import { z } from 'zod'

// Criando pool de conexão PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Função utilitária para queries
export async function query(text, params) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

// Exportar schemas Zod
export const taskSchema = z.object({
  title: z.string().min(3, "Título precisa ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  priority: z.enum(['Alta', 'Média', 'Baixa']),
  status: z.enum(['Pendente', 'Em andamento', 'Concluída']),
  due_date: z.string().optional(),
})

export const messageSchema = z.object({
  content: z.string().min(1, "Mensagem não pode estar vazia"),
  category: z.string(),
  sub_category: z.string().optional(),
})

export const specialDateSchema = z.object({
  name: z.string().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  date: z.string(),
  type: z.string(),
  importance: z.number().min(1).max(5),
  notes: z.string().optional(),
})
```

### 5.2 Implementação dos Endpoints

Endpoints para o Oliver:

```javascript
// server/api/oliver/tasks.js
import { defineEventHandler, readBody } from 'h3'
import { query, taskSchema } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { rows } = await query('SELECT * FROM tasks ORDER BY due_date ASC')
    return rows
  }
  
  if (event.method === 'POST') {
    const body = await readBody(event)
    
    // Validar dados com Zod
    const validated = taskSchema.safeParse(body)
    if (!validated.success) {
      throw createError({
        statusCode: 400, 
        message: JSON.stringify(validated.error.errors)
      })
    }
    
    const { title, description, priority, status, due_date } = validated.data
    
    const { rows } = await query(
      'INSERT INTO tasks(title, description, priority, status, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [title, description, priority, status, due_date]
    )
    
    return rows[0]
  }
})
```

Endpoints para a Amanda:

```javascript
// server/api/amanda/messages.js
import { defineEventHandler, readBody } from 'h3'
import { query, messageSchema } from '../../db'
import { generateMessage } from '../../utils/claude'
import { sendMessage } from '../../utils/whatsapp'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { rows } = await query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 50')
    return rows
  }
  
  if (event.method === 'POST') {
    const body = await readBody(event)
    
    // Validar dados com Zod
    const validated = messageSchema.safeParse(body)
    if (!validated.success) {
      throw createError({
        statusCode: 400, 
        message: JSON.stringify(validated.error.errors)
      })
    }
    
    const { category, sub_category, target_number } = validated.data
    
    // Gerar mensagem com Claude
    const prompt = `Você é Amanda, assistente emocional. Gere uma mensagem carinhosa para a categoria ${category}.`
    const content = await generateMessage(prompt)
    
    // Enviar mensagem via WhatsApp
    if (target_number) {
      await sendMessage(target_number, content)
    }
    
    // Salvar no banco
    const { rows } = await query(
      'INSERT INTO messages(content, category, sub_category, sent_at) VALUES($1, $2, $3, NOW()) RETURNING *',
      [content, category, sub_category]
    )
    
    return rows[0]
  }
})
```

### 5.3 Utilitários do Servidor

Cliente Claude:

```javascript
// server/utils/claude.js
import axios from 'axios'

export async function generateMessage(prompt) {
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-opus-20240229",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150
    }, {
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    })
    
    return response.data.content[0].text
  } catch (error) {
    console.error('Erro ao gerar mensagem com Claude:', error)
    return "Não foi possível gerar a mensagem."
  }
}
```

Cliente WhatsApp:

```javascript
// server/utils/whatsapp.js
import { Client } from 'whatsapp-web.js'

let client = null

export async function getWhatsAppClient() {
  if (!client) {
    client = new Client()
    
    client.on('qr', (qr) => {
      console.log('QR Code gerado:', qr)
    })
    
    client.on('ready', () => {
      console.log('Cliente WhatsApp pronto!')
    })
    
    await client.initialize()
  }
  
  return client
}

export async function sendMessage(to, message) {
  const client = await getWhatsAppClient()
  await client.sendMessage(to, message)
  return { success: true, message: 'Mensagem enviada com sucesso' }
}
```

### 5.4 Configuração dos Cron Jobs

```javascript
// server/cron.js
import { defineNitroPlugin } from 'nitropack/runtime'
import { Cron } from 'croner'
import { query } from './db'
import { generateMessage } from './utils/claude'
import { sendMessage } from './utils/whatsapp'

export default defineNitroPlugin(() => {
  // Oliver: Planejamento diário (7:00)
  Cron('0 7 * * *', async () => {
    try {
      // Buscar tarefas do dia
      const { rows: tarefas } = await query(
        "SELECT * FROM tasks WHERE status != 'Concluída' AND due_date = CURRENT_DATE"
      )
      
      if (tarefas.length > 0) {
        // Formatar mensagem
        let mensagem = "🤖 *OLIVER | AGENDA DO DIA*\n\n"
        tarefas.forEach((tarefa, index) => {
          mensagem += `${index + 1}. ${tarefa.title}\n`
        })
        
        // Enviar via WhatsApp
        await sendMessage(process.env.WHATSAPP_NUMBER, mensagem)
      }
    } catch (error) {
      console.error('Erro no job de planejamento diário:', error)
    }
  })
  
  // Amanda: Mensagem carinhosa (14:00)
  Cron('0 14 * * *', async () => {
    try {
      // Verificar última categoria usada
      const { rows } = await query(
        "SELECT category FROM messages ORDER BY sent_at DESC LIMIT 1"
      )
      
      const categoria = rows.length > 0 ? 
        (rows[0].category === 'carinhosa' ? 'motivacional' : 'carinhosa') : 
        'carinhosa'
      
      const prompt = `Você é Amanda, assistente emocional. Gere uma mensagem ${categoria} curta (1-2 frases) para uma parceira, usando o apelido "Barbie" ou "Princesa", com tom afetuoso.`
      
      const mensagem = await generateMessage(prompt)
      
      // Enviar via WhatsApp
      await sendMessage(process.env.WHATSAPP_NUMBER, mensagem)
      
      // Registrar no banco
      await query(
        'INSERT INTO messages(content, category, sub_category, sent_at) VALUES($1, $2, $3, NOW())',
        [mensagem, categoria, 'diária']
      )
    } catch (error) {
      console.error('Erro no job de mensagem carinhosa:', error)
    }
  })
})
```

---

## 6. Implementação do Frontend

### 6.1 Dashboard Principal

```vue
<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <h1 class="text-2xl font-bold">Dashboard de Agentes IA</h1>
    </header>
    
    <div class="container mx-auto py-6 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card do Oliver -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div class="flex items-center mb-4">
            <img src="/img/oliver-avatar.png" alt="Oliver" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h2 class="text-xl font-bold">Oliver</h2>
              <p class="text-gray-600">Assistente Operacional</p>
            </div>
          </div>
          
          <div class="mb-4">
            <h3 class="font-medium mb-2">Resumo</h3>
            <div class="flex justify-between text-sm">
              <div>
                <p>Tarefas Hoje: <span class="font-bold">{{ oliverStats.tasksToday }}</span></p>
                <p>Progresso: <span class="font-bold">{{ oliverStats.progress }}%</span></p>
              </div>
              <div>
                <p>Pendências: <span class="font-bold">{{ oliverStats.pending }}</span></p>
                <p>Concluídas: <span class="font-bold">{{ oliverStats.completed }}</span></p>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/oliver" class="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition">
            Acessar Oliver
          </NuxtLink>
        </div>
        
        <!-- Card da Amanda -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-pink-500">
          <div class="flex items-center mb-4">
            <img src="/img/amanda-avatar.png" alt="Amanda" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h2 class="text-xl font-bold">Amanda</h2>
              <p class="text-gray-600">Assistente Emocional</p>
            </div>
          </div>
          
          <div class="mb-4">
            <h3 class="font-medium mb-2">Resumo</h3>
            <div class="flex justify-between text-sm">
              <div>
                <p>Mensagens Hoje: <span class="font-bold">{{ amandaStats.messagesCount }}</span></p>
                <p>Datas Próximas: <span class="font-bold">{{ amandaStats.upcomingDates }}</span></p>
              </div>
              <div>
                <p>Última Categoria: <span class="font-bold">{{ amandaStats.lastCategory }}</span></p>
                <p>Média Feedback: <span class="font-bold">{{ amandaStats.avgEffectiveness }}/5</span></p>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/amanda" class="block text-center bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition">
            Acessar Amanda
          </NuxtLink>
        </div>
      </div>
      
      <!-- Atividade Recente -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
        
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" 
               class="p-3 rounded-lg" :class="activity.agent === 'Oliver' ? 'bg-blue-50' : 'bg-pink-50'">
            <div class="flex items-center">
              <div :class="activity.agent === 'Oliver' ? 'bg-blue-100' : 'bg-pink-100'" class="p-2 rounded-full mr-3">
                <span v-if="activity.agent === 'Oliver'" class="text-blue-500">O</span>
                <span v-else class="text-pink-500">A</span>
              </div>
              <div>
                <p class="font-medium">{{ activity.text }}</p>
                <p class="text-gray-500 text-sm">{{ formatDate(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State para dados dos agentes
const oliverStats = ref({
  tasksToday: 0,
  progress: 0,
  pending: 0,
  completed: 0
})

const amandaStats = ref({
  messagesCount: 0,
  upcomingDates: 0,
  lastCategory: '-',
  avgEffectiveness: 0
})

const recentActivity = ref([])

// Carregar dados ao montar o componente
onMounted(async () => {
  try {
    // Buscar estatísticas do Oliver
    const oliverRes = await fetch('/api/oliver/stats')
    if (oliverRes.ok) {
      oliverStats.value = await oliverRes.json()
    }
    
    // Buscar estatísticas da Amanda
    const amandaRes = await fetch('/api/amanda/stats')
    if (amandaRes.ok) {
      amandaStats.value = await amandaRes.json()
    }
    
    // Buscar atividade recente
    const activityRes = await fetch('/api/activity')
    if (activityRes.ok) {
      recentActivity.value = await activityRes.json()
    }
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  }
})

// Formatar data
function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>
```

### 6.2 Dashboard do Oliver

```vue
<!-- pages/oliver/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold">Oliver</h1>
          <p class="text-gray-600">Assistente Operacional e Estratégico</p>
        </div>
      </div>
    </header>
    
    <div class="container mx-auto py-6 px-4">
      <!-- Menu de navegação -->
      <div class="mb-6 flex space-x-2">
        <NuxtLink to="/oliver" class="px-4 py-2 bg-blue-500 text-white rounded">Dashboard</NuxtLink>
        <NuxtLink to="/oliver/tasks" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Tarefas</NuxtLink>
        <NuxtLink to="/oliver/reports" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Relatórios</NuxtLink>
      </div>
      
      <!-- Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Tarefas Hoje</h3>
          <p class="text-3xl font-bold text-blue-500">{{ stats.tasksToday }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Progresso</h3>
          <p class="text-3xl font-bold text-green-500">{{ stats.progress }}%</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Pendências</h3>
          <p class="text-3xl font-bold text-orange-500">{{ stats.pending }}</p>
        </div>
      </div>
      
      <!-- Lista de tarefas do dia -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Tarefas de Hoje</h2>
        
        <div v-if="tasksToday.length === 0" class="text-gray-500 text-center py-4">
          Não há tarefas para hoje
        </div>
        
        <div v-else class="space-y-3">
          <div v-for="task in tasksToday" :key="task.id" class="border-b pb-3 last:border-b-0 last:pb-0">
            <div class="flex items-center">
              <input type="checkbox" :checked="task.status === 'Concluída'" @change="toggleTaskStatus(task)" 
                     class="mr-3 h-5 w-5 text-blue-500">
              <div class="flex-1">
                <p :class="{'line-through': task.status === 'Concluída'}">{{ task.title }}</p>
                <p class="text-sm text-gray-500">{{ task.priority }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button @click="showNewTaskModal = true" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Nova Tarefa
        </button>
      </div>
      
      <!-- Análise Semanal -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Análise Semanal</h2>
        <p v-if="weeklyAnalysis" class="whitespace-pre-line">{{ weeklyAnalysis }}</p>
        <p v-else class="text-gray-500">Nenhuma análise disponível</p>
        
        <button @click="generateWeeklyAnalysis" :disabled="generatingAnalysis" class="mt-4 bg-green-500 text-white py-2 px-4 rounded">
          {{ generatingAnalysis ? 'Gerando...' : 'Gerar Nova Análise' }}
        </button>
      </div>
      
      <!-- Modal nova tarefa -->
      <div v-if="showNewTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Nova Tarefa</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Título</label>
              <input v-model="newTask.title" type="text" class="w-full border rounded py-2 px-3">
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Descrição</label>
              <textarea v-model="newTask.description" class="w-full border rounded py-2 px-3"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Prioridade</label>
              <select v-model="newTask.priority" class="w-full border rounded py-2 px-3">
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Data</label>
              <input v-model="newTask.due_date" type="date" class="w-full border rounded py-2 px-3">
            </div>
          </div>
          
          <div class="flex justify-end space-x-2 mt-6">
            <button @click="showNewTaskModal = false" class="bg-gray-200 py-2 px-4 rounded">
              Cancelar
            </button>
            <button @click="createTask" class="bg-blue-500 text-white py-2 px-4 rounded">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = ref({
  tasksToday: 0,
  progress: 0,
  pending: 0,
  completed: 0
})

const tasksToday = ref([])
const weeklyAnalysis = ref('')
const generatingAnalysis = ref(false)
const showNewTaskModal = ref(false)
const newTask = ref({
  title: '',
  description: '',
  priority: 'Média',
  status: 'Pendente',
  due_date: new Date().toISOString().split('T')[0]
})

// Carregar dados
onMounted(async () => {
  await Promise.all([
    loadStats(),
    loadTasksToday(),
    loadWeeklyAnalysis()
  ])
})

async function loadStats() {
  try {
    const res = await fetch('/api/oliver/stats')
    if (res.ok) {
      stats.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
}

async function loadTasksToday() {
  try {
    const res = await fetch('/api/oliver/tasks/today')
    if (res.ok) {
      tasksToday.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
  }
}

async function loadWeeklyAnalysis() {
  try {
    const res = await fetch('/api/oliver/analysis/latest')
    if (res.ok) {
      const data = await res.json()
      weeklyAnalysis.value = data.content || ''
    }
  } catch (error) {
    console.error('Erro ao carregar análise:', error)
  }
}

async function toggleTaskStatus(task) {
  const newStatus = task.status === 'Concluída' ? 'Pendente' : 'Concluída'
  
  try {
    const res = await fetch(`/api/oliver/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (res.ok) {
      // Atualizar tarefa localmente
      const index = tasksToday.value.findIndex(t => t.id === task.id)
      if (index !== -1) {
        tasksToday.value[index].status = newStatus
      }
      
      // Recarregar estatísticas
      await loadStats()
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
  }
}

async function createTask() {
  try {
    const res = await fetch('/api/oliver/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask.value)
    })
    
    if (res.ok) {
      showNewTaskModal.value = false
      
      // Limpar formulário
      newTask.value = {
        title: '',
        description: '',
        priority: 'Média',
        status: 'Pendente',
        due_date: new Date().toISOString().split('T')[0]
      }
      
      // Recarregar dados
      await Promise.all([loadStats(), loadTasksToday()])
    }
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
  }
}

async function generateWeeklyAnalysis() {
  generatingAnalysis.value = true
  try {
    const res = await fetch('/api/oliver/analysis/generate', { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      weeklyAnalysis.value = data.content || ''
    }
  } catch (error) {
    console.error('Erro ao gerar análise:', error)
  } finally {
    generatingAnalysis.value = false
  }
}
</script>
```

### 6.3 Dashboard da Amanda

```vue
<!-- pages/amanda/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold">Amanda</h1>
          <p class="text-gray-600">Assistente Emocional e Motivacional</p>
        </div>
      </div>
    </header>
    
    <div class="container mx-auto py-6 px-4">
      <!-- Menu de navegação -->
      <div class="mb-6 flex space-x-2">
        <NuxtLink to="/amanda" class="px-4 py-2 bg-pink-500 text-white rounded">Dashboard</NuxtLink>
        <NuxtLink to="/amanda/messages" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Mensagens</NuxtLink>
        <NuxtLink to="/amanda/dates" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Datas Especiais</NuxtLink>
      </div>
      
      <!-- Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Mensagens Hoje</h3>
          <p class="text-3xl font-bold text-pink-500">{{ stats.messagesCount }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Próxima Data Especial</h3>
          <p class="text-lg font-bold text-purple-500">{{ nextSpecialDate.name || "Nenhuma" }}</p>
          <p class="text-sm text-gray-600">{{ nextSpecialDate.date ? formatDate(nextSpecialDate.date) : "" }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Eficácia</h3>
          <p class="text-3xl font-bold text-green-500">{{ stats.avgEffectiveness }}/5</p>
        </div>
      </div>
      
      <!-- Enviar mensagem -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Enviar Mensagem</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Categoria</label>
            <select v-model="newMessage.category" class="w-full border rounded py-2 px-3">
              <option value="carinhosa">Carinhosa</option>
              <option value="motivacional">Motivacional</option>
              <option value="pnl">PNL</option>
              <option value="intima">Íntima</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Subcategoria</label>
            <select v-model="newMessage.sub_category" class="w-full border rounded py-2 px-3">
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
              <option value="geral">Geral</option>
            </select>
          </div>
        </div>
        
        <button @click="sendMessage" :disabled="sendingMessage" class="mt-4 bg-pink-500 text-white py-2 px-4 rounded">
          {{ sendingMessage ? 'Enviando...' : 'Gerar e Enviar' }}
        </button>
      </div>
      
      <!-- Mensagens recentes -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Mensagens Recentes</h2>
        
        <div v-if="recentMessages.length === 0" class="text-gray-500 text-center py-4">
          Nenhuma mensagem enviada recentemente
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="message in recentMessages" :key="message.id" 
               class="p-4 rounded-lg" :class="getMessageBackground(message.category)">
            <p class="font-medium">"{{ message.content }}"</p>
            <div class="flex justify-between mt-2 text-sm">
              <div>
                <span class="bg-pink-200 text-pink-800 px-2 py-1 rounded">{{ message.category }}</span>
                <span class="text-gray-600 ml-2">{{ formatDate(message.sent_at || message.created_at) }}</span>
              </div>
              <div class="flex space-x-1">
                <button v-for="n in 5" :key="n" @click="rateMessage(message.id, n)"
                       :class="(message.effectiveness || 0) >= n ? 'text-yellow-500' : 'text-gray-300'">★</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = ref({
  messagesCount: 0,
  upcomingDates: 0,
  lastCategory: '-',
  avgEffectiveness: 0
})

const nextSpecialDate = ref({})
const recentMessages = ref([])
const sendingMessage = ref(false)
const newMessage = ref({
  category: 'carinhosa',
  sub_category: 'geral'
})

// Carregar dados
onMounted(async () => {
  await Promise.all([
    loadStats(),
    loadNextSpecialDate(),
    loadRecentMessages()
  ])
})

async function loadStats() {
  try {
    const res = await fetch('/api/amanda/stats')
    if (res.ok) {
      stats.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
}

async function loadNextSpecialDate() {
  try {
    const res = await fetch('/api/amanda/dates/next')
    if (res.ok) {
      nextSpecialDate.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar próxima data especial:', error)
  }
}

async function loadRecentMessages() {
  try {
    const res = await fetch('/api/amanda/messages?limit=5')
    if (res.ok) {
      recentMessages.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar mensagens recentes:', error)
  }
}

async function sendMessage() {
  sendingMessage.value = true
  try {
    const res = await fetch('/api/amanda/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...newMessage.value,
        target_number: process.env.WHATSAPP_NUMBER 
      })
    })
    
    if (res.ok) {
      // Recarregar dados
      await Promise.all([loadStats(), loadRecentMessages()])
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
  } finally {
    sendingMessage.value = false
  }
}

async function rateMessage(id, rating) {
  try {
    const res = await fetch(`/api/amanda/messages/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ effectiveness: rating })
    })
    
    if (res.ok) {
      // Atualizar mensagem localmente
      const index = recentMessages.value.findIndex(m => m.id === id)
      if (index !== -1) {
        recentMessages.value[index].effectiveness = rating
      }
      
      // Recarregar estatísticas
      await loadStats()
    }
  } catch (error) {
    console.error('Erro ao avaliar mensagem:', error)
  }
}

function getMessageBackground(category) {
  const backgrounds = {
    'carinhosa': 'bg-pink-50',
    'motivacional': 'bg-purple-50',
    'pnl': 'bg-blue-50',
    'intima': 'bg-red-50',
  }
  
  return backgrounds[category] || 'bg-gray-50'
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>
```

---

## 7. Roadmap de Implementação

1. **Semana 1: Configuração Inicial**
   - Configurar projeto Nuxt.js ✅
   - Configurar banco de dados PostgreSQL ✅
   - Implementar estrutura inicial do projeto ✅

2. **Semana 2: Backend Básico**
   - Implementar endpoints para o Oliver  ✅
   - Implementar endpoints para a Amanda  ✅
   - Configurar conexão com banco de dados  ✅

3. **Semana 3: Integrações**
   - Integrar API Claude para geração de conteúdo
   - Configurar cliente WhatsApp
   - Implementar sistema de cron jobs

4. **Semana 4: Frontend**
   - Desenvolver dashboard principal
   - Desenvolver interfaces do Oliver
   - Desenvolver interfaces da Amanda

5. **Semana 5: Testes e Ajustes**
   - Testar fluxos de trabalho
   - Ajustar prompts do Claude
   - Otimizar interface e usabilidade

6. **Semana 6: Lançamento e Documentação**
   - Documentar código e APIs
   - Preparar ambiente de produção
   - Lançar versão inicial para uso diário

---

## 8. Considerações Finais

- **Modularidade:** A arquitetura proposta permite adicionar novos agentes ou funcionalidades facilmente
- **Escalabilidade:** O uso de PostgreSQL permite escalar o banco de dados conforme necessário
- **Personalização:** Os prompts do Claude podem ser ajustados para refinar a personalidade dos agentes
- **Aprendizado:** O sistema melhora com o tempo à medida que coleta dados sobre eficácia das mensagens

Esta implementação fornece um sistema completo de assistentes IA personalizados usando Nuxt.js como framework fullstack, PostgreSQL como banco de dados, e API Claude para geração de conteúdo, tudo integrado com WhatsApp para entrega de mensagens diretamente ao usuário.