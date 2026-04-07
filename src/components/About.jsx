import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2
            id="about-heading"
            className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            About me
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {site.about.bio}
          </p>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.08}>
          <h3 className="text-base font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Skills
          </h3>
          <ul className="mt-6 space-y-5" role="list">
            {site.about.skills.map((skill) => (
              <li key={skill.name}>
                <SkillBar name={skill.name} level={skill.level} />
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}

function SkillBar({ name, level }) {
  const reduce = useReducedMotion()

  return (
    <div>
      <div className="mb-2 flex justify-between text-base">
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{name}</span>
        <span className="tabular-nums text-zinc-500 dark:text-zinc-500">{level}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-400"
          initial={reduce ? { width: `${level}%` } : { width: 0 }}
          whileInView={reduce ? undefined : { width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
