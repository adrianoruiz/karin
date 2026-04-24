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
