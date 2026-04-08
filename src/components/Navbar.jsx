import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { site } from '../data/siteContent'

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const wrapRef = useRef(null)
  const navRef = useRef(null)
  const brandRef = useRef(null)
  const [centerShift, setCenterShift] = useState(0)
  const x = useMotionValue(0)
  const xAnimRef = useRef(null)
  const shiftSpeedPxPerSec = 520

  const orderedIds = useMemo(() => links.map((l) => l.id), [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Constant-speed x animation (no easing or spring artifacts).
  useEffect(() => {
    if (reduce) return undefined

    const target = scrolled ? centerShift : 0
    const current = x.get()
    const distance = Math.abs(target - current)
    const duration = Math.min(1.8, Math.max(0.7, distance / shiftSpeedPxPerSec))

    xAnimRef.current?.stop?.()
    xAnimRef.current = animate(x, target, { duration, ease: 'linear' })

    return () => xAnimRef.current?.stop?.()
  }, [centerShift, reduce, scrolled, x])

  useEffect(() => {
    const sections = orderedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: '-30% 0px -55% 0px' },
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [orderedIds])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (!open) return undefined
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // More "glassy" (less transparent) so it doesn't disappear on dark gradients.
  const glass = scrolled
    ? 'bg-white/22 dark:bg-black/55 border-white/20 dark:border-white/15 shadow-2xl'
    : 'bg-white/16 dark:bg-black/45 border-white/15 dark:border-white/12 shadow-xl'

  useEffect(() => {
    function compute() {
      const wrap = wrapRef.current
      const nav = navRef.current
      const brand = brandRef.current
      if (!wrap || !nav || !brand) return

      const w = wrap.getBoundingClientRect().width
      const n = nav.getBoundingClientRect().width
      const b = brand.getBoundingClientRect().width
      const gap = 16 // matches `gap-4`

      // nav is positioned at right:0; we want to center it in the space *to the right of the brand*.
      const available = Math.max(0, w - b - gap)
      const desiredLeft = b + gap + Math.max(0, (available - n) / 2)
      const rightPos = w - n
      setCenterShift(desiredLeft - rightPos)
    }

    compute()

    const ro = new ResizeObserver(compute)
    if (wrapRef.current) ro.observe(wrapRef.current)
    if (navRef.current) ro.observe(navRef.current)
    if (brandRef.current) ro.observe(brandRef.current)
    window.addEventListener('resize', compute)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={wrapRef}
        className="relative mx-auto flex max-w-6xl items-start justify-start gap-4 px-4 pt-4 sm:px-6"
      >
        {/* Brand on the far left (outside the pill) */}
        <button
          ref={brandRef}
          type="button"
          onClick={() => {
            setOpen(false)
            scrollToId('hero')
          }}
          className={[
            'mt-1 rounded-full border px-4 py-2 text-left text-base font-semibold tracking-tight',
            'backdrop-blur-lg backdrop-saturate-150 transition-all duration-300',
            // Light theme
            'border-zinc-900/15 bg-zinc-900/90 text-white shadow-xl shadow-black/20 hover:bg-zinc-900/95',
            // Dark theme
            'dark:border-white/12 dark:bg-black/45 dark:text-white dark:shadow-black/30 dark:hover:bg-black/55',
          ].join(' ')}
        >
          {site.navBrand || 'Viraj Sonawane'}
        </button>

        <motion.nav
          ref={navRef}
          initial={reduce ? false : { y: -18, opacity: 0, scale: 0.98 }}
          animate={
            reduce
              ? undefined
              : {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }
          }
          transition={{
            // Keep the entrance consistent.
            opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          aria-label="Primary"
          className={[
            'absolute right-0 top-0 w-fit flex-none flex items-center justify-between gap-3 rounded-full border px-3 py-2',
            'backdrop-blur-lg backdrop-saturate-150',
            'transition-all duration-300',
            glass,
          ].join(' ')}
          style={{ x }}
        >
          {/* Gradient edge + glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/25 via-fuchsia-500/18 to-violet-500/25 opacity-80 blur-xl"
          />

          {/* Center: links (desktop) */}
          <div className="hidden md:flex">
            <ul className="relative flex items-center rounded-full border border-white/10 bg-black/20 p-1 shadow-inner shadow-black/30 backdrop-blur-lg dark:bg-black/35">
              {links.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        scrollToId(link.id)
                      }}
                      className={[
                        'relative rounded-full px-4 py-2 text-base font-medium',
                        'transition-all duration-300',
                        isActive
                          ? 'text-zinc-900'
                          : 'text-white/70 hover:text-white',
                      ].join(' ')}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-chip"
                          className="absolute inset-0 -z-10 rounded-full bg-white shadow-lg shadow-black/20 ring-1 ring-white/40"
                          transition={{ type: 'spring', stiffness: 620, damping: 38 }}
                        />
                      ) : null}
                      <span className="relative">{link.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full',
                'border border-white/15 bg-white/16 text-zinc-900 backdrop-blur',
                'transition-all duration-300 hover:bg-white/22 hover:shadow-xl hover:shadow-violet-500/15',
                'dark:border-white/12 dark:bg-black/45 dark:text-zinc-100',
              ].join(' ')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden',
                'border border-white/15 bg-white/16 text-zinc-900 backdrop-blur',
                'transition-all duration-300 hover:bg-white/22',
                'dark:border-white/12 dark:bg-black/45 dark:text-zinc-100',
              ].join(' ')}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="md:hidden"
          >
            <motion.div
              initial={reduce ? false : { y: -8, opacity: 0, scale: 0.98 }}
              animate={reduce ? undefined : { y: 0, opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { y: -8, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-3 max-w-6xl px-4 sm:px-6"
            >
              <div className="rounded-3xl border border-white/15 bg-white/16 p-3 shadow-2xl backdrop-blur-lg backdrop-saturate-150 dark:border-white/12 dark:bg-black/55">
                <div className="grid gap-1">
                  {links.map((link) => {
                    const isActive = active === link.id
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => {
                          setOpen(false)
                          scrollToId(link.id)
                        }}
                        className={[
                          'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium',
                          'transition-all duration-300',
                          'text-zinc-900 hover:bg-white/18 dark:text-zinc-100',
                          isActive ? 'bg-white/22 ring-1 ring-white/18 dark:bg-white/14 dark:ring-white/12' : '',
                        ].join(' ')}
                      >
                        <span>{link.label}</span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">↵</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
