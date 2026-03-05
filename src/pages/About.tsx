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
            <Card className="border-l-2 border-l-accent-400">
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {profile.bio}
              </p>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {profile.intro}
              </p>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {profile.tagline}
              </p>
            </Card>
          </Reveal>

          {/* How I work */}
          <Reveal>
            <h2 className="font-display mb-4 text-xl font-bold text-white">
              {profile.about.workStyleTitle}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.workStyle.map((item) => (
                <Card key={item} className="flex gap-3">
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
                <Badge key={item} className="border-white/10 bg-white/5 text-slate-300 hover:border-accent-400/30 hover:text-accent-400">
                  {item}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right column: timeline */}
        <div>
          <Reveal>
            <h2 className="font-display mb-6 text-xl font-bold text-white">
              {profile.about.timelineTitle}
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3.5 top-2 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent-400/40 via-white/10 to-transparent" />

              <div className="space-y-8">
                {profile.milestones.map((item, i) => (
                  <div key={item.title} className="relative flex gap-5">
                    {/* Dot */}
                    <div className="relative mt-1.5 flex-shrink-0">
                      <div
                        className="h-[7px] w-[7px] rounded-full border border-accent-400/60 bg-accent-400/20"
                        style={i === 0 ? { backgroundColor: 'rgba(127,255,178,0.6)' } : undefined}
                      />
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-400">
                        {item.time}
                      </p>
                      <h3 className="font-display mt-1 text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
