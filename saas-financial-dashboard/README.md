# SaaS Financial Dashboard

> Framework Financeiro para Founders de SaaS - MVP Edition

**"Código cria produto. Caixa cria empresa."**

Dashboard financeiro projetado para founders responderem 3 perguntas críticas diariamente:

1. **Estou crescendo ou só trabalhando mais?**
2. **Meu SaaS é sustentável ou dependente de mim?**
3. **Onde está vazando dinheiro agora?**

## Stack

- **Backend**: Laravel (PHP 8.2+)
- **Frontend**: Vue 3 + Tailwind CSS
- **Banco**: PostgreSQL
- **Charts**: Chart.js

## Estrutura do Projeto

```
saas-financial-dashboard/
├── app/
│   ├── Http/Controllers/Api/     # Controllers da API
│   ├── Models/                   # Eloquent Models
│   └── Services/                 # Lógica de negócio (KPIs)
├── database/
│   └── migrations/               # Migrations do banco
├── resources/
│   └── js/
│       ├── components/           # Componentes Vue
│       ├── composables/          # Composables (API hooks)
│       └── pages/                # Páginas
└── routes/
    └── api.php                   # Rotas da API
```

## Modelo de Dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `companies` | Dados da empresa/startup |
| `customers` | Clientes (trial, active, churned) |
| `subscriptions` | Assinaturas ativas |
| `payments` | Pagamentos recebidos |
| `expenses` | Despesas (fixas e variáveis) |
| `metrics_snapshots` | Histórico diário de métricas |
| `cash_entries` | Movimentações de caixa |

## Dashboard - Blocos

### 1. Saúde do Negócio
- MRR atual
- Crescimento mensal (%)
- Churn (%)
- Runway (meses)

### 2. Caixa & Sobrevivência
- Caixa atual
- Burn mensal
- Projeção de caixa (6 meses)
- Alertas automáticos

### 3. Receita
- Ticket médio
- LTV / CAC
- Receita por plano
- Curva de MRR

### 4. Clientes & Churn
- Funil: Trial → Pagante → Retido
- Motivos de churn
- Taxa de retenção

### 5. Custos & Eficiência
- Custos fixos vs variáveis
- Margem operacional
- % custo/receita
- Breakdown por categoria

## Regras de Negócio

### Regra do Caixa Judaico
Toda entrada já nasce com destino:
- **60%** Operação
- **20%** Reserva
- **20%** Crescimento

### Regra da Escala Saudável
Não escalar se:
- Churn > 5% mês
- Margem < 50%
- Founder ainda faz suporte

### Regra da Verdade
Métrica que não gera decisão não entra no dashboard.

## API Endpoints

### Dashboard
```
GET  /api/dashboard           # Visão geral
GET  /api/dashboard/health    # Saúde do negócio
GET  /api/dashboard/cash      # Caixa e sobrevivência
GET  /api/dashboard/revenue   # Receita
GET  /api/dashboard/customers # Clientes
GET  /api/dashboard/costs     # Custos
POST /api/dashboard/snapshot  # Gera snapshot
```

### Recursos
```
# Customers
GET    /api/customers
POST   /api/customers
GET    /api/customers/{id}
PUT    /api/customers/{id}
DELETE /api/customers/{id}
POST   /api/customers/{id}/convert
POST   /api/customers/{id}/churn

# Subscriptions
GET    /api/subscriptions
POST   /api/subscriptions
GET    /api/subscriptions/{id}
PUT    /api/subscriptions/{id}
DELETE /api/subscriptions/{id}
POST   /api/subscriptions/{id}/pause
POST   /api/subscriptions/{id}/resume

# Payments
GET    /api/payments
POST   /api/payments
GET    /api/payments/{id}
PUT    /api/payments/{id}
DELETE /api/payments/{id}
POST   /api/payments/{id}/mark-paid
POST   /api/payments/{id}/mark-failed
GET    /api/payments-pending

# Expenses
GET    /api/expenses
POST   /api/expenses
GET    /api/expenses/{id}
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
GET    /api/expenses-by-category
GET    /api/expenses-breakdown
GET    /api/expenses-recurring
```

## Instalação com Docker

### Pré-requisitos
- Docker Desktop instalado
- Make (opcional, facilita os comandos)

### Quick Start (1 comando)

```bash
make install
```

Isso vai:
1. Copiar `.env.example` para `.env`
2. Buildar os containers
3. Instalar dependências PHP (composer)
4. Gerar APP_KEY
5. Rodar migrations
6. Popular banco com dados demo

**Acesse:** http://localhost:8080

### Manual (sem Make)

```bash
# 1. Copiar configuração
cp .env.example .env

# 2. Subir containers
docker-compose up -d --build

# 3. Instalar dependências
docker-compose exec app composer install

# 4. Gerar chave
docker-compose exec app php artisan key:generate

# 5. Rodar migrations
docker-compose exec app php artisan migrate

# 6. Popular dados demo
docker-compose exec app php artisan db:seed --class=DemoDataSeeder
```

### Comandos Úteis

```bash
make up          # Inicia containers
make down        # Para containers
make logs        # Ver logs
make shell       # Acessa container PHP
make db-shell    # Acessa PostgreSQL
make migrate     # Roda migrations
make fresh       # Reset banco + seed
make frontend    # Dev server Vue
```

### Portas

| Serviço    | Porta |
|------------|-------|
| Nginx/App  | 8080  |
| PostgreSQL | 5432  |

## Cálculo dos KPIs

### MRR (Monthly Recurring Revenue)
```
MRR = Soma do valor mensal de todas as subscriptions ativas
```

### Churn Rate
```
Churn = (Clientes perdidos no mês / Clientes ativos início do mês) × 100
```

### LTV (Lifetime Value)
```
Vida média = 1 / (Churn Rate / 100)
LTV = Ticket Médio × Vida média em meses
```

### Runway
```
Runway = Caixa Atual / Burn Rate Mensal
```

### Margem Operacional
```
Margem = ((Receita - Custos Totais) / Receita) × 100
```

## Roadmap

### V1 - MVP (Atual)
- [x] Dashboard financeiro
- [x] Inputs manuais
- [x] Snapshot diário
- [x] Alertas automáticos

### V2
- [ ] Integração Stripe
- [ ] Integração Mercado Pago
- [ ] Alertas por WhatsApp/Email

### V3
- [ ] Previsões com IA
- [ ] Sugestões automáticas de ação
- [ ] Benchmarks do mercado

## Rotina do Founder

**Diário (2 min)**
- MRR ↑ ou ↓?
- Caixa ↑ ou ↓?

**Semanal**
- 1 ação para aumentar receita
- 1 corte de custo inútil

**Mensal**
- Rever pricing
- Rever churn
- Rever foco

---

Inspirado em "Princípios Judaicos para a Prosperidade Financeira"
