import { Link } from 'react-router-dom'
import { work } from '../../content/site'
import { useProjects } from '../../lib/projects'
import ProjectCard from '../projects/ProjectCard'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

function PreviewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] w-full rounded-card bg-muted" />
      <div className="mt-6 h-4 w-28 rounded bg-muted" />
      <div className="mt-3 h-6 w-2/3 rounded bg-muted" />
      <div className="mt-3 h-4 w-full rounded bg-muted" />
    </div>
  )
}

export default function Work({ limit = 3 }: { limit?: number }) {
  const { status, projects } = useProjects()
  const shown = projects.slice(0, limit)
  const [first, ...rest] = shown

  return (
    <Section id="arbeid" tone="muted">
      <SectionHeading eyebrow={work.eyebrow} title={work.title} lead={work.lead} />

      <div className="mt-14 space-y-16">
        {status === 'loading' ? (
          <div className="grid gap-10 sm:grid-cols-2">
            <PreviewSkeleton />
            <PreviewSkeleton />
          </div>
        ) : null}

        {status === 'ready' && shown.length === 0 ? (
          <Reveal>
            <p className="rounded-panel border border-dashed border-line bg-surface p-10 text-center text-[15px] text-ink-faint">
              {work.emptyState}
            </p>
          </Reveal>
        ) : null}

        {first ? (
          <Reveal>
            <ProjectCard project={first} featured priority />
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid gap-12 sm:grid-cols-2">
            {rest.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>

      {projects.length > limit ? (
        <Reveal className="mt-14 text-center">
          <Link to="/prosjekter" className="text-[17px] font-medium text-brand-500 hover:underline">
            {work.seeAll} →
          </Link>
        </Reveal>
      ) : null}
    </Section>
  )
}
