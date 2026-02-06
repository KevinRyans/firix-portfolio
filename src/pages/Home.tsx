import { Link } from 'react-router-dom'
import { Layout, Server, Palette, Shield } from 'lucide-react'
import { useProjects } from '../lib/projects'
import { useProfile } from '../lib/i18n'
import { buttonStyles } from '../components/ui/buttonStyles'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectCardSkeleton from '../components/projects/ProjectCardSkeleton'
import HeroShowcase from '../components/sections/HeroShowcase'
import Reveal from '../components/sections/Reveal'

const iconMap = { Layout, Server, Palette, Shield }

type IconName = keyof typeof iconMap

export default function Home() {
  const profile = useProfile()
  const { projects, status, source } = useProjects(profile)
  const latestWorks = projects.slice(0, profile.home.latestWorksCount)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20">
      <section className="pt-10">
        <HeroShowcase />
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </section>

      <Reveal>
        <SectionHeader
          title={profile.home.whatIDoTitle}
          subtitle={profile.home.whatIDoSubtitle}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {profile.whatIDo.map((item) => {
            const Icon = iconMap[item.icon as IconName] ?? Layout
            return (
              <Card key={item.title} interactive>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <SectionHeader
          title={profile.home.latestWorksTitle}
          subtitle={profile.home.latestWorksSubtitle}
        />
        {source === 'sample' ? (
          <p className="mt-3 text-xs text-slate-400">{profile.projects.fallbackNotice}</p>
        ) : null}
        <div className="mt-8">
          {status === 'loading' ? (
            <ProjectCardSkeleton count={6} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestWorks.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant={project.featured ? 'featured' : 'default'}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link to="/projects" className={buttonStyles({ variant: 'ghost' })}>
            {profile.labels.viewAll}
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <SectionHeader
          title={profile.home.stackTitle}
          subtitle={profile.home.stackSubtitle}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {profile.stack.map((item) => (
            <Badge key={item} className="bg-white/10 text-slate-200">
              {item}
            </Badge>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <SectionHeader title={profile.home.nowTitle} subtitle={profile.home.nowSubtitle} />
        <Card className="mt-6">
          <p className="text-sm text-slate-300 md:text-base">{profile.now}</p>
        </Card>
      </Reveal>
    </div>
  )
}
