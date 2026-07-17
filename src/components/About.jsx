import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { TextReveal } from './TextReveal'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {site.about.eyebrow}
          </p>
        </FadeIn>
        <TextReveal
          id="about-heading"
          text={site.about.heading}
          className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <FadeIn>
            <p className="text-pretty text-xl font-light leading-relaxed text-neutral-600 dark:text-white/60 sm:text-2xl">
              {site.about.bio}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <dl className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-white/10 dark:border-white/10">
              {site.about.facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[100px_1fr] sm:gap-4">
                  <dt className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40">
                    {fact.label}
                  </dt>
                  <dd className="text-base font-medium text-neutral-800 dark:text-white/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
