import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/siteContent'
import { FadeIn } from './FadeIn'
import { useSectionParallax } from '../hooks/useSectionParallax'

export function Contact() {
  const [status, setStatus] = useState('idle')
  const reduce = useReducedMotion()
  const { ref, yMed, opacityMesh } = useSectionParallax()

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
      className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <motion.div
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 text-neutral-900 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)] dark:text-white"
        style={{ opacity: opacityMesh }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[min(480px,85vw)] w-[min(480px,85vw)] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10"
        style={{ y: yMed }}
        aria-hidden
      />

      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-center font-display text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-white/50">
            {site.contact.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2
            id="contact-heading"
            className="mt-3 text-balance text-center text-4xl font-medium tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            {site.contact.headingLead}{' '}
            <span className="font-serif-accent italic">{site.contact.headingAccent}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="mt-5 text-center text-lg font-light text-neutral-500 dark:text-white/50">
            Reach me at{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
            >
              {site.contact.email}
            </a>
            {site.contact.phone ? (
              <>
                {' '}
                ·{' '}
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
                >
                  {site.contact.phone}
                </a>
              </>
            ) : null}
            {site.contact.location ? <> · {site.contact.location}</> : null}
            . Or use the form—it opens your mail client with a pre-filled message.
          </p>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-950 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-base font-medium text-neutral-700 dark:text-white/70">Name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-lg text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                  placeholder="Your name"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-base font-medium text-neutral-700 dark:text-white/70">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-lg text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-base font-medium text-neutral-700 dark:text-white/70">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-lg text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                placeholder="Tell me about your project or just say hello."
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <motion.button
                type="submit"
                whileHover={reduce ? undefined : { scale: 1.04, y: -1 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-neutral-900"
              >
                Send message
              </motion.button>
              {status === 'sent' && (
                <p className="text-base text-green-600 dark:text-green-400" role="status">
                  Opening your email app…
                </p>
              )}
            </div>
          </form>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.12}>
          <p className="text-center font-display text-[11px] uppercase tracking-[0.25em] text-neutral-400 dark:text-white/40">
            Connect
          </p>
          <ul className="mt-4 flex justify-center gap-3" role="list">
            {site.contact.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-medium text-neutral-700 transition hover:border-blue-400/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-blue-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
