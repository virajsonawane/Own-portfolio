import { motion, useReducedMotion } from 'framer-motion'

const NBSP = '\u00A0'

/**
 * Masked word-by-word rise reveal for headings: each word slides up from
 * behind an overflow-hidden line as the heading scrolls into view.
 */
export function TextReveal({ text, as = 'h2', className = '', id, delay = 0 }) {
  const Tag = as
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-60px 0px -40px 0px' }}
            transition={{ duration: 0.75, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {i < words.length - 1 ? word + NBSP : word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
