import { describe, it, expect } from 'vitest'
import { useWhatsAppLink } from '../../app/composables/useWhatsAppLink'

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
})
