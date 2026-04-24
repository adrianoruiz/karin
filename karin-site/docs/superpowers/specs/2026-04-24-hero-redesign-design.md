# Hero Redesign — Editorial Foco-na-Dor

**Data:** 2026-04-24
**Componente afetado:** `app/components/Hero.vue`
**Branch atual:** `feature/f1-hero-whatsapp`

## Contexto

Hero atual tem dois títulos grandes competindo por atenção (nome `Dra. Karin Boldarini` em `text-display-xl` + pain statement `Ansiedade, insônia, depressão e TDAH têm tratamento.` em `text-display-lg`). Não há sinais de confiança além do CRM. Imagem da psiquiatra ocupa ~40% do fold mas tem âncora visual fraca (apenas blob `sand-warm` com blur). CTA único.

## Objetivo

Aumentar conversão (agendamento via WhatsApp) e clareza de hierarquia, movendo a dor para a manchete principal e transformando o nome em credencial/assinatura. Adicionar prova de confiança no fold sem poluir.

## Diretriz de Design

**"Editorial foco-na-dor":** o paciente que chega busca solução para um sintoma, não para uma médica específica. Manchete = promessa de tratamento. Autoridade (nome, CRM, foto) sustenta a promessa, não a abre.

## Estrutura Proposta

### Coluna esquerda (7 cols desktop)

1. **Eyebrow** (mantém)
   - Texto: `Psiquiatria para adultos · Blumenau SC`
   - Tokens: `text-eyebrow uppercase text-ink-muted`

2. **Credencial inline** (novo — substitui H1 atual com o nome)
   - Layout: `[Dra. Karin Boldarini]  ·  [CRM-SC 26419]`
   - Fonte: `font-aloe`, tamanho `text-lg md:text-xl`, peso medium
   - Separador: ponto central ou linha fina em `accent-crm/40`
   - Cor do nome: `text-ink`; CRM em `text-accent-crm`, tracking amplo
   - Remove o bloco atual de linha horizontal + CRM abaixo do nome

3. **H1 — Pain Statement** (promove o atual H2)
   - Tag: `<h1>`
   - Fonte: `font-aloe text-display-xl text-ink leading-[0.98]`
   - Conteúdo com quebras otimizadas (3 linhas no desktop):
     ```
     Ansiedade, insônia,
     depressão e TDAH
     têm tratamento.
     ```
   - Ponto final (`.`) recebe `text-accent-crm` — detalhe editorial, pingo de cor.
   - Mobile: quebra natural, sem `<br>` forçado.

4. **Subheadline** (mantém conteúdo, afina tipografia)
   - Texto: `Atendimento psiquiátrico humanizado para homens e mulheres adultos. Online ou presencial em Blumenau.`
   - Tokens: `text-lg md:text-xl text-ink-soft/90 max-w-xl`

5. **Par de CTAs**
   - Primário: botão WhatsApp atual (mantém estilo, `useWhatsAppLink('hero')`)
   - Secundário: link texto `Conhecer o método →` com âncora `#metodo`
     - Tokens: `text-ink font-medium underline-offset-4 hover:underline`
   - Layout: `flex-col sm:flex-row gap-4 items-center sm:items-start`

6. **Trust Strip** (novo)
   - 3 blocos horizontais, separados por divisor vertical `bg-clay/30 w-px`
   - Mobile: empilha vertical com divisor horizontal
   - Tipografia: `text-xs uppercase tracking-[0.12em] text-clay-dark`; números em `font-aloe text-lg text-ink`
   - Conteúdo (a confirmar com usuário):
     - `8+ anos` · atuação clínica
     - `Online & Presencial` · Blumenau SC
     - `4 focos` · ansiedade, TDAH, depressão, insônia

### Coluna direita (5 cols desktop)

1. **Halo em camadas** (substitui blob único)
   - Camada 1: `w-96 h-96 rounded-full bg-sand-warm/60 blur-2xl` (mantém)
   - Camada 2: `w-64 h-64 rounded-full bg-brown-300/40 blur-3xl` deslocada (`translate-x-12 -translate-y-8`)

2. **Foto** (mantém asset `/images/karin-psiq.png`)

3. **Selo CRM flutuante** (novo)
   - Posição: canto inferior-esquerdo da foto, `absolute bottom-8 -left-4`
   - Visual: pill `bg-sand-soft border border-accent-crm/50 px-4 py-2 rounded-full shadow-sm`
   - Texto: `CRM-SC 26419` em `text-xs tracking-[0.15em] uppercase text-accent-crm font-medium`
   - Substitui o CRM atual (que sai da coluna esquerda para virar parte da credencial inline + selo flutuante)

4. **Linha ornamental** (novo, decorativo)
   - Posição: canto superior-direito atrás da foto
   - Visual: linha diagonal ou arco fino em `accent-crm/20`, `w-24 h-px` rotacionado
   - `-z-10`, puramente decorativa

## Comportamento Responsivo

- **Desktop (lg+):** split 7/5, imagem bottom-aligned, trust strip horizontal
- **Tablet (md):** split 6/6, imagem reduzida, trust strip horizontal
- **Mobile:** stack vertical — credencial, H1, sub, CTAs, trust strip (vertical), imagem embaixo; selo CRM flutuante mantém-se sobre a foto

## Tokens

Nenhum token novo. Reusa: `sand`, `sand-soft`, `sand-warm`, `brown-300`, `ink`, `ink-soft`, `ink-muted`, `accent-crm`, `clay`, `clay-dark`, `text-display-xl`, `font-aloe`, `text-eyebrow`.

## Props e Lógica

- Props do componente mantidas (`name`, `title`, `description`) — `title` passa a não ser usado pelo template (H1 fixo). Decisão: manter prop para compatibilidade com `index.vue` ou remover e ajustar `index.vue`? **Recomendado:** remover props não usadas, ajustar `app/pages/index.vue`.
- `useWhatsAppLink('hero')` mantém inalterado.

## Acessibilidade

- `<h1>` único (pain statement) — melhora hierarquia semântica
- Credencial inline vira `<p>` com `<strong>` no nome, não heading
- Selo CRM flutuante: `aria-label="CRM SC 26419 — Conselho Regional de Medicina"`
- Link secundário: texto descritivo `Conhecer o método de atendimento`
- Trust strip: `<dl>` com `<dt>` (número) e `<dd>` (descrição)

## Critério de Sucesso

- H1 único no fold, claramente a frase de dor
- Nome aparece como credencial, não manchete
- 3 sinais de confiança visíveis sem scroll (CRM + 3 blocos do strip)
- 2 caminhos de ação claros (WhatsApp primário, método secundário)
- Lighthouse a11y ≥ 95
- CLS não degrada vs versão atual

## Fora de Escopo

- Mudança de copy além das listadas
- Novos assets de imagem
- Tracking/analytics (já vem de `useWhatsAppLink`)
- Ajustes em outras seções (Karin, Método, Consultation)
- A/B test infra

## Riscos

- **Perda de protagonismo do nome:** mitigado pela foto + credencial inline + selo flutuante
- **Trust strip com dados não validados:** confirmar com usuário os 3 blocos antes de implementar
- **Quebra de layout em telas 1024–1279px:** validar no browser no passo de implementação
