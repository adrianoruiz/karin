# Task.md – Persistência de sessão & correção de data no bot de agendamento

## 📌 Contexto

* Usuários escolhem horários em 2025, mas o bot grava **2024‑04‑11** porque perde a data verdadeira.
* Raiz do problema:

  1. `getAvailableAppointments` devolve `availabilities`, mas o parser procura `appointments`.
  2. O usuário responde somente "18h" → falta **data** explícita.
  3. Não existe um **estado de sessão** confiável entre mensagens.

## 🎯 Objetivo

Garantir que o horário escolhido pelo paciente (data + hora) seja salvo corretamente e que o bot permaneça estável mesmo com múltiplas instâncias.

## 📦 Entregáveis

1. **Refatoração de código** (`gptRouter.js`, `tools/booking.js`, etc.).
2. **sessionStore** baseado em Redis (`sessionStore.js`).
3. **Atualização do prompt do sistema** para exigir `date` + `time`.
4. **Variáveis de ambiente** (`REDIS_URL`).
5. **Testes unitários/integração** (Jest).
6. **README** resumindo setup Redis + instruções de deploy.

## 🛠️ Tarefas detalhadas

| #                                                                                   | Tarefa                                                               | Arquivo/Função                                     | Done |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------- | ---- |
| 1                                                                                   | Ajustar parser para ler `availabilities` fallback → `appointments`   | `processFunctionCall`                              | ✅    |
| 2                                                                                   | Corrigir match do horário (`slots.find`)                             | idem                                               | ✅    |
| 3                                                                                   | Adicionar instrução no *system prompt*:                              |                                                    |      |
| *"Sempre inclua `date` (AAAA‑MM‑DD) e `time` (HH\:mm) ao chamar `bookAppointment`"* | `ai/systemMessage.js`                                                | ✅                                                  |      |
| 4                                                                                   | Criar `sessionStore.js` (Redis TTL 2h)                               | novo                                               | ✅    |
| 5                                                                                   | Salvar `lastSlots` após `getAvailableAppointments`                   | `processFunctionCall` → `getAvailableAppointments` | ✅    |
| 6                                                                                   | Recuperar `lastSlots` ao agendar, preencher `date` + `time`          | idem                                               | ✅    |
| 7                                                                                   | Gerar `slot_id` único (ISO) nos quick‑replies                        | `getAvailableAppointments`                         | ✅    |
| 8                                                                                   | Validar slot antes de `bookAppointment` (HTTP 422 prevention)        | `tools/booking.js`                                 | ✅    |
| 9                                                                                   | Implementar suporte a fuso (America/Sao\_Paulo ⇄ UTC) via `dayjs.tz` | global                                             | ✅    |
| 10                                                                                  | Escrever testes Jest (fluxo feliz + erro 422)                        | `__tests__/booking.test.js`                        | ✅    |
| 11                                                                                  | Documentar `.env.example` com `REDIS_URL`                            | root                                               | ✅    |
| 12                                                                                  | Atualizar **README** com:                                            |                                                    |      |

* Setup Redis local (Docker)
* Deploy production tips | `README.md` | ✅ |

## ✅ Critérios de aceitação

* Consulta para **2025‑05‑10 18:00** é registrada exatamente nessa data/hora no BD.
* Novo quick‑reply contém `slot_id` único; resposta do paciente usa esse ID.
* Sem erros 422 em 95 % dos testes de stress.
* Bot funciona em 2 instâncias PM2 compartilhando Redis.
* Suite de testes Jest ≥ 90 % coverage para `sessionStore` & booking flow.

## ⏳ Linha do tempo sugerida

| Dia | Atividade                                                                  |
| --- | -------------------------------------------------------------------------- |
| D0  | Fork branch, setup Redis local, importar dependências (`ioredis`, `dayjs`) |
| D1  | Tarefas 1‑5                                                                |
| D2  | Tarefas 6‑8                                                                |
| D3  | Tarefas 9‑10, testes passarem                                              |
| D4  | Doc final, PR & review                                                     |

## 🗒️ Notas adicionais

* Redis pode ser substituído por DynamoDB ou Firestore se já houver stack serverless.
* Use `setex` (TTL) para evitar lixo acumulado.
* After merge, lembrar de adicionar `REDIS_URL` no ambiente de staging e produção.
