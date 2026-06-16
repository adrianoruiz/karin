import { writeFileSync } from 'node:fs'

const DIR = 'content/blog'

const posts = [
  {
    slug: 'como-saber-se-preciso-de-psiquiatra',
    title: 'Como saber se preciso de um psiquiatra?',
    description: 'Sinais de que é hora de buscar avaliação psiquiátrica e como funciona a primeira consulta. Orientações da Dra. Karin Boldarini, psiquiatra em Blumenau.',
    category: 'Quando procurar ajuda',
    tags: ['psiquiatra', 'saúde mental', 'primeira consulta'],
    publishedAt: '2026-05-06',
    body: `# Como saber se preciso de um psiquiatra?

Muita gente convive por anos com sofrimento emocional achando que é "frescura" ou que vai passar sozinho. Procurar um psiquiatra não é sinal de fraqueza — é cuidado com a saúde, como ir ao cardiologista pelo coração.

## Sinais de que vale buscar avaliação

Alguns sinais indicam que é hora de procurar ajuda profissional:

- Tristeza, desânimo ou irritabilidade que persistem por semanas
- Preocupação ou medo excessivos que atrapalham a rotina
- Dificuldade para dormir ou sono que não descansa
- Queda de concentração, memória ou produtividade
- Crises de ansiedade, pânico ou pensamentos que não se controlam
- Uso de álcool ou outras substâncias para "dar conta" do dia

Você não precisa esperar chegar ao limite. Quanto antes a avaliação, melhores os resultados.

## Condições que um psiquiatra trata

O psiquiatra cuida de diversas condições, como [ansiedade](/especialidades/ansiedade), [depressão](/especialidades/depressao), [insônia](/especialidades/insonia), [TDAH](/especialidades/tdah), [transtorno bipolar](/especialidades/transtorno-bipolar) e [síndrome do pânico](/especialidades/sindrome-do-panico). Veja [todas as áreas de atuação](/especialidades).

## Como é a primeira consulta

A primeira consulta é uma conversa cuidadosa sobre sua história, seus sintomas e o que te trouxe ali. A partir disso, construímos juntos um plano de tratamento individual — que pode ou não incluir medicação.

> Sente que é o seu momento? A Dra. Karin Boldarini (CRM SC 26419) atende em Blumenau e online. [Agende sua consulta pelo WhatsApp](https://wa.me/5547991259577).
`
  },
  {
    slug: 'ansiedade-ou-estresse-como-diferenciar',
    title: 'Ansiedade ou estresse? Como diferenciar',
    description: 'Estresse e ansiedade se parecem, mas não são a mesma coisa. Entenda a diferença e quando a ansiedade merece tratamento. Por Dra. Karin Boldarini.',
    category: 'Ansiedade',
    tags: ['ansiedade', 'estresse', 'saúde mental'],
    publishedAt: '2026-05-14',
    body: `# Ansiedade ou estresse? Como diferenciar

"Estou estressado" e "estou ansioso" viraram quase sinônimos no dia a dia. Mas, do ponto de vista da saúde mental, há diferenças importantes — e reconhecê-las ajuda a saber quando buscar ajuda.

## O que é estresse

O estresse costuma ter um gatilho claro e externo: um prazo, uma discussão, um problema concreto. Ele tende a diminuir quando a situação se resolve. É uma resposta natural e, em doses pequenas, até útil.

## O que é ansiedade

A ansiedade vai além do gatilho. É uma preocupação que persiste mesmo sem motivo aparente, antecipa o pior e não "desliga". Quando se torna frequente e intensa, pode evoluir para um [transtorno de ansiedade](/especialidades/ansiedade), que afeta o sono, a concentração e o corpo (taquicardia, tensão, falta de ar).

## Como diferenciar na prática

| | Estresse | Ansiedade |
|---|---|---|
| Gatilho | Claro e externo | Difuso, às vezes sem causa |
| Duração | Passa com a situação | Persiste por semanas |
| Foco | No problema atual | No "e se" do futuro |

## Quando procurar ajuda

Se a preocupação é constante, atrapalha sua vida e não melhora sozinha, vale uma avaliação. A ansiedade tem tratamento eficaz. Saiba mais sobre o [tratamento de ansiedade em Blumenau](/especialidades/ansiedade).

> A Dra. Karin Boldarini atende em Blumenau e online. [Agende pelo WhatsApp](https://wa.me/5547991259577).
`
  },
  {
    slug: 'sinais-de-tdah-em-adultos',
    title: 'Sinais de TDAH em adultos: você se reconhece?',
    description: 'Desorganização, esquecimentos e dificuldade de foco podem ser TDAH no adulto. Conheça os sinais e como é feito o diagnóstico. Por Dra. Karin Boldarini.',
    category: 'TDAH',
    tags: ['tdah', 'adultos', 'foco'],
    publishedAt: '2026-05-22',
    body: `# Sinais de TDAH em adultos: você se reconhece?

O TDAH não é "coisa de criança". Muitos adultos passam a vida se achando preguiçosos ou desorganizados, sem saber que convivem com um transtorno do neurodesenvolvimento — e que existe tratamento.

## Sinais comuns no adulto

- Começar muitas tarefas e terminar poucas
- Perder prazos, objetos e o fio da conversa
- Dificuldade de manter o foco em coisas "chatas"
- Procrastinação e oscilação grande de produtividade
- Impulsividade em compras, falas ou decisões
- Sensação crônica de estar "devendo" e correndo atrás

## Por que muitos só descobrem na vida adulta

Pessoas com boa inteligência ou rotina estruturada compensam os sintomas por anos. Quando a vida fica mais complexa (trabalho, filhos, contas), a conta chega — e as dificuldades aparecem com força.

## Como é feito o diagnóstico

O diagnóstico de TDAH é clínico: baseia-se na sua história de vida e na repercussão atual dos sintomas. Não existe exame único. Entenda melhor o [tratamento de TDAH em Blumenau](/especialidades/tdah).

Vale lembrar: dificuldade de foco também pode vir de [ansiedade](/especialidades/ansiedade) ou [depressão](/especialidades/depressao). Por isso a avaliação cuidadosa é essencial.

> A Dra. Karin Boldarini (CRM SC 26419) atende em Blumenau e online. [Agende pelo WhatsApp](https://wa.me/5547991259577).
`
  },
  {
    slug: 'depressao-sintomas-que-merecem-atencao',
    title: 'Depressão: sintomas que merecem atenção',
    description: 'Depressão é mais do que tristeza. Conheça os sintomas que merecem atenção e quando buscar um psiquiatra. Por Dra. Karin Boldarini, em Blumenau.',
    category: 'Depressão',
    tags: ['depressão', 'humor', 'saúde mental'],
    publishedAt: '2026-05-30',
    body: `# Depressão: sintomas que merecem atenção

A depressão é uma das condições de saúde mental mais comuns — e uma das mais cercadas de mitos. Não é frescura, nem falta de fé ou de força de vontade. É uma doença que tem tratamento.

## Não é só tristeza

A tristeza é passageira e ligada a um motivo. A [depressão](/especialidades/depressao) é persistente e afeta várias áreas da vida ao mesmo tempo.

## Sintomas que merecem atenção

- Desânimo ou vazio na maior parte do dia, por semanas
- Perda de interesse e prazer em coisas que antes gostava
- Cansaço e falta de energia constantes
- Alterações de sono e de apetite
- Culpa, baixa autoestima e sensação de peso
- Dificuldade de concentração e de tomar decisões

Se vários desses sintomas estão presentes há duas semanas ou mais, é hora de buscar avaliação.

## A boa notícia

A depressão é tratável, e a maioria das pessoas melhora com acompanhamento adequado. O tratamento é individual e pode envolver psicoterapia e, em parte dos casos, medicação. Conheça o [tratamento de depressão em Blumenau](/especialidades/depressao).

> Você não precisa enfrentar isso sozinho. A Dra. Karin Boldarini atende em Blumenau e online. [Agende pelo WhatsApp](https://wa.me/5547991259577).
`
  },
  {
    slug: 'insonia-quando-procurar-ajuda',
    title: 'Insônia: quando procurar ajuda profissional',
    description: 'Noites mal dormidas viraram rotina? Saiba quando a insônia precisa de tratamento e como ela se conecta à saúde mental. Por Dra. Karin Boldarini.',
    category: 'Sono',
    tags: ['insônia', 'sono', 'saúde mental'],
    publishedAt: '2026-06-05',
    body: `# Insônia: quando procurar ajuda profissional

Uma noite mal dormida acontece com todo mundo. O problema é quando isso vira rotina e começa a cobrar seu preço no humor, na energia e na saúde.

## Quando a insônia vira um problema

Vale procurar ajuda quando a dificuldade de dormir:

- Acontece várias noites por semana
- Persiste por semanas
- Prejudica seu dia seguinte (cansaço, irritabilidade, falta de foco)

Nesses casos, não se trata mais de "dormir mal" — é uma [insônia](/especialidades/insonia) que merece avaliação.

## Sono e mente andam juntos

A insônia raramente vem sozinha. Ela costuma estar ligada a [ansiedade](/especialidades/ansiedade) e [depressão](/especialidades/depressao) — e o contrário também é verdade: dormir mal piora o humor. Tratar a causa de base costuma destravar o sono.

## Remédio para dormir é a solução?

Nem sempre. O uso de medicação é avaliado com critério, porque alguns remédios têm risco de dependência. Muitas vezes, mudanças de hábitos e abordagens comportamentais resolvem sem uso contínuo. Veja como funciona o [tratamento de insônia em Blumenau](/especialidades/insonia).

> A Dra. Karin Boldarini atende em Blumenau e online. [Agende pelo WhatsApp](https://wa.me/5547991259577).
`
  },
  {
    slug: 'psiquiatra-ou-psicologo-qual-a-diferenca',
    title: 'Psiquiatra ou psicólogo: qual a diferença?',
    description: 'Entenda a diferença entre psiquiatra e psicólogo, quando procurar cada um e como eles se complementam. Por Dra. Karin Boldarini, psiquiatra em Blumenau.',
    category: 'Saúde mental',
    tags: ['psiquiatra', 'psicólogo', 'tratamento'],
    publishedAt: '2026-06-12',
    body: `# Psiquiatra ou psicólogo: qual a diferença?

É uma das dúvidas mais comuns de quem busca cuidar da saúde mental pela primeira vez. A boa notícia: você não precisa escolher um "contra" o outro — muitas vezes, eles trabalham juntos.

## O psiquiatra

O psiquiatra é médico. Pode investigar causas físicas, fazer diagnósticos, prescrever medicação e coordenar o tratamento de condições como [depressão](/especialidades/depressao), [transtorno bipolar](/especialidades/transtorno-bipolar), [TDAH](/especialidades/tdah) e [síndrome do pânico](/especialidades/sindrome-do-panico).

## O psicólogo

O psicólogo conduz a psicoterapia — o trabalho de fala e elaboração que ajuda a entender padrões, lidar com emoções e desenvolver novas estratégias. Não prescreve medicação.

## Quando procurar cada um

- **Sintomas intensos, com impacto físico ou necessidade de diagnóstico/medicação** → psiquiatra
- **Trabalho contínuo sobre emoções, relações e comportamento** → psicólogo
- **Muitos casos se beneficiam dos dois ao mesmo tempo**

Na dúvida, uma avaliação psiquiátrica ajuda a entender o que você precisa naquele momento. Veja todas as [áreas de atuação](/especialidades).

> A Dra. Karin Boldarini (CRM SC 26419) atende em Blumenau e online. [Agende pelo WhatsApp](https://wa.me/5547991259577).
`
  }
]

for (const p of posts) {
  const tags = `[${p.tags.join(', ')}]`
  const md = `---
title: ${JSON.stringify(p.title)}
description: ${JSON.stringify(p.description)}
category: ${JSON.stringify(p.category)}
author: Dra. Karin Boldarini
tags: ${tags}
publishedAt: ${p.publishedAt}
draft: false
---

${p.body}`
  writeFileSync(`${DIR}/${p.slug}.md`, md)
  console.log('escrito', `${p.slug}.md`)
}
console.log('\nTotal:', posts.length)
