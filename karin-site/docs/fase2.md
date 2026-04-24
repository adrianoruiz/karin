# Fase 2 — SEO + Blog (tráfego orgânico recorrente)

Escopo: karin-site. Meta: capturar busca orgânica por sintomas/dúvidas.

## Tarefas

### 2.1 Estrutura técnica
- [ ] Rota `/blog` com listagem + paginação
- [ ] Rota `/blog/[slug]` com conteúdo, TOC, autor, data, tempo de leitura
- [ ] Usar `@nuxt/content` (já no stack) para artigos em markdown
- [ ] `sitemap.xml` automático
- [ ] `robots.txt` com sitemap
- [ ] JSON-LD: `MedicalWebPage` + `Person` (Dra) + `Article` por post
- [ ] OG tags + Twitter cards por post
- [ ] Canonical URLs

### 2.2 Keywords prioritárias (long-tail, alta intenção)
- [ ] "ansiedade sintomas físicos"
- [ ] "insônia o que fazer"
- [ ] "crise de ansiedade o que fazer na hora"
- [ ] "burnout sintomas"
- [ ] "diferença ansiedade e depressão"
- [ ] "psiquiatra online como funciona"

### 2.3 Primeiros 6 artigos
- [ ] 1 artigo por keyword da 2.2 (1500-2000 palavras cada)
- [ ] Cada artigo termina com CTA: "Agendar consulta" + lead magnet
- [ ] Links internos entre artigos relacionados

### 2.4 Performance (SEO ranking)
- [ ] Lighthouse: Performance > 90, SEO 100, Accessibility > 95
- [ ] LCP < 2.5s, CLS < 0.1
- [ ] Imagens otimizadas (`<NuxtImg>` com lazy + formatos modernos)
- [ ] Fontes self-hosted ou preload

### 2.5 Google
- [ ] Google Search Console configurado
- [ ] Sitemap submetido
- [ ] Google Business Profile vinculado (se atendimento presencial)

## Critério de done
Blog no ar com 6 artigos, indexado no GSC, Lighthouse > 90, cada artigo com CTA rastreado.
