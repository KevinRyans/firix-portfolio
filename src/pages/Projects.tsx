import { useEffect } from 'react'
import { work } from '../content/site'
import { useProjects } from '../lib/projects'
import ProjectCard from '../components/projects/ProjectCard'
import FinalCta from '../components/sections/FinalCta'
import Reveal from '../components/ui/Reveal'

export default function Projects() {
  const { status, projects } = useProjects()

  useEffect(() => {
    document.title = 'Prosjekter — Firix'
  }, [])

  return (
    <>
      <div className="shell pb-20 pt-[calc(var(--nav-height)+80px)]">
        <Reveal className="max-w-narrow">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.08em] text-accent">
            {work.eyebrow}
          </p>
          <h1 className="mt-4 text-display font-semibold text-fg">{work.title}</h1>
          <p className="mt-5 text-lead text-fg-faint">{work.lead}</p>
        </Reveal>

        {status === 'ready' && projects.length === 0 ? (
          <p className="mt-16 rounded-panel border border-dashed border-hairline-strong bg-elevated p-10 text-center text-[15px] text-fg-faint">
            {work.emptyState}
          </p>
        ) : null}

        <div className="mt-16 grid gap-14 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.08}>
              <ProjectCard project={project} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
      <FinalCta />
    </>
  )
}
