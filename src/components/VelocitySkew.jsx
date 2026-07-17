import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

/**
 * Skews its children slightly based on scroll velocity, so the page feels
 * fluid while scrolling and settles back when it stops.
 */
export function VelocitySkew({ children, className = '' }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothed = useSpring(velocity, { stiffness: 280, damping: 50, mass: 0.6 })
  const skewY = useTransform(
    smoothed,
    [-2400, 2400],
    reduce ? ['0deg', '0deg'] : ['-1.1deg', '1.1deg'],
    { clamp: true },
  )

  return (
    <motion.div className={`relative will-change-transform ${className}`} style={{ skewY }}>
      {children}
    </motion.div>
  )
}
