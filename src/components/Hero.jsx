import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { ArrowDown, GraduationCap, Layers, MapPin } from 'lucide-react'
import { site } from '../data/siteContent'
import { useSectionParallax } from '../hooks/useSectionParallax'
import { scrollToId } from '../lib/smoothScroll'

const META_ICONS = {
  'map-pin': MapPin,
  layers: Layers,
  'graduation-cap': GraduationCap,
}

const EASE = [0.16, 1, 0.3, 1]

/** Giant viewport-width name with a masked letter-by-letter rise. */
function BigName({ name, fullName }) {
  const reduce = useReducedMotion()
  const letters = name.split('')

  return (
    <h1
      aria-label={fullName}
      className="select-none text-center font-display text-[17vw] font-bold uppercase leading-none tracking-[-0.005em] text-neutral-900 dark:text-white"
    >
      {/* Single line-level mask so tight tracking can't clip glyph edges. */}
      <span
        aria-hidden
        className="-mb-[0.1em] -mt-[0.05em] block overflow-hidden px-[0.08em] pb-[0.1em] pt-[0.05em]"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '115%' }}
            animate={reduce ? undefined : { y: '0%' }}
            transition={{ duration: 0.9, delay: 0.12 + i * 0.06, ease: EASE }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

export function Hero() {
  const { ref, ySlow, yMed, opacityMesh, scrollYProgress } = useSectionParallax()
  const reduceMotion = useReducedMotion()
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 88],
  )

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-14"
      aria-labelledby="hero-heading"
    >
      {/* Dotted grid + soft glow, fading on scroll */}
      <motion.div
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 text-neutral-900 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] dark:text-white"
        style={{ opacity: opacityMesh }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[min(560px,90vw)] w-[min(560px,90vw)] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        style={{ y: yMed }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-56 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-neutral-200/60 to-transparent blur-2xl dark:from-neutral-900/80"
        style={{ y: ySlow }}
        aria-hidden
      />

      <motion.div className="mx-auto w-full max-w-6xl" style={{ y: contentY }}>
        {/* Status pill */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="font-display text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-600 dark:text-white/60">
            {site.hero.statusRole}
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.15em] text-green-600 dark:text-green-500 sm:inline">
            {site.hero.statusNote}
          </span>
        </motion.div>

        {/* Giant name */}
        <div id="hero-heading">
          <BigName name={site.firstName} fullName={site.name} />
        </div>

        {/* Tagline: muted sans line + big italic serif line */}
        <div className="mt-6 text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="text-lg font-light text-neutral-500 dark:text-white/40 sm:text-2xl"
          >
            {site.hero.taglineLead}
          </motion.p>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            className="font-serif-accent text-4xl lowercase italic leading-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl"
          >
            {site.hero.taglineAccent}
          </motion.p>
        </div>

        {/* Meta row */}
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-start justify-center gap-x-12 gap-y-8"
          role="list"
        >
          {site.hero.meta.map((m) => {
            const Icon = META_ICONS[m.icon] ?? Layers
            return (
              <li key={m.strong} className="flex flex-col items-center gap-3">
                <Icon className="h-5 w-5 text-blue-500" aria-hidden />
                <p className="text-center font-display text-xs uppercase tracking-wider sm:text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">{m.strong}</span>
                  <br />
                  <span className="text-neutral-500 dark:text-white/50">{m.muted}</span>
                </p>
              </li>
            )
          })}
        </motion.ul>

        {/* Say hi + CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <motion.button
            type="button"
            onClick={() => scrollToId('contact')}
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-neutral-900"
          >
            Get in touch
          </motion.button>
          <div className="flex items-center gap-3">
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-white/40">
              {site.hero.sayHi}
            </span>
            <ul className="flex items-center gap-2" role="list">
              {site.contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-neutral-700 backdrop-blur transition hover:border-blue-400/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-blue-400"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-neutral-400 transition hover:text-neutral-900 dark:text-white/30 dark:hover:text-white"
        aria-label="Scroll to about section"
      >
        <motion.span
          className="block"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  )
}
