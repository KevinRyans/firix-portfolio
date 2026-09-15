import { Link } from 'react-router-dom'
import { work } from '../../content/site'
import { useProjects } from '../../lib/projects'
import ProjectCard from '../projects/ProjectCard'
import Reveal, { ScrollScale } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

function PreviewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] w-full rounded-card bg-elevated" />
      <div className="mt-6 h-4 w-28 rounded bg-elevated" />
      <div className="mt-3 h-6 w-2/3 rounded bg-elevated" />
    </div>
  )
}

/**
 * Arbeid-seksjonen er kullsvart. Kundenettstedene er lyse, så de lyser mot
 * bakgrunnen i stedet for å gli inn i den — samme grep Apple bruker når de
 * viser skjermer.
 */
export default function Work({ limit = 3 }: { limit?: number }) {
  const { status, projects } = useProjects()
  const shown = projects.slice(0, limit)
  const [first, ...rest] = shown

  return (
    <Section id="arbeid" tone="dark">
      <SectionHeading eyebrow={work.eyebrow} title={work.title} lead={work.lead} />

      <div className="mt-14 space-y-20">
        {status === 'loading' ? (
          <div className="grid gap-10 sm:grid-cols-2">
            <PreviewSkeleton />
            <PreviewSkeleton />
          </div>
        ) : null}

        {status === 'ready' && shown.length === 0 ? (
          <Reveal>
            <p className="rounded-panel border border-dashed border-hairline-strong p-10 text-center text-[15px] text-fg-faint">
              {work.emptyState}
            </p>
          </Reveal>
        ) : null}

        {first ? (
          <ScrollScale from={0.92} lift={56}>
            <ProjectCard project={first} featured priority />
          </ScrollScale>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid gap-14 sm:grid-cols-2">
            {rest.map((project) => (
              <ScrollScale key={project.id} from={0.95} lift={40}>
                <ProjectCard project={project} />
              </ScrollScale>
            ))}
          </div>
        ) : null}
      </div>

      {projects.length > limit ? (
        <Reveal className="mt-14 text-center">
          <Link to="/prosjekter" className="text-[17px] font-medium text-accent hover:underline">
            {work.seeAll} →
          </Link>
        </Reveal>
      ) : null}
    </Section>
  )
}
