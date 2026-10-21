# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-06-16] Shell commands must use `rtk`**
   Do instead: prefix shell commands with `rtk` unless a tool or command is explicitly incompatible.

## Shell & Command Reliability
1. **[2026-06-16] `rtk find` has limited predicate support**
   Do instead: use simpler `rtk find` calls or raw `find` only when compound predicates/actions are required.

## Domain Behavior Guardrails
1. **[2026-10-20] Publicidade médica usa identificação provisória**
   Do instead: manter MÉDICA + CRM-SC 26.419 e não anunciar pós-graduação sem confirmação documental do cadastro; consultar `docs/adequacao-crm-sc.md` antes de reativar conteúdo retirado.
2. **[2026-10-20] Redirects dependem do servidor de publicação**
   Do instead: publicar com Nitro node-server ou configurar os mesmos HTTP 301 no servidor/CDN; testar as URLs antigas, pois export estático sozinho não garante o status HTTP.
3. **[2026-10-20] WhatsApp deve abrir com mensagem limpa**
   Do instead: incluir no parâmetro `text` somente a mensagem; nunca anexar UTMs ou rótulos técnicos visíveis ao paciente.
4. **[2026-10-20] Foto final do hero é o retrato rosa de braços cruzados**
   Do instead: usar `karin-hero-rosa-*`, conforme a última escolha da médica; preservar ombros, cotovelos e mãos completos e limitar a largura à coluna para evitar cortes laterais.
