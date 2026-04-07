import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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

  const orderedIds = useMemo(() => links.map((l) => l.id), [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const glass = scrolled
    ? 'bg-white/10 dark:bg-black/35 border-white/15 dark:border-white/10 shadow-2xl'
    : 'bg-white/8 dark:bg-black/25 border-white/10 dark:border-white/10 shadow-xl'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <motion.nav
          initial={reduce ? false : { y: -18, opacity: 0, scale: 0.98 }}
          animate={reduce ? undefined : { y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Primary"
          className={[
            'relative flex items-center justify-between gap-3 rounded-full border px-3 py-2',
            'backdrop-blur-lg',
            'transition-all duration-300',
            glass,
          ].join(' ')}
        >
          {/* Gradient edge + glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-violet-500/15 opacity-70 blur-xl"
          />

          {/* Left: logo */}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              scrollToId('hero')
            }}
            className="group flex max-w-[12rem] items-center gap-2 truncate rounded-full px-3 py-2 text-left text-base font-semibold tracking-tight text-zinc-900 transition hover:bg-white/10 dark:text-white"
          >
            <span className="truncate">{site.navBrand || 'Viraj Sonawane'}</span>
          </button>

          {/* Center: links (desktop) */}
          <ul className="hidden items-center gap-1 md:flex">
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
                      'text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white',
                      'hover:bg-white/10',
                    ].join(' ')}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/15 dark:bg-white/10 dark:ring-white/10"
                        transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full',
                'border border-white/10 bg-white/10 text-zinc-800 backdrop-blur',
                'transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:shadow-violet-500/10',
                'dark:border-white/10 dark:bg-black/30 dark:text-zinc-100',
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
                'border border-white/10 bg-white/10 text-zinc-800 backdrop-blur',
                'transition-all duration-300 hover:bg-white/15',
                'dark:border-white/10 dark:bg-black/30 dark:text-zinc-100',
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
              <div className="rounded-3xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-lg dark:bg-black/35">
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
                          'text-zinc-800 hover:bg-white/12 dark:text-zinc-100',
                          isActive ? 'bg-white/15 ring-1 ring-white/15' : '',
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
