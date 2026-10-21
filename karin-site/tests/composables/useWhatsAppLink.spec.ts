import { describe, it, expect } from 'vitest'
import { useWhatsAppLink } from '../../app/composables/useWhatsAppLink'

type RuntimeConfigGlobal = typeof globalThis & {
  useRuntimeConfig?: () => { public: { whatsappPhone?: string } }
}

describe('useWhatsAppLink', () => {
  it('returns wa.me URL with default phone', () => {
    const { href } = useWhatsAppLink('hero')
    expect(href.value.startsWith('https://wa.me/5547991259577?text=')).toBe(true)
  })

  it('encodes default message for hero source', () => {
    const { href } = useWhatsAppLink('hero')
    const decoded = decodeURIComponent(href.value.split('?text=')[1])
    expect(decoded).toBe('Olá Dra. Karin, vim do site e gostaria de agendar uma consulta médica.')
  })

  it('preserves customMessage without adding tracking text', () => {
    const { href } = useWhatsAppLink('footer', 'Mensagem custom')
    const decoded = decodeURIComponent(href.value.split('?text=')[1])
    expect(decoded).toBe('Mensagem custom')
  })

  it('keeps messages free of tracking tags for every source', () => {
    const sources = ['hero', 'floating', 'footer', 'consultation', 'consultation-presencial', 'about', 'navbar'] as const
    for (const source of sources) {
      const url = new URL(useWhatsAppLink(source).href.value)
      expect([...url.searchParams.keys()]).toEqual(['text'])
      expect(url.searchParams.get('text')).not.toMatch(/utm_|\[|\]|\n/)
    }
  })

  it('keeps the appropriate message for each consultation type', () => {
    const online = useWhatsAppLink('consultation').href.value
    const presencial = useWhatsAppLink('consultation-presencial').href.value
    expect(online).not.toBe(presencial)
    expect(new URL(online).searchParams.get('text')).toBe('Olá Dra. Karin, gostaria de saber mais sobre as consultas médicas.')
    expect(new URL(presencial).searchParams.get('text')).toBe('Olá Dra. Karin, gostaria de agendar uma consulta médica presencial em Blumenau.')
  })

  it('uses public runtime config phone when available', () => {
    const runtimeGlobal = globalThis as RuntimeConfigGlobal
    const originalUseRuntimeConfig = runtimeGlobal.useRuntimeConfig
    runtimeGlobal.useRuntimeConfig = () => ({ public: { whatsappPhone: '5511999999999' } })

    try {
      const { href } = useWhatsAppLink('hero')
      expect(href.value.startsWith('https://wa.me/5511999999999?text=')).toBe(true)
    } finally {
      runtimeGlobal.useRuntimeConfig = originalUseRuntimeConfig
    }
  })
})
