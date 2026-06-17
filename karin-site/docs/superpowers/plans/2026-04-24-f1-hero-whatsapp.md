# F1 — Hero + Meta Tags + WhatsApp CTAs (Implementation Plan)

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a home do `karin-site` em página de conversão: copy de dor-específica no hero, meta tags otimizadas para SEO/social, e todos CTAs apontando para WhatsApp com tracking UTM por origem.

**Architecture:**
- Centralizar geração de URL do WhatsApp em um composable `useWhatsAppLink(source)` para padronizar mensagem pré-preenchida + UTMs.
- Substituir os CTAs existentes (Hero, Consultation, Karin, Footer, WhatsAppButton) para consumir o composable.
- Atualizar `useSeoMeta` em `app/pages/index.vue` e `app.head` em `nuxt.config.ts` para refletir nicho "Psiquiatra para adultos — ansiedade, insônia, depressão e TDAH" + OG image.

**Tech Stack:** Nuxt 4, Vue 3 (composition API + `<script setup>`), Tailwind CSS v4, daisyUI 5, lucide-vue-next, TypeScript strict.

**Decisões fixas:**
- Nicho: "Psiquiatra para adultos — ansiedade, insônia, depressão e TDAH"
- WhatsApp: `5547991259577`
- Instagram: `https://www.instagram.com/dra.karin.alana/`
- Lead magnet (1.4) **fora do escopo desta fatia**
- Analytics (1.6) **fora desta fatia** (vai em F4)

**Branch:** `feature/f1-hero-whatsapp`

---

## File Structure

**Create:**
- `app/composables/useWhatsAppLink.ts` — gera URL `wa.me` com texto pré-preenchido + UTMs por `source`
- `public/og/karin-og.jpg` — imagem Open Graph (1200x630). Reuso de `karin-psiq.png` redimensionada
- `tests/composables/useWhatsAppLink.spec.ts` — unit test do composable

**Modify:**
- `app/components/Hero.vue` — copy nova + CTA usando composable + remover redirect legacy `/conversion/...`
- `app/components/WhatsAppButton.vue` — usar composable (`source: 'floating'`)
- `app/components/Footer.vue` — usar composable (`source: 'footer'`)
- `app/components/Consultation.vue` — usar composable (`source: 'consultation'`)
- `app/components/Karin.vue` — usar composable (`source: 'about'`)
- `app/pages/index.vue` — `useSeoMeta` com nicho novo + OG
- `nuxt.config.ts` — `app.head.title/meta` defaults

**Setup (once):**
- `package.json` — adicionar `vitest` + `@vue/test-utils` + `happy-dom` em devDependencies (apenas para o unit test do composable)
- `vitest.config.ts` — config mínima Vitest

---

## Chunk 1: Setup de testes + Composable

### Task 1: Adicionar Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Instalar deps**

```bash
npm install -D vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

Expected: deps adicionadas em `devDependencies`, sem warnings críticos.

- [ ] **Step 2: Criar `vitest.config.ts`**

Conteúdo:

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.ts']
  }
})
```

- [ ] **Step 3: Adicionar script em `package.json`**

Em `scripts`, adicionar:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verificar ambiente**

Run: `npm run test`
Expected: "No test files found" (sem erro de config).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest setup for composables"
```

---

### Task 2: Composable `useWhatsAppLink` (TDD)

**Files:**
- Create: `tests/composables/useWhatsAppLink.spec.ts`
- Create: `app/composables/useWhatsAppLink.ts`

**Especificação:**
- Assinatura: `useWhatsAppLink(source: WhatsAppSource, customMessage?: string): { href: ComputedRef<string> }`
- Tipo: `type WhatsAppSource = 'hero' | 'floating' | 'footer' | 'consultation' | 'about' | 'navbar'`
- Número fixo: `5547991259577`
- Texto default por source (mapa interno):
  - `hero` → "Olá Dra. Karin, vim do site e gostaria de agendar uma consulta."
  - `floating` → "Olá Dra. Karin, vim pelo botão flutuante do site."
  - `footer` → "Olá Dra. Karin, vim pelo rodapé do site."
  - `consultation` → "Olá Dra. Karin, gostaria de saber mais sobre as consultas."
  - `about` → "Olá Dra. Karin, vim pela seção 'Quem é a Dra. Karin'."
  - `navbar` → "Olá Dra. Karin, vim pelo menu do site."
- UTMs: `utm_source=site&utm_medium=whatsapp&utm_campaign=site_karin&utm_content=<source>`
- Output final: `https://wa.me/5547991259577?text=<encoded message + UTMs>`

> Nota: `wa.me` ignora query params além de `text`, então UTMs vão **dentro** da `text` para registro no histórico de chat. Formato: `<msg>\n\n[utm_source=...&utm_content=...]`.

- [ ] **Step 1: Escrever testes falhando**

Conteúdo de `tests/composables/useWhatsAppLink.spec.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { useWhatsAppLink } from '../../app/composables/useWhatsAppLink'

describe('useWhatsAppLink', () => {
  it('returns wa.me URL with default phone', () => {
    const { href } = useWhatsAppLink('hero')
    expect(href.value.startsWith('https://wa.me/5547991259577?text=')).toBe(true)
  })

  it('encodes default message for hero source', () => {
    const { href } = useWhatsAppLink('hero')
    const decoded = decodeURIComponent(href.value.split('?text=')[1])
    expect(decoded).toContain('agendar uma consulta')
    expect(decoded).toContain('utm_content=hero')
  })

  it('uses customMessage when provided, still appends UTMs', () => {
    const { href } = useWhatsAppLink('footer', 'Mensagem custom')
    const decoded = decodeURIComponent(href.value.split('?text=')[1])
    expect(decoded).toContain('Mensagem custom')
    expect(decoded).toContain('utm_content=footer')
  })

  it('produces distinct utm_content per source', () => {
    const a = useWhatsAppLink('hero').href.value
    const b = useWhatsAppLink('floating').href.value
    expect(a).not.toBe(b)
    expect(decodeURIComponent(a)).toContain('utm_content=hero')
    expect(decodeURIComponent(b)).toContain('utm_content=floating')
  })
})
```

- [ ] **Step 2: Rodar p/ confirmar falha**

Run: `npm run test`
Expected: FAIL — "Cannot find module '../../app/composables/useWhatsAppLink'"

- [ ] **Step 3: Implementar composable mínimo**

Conteúdo de `app/composables/useWhatsAppLink.ts`:

```ts
import { computed, type ComputedRef } from 'vue'

export type WhatsAppSource =
  | 'hero'
  | 'floating'
  | 'footer'
  | 'consultation'
  | 'about'
  | 'navbar'

const PHONE = '5547991259577'

const DEFAULT_MESSAGES: Record<WhatsAppSource, string> = {
  hero: 'Olá Dra. Karin, vim do site e gostaria de agendar uma consulta.',
  floating: 'Olá Dra. Karin, vim pelo botão flutuante do site.',
  footer: 'Olá Dra. Karin, vim pelo rodapé do site.',
  consultation: 'Olá Dra. Karin, gostaria de saber mais sobre as consultas.',
  about: "Olá Dra. Karin, vim pela seção 'Quem é a Dra. Karin'.",
  navbar: 'Olá Dra. Karin, vim pelo menu do site.'
}

const UTM_BASE = 'utm_source=site&utm_medium=whatsapp&utm_campaign=site_karin'

export function useWhatsAppLink(source: WhatsAppSource, customMessage?: string): { href: ComputedRef<string> } {
  const href = computed(() => {
    const message = customMessage ?? DEFAULT_MESSAGES[source]
    const utm = `${UTM_BASE}&utm_content=${source}`
    const fullText = `${message}\n\n[${utm}]`
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(fullText)}`
  })
  return { href }
}
```

- [ ] **Step 4: Rodar p/ verde**

Run: `npm run test`
Expected: 4 testes PASS.

- [ ] **Step 5: Commit**

```bash
git add app/composables/useWhatsAppLink.ts tests/composables/useWhatsAppLink.spec.ts
git commit -m "feat(site): add useWhatsAppLink composable with per-source UTM tracking"
```

---

## Chunk 2: Hero refit (copy + CTA)

### Task 3: Hero copy nova + CTA WhatsApp real

**Files:**
- Modify: `app/components/Hero.vue`
- Modify: `app/pages/index.vue`

**Copy alvo (acordada com a Dra.):**
- Eyebrow: `Psiquiatria para adultos · Blumenau SC`
- H1: `Dra. Karin Boldarini` (mantém)
- Selo: `CRM SC 26419` (mantém)
- **Headline de dor (nova, abaixo do nome):** `Ansiedade, insônia, depressão e TDAH têm tratamento.`
- **Subheadline (description prop):** `Atendimento psiquiátrico humanizado para homens e mulheres adultos. Online ou presencial em Blumenau.`
- CTA primário: `Agendar consulta no WhatsApp` (substituir "Agendar minha consulta")

- [ ] **Step 1: Atualizar `app/pages/index.vue` para passar nova `description`**

Trocar bloco `<Hero ... />` para:

```vue
<Hero
  name="Dra. Karin Boldarini"
  title="CRM SC 26419 · Médica Psiquiatra"
  description="Atendimento psiquiátrico humanizado para homens e mulheres adultos. Online ou presencial em Blumenau."
/>
```

- [ ] **Step 2: Atualizar `app/components/Hero.vue`**

Substituir o `<script setup>`:

```vue
<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineProps<{
  name: string;
  title: string;
  description: string;
}>();

const { href: whatsappHref } = useWhatsAppLink('hero');
</script>
```

No `<template>`, dentro do bloco do conteúdo (antes do `<p>` da description), adicionar a headline de dor entre o selo CRM e o parágrafo:

```vue
<h2 class="font-aloe text-ink text-display-md md:text-display-lg leading-tight max-w-xl mx-auto lg:mx-0">
  Ansiedade, insônia, depressão e TDAH têm tratamento.
</h2>
```

Substituir o `<button>` do CTA por âncora:

```vue
<a
  :href="whatsappHref"
  target="_blank"
  rel="noopener"
  aria-label="Agendar consulta no WhatsApp"
  class="group inline-flex items-center justify-center gap-3 bg-ink text-sand px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-clay-dark transition-colors duration-300"
>
  <WhatsAppIcon :size="18" class="text-sand" />
  <span>Agendar consulta no WhatsApp</span>
  <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
</a>
```

Remover: `import AppointmentModal`, `showAppointmentModal`, `openAppointmentModal`, `closeAppointmentModal`, `<AppointmentModal .../>` no template, e o redirect `/conversion/consulta-online.html`.

> Se classes `text-display-md`, `text-display-lg`, `text-display-xl`, `bg-sand`, `bg-clay-dark`, `text-ink`, `text-ink-soft`, `text-ink-muted`, `text-eyebrow`, `font-aloe`, `accent-crm`, `bg-sand-warm` não existirem, verificar `app/assets/css/main.css` antes de assumir Tailwind defaults.

- [ ] **Step 3: Smoke local**

Run: `npm run dev`
Abrir `http://localhost:3000` no browser e verificar:
- Headline de dor aparece abaixo do CRM
- CTA WhatsApp abre `wa.me/5547991259577?text=...` com mensagem pré-preenchida
- Foto da Dra continua na coluna direita
- Sem modal de agendamento aparecendo

Se tudo OK, parar `npm run dev`.

- [ ] **Step 4: Type check**

Run: `npm run typecheck`
Expected: 0 erros relacionados a `Hero.vue` ou `useWhatsAppLink`.

- [ ] **Step 5: Commit**

```bash
git add app/components/Hero.vue app/pages/index.vue
git commit -m "feat(hero): pain-focused headline + WhatsApp CTA with tracking"
```

---

## Chunk 3: Outros CTAs usando composable

### Task 4: WhatsAppButton flutuante usa composable

**Files:**
- Modify: `app/components/WhatsAppButton.vue`

- [ ] **Step 1: Substituir conteúdo**

```vue
<script setup lang="ts">
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

const { href } = useWhatsAppLink('floating');
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    aria-label="Fale conosco no WhatsApp"
    class="fixed right-6 bottom-6 z-[9999] bg-[#25D366] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-[#1ebe5a] transition-colors duration-300"
  >
    <WhatsAppIcon :size="28" class="text-white" />
  </a>
</template>
```

- [ ] **Step 2: Validar no browser**

`npm run dev`. Clicar no botão flutuante e conferir URL com `utm_content=floating` no texto.

- [ ] **Step 3: Commit**

```bash
git add app/components/WhatsAppButton.vue
git commit -m "feat(whatsapp): floating button uses tracked link"
```

---

### Task 5: Footer / Consultation / Karin usam composable

**Files:**
- Modify: `app/components/Footer.vue`
- Modify: `app/components/Consultation.vue`
- Modify: `app/components/Karin.vue`

- [ ] **Step 1: Footer.vue — substituir CTA**

Localizar a âncora na linha 45 (`href="https://wa.me/5547991259577"`) e:
- Adicionar no `<script setup>`: `import { useWhatsAppLink } from '~/composables/useWhatsAppLink'; const { href: whatsappHref } = useWhatsAppLink('footer');`
- Trocar `href="https://wa.me/5547991259577"` por `:href="whatsappHref"`
- Garantir `target="_blank" rel="noopener"`.

- [ ] **Step 2: Consultation.vue — substituir CTA**

Localizar `href="/conversion/consulta-online.html"` (linha ~51) e:
- Adicionar `import { useWhatsAppLink }` + `const { href: whatsappHref } = useWhatsAppLink('consultation');`
- Trocar para `:href="whatsappHref"` + `target="_blank" rel="noopener"`.

- [ ] **Step 3: Karin.vue — mesmo tratamento**

Localizar `href="/conversion/consulta-online.html"` (linha ~41) e aplicar o mesmo padrão com `useWhatsAppLink('about')`.

- [ ] **Step 4: Grep de sanidade**

Run:

```bash
grep -rn "consulta-online.html\|wa.me/" app/ --include="*.vue"
```

Expected: nenhum resultado (todos CTAs migrados). Se sobrar, migrar também.

- [ ] **Step 5: Smoke browser**

`npm run dev`. Em cada seção (Footer, Consultation, Karin), clicar no CTA e validar a UTM correta.

- [ ] **Step 6: Type check**

Run: `npm run typecheck`
Expected: 0 erros.

- [ ] **Step 7: Commit**

```bash
git add app/components/Footer.vue app/components/Consultation.vue app/components/Karin.vue
git commit -m "feat(cta): migrate footer/consultation/about CTAs to tracked WhatsApp link"
```

---

## Chunk 4: Meta tags / SEO / OG

### Task 6: Atualizar meta tags com nicho novo

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `app/pages/index.vue`
- Create: `public/og/karin-og.jpg`

**Targets:**
- Title: `Dra. Karin Boldarini — Psiquiatra em Blumenau | Ansiedade, Insônia, Depressão e TDAH`
- Description (≤160 chars): `Psiquiatra em Blumenau e online. Atendimento humanizado para adultos com ansiedade, insônia, depressão e TDAH. Agende sua consulta no WhatsApp.`
- OG image: 1200×630 JPG, em `/og/karin-og.jpg`

- [ ] **Step 1: Gerar OG image**

Usar `karin-psiq.png` ou `karin.png` como base. Pode ser feito com ImageMagick:

```bash
mkdir -p public/og
magick public/images/karin-psiq.png -background "#F4ECE2" -gravity center -resize 1200x630^ -extent 1200x630 -quality 85 public/og/karin-og.jpg
```

Se `magick` não estiver instalado, criar manualmente (Figma/ferramenta) ou pedir ao usuário. Aceitar PNG temporário se necessário, mas preferir JPG ≤ 200 KB.

- [ ] **Step 2: Atualizar `nuxt.config.ts`**

No bloco `app.head`, trocar `title` e `meta description` para os valores acima e adicionar OG/Twitter defaults:

```ts
title: 'Dra. Karin Boldarini — Psiquiatra em Blumenau | Ansiedade, Insônia, Depressão e TDAH',
meta: [
  { name: 'description', content: 'Psiquiatra em Blumenau e online. Atendimento humanizado para adultos com ansiedade, insônia, depressão e TDAH. Agende sua consulta no WhatsApp.' },
  { name: 'theme-color', content: '#8B7355' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'pt_BR' },
  { property: 'og:site_name', content: 'Dra. Karin Boldarini' },
  { property: 'og:image', content: '/og/karin-og.jpg' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { name: 'twitter:card', content: 'summary_large_image' }
]
```

- [ ] **Step 3: Atualizar `app/pages/index.vue` `useSeoMeta`**

```ts
useSeoMeta({
  title: 'Dra. Karin Boldarini — Psiquiatra em Blumenau | Ansiedade, Insônia, Depressão e TDAH',
  description: 'Psiquiatra em Blumenau e online. Atendimento humanizado para adultos com ansiedade, insônia, depressão e TDAH. Agende sua consulta no WhatsApp.',
  ogTitle: 'Dra. Karin Boldarini — Psiquiatra para Adultos',
  ogDescription: 'Ansiedade, insônia, depressão e TDAH têm tratamento. Atendimento online ou presencial em Blumenau.',
  ogImage: '/og/karin-og.jpg',
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image'
})
```

- [ ] **Step 4: Validar no browser**

`npm run dev`. Abrir DevTools → Elements → conferir `<head>`:
- `<title>` contém "Psiquiatra em Blumenau"
- `<meta name="description">` correto
- `<meta property="og:image" content="/og/karin-og.jpg">` presente
- Acessar `http://localhost:3000/og/karin-og.jpg` direto e ver imagem renderizando.

- [ ] **Step 5: Commit**

```bash
git add nuxt.config.ts app/pages/index.vue public/og/karin-og.jpg
git commit -m "feat(seo): niche-aligned title/description + OG image"
```

---

## Chunk 5: Validação E2E + entrega

### Task 7: Smoke E2E com Playwright

**Files:**
- Nenhum arquivo novo no repo (script ad-hoc em `/tmp` via skill `playwright-skill`).

- [ ] **Step 1: Subir dev**

Run em background: `npm run dev`
Aguardar `http://localhost:3000` responder.

- [ ] **Step 2: Rodar E2E checklist via skill `playwright-skill`**

Checklist:
1. Página `/` carrega 200, screenshot fullpage
2. Hero contém texto "Ansiedade, insônia, depressão e TDAH"
3. Hero contém CRM "CRM SC 26419"
4. Botão "Agendar consulta no WhatsApp" presente
5. `href` do botão começa com `https://wa.me/5547991259577?text=` e contém `utm_content=hero` (decodificado)
6. Botão flutuante WhatsApp visível no canto inferior direito; `href` contém `utm_content=floating`
7. `<head>` contém `<meta property="og:image" content="/og/karin-og.jpg">`
8. `/og/karin-og.jpg` retorna 200

Salvar screenshots e o HTML report do skill em `.playwright-mcp/f1-smoke/`.

- [ ] **Step 3: Se algum item falhar**

Voltar à task correspondente, corrigir, re-rodar. Não prosseguir sem todos itens verdes.

- [ ] **Step 4: Parar dev e commit (se houve mudança de fix)**

Se nenhuma mudança: pular commit.

---

### Task 8: PR

- [ ] **Step 1: Push e abrir PR**

```bash
git push -u origin feature/f1-hero-whatsapp
gh pr create --base release/v2 --title "F1: Hero + Meta Tags + WhatsApp CTAs" --body "$(cat <<'EOF'
## Summary
- Hero copy alinhada ao nicho "psiquiatra para adultos — ansiedade, insônia, depressão, TDAH"
- Composable `useWhatsAppLink` centraliza geração de link WhatsApp com tracking UTM por origem
- Todos CTAs (Hero, Footer, Consultation, Karin, botão flutuante) migrados para o composable
- Meta tags / OG atualizados (title, description, ogImage)
- Setup mínimo de Vitest para testar o composable

## Test plan
- [ ] `npm run test` (4 testes do composable passam)
- [ ] `npm run typecheck` limpo
- [ ] Smoke E2E Playwright em `http://localhost:3000`
- [ ] Inspeção visual do Hero (headline de dor visível acima da dobra)
- [ ] DevTools → Network → clicar em cada CTA e validar URL `wa.me` com UTM correta

## Out of scope
- Lead magnet (1.4) — adiado
- Prova social via Google Reviews — F2
- Botão flutuante global → F3 (apenas refinamentos; já existia)
- Analytics (GA4 + Pixel) — F4
EOF
)"
```

- [ ] **Step 2: Aguardar review humano + deploy preview, ajustar conforme feedback.**

---

## Done criteria (F1)

- [ ] Hero exibe headline de dor com nicho correto
- [ ] Todos CTAs do site abrem WhatsApp com mensagem pré-preenchida + UTM por origem
- [ ] Meta `<title>`, `<meta description>` e `og:image` refletem nicho
- [ ] Vitest do composable verde (4 testes)
- [ ] `npm run typecheck` limpo
- [ ] Smoke E2E Playwright 100% verde
- [ ] PR aberto com checklist preenchido

## Out of scope (não implementar nesta fatia)

- Coleta/exibição de depoimentos do Google → F2
- JSON-LD `AggregateRating` → F2
- Lead magnet PDF + form de captura → adiado (admin/Resend, fase posterior)
- GA4 / Meta Pixel / eventos → F4
- Sequência de nutrição → adiado junto com lead magnet
