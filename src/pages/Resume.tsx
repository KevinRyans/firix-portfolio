import { useProfile } from '../lib/i18n'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Reveal from '../components/sections/Reveal'

export default function Resume() {
  const profile = useProfile()
  const resume = profile.resume
  const phone = profile.contact.links.find((link) => link.type === 'phone')?.value

  return (
    <div className="resume-page mx-auto w-full max-w-5xl px-6 pb-24 print-area">
      <SectionHeader
        title={resume.title}
        subtitle={resume.subtitle}
        className="resume-page-title"
      />
      <p className="no-print mt-4 text-sm text-slate-400">{resume.printHint}</p>

      <Reveal className="mt-8">
        <Card className="print-section resume-card resume-identity">
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
              <p className="mt-1">{phone}</p>
              <p className="mt-1">github.com/KevinRyans</p>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.summaryTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card">
          <p className="text-sm text-slate-300 md:text-base">{resume.summary}</p>
        </Card>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.highlightsTitle} className="resume-block-title" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {resume.highlights.map((item) => (
            <Card key={item} className="print-section resume-card resume-tight-card">
              <p className="text-sm text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.experienceTitle} className="resume-block-title" />
        <div className="mt-4 space-y-4">
          {resume.experience.map((item) => (
            <Card key={item.title} className="print-section resume-card">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                {item.time}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              {item.details && item.details.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300/70" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.educationTitle} className="resume-block-title" />
        <div className="mt-4 space-y-4">
          {resume.education.map((item) => (
            <Card key={item.title} className="print-section resume-card">
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
        <SectionHeader title={resume.projectsTitle} className="resume-block-title" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {resume.projects.map((project) => (
            <Card key={project.name} className="print-section resume-card">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.description}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.skillsTitle} className="resume-block-title" />
        <div className="resume-badge-wrap mt-4 flex flex-wrap gap-2">
          {resume.skills.map((skill) => (
            <Badge key={skill} className="resume-badge">
              {skill}
            </Badge>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.interestsTitle} className="resume-block-title" />
        <div className="resume-badge-wrap mt-4 flex flex-wrap gap-2">
          {resume.interests.map((item) => (
            <Badge key={item} className="resume-badge">
              {item}
            </Badge>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeader title={resume.contactTitle} className="resume-block-title" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profile.contact.links.map((link) => (
            <Card key={link.label} className="print-section resume-card resume-tight-card">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {link.label}
              </p>
              <p className="mt-2 text-sm text-slate-300">{link.value}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <div className="no-print mt-14 flex justify-center">
        <Button onClick={() => window.print()} className="min-w-[180px] justify-center">
          {resume.printLabel}
        </Button>
      </div>
    </div>
  )
}
