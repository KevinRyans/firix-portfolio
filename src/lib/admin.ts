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

export async function login(
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = (await res.json()) as { token?: string; error?: string }
    if (!res.ok || !data.token) {
      return { ok: false, error: data.error ?? 'Innlogging feilet.' }
    }
    setToken(data.token)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Fikk ikke kontakt med serveren.' }
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
    const data = (await res.json()) as { ok?: boolean; error?: string }
    if (!res.ok) {
      if (res.status === 401) clearToken()
      return { ok: false, error: data.error ?? 'Lagring feilet.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Fikk ikke kontakt med serveren.' }
  }
}
