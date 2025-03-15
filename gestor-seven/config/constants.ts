// export const isDev = import.meta.env.DEV;
export const isDev = true
export let URL_DOMAIN: string = ''
export function setUrlDomain (newDomain: string): void {
  URL_DOMAIN = newDomain
}

export let CLINIC_SLUG: string = ''
export function setClinicSlug (newSlug: string): void {
  CLINIC_SLUG = newSlug
}
export function getSlugToRoute (): string {
  const slug =
    localStorage.getItem('clinic_slug') != ''
      ? `/${localStorage.getItem('clinic_slug')}`
      : ''

  return slug
}

export const API_CONFIG = {
  BASE_URL: isDev ? 'http://localhost:8000/api/' : 'https://api.drakarin.com.br/api/',
  URL_CATALOG_BASE_KANBAN: isDev ? 'drakarin.com.br' : 'petfy.app',
  WHATSAPP_API_URL: isDev
    ? 'http://localhost:3000/'
    : 'https://whatsapp.drakarin.com.br/',
  IMAGE_URL: 'https://api.drakarin.com.br/storage/images/',
  INTEGRATION_URL: 'https://api.drakarin.com.br/integration/',
}


export const STORAGE_KEYS = {
  TOKEN: 'authentication_token',
  USER: 'user_key',
  IS_AUTHENTICATED: 'isUserAuthenticated',
  AUTH_EXPIRE_DATE: 'autentication_expire_date',
  ZIP_CODE: 'zip'
}

export const APP_VERSION = 'v. 1.0.0'
