import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { TextReveal } from './TextReveal'

const resume = site.resume

export function Resume() {
  return (
    <section
      id="resume"
      className="scroll-mt-24 bg-neutral-50 px-4 py-24 dark:bg-neutral-900/40 sm:px-6 sm:py-32"
      aria-labelledby="resume-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {resume.eyebrow}
          </p>
        </FadeIn>
        <TextReveal
          id="resume-heading"
          text={resume.heading}
          className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl"
        />
        <FadeIn>
          <p className="mt-4 max-w-2xl text-lg font-light text-neutral-500 dark:text-white/50 sm:text-xl">
            {resume.intro}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.05}>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Education
            </h3>
            <ol className="relative mt-6 space-y-8 border-l border-neutral-200 pl-6 dark:border-white/10">
              {resume.education.map((entry, i) => (
                <TimelineItem key={`${entry.title}-${i}`} entry={entry} index={i} />
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Experience
            </h3>
            <ol className="relative mt-6 space-y-8 border-l border-neutral-200 pl-6 dark:border-white/10">
              {resume.experience.map((entry, i) => (
                <TimelineItem key={`${entry.title}-${i}`} entry={entry} index={i} />
              ))}
            </ol>
          </FadeIn>
        </div>

        {resume.achievements?.length ? (
          <FadeIn className="mt-16" delay={0.05}>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Achievements & certificates
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2" role="list">
              {resume.achievements.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-base text-neutral-700 dark:border-white/10 dark:bg-neutral-950 dark:text-white/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {resume.languages?.length ? (
            <FadeIn delay={0.08}>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Languages
              </h3>
              <ul className="mt-6 space-y-3" role="list">
                {resume.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex flex-col gap-0.5 rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 dark:border-white/10 dark:bg-neutral-950 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-semibold text-neutral-900 dark:text-white">{lang.name}</span>
                    <span className="text-base text-neutral-500 dark:text-white/50">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ) : null}

          {resume.softSkills?.length ? (
            <FadeIn delay={0.1}>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Soft skills
              </h3>
              <ul className="mt-6 flex flex-wrap gap-3" role="list">
                {resume.softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-blue-500/25 bg-blue-500/5 px-5 py-2.5 text-base font-medium text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ) : null}
        </div>

        <FadeIn className="mt-16" delay={0.05}>
          <a
            href="/Viraj-Sonaswane-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-8 py-3.5 text-base font-semibold text-neutral-900 transition hover:border-blue-400/60 hover:text-blue-600 dark:border-white/15 dark:text-white dark:hover:border-blue-500/50 dark:hover:text-blue-400"
          >
            Download full resume (PDF)
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

function TimelineItem({ entry, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -8 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
    >
      <span
        className="absolute -left-[29px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-blue-500 bg-white dark:bg-neutral-950"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-blue-500" />
      </span>
      <time className="font-display text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-white/40">
        {entry.period}
      </time>
      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">{entry.title}</p>
      <p className="text-base text-blue-600 dark:text-blue-400">{entry.org}</p>
      <p className="mt-2 text-base leading-relaxed text-neutral-600 dark:text-white/60">{entry.detail}</p>
    </motion.li>
  )
}
