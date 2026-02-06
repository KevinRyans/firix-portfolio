import { profile } from '../content/profile'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Reveal from '../components/sections/Reveal'

export default function Resume() {
  const resume = profile.resume

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 print-area">
      <SectionHeader title={resume.title} subtitle={resume.subtitle} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="text-sm text-slate-400">
          {resume.printHint}
        </div>
        <Button onClick={() => window.print()}>{resume.printLabel}</Button>
      </div>

      <Reveal className="mt-8">
        <Card className="print-section">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                {profile.name}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                {profile.role}
              </h2>
              <p className="mt-2 text-sm text-slate-300">{profile.tagline}</p>
            </div>
            <div className="text-sm text-slate-300">
              <p>
                <span className="text-slate-400">{resume.locationLabel}:</span>{' '}
                {resume.location}
              </p>
              <p className="mt-1">{profile.links.email.replace('mailto:', '')}</p>
              <p className="mt-1">{profile.contact.links.find((l) => l.label === 'Phone')?.value}</p>
              <p className="mt-1">github.com/KevinRyans</p>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.summaryTitle} />
        <Card className="mt-4 print-section">
          <p className="text-sm text-slate-300 md:text-base">{resume.summary}</p>
        </Card>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.highlightsTitle} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {resume.highlights.map((item) => (
            <Card key={item} className="print-section">
              <p className="text-sm text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.experienceTitle} />
        <div className="mt-4 space-y-4">
          {resume.experience.map((item) => (
            <Card key={item.title} className="print-section">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                {item.time}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.projectsTitle} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {resume.projects.map((project) => (
            <Card key={project.name} className="print-section">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.description}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.skillsTitle} />
        <div className="mt-4 flex flex-wrap gap-2">
          {resume.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.contactTitle} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profile.contact.links.map((link) => (
            <Card key={link.label} className="print-section">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {link.label}
              </p>
              <p className="mt-2 text-sm text-slate-300">{link.value}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
