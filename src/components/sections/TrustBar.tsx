import { trustBar } from '../../content/site'
import Reveal from '../ui/Reveal'

export default function TrustBar() {
  return (
    <section className="border-y border-line-soft bg-muted">
      <div className="shell py-12 sm:py-16">
        <Reveal>
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.06em] text-ink-ghost">
            {trustBar.title}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {trustBar.items.map((item, index) => (
            <Reveal key={item.stat} delay={index * 0.08} className="text-center">
              <p className="text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
                {item.stat}
              </p>
              <p className="mx-auto mt-2 max-w-[28ch] text-[14px] leading-relaxed text-ink-faint">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
