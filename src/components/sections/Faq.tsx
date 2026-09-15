import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq } from '../../content/site'
import { cn } from '../../lib/utils'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="sporsmal">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

      <div className="mt-12 max-w-narrow">
        <dl className="border-t border-hairline">
          {faq.items.map((item, index) => {
            const isOpen = open === index
            return (
              <Reveal key={item.q} delay={index * 0.04}>
                <div className="border-b border-hairline">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[17px] font-medium tracking-[-0.01em] text-fg">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          'relative h-4 w-4 shrink-0 text-fg-faint transition-transform duration-300 ease-apple',
                          isOpen && 'rotate-45',
                        )}
                        aria-hidden="true"
                      >
                        <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-current" />
                      </span>
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.dd
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.28, 0.11, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose pb-6 pr-10 text-[15px] leading-relaxed text-fg-faint">
                          {item.a}
                        </p>
                      </motion.dd>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </dl>
      </div>
    </Section>
  )
}
