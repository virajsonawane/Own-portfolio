import { motion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'

const resume = site.resume

export function Resume() {
  return (
    <section
      id="resume"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="resume-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div>
            <h2
              id="resume-heading"
              className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
            >
              Resume
            </h2>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Education, experience, and highlights from my CV.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.05}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Education
            </h3>
            <ol className="relative mt-6 space-y-8 border-l border-zinc-200 pl-6 dark:border-zinc-700">
              {resume.education.map((entry, i) => (
                <TimelineItem key={`${entry.title}-${i}`} entry={entry} index={i} />
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Experience
            </h3>
            <ol className="relative mt-6 space-y-8 border-l border-zinc-200 pl-6 dark:border-zinc-700">
              {resume.experience.map((entry, i) => (
                <TimelineItem key={`${entry.title}-${i}`} entry={entry} index={i} />
              ))}
            </ol>
          </FadeIn>
        </div>

        {resume.achievements?.length ? (
          <FadeIn className="mt-16" delay={0.05}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Achievements & certificates
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2" role="list">
              {resume.achievements.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}

        {resume.languages?.length ? (
          <FadeIn className="mt-16" delay={0.08}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Languages
            </h3>
            <ul className="mt-6 space-y-3" role="list">
              {resume.languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex flex-col gap-0.5 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-semibold text-zinc-900 dark:text-white">{lang.name}</span>
                  <span className="text-base text-zinc-600 dark:text-zinc-400">{lang.level}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}

        {resume.softSkills?.length ? (
          <FadeIn className="mt-16" delay={0.1}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Soft skills
            </h3>
            <ul className="mt-6 flex flex-wrap gap-3" role="list">
              {resume.softSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl border-2 border-violet-500/30 bg-violet-500/5 px-4 py-2 text-base font-medium text-violet-800 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}
      </div>
    </section>
  )
}

function TimelineItem({ entry, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
    >
      <span
        className="absolute -left-[29px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-violet-500 bg-white dark:bg-zinc-950"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
      </span>
      <time className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
        {entry.period}
      </time>
      <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">{entry.title}</p>
      <p className="text-base text-violet-600 dark:text-violet-400">{entry.org}</p>
      <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">{entry.detail}</p>
    </motion.li>
  )
}
