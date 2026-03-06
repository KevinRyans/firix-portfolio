import { useProfile } from '../lib/i18n'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Reveal from '../components/sections/Reveal'

export default function Resume() {
  const profile = useProfile()
  const resume = profile.resume
  const phone = profile.contact.links.find((link) => link.type === 'phone')?.value
  const github = profile.links.github.replace(/^https?:\/\/(www\.)?/, '')

  return (
    <div className="resume-page mx-auto w-full max-w-5xl px-6 pb-24 print-area">
      <SectionHeader
        title={resume.title}
        subtitle={resume.subtitle}
        className="resume-page-title"
      />
      <p className="no-print mt-4 text-sm text-slate-400">{resume.printHint}</p>

      <Reveal className="resume-section mt-8">
        <Card className="print-section resume-card resume-identity rounded-[10px]">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                {profile.name}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-white" style={{letterSpacing:"-0.03em"}}>
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
              <p className="mt-1">{github}</p>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.summaryTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card rounded-[8px]">
          <p className="text-sm text-slate-300 md:text-base">{resume.summary}</p>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.highlightsTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card rounded-[8px]">
          <ul className="resume-list space-y-2 text-sm text-slate-300">
            {resume.highlights.map((item) => (
              <li key={item} className="resume-list-item flex gap-2"><span className="shrink-0 font-mono text-[0.6rem] text-accent-400" style={{paddingTop:"0.15rem"}}>✦</span><span>
                {item}
              </span></li>
            ))}
          </ul>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.experienceTitle} className="resume-block-title" />
        <div className="mt-4 space-y-4">
          {resume.experience.map((item) => (
            <Card key={item.title} className="print-section resume-card resume-entry rounded-[8px]">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-400">
                {item.time}
              </div>
              <h3 className="mt-1.5 font-display text-[1rem] font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              {item.details && item.details.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="mt-0.5 shrink-0 font-mono text-slate-500">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.educationTitle} className="resume-block-title" />
        <div className="mt-4 space-y-4">
          {resume.education.map((item) => (
            <Card key={item.title} className="print-section resume-card resume-entry rounded-[8px]">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-400">
                {item.time}
              </div>
              <h3 className="mt-1.5 font-display text-[1rem] font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.projectsTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card rounded-[8px]">
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.name}>
                <h3 className="text-base font-semibold text-white">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-300">{project.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.skillsTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card resume-tight-card rounded-[8px]">
          <p className="text-sm text-slate-300">{resume.skills.join(' • ')}</p>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.interestsTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card resume-tight-card rounded-[8px]">
          <p className="text-sm text-slate-300">{resume.interests.join(' • ')}</p>
        </Card>
      </Reveal>

      <Reveal className="resume-section mt-10">
        <SectionHeader title={resume.contactTitle} className="resume-block-title" />
        <Card className="mt-4 print-section resume-card resume-tight-card rounded-[8px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.contact.links.map((link) => (
              <div key={link.label} className="resume-contact-row">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {link.label}
                </p>
                <p className="mt-1 text-sm text-slate-300">{link.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <div className="resume-print-action no-print mt-16 mb-4 flex w-full justify-center pt-6">
        <Button onClick={() => window.print()} className="min-w-[180px] justify-center">
          {resume.printLabel}
        </Button>
      </div>
    </div>
  )
}
