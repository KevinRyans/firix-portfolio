import { Link, useParams } from 'react-router-dom'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import { useProjects } from '../lib/projects'
import { useProfile } from '../lib/i18n'
import { getStatusTone, getTagBadgeClass } from '../lib/badgeStyles'
import { buttonStyles } from '../components/ui/buttonStyles'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'

export default function ProjectDetail() {
  const profile = useProfile()
  const { slug } = useParams()
  const { status, bySlug } = useProjects(profile)
  const project = slug ? bySlug.get(slug) : undefined
  const categoryLabel =
    project ? profile.projects.categoryLabels[project.category] ?? project.category : null

  if (status === 'loading') {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 pb-20">
        <div className="h-6 w-40 rounded-full bg-white/10" />
        <div className="mt-6 h-10 w-2/3 rounded-full bg-white/10" />
        <div className="mt-3 h-4 w-full rounded-full bg-white/5" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 pb-20 text-center">
        <h1 className="text-2xl font-semibold text-white">
          {profile.labels.projectNotFoundTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {profile.labels.projectNotFoundSubtitle}
        </p>
        <Link to="/projects" className={buttonStyles({ variant: 'secondary', className: 'mt-6' })}>
          {profile.labels.backToProjects}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-20">
      <Link
        to="/projects"
        className="focus-ring inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} /> {profile.labels.backToProjects}
      </Link>

      <div className="mt-6 space-y-4">
        <Badge tone="accent">{categoryLabel}</Badge>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {project.displayName}
        </h1>
        <p className="text-base text-slate-300">
          {project.longDescription ?? project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={buttonStyles({ variant: 'primary' })}
        >
          <Github size={16} /> {profile.labels.viewGitHub}
        </a>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({ variant: 'secondary' })}
          >
            <ExternalLink size={16} /> {profile.labels.viewDemo}
          </a>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-white">
            {profile.labels.detailsLabel}
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {project.status ? (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{profile.labels.statusLabel}</span>
                <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
              </div>
            ) : null}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{profile.labels.languageLabel}</span>
              <span>{project.language ?? profile.labels.notAvailable}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{profile.labels.starsLabel}</span>
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{profile.labels.forksLabel}</span>
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{profile.labels.updatedLabel}</span>
              <span>{project.updatedLabel}</span>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold text-white">
            {profile.labels.tagsLabel}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} className={getTagBadgeClass(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
          {project.topics.length > 0 ? (
            <p className="mt-4 text-xs text-slate-400">
              {profile.labels.topicsLabel}: {project.topics.join(', ')}
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  )
}
