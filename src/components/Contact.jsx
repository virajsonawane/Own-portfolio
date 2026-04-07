import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { useSectionParallax } from '../hooks/useSectionParallax'

export function Contact() {
  const [status, setStatus] = useState('idle')
  const reduce = useReducedMotion()
  const { ref, ySlow, yMed, yFast, scaleBlob, opacityMesh } = useSectionParallax()

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    const mail = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    window.location.href = mail
    setStatus('sent')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-zinc-50/80 px-4 py-20 dark:bg-zinc-900/40 sm:px-6"
      aria-labelledby="contact-heading"
    >
      {/* Strong scroll-linked motion graphics behind the form */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(236,72,153,0.18),transparent)] dark:bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(236,72,153,0.24),transparent)]"
        style={{ opacity: opacityMesh }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-44 top-32 -z-10 h-[min(520px,85vw)] w-[min(520px,85vw)] rounded-full bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-transparent blur-3xl"
        style={{ y: yFast, scale: scaleBlob }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-44 top-16 -z-10 h-[min(520px,85vw)] w-[min(520px,85vw)] rounded-full bg-gradient-to-bl from-violet-500/28 via-fuchsia-500/18 to-transparent blur-3xl"
        style={{ y: yMed }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 -z-10 h-72 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-fuchsia-500/10 to-transparent blur-2xl dark:from-fuchsia-500/16"
        style={{ y: ySlow }}
        aria-hidden
      />
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2
            id="contact-heading"
            className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            Get in touch
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Prefer email? Reach me at{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
            >
              {site.contact.email}
            </a>
            {site.contact.phone ? (
              <>
                {' '}
                ·{' '}
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
                >
                  {site.contact.phone}
                </a>
              </>
            ) : null}
            {site.contact.location ? (
              <>
                {' '}
                · {site.contact.location}
              </>
            ) : null}
            . Or use the form—it opens your mail client with a pre-filled message.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.06}>
          <motion.div
            className="relative rounded-2xl p-[1px]"
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0.6, 1, 0.7],
                  }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'linear-gradient(90deg, rgba(139,92,246,0.55), rgba(236,72,153,0.55), rgba(139,92,246,0.55))',
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-950 sm:p-8"
            >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">Name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-lg text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="Your name"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-lg text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-lg text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="Tell me about your project or just say hello."
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <motion.button
                type="submit"
                whileHover={reduce ? undefined : { scale: 1.04, y: -1 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-2xl shadow-violet-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                Send message
              </motion.button>
              {status === 'sent' && (
                <p className="text-base text-emerald-600 dark:text-emerald-400" role="status">
                  Opening your email app…
                </p>
              )}
            </div>
            </form>
          </motion.div>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.1}>
          <p className="text-center text-base font-medium text-zinc-500 dark:text-zinc-500">Connect</p>
          <ul className="mt-4 flex justify-center gap-4">
            {site.contact.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-violet-400/50 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-violet-400"
                  aria-label={s.label}
                >
                  {s.icon === 'github' ? <GitHubIcon /> : <LinkedInIcon />}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
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
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
