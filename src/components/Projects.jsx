import { motion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-zinc-50/80 px-4 py-20 dark:bg-zinc-900/40 sm:px-6"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2
            id="projects-heading"
            className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Selected projects—add or edit entries in{' '}
            <code className="rounded bg-zinc-200/80 px-2 py-0.5 text-base dark:bg-zinc-800">
              src/data/siteContent.js
            </code>
            .
          </p>
        </FadeIn>

        <motion.ul
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
        >
          {site.projects.map((project) => (
            <motion.li key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-shadow hover:border-violet-300/50 hover:shadow-xl hover:shadow-violet-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-500/30"
    >
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{project.title}</h3>
      <p className="mt-2 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-lg bg-violet-500/10 px-2.5 py-1 text-sm font-medium text-violet-700 dark:text-violet-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center text-base font-semibold text-violet-600 transition group-hover:gap-2 dark:text-violet-400"
      >
        {project.liveLabel}
        <span
          className="ml-1 inline-block transition group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      </a>
    </motion.article>
  )
}
