import { useEffect, useState } from 'react'

/** Tracks the user's reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}

/** Generic media-query hook. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

/**
 * Highlights the nav link for the section currently in view.
 * Uses a top-biased root margin so the active item changes when a section
 * reaches the upper third of the viewport.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!ids.length) return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null)

    if (!sections.length) return

    const visibility = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target.id, entry.intersectionRatio))
        let best = null
        let bestRatio = 0
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        if (best) setActive(best)
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
