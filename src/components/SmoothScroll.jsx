import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { initSmoothScroll } from '../lib/smoothScroll'

/** Mounts Lenis inertia scrolling for the whole page (skipped for reduced motion). */
export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return undefined
    return initSmoothScroll()
  }, [reduce])

  return null
}
