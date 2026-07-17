import { useMemo, useState } from 'react'
import { Filter, ArrowUpDown } from 'lucide-react'
import { type ProjectCategory } from '../content/profile'
import { filterProjects, sortProjects, useProjects } from '../lib/projects'
import { useProfile } from '../lib/i18n'
import { cn } from '../lib/utils'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectCardSkeleton from '../components/projects/ProjectCardSkeleton'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/sections/Reveal'

export default function Projects() {
  const profile = useProfile()
  const { projects, status, source, pinnedOrder } = useProjects(profile)
  const [filter, setFilter] = useState<ProjectCategory>(
    profile.projects.filters[0].value,
  )
  const [sort, setSort] = useState<'stars' | 'updated'>(
    profile.projects.sortOptions[0].value as 'stars' | 'updated',
  )

  const filtered = useMemo(() => {
    const next = filterProjects(projects, filter)
    return sortProjects(next, sort, pinnedOrder)
  }, [projects, filter, sort, pinnedOrder])

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20">
      <Reveal>
        <SectionHeader title={profile.projects.title} subtitle={profile.projects.subtitle} />
        {source === 'sample' ? (
          <p className="mt-3 text-xs text-slate-400">{profile.projects.fallbackNotice}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter size={14} /> {profile.labels.filterLabel}
          </div>
          {profile.projects.filters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={cn(
                'focus-ring rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition',
                filter === option.value &&
                  'border-accent-400/40 bg-accent-500/10 text-accent-200',
              )}
            >
              {option.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
            <ArrowUpDown size={14} /> {profile.labels.sortLabel}
          </div>
          <div className="flex items-center gap-2">
            {profile.projects.sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value as 'stars' | 'updated')}
                className={cn(
                  'focus-ring rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition',
                  sort === option.value && 'border-teal-400/40 bg-teal-400/10 text-teal-200',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        {status === 'loading' ? (
          <ProjectCardSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-base font-semibold text-white">
              {profile.projects.emptyStateTitle}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {profile.projects.emptyStateSubtitle}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={project.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
        )}
      </Reveal>
    </div>
  )
}
