import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GitFork, Star } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { profile } from '../../content/profile'
import { type Project } from '../../lib/projects'
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

export default function ProjectCard({
  project,
  variant = 'default',
}: {
  project: Project
  variant?: 'default' | 'featured'
}) {
  const shouldReduceMotion = useReducedMotion()
  const tiltRef = useTilt(!shouldReduceMotion)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="focus-ring group block rounded-2xl"
    >
      <div
        ref={tiltRef}
        className={cn(
          'relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lift',
          variant === 'featured' && 'bg-gradient-to-br from-white/10 via-white/5 to-transparent',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.displayName}</h3>
            <p className="mt-2 text-sm text-slate-300 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {project.featured ? (
              <Badge tone="accent" className="shrink-0">
                {profile.labels.featuredLabel}
              </Badge>
            ) : null}
            {project.status ? <Badge className="shrink-0">{project.status}</Badge> : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="bg-white/10 text-slate-200">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Star size={14} /> {formatNumber(project.stars)}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={14} /> {formatNumber(project.forks)}
            </span>
          </div>
          <span>{project.updatedLabel}</span>
        </div>
      </div>
    </Link>
  )
}
