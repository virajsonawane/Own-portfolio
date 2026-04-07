import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { useSectionParallax } from '../hooks/useSectionParallax'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const item = {
  hidden: {},
  show: { transition: { duration: 0.01 } },
}

export function Projects() {
  const reduce = useReducedMotion()
  const { ref, ySlow, yMed, yFast, rotateOrb, scaleBlob, opacityMesh } =
    useSectionParallax()

  return (
    <section
      ref={ref}
      id="projects"
      className="relative scroll-mt-24 overflow-hidden bg-zinc-50/80 px-4 py-20 dark:bg-zinc-900/40 sm:px-6"
      aria-labelledby="projects-heading"
    >
      {/* Stronger scroll-linked motion graphics */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(139,92,246,0.22),transparent)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(139,92,246,0.32),transparent)]"
        style={{ opacity: opacityMesh }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-12 -z-10 h-[min(520px,85vw)] w-[min(520px,85vw)] rounded-full bg-gradient-to-br from-violet-500/35 via-fuchsia-500/25 to-transparent blur-3xl dark:from-violet-400/30"
        style={{ y: yFast, scale: scaleBlob }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-40 top-40 -z-10 h-[min(520px,85vw)] w-[min(520px,85vw)] rounded-full bg-gradient-to-bl from-fuchsia-500/30 via-violet-500/20 to-transparent blur-3xl"
        style={{ y: yMed }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 -z-10 h-72 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-violet-500/10 to-transparent blur-2xl dark:from-violet-500/18"
        style={{ y: ySlow }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-28 -z-10 h-[min(360px,70vw)] w-[min(360px,70vw)] -translate-x-1/2 rounded-full border border-violet-400/15 dark:border-violet-400/25"
        style={{ rotate: rotateOrb, y: ySlow }}
        aria-hidden
      />

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
          className="mt-12 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
        >
          {site.projects.map((project) => (
            <DepthCard key={project.title} project={project} reduce={reduce} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function DepthCard({ project, reduce }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // When the card enters the viewport from below -> 0, when it's centered-ish -> ~0.6-0.8
    offset: ['start 95%', 'end 35%'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1])
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.9, 1])
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0])
  const blur = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0])
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <motion.li
      ref={ref}
      variants={item}
      className="transform-gpu [transform-style:preserve-3d]"
      style={{
        opacity,
        y,
        rotateX,
        scale,
        filter,
      }}
    >
      <ProjectCard project={project} reduce={reduce} />
    </motion.li>
  )
}

function ProjectCard({ project, reduce }) {
  return (
    <motion.article
      whileHover={
        reduce
          ? undefined
          : {
              y: -10,
              rotateX: 6,
              rotateY: -6,
              transition: { type: 'spring', stiffness: 260, damping: 18 },
            }
      }
      whileTap={reduce ? undefined : { scale: 0.985 }}
      className="group relative flex h-full transform-gpu flex-col rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-shadow hover:border-violet-300/60 hover:shadow-2xl hover:shadow-violet-500/15 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-500/35"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-violet-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 group-hover:from-violet-500/10 group-hover:via-fuchsia-500/10 group-hover:to-violet-500/5 dark:group-hover:from-violet-500/15 dark:group-hover:via-fuchsia-500/12"
        animate={
          reduce
            ? undefined
            : { opacity: [0.0, 0.22, 0.14], scale: [1, 1.02, 1] }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
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
