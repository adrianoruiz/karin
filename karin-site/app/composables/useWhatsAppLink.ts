import { computed, type ComputedRef } from 'vue'

export type WhatsAppSource =
  | 'hero'
  | 'floating'
  | 'footer'
  | 'consultation'
  | 'consultation-presencial'
  | 'about'
  | 'navbar'

const DEFAULT_PHONE = '5547991259577'

const DEFAULT_MESSAGES: Record<WhatsAppSource, string> = {
  hero: 'Olá Dra. Karin, vim do site e gostaria de agendar uma consulta médica.',
  floating: 'Olá Dra. Karin, vim pelo botão flutuante do site.',
  footer: 'Olá Dra. Karin, vim pelo rodapé do site.',
  consultation: 'Olá Dra. Karin, gostaria de saber mais sobre as consultas médicas.',
  'consultation-presencial': 'Olá Dra. Karin, gostaria de agendar uma consulta médica presencial em Blumenau.',
  about: "Olá Dra. Karin, vim pela seção 'Quem é a Dra. Karin'.",
  navbar: 'Olá Dra. Karin, vim pelo menu do site.'
}

const getWhatsAppPhone = () => {
  try {
    const config = useRuntimeConfig()
    return String(config.public.whatsappPhone || DEFAULT_PHONE)
  } catch {
    return DEFAULT_PHONE
  }
}

export function useWhatsAppLink(source: WhatsAppSource, customMessage?: string): { href: ComputedRef<string> } {
  const href = computed(() => {
    const message = customMessage ?? DEFAULT_MESSAGES[source]
    return `https://wa.me/${getWhatsAppPhone()}?text=${encodeURIComponent(message)}`
  })
  return { href }
}
