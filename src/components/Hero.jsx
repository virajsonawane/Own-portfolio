import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { site } from '../data/siteContent'
import { useTypewriter } from '../hooks/useTypewriter'
import { useSectionParallax } from '../hooks/useSectionParallax'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const typed = useTypewriter(site.typingPhrases)
  const {
    ref,
    ySlow,
    yMed,
    yFast,
    rotateOrb,
    scaleBlob,
    opacityMesh,
    scrollYProgress,
  } = useSectionParallax()

  const reduceMotion = useReducedMotion()
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 72],
  )
  const rotateRing2 = useTransform(rotateOrb, (v) => v * -0.7)

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      {/* Scroll-driven mesh + orbs */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.38),transparent)]"
        style={{ opacity: opacityMesh }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/25 to-transparent blur-3xl dark:from-violet-400/35"
        style={{ y: yFast, scale: scaleBlob }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-[min(400px,70vw)] w-[min(400px,70vw)] rounded-full bg-gradient-to-bl from-fuchsia-500/35 via-violet-500/20 to-transparent blur-3xl"
        style={{ y: yMed }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-violet-500/15 to-transparent blur-2xl dark:from-violet-500/25"
        style={{ y: ySlow }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[min(340px,60vw)] w-[min(340px,60vw)] -translate-x-1/2 rounded-full border border-violet-400/20 dark:border-violet-400/30"
        style={{ rotate: rotateOrb, y: ySlow }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[min(260px,50vw)] w-[min(260px,50vw)] -translate-x-1/2 rounded-full border border-fuchsia-400/15 dark:border-fuchsia-400/25"
        style={{ rotate: rotateRing2, y: yMed }}
        aria-hidden
      />

      <motion.div
        className="mx-auto max-w-3xl text-center"
        style={{ y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-base font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className={
            isDark
              ? 'text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl md:text-7xl'
              : 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl'
          }
        >
          {site.name}
        </motion.h1>

        {site.credential ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.14, duration: 0.45 }}
            className="mt-2 text-lg font-medium text-zinc-600 dark:text-zinc-400 sm:text-xl"
          >
            {site.credential}
          </motion.p>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-1 text-xl font-medium text-violet-600 dark:text-violet-400 sm:text-2xl"
        >
          {site.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-6 min-h-[2.5rem] font-mono text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl"
          aria-live="polite"
        >
          <span className="text-violet-600 dark:text-violet-400">&gt; </span>
          {typed}
          <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-violet-500 align-middle dark:bg-violet-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl"
        >
          {site.heroIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            onClick={() => scrollToId('contact')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
