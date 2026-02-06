import { useCallback, useEffect, useMemo, useState } from 'react'
import { type Profile, type ProjectCategory, type ProjectOverride } from '../content/profile'
import { fetchGithubRepos, type GitHubRepo } from './github'
import { formatDate, slugify } from './utils'

export type Project = {
  id: number
  name: string
  displayName: string
  description: string
  longDescription?: string
  url: string
  demoUrl?: string
  language?: string
  stars: number
  forks: number
  updatedAt: string
  updatedLabel: string
  topics: string[]
  tags: string[]
  category: ProjectCategory
  openSource: boolean
  pinned: boolean
  featured: boolean
  status?: string
  slug: string
}

export type ProjectsSource = 'github' | 'sample'

export type ProjectsState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  source: ProjectsSource
  projects: Project[]
  error?: string
}

type CachedProjects = {
  data: Project[]
  source: ProjectsSource
  fetchedAt: number
}

const cache: { current: CachedProjects | null } = { current: null }
const TTL = 1000 * 60 * 5

const frontTags = ['frontend', 'ui', 'react', 'web', 'landing', 'design']
const backTags = ['backend', 'api', 'server', 'database', 'ops']
const fullTags = ['fullstack', 'full-stack', 'platform']
const ossTags = ['open-source', 'opensource', 'oss']

function mergeMissingRepos(repos: GitHubRepo[], fallback: GitHubRepo[]) {
  const existing = new Set(repos.map((repo) => repo.name.toLowerCase()))
  const extras = fallback.filter((repo) => !existing.has(repo.name.toLowerCase()))
  return [...repos, ...extras]
}

function normalizeTopics(topics?: string[]) {
  return (topics ?? []).map((topic) => topic.toLowerCase())
}

function titleize(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function inferCategory(topics: string[], repo: GitHubRepo): ProjectCategory {
  const hasFull = topics.some((topic) => fullTags.includes(topic))
  const hasFront = topics.some((topic) => frontTags.includes(topic))
  const hasBack = topics.some((topic) => backTags.includes(topic))

  if (hasFull || (hasFront && hasBack)) return 'Fullstack'
  if (hasFront) return 'Frontend'
  if (hasBack) return 'Backend'

  if (repo.language && ['html', 'css', 'javascript', 'typescript'].includes(repo.language.toLowerCase())) {
    return 'Frontend'
  }

  return 'Fullstack'
}

function inferOpenSource(topics: string[], repo: GitHubRepo) {
  if (topics.some((topic) => ossTags.includes(topic))) return true
  if (repo.license && repo.license.spdx_id && repo.license.spdx_id !== 'NOASSERTION') {
    return true
  }
  return false
}

function buildTags(override: ProjectOverride | undefined, repo: GitHubRepo, topics: string[]) {
  if (override?.tags && override.tags.length > 0) return override.tags
  if (topics.length > 0) return topics.slice(0, 3).map(titleize)
  if (repo.language) return [repo.language]
  return []
}

function sortWithPinned(
  projects: Project[],
  sortBy: 'stars' | 'updated',
  pinnedOrder: Map<string, number>,
) {
  const sorted = [...projects].sort((a, b) => {
    const aPinned = pinnedOrder.get(a.name)
    const bPinned = pinnedOrder.get(b.name)

    if (aPinned !== undefined || bPinned !== undefined) {
      if (aPinned === undefined) return 1
      if (bPinned === undefined) return -1
      return aPinned - bPinned
    }

    if (sortBy === 'stars') return b.stars - a.stars
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return sorted
}

export function filterProjects(projects: Project[], filter: ProjectCategory) {
  if (filter === 'All') return projects
  if (filter === 'Open Source') return projects.filter((project) => project.openSource)
  return projects.filter((project) => project.category === filter)
}

export function sortProjects(
  projects: Project[],
  sortBy: 'stars' | 'updated',
  pinnedOrder: Map<string, number>,
) {
  return sortWithPinned(projects, sortBy, pinnedOrder)
}

export function useProjects(profile: Profile) {
  const pinnedProjects = useMemo(
    () => profile.pinnedProjects as ProjectOverride[],
    [profile],
  )
  const projectOverrides = useMemo(
    () => profile.projectOverrides as ProjectOverride[],
    [profile],
  )
  const hiddenProjects = useMemo(
    () => new Set((profile.hiddenProjects ?? []).map((name) => name.toLowerCase())),
    [profile],
  )

  const pinnedOrder = useMemo(
    () => new Map(pinnedProjects.map((project, index) => [project.repo, index])),
    [pinnedProjects],
  )

  const overrideMap = useMemo(
    () =>
      new Map<string, ProjectOverride>(
        [...pinnedProjects, ...projectOverrides].map((override) => [
          override.repo,
          override,
        ]),
      ),
    [pinnedProjects, projectOverrides],
  )

  const filterHidden = useCallback(
    (repos: GitHubRepo[]) => {
      if (hiddenProjects.size === 0) return repos
      return repos.filter((repo) => !hiddenProjects.has(repo.name.toLowerCase()))
    },
    [hiddenProjects],
  )

  const mapRepo = useCallback(
    (repo: GitHubRepo): Project => {
      const override = overrideMap.get(repo.name)
      const topics = normalizeTopics(repo.topics)
      const category = override?.category ?? inferCategory(topics, repo)
      const openSource = override?.openSource ?? inferOpenSource(topics, repo)
      const pinnedIndex = pinnedOrder.get(repo.name)

      return {
        id: repo.id,
        name: repo.name,
        displayName: override?.displayName ?? repo.name,
        description: override?.description ?? repo.description ?? profile.labels.noDescription,
        longDescription: override?.longDescription,
        url: repo.html_url,
        demoUrl: override?.demoUrl ?? (repo.homepage || undefined),
        language: repo.language ?? undefined,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        updatedAt: repo.updated_at,
        updatedLabel: formatDate(repo.updated_at),
        topics,
        tags: buildTags(override, repo, topics),
        category,
        openSource,
        pinned: pinnedIndex !== undefined,
        featured: override?.featured ?? false,
        status: override?.status,
        slug: override?.displayName ? slugify(override.displayName) : slugify(repo.name),
      }
    },
    [overrideMap, pinnedOrder, profile.labels.noDescription],
  )
  const [state, setState] = useState<ProjectsState>(() => {
    if (cache.current && Date.now() - cache.current.fetchedAt < TTL) {
      return {
        status: 'success',
        source: cache.current.source,
        projects: cache.current.data,
      }
    }
    return { status: 'loading', source: 'github', projects: [] }
  })

  useEffect(() => {
    let active = true

    const load = async () => {
      if (cache.current && Date.now() - cache.current.fetchedAt < TTL) {
        return
      }

      setState((prev) => ({ ...prev, status: 'loading' }))

      try {
        const repos = filterHidden(await fetchGithubRepos(profile.githubUsername))
        const fallbackRepos = filterHidden(profile.sampleProjects as GitHubRepo[])
        const mergedRepos = mergeMissingRepos(repos, fallbackRepos)
        const mapped = mergedRepos.map(mapRepo)
        const sorted = sortWithPinned(mapped, 'updated', pinnedOrder)
        const next = { data: sorted, source: 'github' as ProjectsSource, fetchedAt: Date.now() }
        cache.current = next

        if (!active) return
        setState({ status: 'success', source: 'github', projects: sorted })
      } catch (error) {
        const fallbackRepos = filterHidden(profile.sampleProjects as GitHubRepo[])
        const mapped = fallbackRepos.map(mapRepo)
        const sorted = sortWithPinned(mapped, 'updated', pinnedOrder)
        const next = { data: sorted, source: 'sample' as ProjectsSource, fetchedAt: Date.now() }
        cache.current = next

        if (!active) return
        setState({
          status: 'success',
          source: 'sample',
          projects: sorted,
          error: error instanceof Error ? error.message : 'unknown_error',
        })
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  const bySlug = useMemo(() => {
    return new Map(state.projects.map((project) => [project.slug, project]))
  }, [state.projects])

  return { ...state, bySlug, pinnedOrder }
}
