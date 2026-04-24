import { promises as fs } from 'node:fs'
import path from 'node:path'

const CONTENT_DIR = path.resolve(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  description: string
  cover?: string
  author?: string
  tags?: string[]
  publishedAt: string
  draft?: boolean
}

export interface PostFile extends PostFrontmatter {
  slug: string
  body: string
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function validateSlug(slug: string) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Slug inválido' })
  }
}

function filePath(slug: string) {
  validateSlug(slug)
  return path.join(CONTENT_DIR, `${slug}.md`)
}

function serialize(fm: PostFrontmatter, body: string): string {
  const lines = [
    '---',
    `title: ${JSON.stringify(fm.title)}`,
    `description: ${JSON.stringify(fm.description)}`,
    fm.cover ? `cover: ${JSON.stringify(fm.cover)}` : null,
    `author: ${JSON.stringify(fm.author || 'Dra. Karin Boldarini')}`,
    `tags: ${JSON.stringify(fm.tags || [])}`,
    `publishedAt: ${JSON.stringify(fm.publishedAt)}`,
    `draft: ${fm.draft ? 'true' : 'false'}`,
    '---',
    '',
    body.trimStart()
  ].filter(Boolean)
  return lines.join('\n')
}

function parse(raw: string): { frontmatter: PostFrontmatter, body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw createError({ statusCode: 500, statusMessage: 'Frontmatter inválido' })
  }
  const fmRaw = match[1]
  const body = match[2] || ''
  const fm: Record<string, unknown> = {}
  for (const line of fmRaw.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    const [, key, valueRaw] = m
    try {
      fm[key] = JSON.parse(valueRaw)
    } catch {
      fm[key] = valueRaw
    }
  }
  return { frontmatter: fm as unknown as PostFrontmatter, body }
}

export async function listPosts(): Promise<PostFile[]> {
  await fs.mkdir(CONTENT_DIR, { recursive: true })
  const entries = await fs.readdir(CONTENT_DIR)
  const files = entries.filter(f => f.endsWith('.md'))
  const posts: PostFile[] = []
  for (const f of files) {
    const raw = await fs.readFile(path.join(CONTENT_DIR, f), 'utf8')
    const { frontmatter, body } = parse(raw)
    posts.push({ ...frontmatter, slug: f.replace(/\.md$/, ''), body })
  }
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export async function readPost(slug: string): Promise<PostFile> {
  const p = filePath(slug)
  let raw: string
  try {
    raw = await fs.readFile(p, 'utf8')
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Post não encontrado' })
  }
  const { frontmatter, body } = parse(raw)
  return { ...frontmatter, slug, body }
}

export async function writePost(slug: string, fm: PostFrontmatter, body: string) {
  const p = filePath(slug)
  await fs.mkdir(CONTENT_DIR, { recursive: true })
  await fs.writeFile(p, serialize(fm, body), 'utf8')
}

export async function createPost(data: { title: string, description: string, body: string, tags?: string[], draft?: boolean, cover?: string, publishedAt?: string }) {
  if (!data.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Título obrigatório' })
  }
  const slug = slugify(data.title)
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug inválido' })
  }
  const existing = await fs.readdir(CONTENT_DIR).catch(() => [] as string[])
  if (existing.includes(`${slug}.md`)) {
    throw createError({ statusCode: 409, statusMessage: 'Já existe post com esse título' })
  }
  const fm: PostFrontmatter = {
    title: data.title.trim(),
    description: data.description?.trim() || '',
    cover: data.cover,
    author: 'Dra. Karin Boldarini',
    tags: data.tags || [],
    publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
    draft: data.draft ?? false
  }
  await writePost(slug, fm, data.body || '')
  return { slug, ...fm }
}

export async function deletePost(slug: string) {
  const p = filePath(slug)
  try {
    await fs.unlink(p)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Post não encontrado' })
  }
}
