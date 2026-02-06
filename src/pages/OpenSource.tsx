import { useProjects } from '../lib/projects'
import { useProfile } from '../lib/i18n'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectCardSkeleton from '../components/projects/ProjectCardSkeleton'
import Reveal from '../components/sections/Reveal'

export default function OpenSource() {
  const profile = useProfile()
  const { projects, status } = useProjects(profile)
  const openSourceProjects = projects.filter((project) => project.openSource)

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20">
      <Reveal>
        <SectionHeader title={profile.openSource.title} subtitle={profile.openSource.subtitle} />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {profile.openSourceHighlights.map((highlight) => (
            <Card key={highlight.title} interactive>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                {profile.openSource.highlightsTitle}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{highlight.title}</h3>
              <div className="mt-3 space-y-3 text-sm text-slate-300">
                <p>
                  <span className="text-slate-400">{profile.openSource.problemLabel}: </span>
                  {highlight.problem}
                </p>
                <p>
                  <span className="text-slate-400">{profile.openSource.solutionLabel}: </span>
                  {highlight.solution}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {highlight.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeader title={profile.openSource.projectsTitle} />
        <div className="mt-8">
          {status === 'loading' ? (
            <ProjectCardSkeleton count={6} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openSourceProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  )
}
