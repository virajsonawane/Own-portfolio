import { motion } from 'framer-motion'
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

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70"
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        aria-label="Primary"
      >
        <button
          type="button"
          onClick={() => scrollToId('hero')}
          className="max-w-[10rem] truncate text-left text-lg font-semibold tracking-tight text-zinc-900 sm:max-w-none dark:text-white"
        >
          {site.navBrand}
        </button>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollToId(link.id)}
                className="rounded-lg px-3 py-2 text-base font-medium text-zinc-600 transition-colors hover:bg-violet-500/10 hover:text-violet-700 dark:text-zinc-400 dark:hover:text-violet-300"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 transition hover:border-violet-400/50 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-500/40 dark:hover:text-violet-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div className="flex overflow-x-auto border-t border-zinc-200/60 px-4 py-2 sm:hidden dark:border-zinc-800/60">
        <div className="flex min-w-0 gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-violet-500/10 dark:text-zinc-400"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  )
}

function SunIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}
