// Dados NAP (Name-Address-Phone) da clínica — fonte única para schema/SEO local.
// Mantenha IDÊNTICO ao Google Meu Negócio (Business Profile) para consistência local.
export const CLINIC = {
  name: 'Dra. Karin Boldarini',
  description:
    'Psiquiatra em Blumenau (CRM SC 26419). Atendimento humanizado para adultos — ansiedade, depressão, insônia, TDAH e demais transtornos mentais. Presencial e online.',
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
  areaServed: ['Blumenau', 'Vale do Itajaí', 'Santa Catarina']
} as const
