import { useProfile } from '../lib/i18n'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Reveal from '../components/sections/Reveal'

export default function About() {
  const profile = useProfile()

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20">
      <SectionHeader title={profile.about.title} subtitle={profile.about.subtitle} />

      <Reveal className="mt-10">
        <Card>
          <p className="text-sm text-slate-300 md:text-base">{profile.bio}</p>
        </Card>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeader title={profile.about.timelineTitle} />
        <div className="mt-6 space-y-4">
          {profile.milestones.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                {item.time}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeader title={profile.about.toolboxTitle} />
        <div className="mt-6 flex flex-wrap gap-3">
          {profile.toolbox.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeader title={profile.about.workStyleTitle} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {profile.workStyle.map((item) => (
            <Card key={item}>
              <p className="text-sm text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
