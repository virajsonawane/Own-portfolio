import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
}

const chip = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Skills() {
  const reduce = useReducedMotion()

  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {site.skillset.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2
            id="skills-heading"
            className="mt-3 text-balance text-4xl font-medium tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            {site.skillset.headingLead}{' '}
            <span className="font-serif-accent italic">{site.skillset.headingAccent}</span>
          </h2>
        </FadeIn>

        <motion.ul
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5"
          role="list"
        >
          {site.skillset.items.map((skill) => (
            <motion.li
              key={skill}
              variants={reduce ? undefined : chip}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-blue-400/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:border-blue-500/40 dark:hover:text-blue-400"
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Adjective marquee strip */}
      <div
        className="relative mt-20 border-y border-neutral-200 py-5 dark:border-white/10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden
      >
        <div className={`flex w-max ${reduce ? '' : 'animate-marquee'}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {site.skillset.marquee.map((word) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="px-6 font-display text-2xl font-medium uppercase tracking-wide text-neutral-300 dark:text-white/15 sm:text-3xl">
                    {word}
                  </span>
                  <span className="text-blue-500/50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
