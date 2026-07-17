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
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
      style={{ scaleX }}
    />
  )
}
