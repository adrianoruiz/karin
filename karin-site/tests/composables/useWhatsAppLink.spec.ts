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
    expect(decoded).toContain('agendar uma consulta')
    expect(decoded).toContain('utm_content=hero')
  })

  it('uses customMessage when provided, still appends UTMs', () => {
    const { href } = useWhatsAppLink('footer', 'Mensagem custom')
    const decoded = decodeURIComponent(href.value.split('?text=')[1])
    expect(decoded).toContain('Mensagem custom')
    expect(decoded).toContain('utm_content=footer')
  })

  it('produces distinct utm_content per source', () => {
    const a = useWhatsAppLink('hero').href.value
    const b = useWhatsAppLink('floating').href.value
    expect(a).not.toBe(b)
    expect(decodeURIComponent(a)).toContain('utm_content=hero')
    expect(decodeURIComponent(b)).toContain('utm_content=floating')
  })

  it('tracks online and presencial consultation links separately', () => {
    const online = useWhatsAppLink('consultation').href.value
    const presencial = useWhatsAppLink('consultation-presencial').href.value
    expect(online).not.toBe(presencial)
    expect(decodeURIComponent(online)).toContain('utm_content=consultation')
    expect(decodeURIComponent(presencial)).toContain('utm_content=consultation-presencial')
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
