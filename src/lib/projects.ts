import { useEffect, useMemo, useState } from 'react'
import { defaultProjects, type CuratedProject } from '../content/projects'

export type ProjectsState = {
  status: 'loading' | 'ready'
  projects: CuratedProject[]
  /** true når listen kommer fra fallback-filen, ikke fra admin-panelet. */
  isFallback: boolean
}

type ApiResponse = { configured?: boolean; projects?: unknown }

/**
 * Fyller ut felter som mangler fra API-et, slik at komponentene aldri må
 * forholde seg til `undefined`. Serveren saniterer allerede, men en gammel
 * lagret post kan mangle nyere felter.
 */
function hydrate(raw: unknown, index: number): CuratedProject {
  const item = (raw ?? {}) as Partial<CuratedProject> & Record<string, unknown>
  const id = typeof item.id === 'string' && item.id ? item.id : `prosjekt-${index}`
  return {
    id,
    slug: item.slug || id,
    name: item.name ?? '',
    client: item.client ?? '',
    summary: item.summary ?? '',
    description: item.description ?? '',
    url: item.url ?? '',
    repoUrl: item.repoUrl ?? '',
    previewMode:
      item.previewMode === 'live' || item.previewMode === 'image' ? item.previewMode : 'auto',
    previewUrl: item.previewUrl ?? '',
    posterImage: item.posterImage ?? '',
    tags: Array.isArray(item.tags) ? item.tags : [],
    year: item.year ?? '',
    services: Array.isArray(item.services) ? item.services : [],
    results: Array.isArray(item.results) ? item.results : [],
    visible: item.visible !== false,
    featured: item.featured === true,
    order: typeof item.order === 'number' ? item.order : index,
  }
}

const byOrder = (a: CuratedProject, b: CuratedProject) => a.order - b.order

/** Henter prosjektlisten. `token` sendes kun fra admin, for å se skjulte. */
export async function fetchProjects(
  token?: string,
): Promise<{ projects: CuratedProject[]; isFallback: boolean }> {
  try {
    const res = await fetch('/api/projects', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as ApiResponse
    if (!Array.isArray(data.projects)) {
      // KV er ikke satt opp, eller ingen liste er lagret ennå.
      return { projects: [...defaultProjects].sort(byOrder), isFallback: true }
    }
    return { projects: data.projects.map(hydrate).sort(byOrder), isFallback: false }
  } catch {
    return { projects: [...defaultProjects].sort(byOrder), isFallback: true }
  }
}

export function useProjects(): ProjectsState {
  const [state, setState] = useState<ProjectsState>({
    status: 'loading',
    projects: [],
    isFallback: false,
  })

  useEffect(() => {
    let active = true
    void fetchProjects().then(({ projects, isFallback }) => {
      if (!active) return
      setState({ status: 'ready', projects: projects.filter((p) => p.visible), isFallback })
    })
    return () => {
      active = false
    }
  }, [])

  return state
}

export function useProjectBySlug(slug: string | undefined) {
  const { status, projects } = useProjects()
  const project = useMemo(() => projects.find((item) => item.slug === slug), [projects, slug])
  return { status, project }
}
