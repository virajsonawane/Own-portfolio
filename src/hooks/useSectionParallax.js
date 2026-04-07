import { useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-linked motion values for a section (parallax layers, rotation, opacity).
 * Attach `ref` to the section element.
 */
export function useSectionParallax() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const off = (a, b) => (reduce ? [0, 0] : [a, b])

  const ySlow = useTransform(scrollYProgress, [0, 1], off(0, -100))
  const yMed = useTransform(scrollYProgress, [0, 1], off(0, -180))
  const yFast = useTransform(scrollYProgress, [0, 1], off(0, -260))
  const rotateOrb = useTransform(scrollYProgress, [0, 1], off(0, 40))
  const scaleBlob = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1, 1.06, 0.9])
  const opacityMesh = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 0.88, 0.25])

  return {
    ref,
    scrollYProgress,
    ySlow,
    yMed,
    yFast,
    rotateOrb,
    scaleBlob,
    opacityMesh,
  }
}
