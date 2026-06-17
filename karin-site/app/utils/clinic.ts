// Dados NAP (Name-Address-Phone) da clínica — fonte única para schema/SEO local.
// Mantenha IDÊNTICO ao Google Meu Negócio (Business Profile) para consistência local.
export const CLINIC = {
  name: 'Dra. Karin Boldarini',
  description:
    'Saúde Mental em Blumenau (CRM SC 26419). Atendimento humanizado para adultos — ansiedade, depressão, insônia, TDAH e demais transtornos mentais. Presencial e online.',
  crm: 'CRM SC 26419',
  medicalSpecialty: 'Psychiatric',
  telephone: '+5547991259577',
  whatsapp: '5547991259577',
  url: 'https://www.drakarin.com.br',
  image: 'https://www.drakarin.com.br/og/karin-og.jpg',
  priceRange: '$$',
  address: {
    street: 'R. Jacó Brueckheimer, 333',
    neighborhood: 'Velha',
    city: 'Blumenau',
    state: 'SC',
    postalCode: '89036-250',
    country: 'BR'
  },
  areaServed: ['Blumenau', 'Vale do Itajaí', 'Santa Catarina'],
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '20:00'
  },
  // Faturamento — usado nas seções de objeção
  billing: {
    type: 'Particular',
    note: 'Atendimento particular. Emito recibo para reembolso pelo seu convênio.'
  },
  // Perfis com avaliações reais (atualize o link do Google com o seu share/g.page)
  reviews: {
    google: 'https://www.google.com/search?q=Consult%C3%B3rio+Dra.+Karin+Boldarini&kgmid=/g/11wwg4xy39',
    doctoralia: 'https://www.doctoralia.com.br/karin-boldarini/medico-clinico-geral-psicanalista/blumenau'
  }
} as const
