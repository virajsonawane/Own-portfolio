import Lenis from 'lenis'

let lenis = null

/** Start Lenis inertia scrolling for the page. Returns a cleanup function. */
export function initSmoothScroll() {
  if (lenis) return () => {}

  const instance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })
  lenis = instance

  let frame = requestAnimationFrame(function raf(time) {
    instance.raf(time)
    frame = requestAnimationFrame(raf)
  })

  return () => {
    cancelAnimationFrame(frame)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

/** Smooth-scroll to a section by id, honoring its CSS scroll-margin-top. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenis) {
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    lenis.scrollTo(el, { offset: -margin, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
