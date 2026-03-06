const SESSION_KEY = 'firix_admin_auth'

export function login(password: string): boolean {
  const expected = import.meta.env.VITE_ADMIN_PASSWORD
  if (!expected || password !== expected) return false
  try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
  return true
}

export function logout(): void {
  try { sessionStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
}

export function isAuthenticated(): boolean {
  try { return sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
}
