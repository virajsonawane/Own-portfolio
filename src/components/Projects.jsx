import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { TextReveal } from './TextReveal'
import { scrollToId } from '../lib/smoothScroll'

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 overflow-hidden bg-neutral-50 px-4 py-24 dark:bg-neutral-900/40 sm:px-6 sm:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {site.showcase.eyebrow}
          </p>
        </FadeIn>
        <TextReveal
          id="projects-heading"
          text={site.showcase.heading}
          className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl"
        />
        <FadeIn>
          <p className="mt-4 max-w-2xl text-lg font-light text-neutral-500 dark:text-white/50 sm:text-xl">
            {site.showcase.intro}
          </p>
        </FadeIn>

        <div className="mt-14 space-y-10">
          {site.projects.map((project, i) => (
            <ShowcaseCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ShowcaseCard({ project, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 50%'],
  })
  const spring = useSpring(scrollYProgress, { stiffness: 240, damping: 32, mass: 0.3 })
  const p = reduce ? scrollYProgress : spring
  const y = useTransform(p, [0, 1], reduce ? [0, 0] : [60, 0])
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.96, 1])
  const opacity = useTransform(p, [0, 0.3, 1], [0, 0.9, 1])

  const isAnchor = project.href?.startsWith('#')

  return (
    <motion.article
      ref={ref}
      style={{ y, scale, opacity }}
      className="group relative grid transform-gpu gap-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-colors hover:border-blue-400/40 dark:border-white/10 dark:bg-neutral-950 dark:hover:border-blue-500/30 sm:p-12 lg:grid-cols-[1.5fr_1fr]"
    >
      <div>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-sm font-medium text-neutral-300 dark:text-white/20">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
            {project.title}
          </h3>
        </div>

        <p className="mt-5 text-lg font-light leading-relaxed text-neutral-600 dark:text-white/60">
          {project.description}
        </p>

        <ul className="mt-7 space-y-3" role="list">
          {project.highlights?.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-500/10 text-blue-500" aria-hidden>
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-base text-neutral-700 dark:text-white/70">{point}</span>
            </li>
          ))}
        </ul>

        {isAnchor ? (
          <button
            type="button"
            onClick={() => scrollToId(project.href.slice(1))}
            className="mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-neutral-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            {project.liveLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </button>
        ) : (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-neutral-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            {project.liveLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        )}
      </div>

      <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-neutral-200 lg:pl-10 dark:lg:border-white/10">
        <div>
          <p className="font-display text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 dark:text-white/40">
            Tech stack
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack" role="list">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="hidden h-40 rounded-2xl bg-gradient-to-br from-blue-500/10 via-neutral-100 to-transparent dark:via-white/5 lg:block"
          aria-hidden
        />
      </div>
    </motion.article>
  )
}
