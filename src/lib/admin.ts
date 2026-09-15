import type { CuratedProject } from '../content/projects'

/**
 * Admin-klient.
 *
 * Passordet sendes til serveren og byttes mot et kortlevd token. Tokenet
 * ligger i sessionStorage — det forsvinner når fanen lukkes, og gir kun
 * skriveadgang til prosjektlisten.
 */
const TOKEN_KEY = 'firix_admin_token'

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function setToken(token: string) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* privat nettleservindu — tokenet lever da kun i minnet for økten */
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignorer */
  }
}

/**
 * Vises når /api ikke finnes i det hele tatt — typisk fordi siden ligger på
 * en statisk host som GitHub Pages. Da er ikke dette en feil å feilsøke,
 * men en forventet konsekvens av hostingen.
 */
export const NO_BACKEND =
  'Admin krever en server som kan kjøre kode. firix.no ligger på GitHub Pages akkurat nå, ' +
  'så innlogging virker først når siden er flyttet til Vercel. Prosjektlisten leses i ' +
  'mellomtiden fra src/content/projects.ts.'

/** En host uten /api svarer med HTML eller 405 — ikke et avslag fra oss. */
function isJson(res: Response): boolean {
  return Boolean(res.headers.get('content-type')?.includes('application/json'))
}

export async function login(
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!isJson(res)) return { ok: false, error: NO_BACKEND }

    const data = (await res.json()) as { token?: string; error?: string }
    if (!res.ok || !data.token) {
      return { ok: false, error: data.error ?? 'Innlogging feilet.' }
    }
    setToken(data.token)
    return { ok: true }
  } catch {
    return { ok: false, error: NO_BACKEND }
  }
}

export async function saveProjects(
  projects: CuratedProject[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = getToken()
  if (!token) return { ok: false, error: 'Du er ikke logget inn.' }

  try {
    const res = await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ projects }),
    })
    if (!isJson(res)) return { ok: false, error: NO_BACKEND }

    const data = (await res.json()) as { ok?: boolean; error?: string }
    if (!res.ok) {
      if (res.status === 401) clearToken()
      return { ok: false, error: data.error ?? 'Lagring feilet.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: NO_BACKEND }
  }
}
