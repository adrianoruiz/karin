import { writeFileSync, mkdirSync } from 'node:fs'

const DIR = 'content/especialidades'
mkdirSync(DIR, { recursive: true })
const UPDATED = '2026-06-16'

const data = [
  {
    slug: 'ansiedade', icon: 'Wind', order: 1, condition: 'Ansiedade',
    nome: 'Ansiedade',
    def: 'A ansiedade é uma reação natural do organismo diante de situações de perigo ou pressão. Ela se torna um transtorno quando é intensa, frequente e desproporcional, atrapalhando o trabalho, os relacionamentos e o dia a dia.',
    sintomas: ['Preocupação excessiva e difícil de controlar', 'Tensão muscular, aperto no peito e falta de ar', 'Irritabilidade e dificuldade de concentração', 'Insônia ou sono não reparador', 'Sintomas físicos como taquicardia, sudorese e dores'],
    trat: 'O tratamento é individualizado e pode combinar psicoterapia, mudanças de hábitos e, quando indicado, medicação. O objetivo é reduzir os sintomas, devolver qualidade de vida e ensinar formas de lidar com a ansiedade a longo prazo.',
    faq: [
      ['Ansiedade tem cura?', 'A ansiedade tem tratamento eficaz. Com acompanhamento adequado, a maioria das pessoas consegue controlar os sintomas e retomar a rotina. O plano é definido de forma individual em consulta.'],
      ['Quando a ansiedade vira um problema de saúde?', 'Quando passa a ser frequente, intensa e interfere no sono, no trabalho ou nos relacionamentos. Nesses casos, vale procurar avaliação com psiquiatra.'],
      ['Preciso tomar remédio para ansiedade?', 'Nem sempre. A indicação de medicação depende da gravidade e é avaliada caso a caso. Muitas pessoas melhoram com psicoterapia e mudanças de hábitos.']
    ]
  },
  {
    slug: 'depressao', icon: 'CloudRain', order: 2, condition: 'Depressão',
    nome: 'Depressão',
    def: 'A depressão é um transtorno do humor que vai muito além da tristeza passageira. Afeta a forma de pensar, sentir e agir, podendo comprometer o sono, o apetite, a energia e o interesse pelas atividades.',
    sintomas: ['Tristeza ou vazio na maior parte do dia', 'Perda de interesse e prazer em atividades', 'Cansaço e falta de energia', 'Alterações de sono e apetite', 'Sentimento de culpa, baixa autoestima ou desesperança'],
    trat: 'O tratamento da depressão é individualizado e costuma envolver psicoterapia e, em parte dos casos, medicação antidepressiva. O acompanhamento psiquiátrico ajusta a conduta ao longo do tempo e monitora a evolução com segurança.',
    faq: [
      ['Como sei se tenho depressão ou só estou triste?', 'A tristeza é passageira e ligada a um motivo. A depressão é persistente (semanas ou mais), afeta várias áreas da vida e costuma vir com perda de interesse, energia e alterações de sono. A avaliação profissional confirma o diagnóstico.'],
      ['Depressão tem tratamento?', 'Sim. A depressão é tratável e a maioria das pessoas melhora com acompanhamento adequado. Quanto antes iniciar, melhor o prognóstico.'],
      ['Todo caso de depressão precisa de remédio?', 'Não. A necessidade de medicação depende da intensidade e é avaliada individualmente. Casos leves podem responder bem à psicoterapia.']
    ]
  },
  {
    slug: 'transtorno-bipolar', icon: 'Waves', order: 3, condition: 'Transtorno Afetivo Bipolar',
    nome: 'Transtorno Afetivo Bipolar',
    def: 'O transtorno afetivo bipolar é caracterizado por oscilações importantes do humor, alternando períodos de depressão com fases de euforia ou agitação (mania ou hipomania). Essas variações afetam a energia, o sono e o comportamento.',
    sintomas: ['Fases de humor muito elevado, agitado ou irritável', 'Períodos de depressão com perda de energia e interesse', 'Alterações marcantes do sono', 'Impulsividade e decisões precipitadas em fases de euforia', 'Oscilações que interferem na rotina e nos relacionamentos'],
    trat: 'O acompanhamento psiquiátrico é essencial. O tratamento envolve estabilizadores de humor e acompanhamento contínuo para reduzir as oscilações, prevenir crises e manter a estabilidade. A psicoterapia complementa o cuidado.',
    faq: [
      ['Transtorno bipolar tem tratamento?', 'Sim. Embora seja uma condição crônica, com acompanhamento adequado é possível estabilizar o humor e ter uma vida plena. O tratamento é contínuo e individualizado.'],
      ['Qual a diferença entre bipolaridade e mudanças normais de humor?', 'Mudanças normais de humor são breves e proporcionais. No transtorno bipolar, as oscilações são intensas, duram dias ou semanas e prejudicam a vida. Só a avaliação clínica diferencia.'],
      ['Posso parar a medicação quando me sentir bem?', 'Não sem orientação. Interromper o tratamento por conta própria é uma causa frequente de recaída. Qualquer ajuste deve ser feito com o psiquiatra.']
    ]
  },
  {
    slug: 'tdah', icon: 'Zap', order: 4, condition: 'TDAH',
    nome: 'TDAH (Transtorno do Déficit de Atenção e Hiperatividade)',
    def: 'O TDAH é um transtorno do neurodesenvolvimento que afeta a atenção, o controle de impulsos e, em parte dos casos, o nível de agitação. Em adultos, costuma se manifestar como dificuldade de organização, foco e finalização de tarefas.',
    sintomas: ['Dificuldade de manter o foco e concluir tarefas', 'Esquecimentos e desorganização frequentes', 'Inquietação e dificuldade de esperar', 'Impulsividade nas decisões e na fala', 'Procrastinação e oscilação de produtividade'],
    trat: 'O diagnóstico é clínico e cuidadoso. O tratamento pode combinar medicação, estratégias de organização e psicoterapia, melhorando o foco, a regulação emocional e o desempenho na rotina.',
    faq: [
      ['Adulto pode ter TDAH?', 'Sim. O TDAH começa na infância, mas muitas pessoas só são diagnosticadas na vida adulta, ao perceberem dificuldades persistentes de atenção e organização. A avaliação com psiquiatra esclarece o quadro.'],
      ['Como é feito o diagnóstico de TDAH?', 'O diagnóstico é clínico, baseado na história de vida, nos sintomas atuais e em sua repercussão. Não existe um exame único; a avaliação detalhada é fundamental.'],
      ['Quem tem TDAH precisa tomar remédio a vida toda?', 'Depende. A medicação ajuda muitos pacientes, mas o plano é individual e pode incluir estratégias não medicamentosas. A conduta é revista periodicamente.']
    ]
  },
  {
    slug: 'insonia', icon: 'Moon', order: 5, condition: 'Insônia',
    nome: 'Insônia',
    def: 'A insônia é a dificuldade persistente de iniciar ou manter o sono, ou de ter um sono reparador, mesmo com oportunidade adequada para dormir. Com o tempo, afeta o humor, a concentração e a saúde física.',
    sintomas: ['Dificuldade para pegar no sono', 'Despertares frequentes durante a noite', 'Acordar muito cedo e não conseguir voltar a dormir', 'Cansaço e sonolência durante o dia', 'Irritabilidade e queda de desempenho'],
    trat: 'O tratamento investiga as causas (estresse, ansiedade, hábitos, outras condições) e combina higiene do sono, abordagens comportamentais e, quando necessário, medicação. O foco é restaurar um sono de qualidade de forma sustentável.',
    faq: [
      ['Quando a insônia precisa de tratamento?', 'Quando ocorre várias noites por semana, persiste por semanas e prejudica o dia seguinte. Nesses casos, a avaliação ajuda a identificar a causa e o melhor tratamento.'],
      ['Remédio para dormir vicia?', 'Alguns medicamentos têm potencial de dependência se usados sem critério. Por isso a prescrição é cuidadosa e acompanhada. Muitas vezes, mudanças comportamentais resolvem sem uso contínuo de remédio.'],
      ['A insônia pode ser sintoma de outra coisa?', 'Sim. Ansiedade, depressão e outras condições frequentemente causam insônia. Tratar a causa de base costuma melhorar o sono.']
    ]
  },
  {
    slug: 'sindrome-do-panico', icon: 'HeartPulse', order: 6, condition: 'Transtorno de Pânico',
    nome: 'Síndrome do Pânico',
    def: 'A síndrome do pânico (transtorno de pânico) é marcada por crises súbitas e intensas de medo, acompanhadas de sintomas físicos fortes. O medo de novas crises pode levar a evitações e limitar a vida da pessoa.',
    sintomas: ['Crises súbitas de medo intenso', 'Taquicardia, falta de ar e sensação de sufocamento', 'Tontura, tremores e suor', 'Sensação de perda de controle ou de morte iminente', 'Medo constante de ter novas crises'],
    trat: 'O transtorno de pânico responde bem ao tratamento, que costuma envolver psicoterapia e, quando indicado, medicação. O acompanhamento reduz a frequência das crises e devolve a sensação de segurança.',
    faq: [
      ['Crise de pânico é perigosa?', 'A crise é muito desconfortável, mas não coloca a vida em risco. Ainda assim, os sintomas merecem avaliação para confirmar o diagnóstico e iniciar o tratamento.'],
      ['Síndrome do pânico tem cura?', 'Tem tratamento eficaz. A maioria das pessoas reduz ou elimina as crises com acompanhamento adequado e retoma a rotina normalmente.'],
      ['Como diferenciar pânico de problema no coração?', 'Os sintomas podem se parecer. Por isso, diante de crises, é importante a avaliação médica para descartar causas físicas e, então, tratar o transtorno de pânico.']
    ]
  },
  {
    slug: 'transtornos-alimentares', icon: 'Apple', order: 7, condition: 'Transtornos Alimentares',
    nome: 'Transtornos Alimentares',
    def: 'Os transtornos alimentares — como anorexia, bulimia e compulsão alimentar — envolvem uma relação sofrida com a comida, o peso e a imagem corporal. São condições sérias que afetam a saúde física e emocional.',
    sintomas: ['Preocupação excessiva com peso, corpo e alimentação', 'Episódios de restrição ou de compulsão alimentar', 'Comportamentos compensatórios (vômitos, jejuns, exercícios excessivos)', 'Distorção da imagem corporal', 'Culpa e sofrimento relacionados às refeições'],
    trat: 'O tratamento é multidisciplinar e cuidadoso, com acompanhamento psiquiátrico e psicológico, muitas vezes em conjunto com nutrição. O objetivo é restabelecer a saúde e construir uma relação mais saudável com a comida.',
    faq: [
      ['Transtorno alimentar é só questão de força de vontade?', 'Não. São transtornos de saúde mental com causas biológicas e emocionais, e exigem tratamento adequado — não se resolvem apenas com força de vontade.'],
      ['Quando procurar ajuda?', 'Sempre que a alimentação, o peso ou a imagem corporal causarem sofrimento intenso ou comportamentos de risco. Quanto antes o tratamento, melhor a recuperação.'],
      ['O tratamento é só com psiquiatra?', 'Costuma ser multidisciplinar, envolvendo psiquiatra, psicólogo e, frequentemente, nutricionista, de forma integrada.']
    ]
  },
  {
    slug: 'transtornos-psicoticos', icon: 'Eye', order: 8, condition: 'Transtornos Psicóticos',
    nome: 'Transtornos Psicóticos',
    def: 'Os transtornos psicóticos — como a esquizofrenia — afetam a forma como a pessoa percebe e interpreta a realidade. Podem surgir alterações de pensamento, percepção e comportamento que exigem acompanhamento especializado.',
    sintomas: ['Alucinações (ouvir ou ver coisas que não existem)', 'Delírios (crenças firmes sem base na realidade)', 'Pensamento e fala desorganizados', 'Isolamento social e queda no funcionamento', 'Dificuldade em distinguir o que é real'],
    trat: 'O acompanhamento psiquiátrico é fundamental e contínuo. O tratamento envolve medicação antipsicótica e suporte, com foco em estabilizar os sintomas, prevenir crises e preservar a autonomia e a qualidade de vida.',
    faq: [
      ['Transtorno psicótico tem tratamento?', 'Sim. Com acompanhamento adequado e contínuo, é possível controlar os sintomas e melhorar significativamente a qualidade de vida. O início precoce faz diferença.'],
      ['A família pode ajudar?', 'Sim. O apoio da família é parte importante do tratamento, ajudando na adesão e na identificação precoce de sinais de crise.'],
      ['É possível ter uma vida normal?', 'Muitas pessoas em tratamento mantêm rotina, trabalho e relações. O acompanhamento contínuo é o que sustenta a estabilidade.']
    ]
  },
  {
    slug: 'toc', icon: 'Repeat', order: 9, condition: 'Transtorno Obsessivo-Compulsivo',
    nome: 'TOC (Transtorno Obsessivo-Compulsivo)',
    def: 'O TOC é caracterizado por obsessões (pensamentos intrusivos e angustiantes) e compulsões (rituais ou comportamentos repetitivos para aliviar a ansiedade). Esse ciclo consome tempo e gera sofrimento significativo.',
    sintomas: ['Pensamentos intrusivos e repetitivos que geram angústia', 'Necessidade de realizar rituais ou verificações', 'Preocupação excessiva com limpeza, ordem ou simetria', 'Dúvidas constantes e dificuldade de "deixar para lá"', 'Tempo significativo gasto com obsessões e compulsões'],
    trat: 'O TOC responde bem ao tratamento, que costuma combinar psicoterapia (especialmente abordagens comportamentais) e medicação. O acompanhamento ajuda a reduzir os rituais e a retomar o controle da rotina.',
    faq: [
      ['Mania de organização é TOC?', 'Nem sempre. O TOC envolve sofrimento e rituais que tomam tempo e atrapalham a vida. Gostar de ordem, por si só, não é transtorno. A avaliação esclarece.'],
      ['TOC tem tratamento?', 'Sim. Com psicoterapia adequada e, quando indicado, medicação, a maioria das pessoas reduz bastante os sintomas e melhora a qualidade de vida.'],
      ['Por que não consigo simplesmente parar os rituais?', 'Porque o TOC é um transtorno, não falta de vontade. Os rituais aliviam a ansiedade momentaneamente, reforçando o ciclo. O tratamento ajuda a quebrá-lo.']
    ]
  },
  {
    slug: 'autismo-tea', icon: 'Puzzle', order: 10, condition: 'Transtorno do Espectro Autista',
    nome: 'TEA (Transtorno do Espectro Autista) em adultos',
    def: 'O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento que influencia a comunicação, a interação social e os padrões de comportamento e interesses. Em adultos, o diagnóstico pode trazer compreensão e novas estratégias de vida.',
    sintomas: ['Dificuldades na comunicação e na interação social', 'Interesses intensos e específicos', 'Necessidade de rotina e desconforto com mudanças', 'Sensibilidade a estímulos (sons, luzes, texturas)', 'Sensação de não se encaixar socialmente'],
    trat: 'A avaliação é cuidadosa e individualizada. O acompanhamento foca em compreender o funcionamento da pessoa, manejar comorbidades (como ansiedade e depressão) e desenvolver estratégias que melhorem o bem-estar e a autonomia.',
    faq: [
      ['Adulto pode ser diagnosticado com autismo?', 'Sim. Muitos adultos recebem o diagnóstico de TEA tardiamente, o que ajuda a entender dificuldades de longa data e a buscar suporte adequado.'],
      ['O TEA tem cura?', 'O TEA não é uma doença a ser curada, e sim uma forma de funcionamento. O acompanhamento melhora a qualidade de vida e trata condições associadas.'],
      ['Quem faz o diagnóstico de TEA em adultos?', 'A avaliação pode envolver psiquiatra e outros profissionais, com base na história de vida e nas características atuais.']
    ]
  },
  {
    slug: 'transtorno-de-personalidade', icon: 'UsersRound', order: 11, condition: 'Transtornos de Personalidade',
    nome: 'Transtornos de Personalidade',
    def: 'Os transtornos de personalidade envolvem padrões persistentes de pensamento, emoção e comportamento que se distanciam do esperado e geram sofrimento ou dificuldades nas relações e na vida. O tratamento ajuda a desenvolver formas mais flexíveis de lidar com as situações.',
    sintomas: ['Padrões rígidos de comportamento ao longo do tempo', 'Dificuldades recorrentes nos relacionamentos', 'Instabilidade emocional ou impulsividade', 'Dificuldade em lidar com críticas, frustração ou limites', 'Sofrimento significativo no convívio social ou no trabalho'],
    trat: 'O tratamento tem como base a psicoterapia, podendo incluir medicação para sintomas associados. O acompanhamento ajuda a compreender os padrões, regular emoções e construir relações mais saudáveis.',
    faq: [
      ['Transtorno de personalidade tem tratamento?', 'Sim. A psicoterapia é o principal recurso e traz melhora consistente. A medicação pode auxiliar em sintomas como ansiedade e instabilidade emocional.'],
      ['É possível mudar padrões de personalidade?', 'O objetivo não é "mudar quem a pessoa é", e sim desenvolver formas mais flexíveis e saudáveis de lidar com emoções e relações. Isso é alcançável com acompanhamento.'],
      ['Como saber se preciso de avaliação?', 'Quando padrões repetidos de comportamento causam sofrimento ou prejuízo nas relações e na vida, vale buscar avaliação especializada.']
    ]
  },
  {
    slug: 'estresse-pos-traumatico', icon: 'ShieldAlert', order: 12, condition: 'Transtorno de Estresse Pós-Traumático',
    nome: 'Transtorno de Estresse Pós-Traumático (TEPT)',
    def: 'O TEPT pode surgir após viver ou presenciar um evento traumático. A pessoa revive a experiência, evita lembranças e permanece em estado de alerta, o que afeta o sono, o humor e a rotina.',
    sintomas: ['Revivências do trauma (memórias intrusivas, pesadelos)', 'Evitação de lugares, pessoas ou assuntos ligados ao evento', 'Estado de alerta constante e sobressaltos', 'Alterações de humor, irritabilidade e culpa', 'Dificuldade de sono e concentração'],
    trat: 'O tratamento do TEPT envolve psicoterapia focada no trauma e, quando indicado, medicação. O acompanhamento ajuda a processar a experiência, reduzir os sintomas e retomar a sensação de segurança.',
    faq: [
      ['Quanto tempo após o trauma o TEPT aparece?', 'Os sintomas podem surgir logo após o evento ou semanas e meses depois. Se persistem e atrapalham a vida, é importante buscar avaliação.'],
      ['TEPT tem tratamento?', 'Sim. Com psicoterapia adequada e, em alguns casos, medicação, a maioria das pessoas melhora de forma significativa.'],
      ['Só quem passou por situações extremas tem TEPT?', 'Não. Diferentes experiências podem desencadear TEPT, e a forma como cada pessoa reage é individual. O sofrimento merece atenção independentemente do evento.']
    ]
  }
]

const yamlList = (arr) => arr.map((i) => `  - ${JSON.stringify(i)}`).join('\n')
const yamlFaq = (faq) =>
  faq.map(([q, a]) => `  - question: ${JSON.stringify(q)}\n    answer: ${JSON.stringify(a)}`).join('\n')

for (const d of data) {
  const title = `Tratamento de ${d.nome.split(' (')[0]} em Blumenau | Dra. Karin Boldarini`
  const h1 = `Tratamento de ${d.nome.split(' (')[0]} em Blumenau`
  const desc = `${d.def.split('. ')[0]}. Psiquiatra em Blumenau e online — Dra. Karin Boldarini (CRM SC 26419). Agende sua consulta.`.slice(0, 158)

  const body = `---
title: ${JSON.stringify(title)}
h1: ${JSON.stringify(h1)}
description: ${JSON.stringify(desc)}
condition: ${JSON.stringify(d.condition)}
icon: ${d.icon}
order: ${d.order}
updatedAt: "${UPDATED}"
faq:
${yamlFaq(d.faq)}
---

## O que é ${d.nome.split(' (')[0]}

${d.def}

Buscar ajuda especializada faz diferença. Em **Blumenau**, a Dra. Karin Boldarini oferece acompanhamento psiquiátrico para adultos, de forma presencial ou online, com escuta cuidadosa e plano de tratamento individualizado.

## Sinais e sintomas

Cada pessoa é única, mas alguns sinais costumam estar presentes:

${d.sintomas.map((s) => `- ${s}`).join('\n')}

Sentir alguns desses sintomas não fecha um diagnóstico — apenas a avaliação clínica é capaz de confirmá-lo.

## Como é o tratamento

${d.trat}

## Quando procurar um psiquiatra em Blumenau

Se os sintomas são frequentes, intensos ou atrapalham seu trabalho, seu sono ou seus relacionamentos, vale procurar avaliação. O cuidado precoce tende a trazer melhores resultados e mais qualidade de vida.

A Dra. Karin Boldarini (CRM SC 26419) atende em Blumenau e online. [Agende sua consulta pelo WhatsApp](https://wa.me/5547991259577).

> Este conteúdo tem caráter informativo e não substitui uma consulta médica. O diagnóstico e o tratamento são sempre individuais.
`
  writeFileSync(`${DIR}/${d.slug}.md`, body)
  console.log('escrito', `${d.slug}.md`)
}
console.log('\nTotal:', data.length)
