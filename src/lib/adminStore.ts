import type { ProjectCategory } from '../content/profile'

export type AdminProjectOverride = {
  hidden?: boolean
  displayName?: string
  description?: string
  longDescription?: string
  tags?: string[]
  demoUrl?: string
  status?: string
  category?: ProjectCategory
  openSource?: boolean
  featured?: boolean
}

export type AdminStore = {
  projectOverrides: Record<string, AdminProjectOverride>
}

const KEY = 'firix_admin_store'

function empty(): AdminStore {
  return { projectOverrides: {} }
}

export function getAdminStore(): AdminStore {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as AdminStore
  } catch { /* ignore */ }
  return empty()
}

export function saveAdminStore(store: AdminStore): void {
  try { localStorage.setItem(KEY, JSON.stringify(store)) } catch { /* ignore */ }
}

export function patchProject(repo: string, patch: Partial<AdminProjectOverride>): void {
  const store = getAdminStore()
  store.projectOverrides[repo] = { ...store.projectOverrides[repo], ...patch }
  saveAdminStore(store)
}

export function resetProject(repo: string): void {
  const store = getAdminStore()
  delete store.projectOverrides[repo]
  saveAdminStore(store)
}
