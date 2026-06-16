// Calcula tempo de leitura a partir do conteúdo do post (@nuxt/content v3).
// Roda em build-time (SSG) — varre a AST do body, conta palavras, divide por 200 wpm.

function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (node && typeof node === 'object') {
    const n = node as Record<string, unknown>
    if (typeof n.value === 'string') return n.value
    if (n.children) return extractText(n.children)
    if (n.body) return extractText(n.body)
  }
  return ''
}

const WORDS_PER_MINUTE = 200

export function readingTime(post: unknown): number {
  const source = (post as { body?: unknown })?.body ?? post
  const text = extractText(source)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
