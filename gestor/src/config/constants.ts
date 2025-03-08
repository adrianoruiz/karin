// export const isDev = import.meta.env.DEV;
export const isDev = false
export let URL_DOMAIN: string = ''
export function setUrlDomain (newDomain: string): void {
  URL_DOMAIN = newDomain
}

export let PETSHOP_SLUG: string = ''
export function setPetshopSlug (newSlug: string): void {
  PETSHOP_SLUG = newSlug
}
export function getSlugToRoute (): string {
  const slug =
    localStorage.getItem('petshop_slug') != ''
      ? `/${localStorage.getItem('petshop_slug')}`
      : ''

  return slug
}

export const API_CONFIG = {
  BASE_URL: isDev ? 'https://api.petfy.ai/api/' : 'https://api.petfy.app/api/',
  URL_CATALOG_BASE_KANBAN: isDev ? 'petfy.ai' : 'petfy.app',
  BASE_GESTOR_URL: isDev
    ? 'https://gestor.petfy.ai/loja/'
    : 'https://gestor.petfy.app/loja/',
  ADMIN_URL: isDev
    ? 'https://api.petfy.ai/admin'
    : 'https://api.petfy.app/admin',
  WHATSAPP_API_URL: isDev
    ? 'https://api.whats.petfy.ai/'
    : 'https://api.whats.petfy.app/',
  IMAGE_URL: 'https://api.petfy.app/storage/images/',
  INTEGRATION_URL: 'https://api.petfy.app/integration/',
  CATALOG_BASE: isDev ? 'petfy.ai' : 'petfy.app',
  PRODUCT_LINK: isDev
    ? 'https://petfy.ai/#/product'
    : 'https://petfy.app/#/product',
  CSV_LINK:
    'https://api.petfy.app/uploads/documents/modelo-importacao-preco-estoque.xls'
}

export const APP_LINKS = {
  PLAY_STORE: 'https://play.google.com/store/apps/details?id=app.petfy.clicks',
  APP_STORE: 'https://apps.apple.com/us/app/petfy-app/id6450137691'
}

export const STORAGE_KEYS = {
  TOKEN: 'authentication_token',
  USER: 'user_key',
  IS_AUTHENTICATED: 'isUserAuthenticated',
  AUTH_EXPIRE_DATE: 'autentication_expire_date',
  ZIP_CODE: 'zip'
}

export const APP_VERSION = 'v. 1.4.6'
