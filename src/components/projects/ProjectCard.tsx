import { Link } from 'react-router-dom'
import type { CuratedProject } from '../../content/projects'
import { cn } from '../../lib/utils'
import LivePreview from './LivePreview'

export default function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: CuratedProject
  featured?: boolean
  priority?: boolean
}) {
  return (
    <article
      className={cn('group flex flex-col', featured && 'lg:flex-row lg:items-center lg:gap-14')}
    >
      <Link
        to={`/prosjekter/${project.slug}`}
        aria-label={`Se prosjektet ${project.name}`}
        className={cn(
          'block transition-transform duration-500 ease-apple hover:-translate-y-1',
          featured ? 'lg:w-[58%]' : 'w-full',
        )}
      >
        <LivePreview project={project} priority={priority} compact={!featured} />
      </Link>

      <div className={cn('pt-6', featured && 'lg:w-[42%] lg:pt-0')}>
        {project.client || project.year ? (
          <p className="mb-2 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em] text-fg-faint">
            {project.client ? <span>{project.client}</span> : null}
            {project.client && project.year ? <span aria-hidden="true">·</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </p>
        ) : null}

        <h3
          className={cn(
            'font-semibold tracking-[-0.02em] text-fg',
            featured ? 'text-headline' : 'text-title',
          )}
        >
          <Link to={`/prosjekter/${project.slug}`} className="hover:text-accent">
            {project.name}
          </Link>
        </h3>

        {project.summary ? (
          <p
            className={cn(
              'mt-3 text-fg-faint',
              featured ? 'text-lead' : 'text-[15px] leading-relaxed',
            )}
          >
            {project.summary}
          </p>
        ) : null}

        {project.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-hairline bg-elevated px-3 py-1 text-[12px] text-fg-faint"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link
            to={`/prosjekter/${project.slug}`}
            className="text-[15px] font-medium text-accent hover:underline"
          >
            Les mer →
          </Link>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] text-fg-faint hover:text-fg"
            >
              Besøk nettstedet ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
