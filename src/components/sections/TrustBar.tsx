import { trustBar } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section } from '../ui/Section'

export default function TrustBar() {
  return (
    <Section tone="muted" flush className="border-y border-hairline">
      <div className="py-12 sm:py-16">
        <Reveal>
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.06em] text-fg-faint">
            {trustBar.title}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {trustBar.items.map((item, index) => (
            <Reveal key={item.stat} delay={index * 0.08} className="text-center">
              <p className="text-[28px] font-semibold tracking-[-0.02em] text-fg sm:text-[32px]">
                {item.stat}
              </p>
              <p className="mx-auto mt-2 max-w-[28ch] text-[14px] leading-relaxed text-fg-faint">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
