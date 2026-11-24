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
 * Ark 03, på blåkopi. Ferdig arbeid står på det samme blå som tegninger
 * kopieres på, montert med skjæremerker. Hvert prosjekt vippes opp på plass
 * mens du scroller — sidens andre store bevegelse etter tegningen i hero.
 */
export default function Work({ limit = 3 }: { limit?: number }) {
  const { status, projects } = useProjects()
  const shown = projects.slice(0, limit)
  const [first, ...rest] = shown

  return (
    <Section id="arbeid" tone="dark" paper>
      <SectionHeading sheet={3} title={work.title} lead={work.lead} />

      <div className="mt-16 space-y-24">
        {status === 'loading' ? (
          <div className="grid gap-10 sm:grid-cols-2">
            <PreviewSkeleton />
            <PreviewSkeleton />
          </div>
        ) : null}

        {status === 'ready' && shown.length === 0 ? (
          <Reveal>
            <p className="rounded-[2px] border border-dashed border-hairline-strong p-10 text-center text-[15px] text-fg-faint">
              {work.emptyState}
            </p>
          </Reveal>
        ) : null}

        {first ? (
          <ScrollScale from={0.94} lift={56} tilt={18}>
            <ProjectCard project={first} featured priority />
          </ScrollScale>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid gap-20 sm:grid-cols-2 sm:gap-14">
            {rest.map((project) => (
              <ScrollScale key={project.id} from={0.96} lift={40} tilt={14}>
                <ProjectCard project={project} />
              </ScrollScale>
            ))}
          </div>
        ) : null}
      </div>

      {projects.length > limit ? (
        <Reveal className="mt-14 text-center">
          <Link
            to="/prosjekter"
            className="inline-flex rounded-[2px] border-[1.5px] border-fg px-6 py-3.5 text-[16px] font-semibold text-fg transition hover:-translate-y-px hover:shadow-[3px_3px_0_var(--fg)]"
          >
            {work.seeAll}
          </Link>
        </Reveal>
      ) : null}
    </Section>
  )
}
