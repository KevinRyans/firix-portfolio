import { useProfile } from '../lib/i18n'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Reveal from '../components/sections/Reveal'

export default function About() {
  const profile = useProfile()

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20">
      {/* Page title */}
      <Reveal>
        <div className="mb-12 pt-2">
          <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/50" />
            {profile.about.title}
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            {profile.about.subtitle}
          </h1>
        </div>
      </Reveal>

      {/* Two-column layout: intro + timeline */}
      <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Prose cards */}
          <Reveal>
            <Card className="rounded-[10px]">
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {profile.bio}
              </p>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="rounded-[10px]">
              <p className="text-[0.86rem] leading-[1.9] text-slate-500">{profile.intro}</p>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="rounded-[10px]">
              <p className="text-[0.86rem] leading-[1.9] text-slate-500">{profile.tagline}</p>
            </Card>
          </Reveal>

          {/* How I work */}
          <Reveal>
            <h2 className="font-display mb-4 text-xl font-bold text-white">
              {profile.about.workStyleTitle}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.workStyle.map((item) => (
                <Card key={item} className="flex gap-3 rounded-[8px]">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-bold text-accent-400">→</span>
                  <p className="text-sm leading-relaxed text-slate-400">{item}</p>
                </Card>
              ))}
            </div>
          </Reveal>

          {/* Toolbox */}
          <Reveal>
            <h2 className="font-display mb-4 text-xl font-bold text-white">
              {profile.about.toolboxTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.toolbox.map((item) => (
                <Badge key={item} className="rounded-[100px] border-[#242434] bg-transparent text-slate-500 hover:border-accent-400 hover:text-accent-400">
                  {item}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right column: milestones */}
        <div>
          <Reveal>
            <h2 className="font-display mb-4 text-xl font-bold text-white">
              {profile.about.timelineTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {profile.milestones.map((item) => (
                <div key={item.title} className="flex gap-6 rounded-[8px] border border-[#1c1c28] bg-base-900 p-5 transition-colors hover:border-[#242434]">
                  <span className="min-w-[88px] pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent-400">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-display text-[0.95rem] font-bold text-white">{item.title}</h4>
                    <p className="mt-1 text-[0.78rem] leading-[1.7] text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
