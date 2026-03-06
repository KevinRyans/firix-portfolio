import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, GitFork, Star } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useProfile } from '../../lib/i18n'
import { type Project } from '../../lib/projects'
import { getStatusTone } from '../../lib/badgeStyles'
import { cn, formatNumber } from '../../lib/utils'
import Badge from '../ui/Badge'

function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const element = ref.current
    if (!element) return

    let raf = 0

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      const rotateX = y * -8
      const rotateY = x * 10

      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(raf)
      element.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }

    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)

    return () => {
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return ref
}

function getStatusClass(status: string) {
  const tone = getStatusTone(status)
  if (tone === 'success') return 'text-accent-400 border-accent-400/25'
  return 'text-slate-500 border-[#242434]'
}

export default function ProjectCard({
  project,
  variant: _variant = 'default',
}: {
  project: Project
  variant?: 'default' | 'featured'
}) {
  const profile = useProfile()
  const shouldReduceMotion = useReducedMotion()
  const tiltRef = useTilt(!shouldReduceMotion)

  const langLabel = [project.language, project.category].filter(Boolean).join(' · ')

  return (
    <div className="focus-ring group relative block rounded-2xl">
      <div
        ref={tiltRef}
        className={cn(
          'relative h-full overflow-hidden rounded-xl border border-[#1c1c28] bg-[#0e0e18] p-6 shadow-soft transition-all duration-300',
          'before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-accent-400 before:to-teal-400 before:opacity-0 before:transition-opacity before:duration-300',
          'group-hover:-translate-y-[5px] group-hover:border-transparent group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.45)] group-hover:before:opacity-100',

        )}
      >
        {/* Top row: language/category + status */}
        <div className="mb-4 flex items-center justify-between gap-2">
          {langLabel ? (
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#5b8cff] bg-[rgba(91,140,255,0.1)] px-[0.6rem] py-[0.22rem] rounded-[4px]">
              {langLabel}
            </span>
          ) : <span />}
          <div className="flex items-center gap-2">
            {project.featured ? (
              <Badge tone="accent" className="shrink-0">
                {profile.labels.featuredLabel}
              </Badge>
            ) : null}
            {project.status ? (
              <span className={cn(
                'font-mono text-[0.62rem] uppercase tracking-[0.1em] border px-[0.6rem] py-[0.2rem] rounded-full',
                getStatusClass(project.status)
              )}>
                {project.status}
              </span>
            ) : null}
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/projects/${project.slug}`}
          className="font-display text-[1.1rem] font-bold text-white before:absolute before:inset-0 before:z-0 leading-tight tracking-[-0.02em]"
        >
          {project.displayName}
        </Link>
        <p className="mt-2 text-[0.8rem] text-slate-500 line-clamp-2 leading-[1.75]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-[0.4rem]">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[0.62rem] px-[0.6rem] py-[0.2rem] rounded-[4px] bg-white/[0.04] text-slate-500 border border-[#1c1c28]">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom links */}
        <div className="mt-5 flex items-center gap-[0.6rem] text-[0.7rem] text-slate-500">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-[0.35rem] border border-[#1c1c28] px-[0.75rem] py-[0.3rem] rounded-[4px] transition-colors hover:text-accent-400 hover:border-accent-400"
          >
            <Github size={11} />
            GitHub
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-[0.35rem] border border-[#1c1c28] px-[0.75rem] py-[0.3rem] rounded-[4px] transition-colors hover:text-accent-400 hover:border-accent-400"
            >
              <ExternalLink size={11} />
              {profile.labels.viewDemo}
            </a>
          ) : null}
          <div className="ml-auto flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><Star size={12} /> {formatNumber(project.stars)}</span>
            <span className="inline-flex items-center gap-1"><GitFork size={12} /> {formatNumber(project.forks)}</span>
            <span>{project.updatedLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
