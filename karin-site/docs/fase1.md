# Fase 1 — Site: Conversão (prioridade máxima)

Escopo: karin-site. Meta: transformar site de cartão de visita em máquina de agendamento.

## Tarefas

### 1.1 Posicionamento / Nicho
**DECIDIDO:** "Psiquiatra para adultos — ansiedade, insônia, depressão e TDAH" (foco: homens e mulheres adultos)
- [ ] Aplicar nicho em: hero, meta title, meta description, OG tags

**Dados fixos:**
- WhatsApp: `5547991259577`
- Instagram: https://www.instagram.com/dra.karin.alana/

### 1.2 Hero Section
- [ ] Trocar headline atual por dor-específica. Ex: "Pare de viver no automático. Ansiedade, insônia e exaustão têm tratamento."
- [ ] Subheadline com credencial (CRM SC + especialidade)
- [ ] CTA primário: botão grande "Agendar consulta agora (WhatsApp)" → link `wa.me` com mensagem pré-preenchida
- [ ] CTA secundário: "Baixar guia gratuito" (lead magnet)
- [ ] Foto profissional da Dra acima da dobra

### 1.3 Prova Social
**Fontes existentes (não precisa coletar novo):**
- Google Business: reviews públicos da Dra
- Doctoralia: https://www.doctoralia.com.br/karin-boldarini/medico-clinico-geral-psicanalista/blumenau — acesso aos depoimentos completos é pago (assinar plano Doctoralia para extrair)

**Tarefas:**
- [ ] Extrair 5-10 depoimentos do Google Business (copiar texto + nome + data)
- [ ] Avaliar custo/benefício de assinar Doctoralia pago p/ pegar depoimentos de lá
- [ ] Badge com rating agregado: "⭐ 4.9 no Google • XX avaliações" com link para perfil
- [ ] Badge Doctoralia (se assinar): rating + link
- [ ] Criar seção "O que pacientes dizem" com carousel/grid dos depoimentos
- [ ] Schema.org `Review` / `AggregateRating` em JSON-LD (aparece em rich snippets Google)
- [ ] Selos: CRM SC, formação, tempo de atuação
- [ ] Contador: X pacientes atendidos / Y anos experiência

### 1.4 Lead Magnet
**ADIADO** — fora do escopo da Fase 1. Retomar em fase posterior.
Ferramenta escolhida p/ futuro: Resend + admin próprio (`/admin`).

### 1.5 WhatsApp Integration
- [ ] Todos CTAs apontam para `wa.me/55XXXXXXXXX?text=...`
- [ ] Mensagem pré-preenchida por origem (hero, footer, blog) para rastreio
- [ ] Botão WhatsApp flutuante em todas páginas

### 1.6 Medição
- [ ] GA4 + Meta Pixel instalados (IDs via env, placeholder até criar contas)
- [ ] Eventos: `click_whatsapp`, `submit_form` (sem `download_guia` — lead magnet adiado)
- [ ] UTM em todos links externos (IG bio, ads)

## Critério de done
Site publicado com: novo hero, prova social (Google Reviews), WhatsApp rastreado, analytics com placeholders validados.

## Fatiamento de execução (PRs)

| Fatia | Escopo | Branch |
|---|---|---|
| F1 | Hero + meta tags + WhatsApp CTAs + UTM + foto Dra | `feature/f1-hero-whatsapp` |
| F2 | Scraping Playwright Google Reviews → Testimonials + JSON-LD AggregateRating + selos CRM | `feature/f2-prova-social` |
| F3 | Botão WhatsApp flutuante global + link Instagram | `feature/f3-whatsapp-global` |
| F4 | GA4 + Pixel + eventos (envs placeholder) | `feature/f4-analytics` |
