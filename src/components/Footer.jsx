import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { site } from '../data/siteContent'

export function Footer() {
  const year = new Date().getFullYear()
  const reduce = useReducedMotion()

  useEffect(() => {
    // DMCA helper needs the badge element to exist (React renders it after HTML parse).
    const existing = document.querySelector('script[data-dmca-helper="true"]')
    if (existing) return
    const s = document.createElement('script')
    s.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js'
    s.defer = true
    s.dataset.dmcaHelper = 'true'
    document.body.appendChild(s)
  }, [])

  return (
    <motion.footer
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-zinc-200 px-4 py-10 dark:border-zinc-800 sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-center text-base text-zinc-500 dark:text-zinc-500">
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex gap-3">
          {site.contact.social.map((s) => (
            <li key={s.label}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex rounded-lg p-2 text-zinc-500 transition-colors hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400"
              >
                {s.icon === 'github' ? <GitHubIcon /> : <LinkedInIcon />}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="mx-auto mt-6 max-w-5xl text-center text-sm text-zinc-400 dark:text-zinc-600"
      >
        {site.footer.note}
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 flex max-w-5xl justify-center"
      >
        <a
          href="https://www.dmca.com/Protection/Status.aspx?ID=3b695953-4ad9-4b3d-ae51-f3107f49cbce"
          title="DMCA.com Protection Status"
          className="dmca-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=3b695953-4ad9-4b3d-ae51-f3107f49cbce"
            alt="DMCA.com Protection Status"
            loading="lazy"
          />
        </a>
      </motion.div>
    </motion.footer>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
