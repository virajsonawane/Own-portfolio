import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'

/**
 * Renders nothing until testimonials are added in siteContent.js
 * (site.testimonials.items). Add real quotes there as you collect them.
 */
export function Testimonials() {
  const { eyebrow, headingLead, headingAccent, items } = site.testimonials
  if (!items?.length) return null

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2
            id="testimonials-heading"
            className="mt-3 text-balance text-4xl font-medium tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            {headingLead} <span className="font-serif-accent italic">{headingAccent}</span>
          </h2>
        </FadeIn>

        <ul className="mt-14 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((t, i) => (
            <FadeIn key={t.name} delay={0.06 * i}>
              <li className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 dark:border-white/10 dark:bg-neutral-950">
                <p className="flex-1 text-base leading-relaxed text-neutral-700 dark:text-white/70">
                  “{t.quote}”
                </p>
                <footer className="mt-6">
                  <p className="font-semibold text-neutral-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-white/50">{t.role}</p>
                </footer>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
