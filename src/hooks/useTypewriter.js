import { useState, useEffect } from 'react'

export function useTypewriter(phrases, {
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseAfterWord = 2200,
  pauseBeforeNext = 400,
} = {}) {
  const [display, setDisplay] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (!phrases.length) return undefined

    const current = phrases[phraseIndex % phrases.length]
    let timeoutId

    if (phase === 'typing') {
      if (display.length < current.length) {
        timeoutId = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1))
        }, typingSpeed)
      } else {
        timeoutId = setTimeout(() => setPhase('pausing'), pauseAfterWord)
      }
    } else if (phase === 'pausing') {
      timeoutId = setTimeout(() => setPhase('deleting'), pauseBeforeNext)
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplay((d) => d.slice(0, -1))
        }, deletingSpeed)
      } else {
        timeoutId = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setPhase('typing')
        }, 0)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [
    display,
    phase,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseAfterWord,
    pauseBeforeNext,
  ])

  return display
}
