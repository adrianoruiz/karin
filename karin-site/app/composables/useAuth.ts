import { createAuthClient } from 'better-auth/vue'

let _client: ReturnType<typeof createAuthClient> | null = null

function getClient() {
  if (!_client) {
    _client = createAuthClient({
      baseURL: typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'
    })
  }
  return _client
}

export function useAuth() {
  const client = getClient()
  return {
    signIn: client.signIn,
    signUp: client.signUp,
    signOut: client.signOut,
    useSession: client.useSession
  }
}
