import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProjectBySlug } from '../lib/projects'
import LivePreview from '../components/projects/LivePreview'
import FinalCta from '../components/sections/FinalCta'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { status, project } = useProjectBySlug(slug)

  useEffect(() => {
    if (project) document.title = `${project.name} — Firix`
  }, [project])

  if (status === 'loading') {
    return (
      <div className="shell pb-32 pt-[calc(var(--nav-height)+80px)]">
        <div className="h-8 w-52 animate-pulse rounded bg-muted" />
        <div className="mt-6 aspect-[16/10] w-full animate-pulse rounded-panel bg-muted" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="shell pb-32 pt-[calc(var(--nav-height)+120px)] text-center">
        <h1 className="text-headline font-semibold text-ink">Fant ikke prosjektet</h1>
        <p className="mx-auto mt-4 max-w-prose text-[15px] text-ink-faint">
          Prosjektet finnes ikke lenger, eller lenken er feil.
        </p>
        <Button to="/prosjekter" className="mt-8">
          Se alle prosjekter
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="shell pb-24 pt-[calc(var(--nav-height)+56px)]">
        <Link to="/prosjekter" className="text-[14px] text-ink-faint hover:text-ink">
          ← Alle prosjekter
        </Link>

        <Reveal className="mt-8 max-w-narrow">
          {project.client || project.year ? (
            <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.06em] text-ink-ghost">
              {project.client ? <span>{project.client}</span> : null}
              {project.client && project.year ? <span aria-hidden="true">·</span> : null}
              {project.year ? <span>{project.year}</span> : null}
            </p>
          ) : null}
          <h1 className="mt-3 text-display font-semibold text-ink">{project.name}</h1>
          {project.summary ? (
            <p className="mt-5 text-lead text-ink-faint">{project.summary}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.url ? <Button href={project.url}>Åpne {project.name} ↗</Button> : null}
            {project.repoUrl ? (
              <Button href={project.repoUrl} variant="secondary">
                Se koden
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <LivePreview project={project} priority />
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            {project.description
              .split('\n\n')
              .filter(Boolean)
              .map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-5 max-w-prose text-[17px] leading-[1.6] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-panel border border-line-soft bg-muted p-7">
              {project.services.length > 0 ? (
                <>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                    Leveranse
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {project.services.map((service) => (
                      <li key={service} className="text-[15px] text-ink-soft">
                        {service}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {project.tags.length > 0 ? (
                <>
                  <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                    Teknologi
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line-soft bg-surface px-3 py-1 text-[12px] text-ink-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {/* Resultater vises kun når det finnes ekte tall å vise. */}
              {project.results.length > 0 ? (
                <>
                  <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                    Resultat
                  </p>
                  <dl className="mt-3 space-y-3">
                    {project.results.map((result) => (
                      <div key={result.label}>
                        <dd className="text-[24px] font-semibold tracking-[-0.02em] text-ink">
                          {result.value}
                        </dd>
                        <dt className="text-[13px] text-ink-faint">{result.label}</dt>
                      </div>
                    ))}
                  </dl>
                </>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
      <FinalCta />
    </>
  )
}
