import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin reading-progress bar driven by page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.15,
  })

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-400 shadow-sm shadow-violet-500/30"
      style={{ scaleX }}
    />
  )
}
