# Adequação do site — 20/10/2026

Implementação local para revisão da médica e da assessoria jurídica/CODAME, baseada no guia entregue em 20/10/2026. Não representa aprovação regulatória nem registro de publicação em produção.

## Identificação e decisões

- Branch: `bugfix/adequacao-crm-sc`.
- Versão anterior: `d78e744d798cfe50bff2a1b2133a366aaf6c60d1`.
- Identificação provisória: Dra. Karin Alana da Rosa Boldarini — MÉDICA — CRM-SC 26.419.
- Nenhuma pós-graduação é anunciada: falta confirmação documental do cadastro no CRM-SC. A eventual divulgação exige revisão do bloco completo, inclusive a expressão NÃO ESPECIALISTA.
- Atendimento online preservado: o presencial já estava desativado no projeto. Os textos não reabrem essa modalidade. O link legado de conversão presencial foi auditado, mas não é divulgado na home.
- Os nove artigos do blog também foram suspensos, pois o conjunto continha referências a especialidade, ofertas de tratamento e links às páginas retiradas. Não foram convertidos automaticamente em artigos educativos. Reintrodução depende de seleção, referências e revisão prévia.

## Inventário das alterações

| Superfície | Antes | Implementação |
| --- | --- | --- |
| Cabeçalho, hero e rodapé | Credencial incompleta e foco em doenças | Identificação MÉDICA + CRM; nome completo no Sobre e rodapé |
| Hero | Nome como H1 e lista de doenças | Nome como H1 e composição original preservados a pedido do usuário; identificação MÉDICA + CRM logo abaixo, descrição neutra e chamada para consulta médica |
| Atendimento | Promessas amplas e modalidades terapêuticas | Escuta e avaliação clínica, plano individualizado, acompanhamento responsável e telemedicina |
| Sobre | Pós-graduação, tratamento de doenças e promessas de resultado | Apresentação médica individualizada, sem titulação pendente |
| Documentos médicos | Sem aviso específico | Indicação clínica obrigatória e ausência de promessa de diagnóstico ou laudo |
| Depoimentos | Google/Doctoralia e atribuição de especialidade | Componente, textos e links de avaliações removidos |
| Especialidades | 12 landing pages e cards | Rotas, markdown, cards e gerador removidos; HTTP 301 para `/` |
| Blog | 9 artigos, alguns vinculados à captação por doença | Rotas, markdown, capas e gerador retirados; HTTP 301 para `/` |
| SEO | Especialidade, doenças e serviços no schema | Title, description, OG e Twitter neutros; JSON-LD `Person` com nome, profissão e CRM |
| Imagens | Retratos com nome `karin-psiq-*` | Arquivos `karin-retrato-*`, referências/preload atualizados; nova URL da imagem social |
| WhatsApp | Mensagens genéricas, UTMs inseridas no texto e páginas de conversão sem identificação | Consulta médica nas mensagens de agendamento; texto sem tags de rastreamento; identificação e noindex nas páginas de conversão |
| Sitemap | Rotas antigas e conteúdo promocional | Somente a home pública; exclusão das rotas removidas, admin e conversões |
| Geração | Prerender de blog e especialidades | Prerender da home e sitemap; sem cópias estáticas das páginas retiradas |

O módulo de conteúdo foi desativado para que o conteúdo retirado também não seja servido pelas APIs/coleções do Nuxt Content. A dependência instalada pode ser reaproveitada futuramente após revisão dos conteúdos.

## Redirecionamentos

Destino de todas as URLs abaixo: `/`, HTTP **301**. A regra cobre com e sem barra final, subcaminhos e preserva parâmetros de consulta. A home retorna 200, sem ciclo.

```text
/especialidades/
/especialidades/ansiedade/
/especialidades/depressao/
/especialidades/transtorno-bipolar/
/especialidades/tdah/
/especialidades/insonia/
/especialidades/sindrome-do-panico/
/especialidades/transtornos-alimentares/
/especialidades/transtornos-psicoticos/
/especialidades/toc/
/especialidades/autismo-tea/
/especialidades/transtorno-de-personalidade/
/especialidades/estresse-pos-traumatico/
/blog/
/blog/**
```

As regras HTTP são executadas pelo servidor Nitro (`node-server`). Se a publicação usar apenas arquivos estáticos, configurar os mesmos 301 no servidor/CDN e testar antes de liberar; redirecionamento no navegador não substitui HTTP 301.

## Preservação privada

Diretório fora do site, com acesso restrito ao usuário local:

`/Users/adrianoboldarini/.codex/private/karin-conformidade-2026-10-20/`

- `site-antes.tar`: código e assets versionados da versão anterior.
- SHA-256: `bc2aa32c629c9de855089dd0de9fb3cd8aa69c8566be71575701281787c1c6d6`.
- `antes/`: screenshots integrais e HTML da home e das 12 páginas em produção; `registro.json` contém URLs, horários e respostas HTTP.
- `inventario-antes.txt`: ocorrências no código versionado anterior.
- `depois/`: capturas locais, HTML, sitemap e relatório de validação com mensagens de WhatsApp e respostas dos redirects.
- `verify.cjs`: verificações de integração HTTP e navegador, executadas sem enviar mensagens nem criar agendamentos.

Nenhuma alteração, migration ou exportação de banco de produção foi executada. As capturas de depois são de ambiente local, não de produção.

## Validação

- Build de produção concluído.
- Seis testes existentes de WhatsApp aprovados.
- ESLint dos arquivos alterados aprovado.
- HTTP 301 das 12 URLs antigas, com e sem barra final; índices e URLs do blog também verificados.
- Home HTTP 200, apenas um H1, schema `Person`, sem links internos para conteúdo retirado.
- HTML renderizado e bundles públicos verificados quanto a termos de especialidade, doenças e schemas retirados.
- Sitemap de produção gerado com URL canônica `https://www.drakarin.com.br/` e sem rotas retiradas.
- Navegador em 1440, 390 e 320 px: sem erros JavaScript ou rolagem horizontal; menu móvel e abertura de privacidade verificados.
- Mensagens de seis links WhatsApp da home e duas páginas de conversão auditadas.
- Checagem de tipos não aprovada: o comando padrão baixa ferramentas com incompatibilidade TypeScript/vue-tsc. Usando o TypeScript 5.9.3 instalado, restam erros nos arquivos não alterados `app/middleware/admin.ts`, `app/services/appointment_service.ts` e `app/stores/appointment_store.ts`. Esse limite não impede o build, mas não permite declarar typecheck limpo.

## Pendências para publicação e aceite final

1. Revisão e aprovação escrita da médica e da assessoria jurídica/CODAME para os textos de staging.
2. Confirmar a modalidade de atendimento e o cadastro da pós-graduação antes de qualquer divulgação adicional.
3. Preparar deploy no ambiente real, preservando configuração, banco e volumes conforme o ambiente efetivamente utilizado.
4. Publicar e repetir os testes HTTP/HTML em produção, registrar versão, data/hora e responsável; preservar novas capturas.
5. Limpar caches do servidor/CDN e solicitar atualização das prévias sociais.
6. Enviar o sitemap, inspecionar a home e solicitar atualização/remoção das URLs antigas no Search Console. Registrar comprovantes.
7. Conferir separadamente Google Business Profile, Doctoralia, redes sociais, anúncios e diretórios. O código do site não altera esses serviços.

Referência normativa usada pelo guia: [Resolução CFM nº 2.336/2023](https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf). A interpretação e a aprovação final cabem à assessoria responsável.
