import { motion, useReducedMotion } from 'framer-motion'

export function FadeIn({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 44, scale: 0.96, filter: 'blur(10px)' }}
      whileInView={
        reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-80px 0px -40px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
