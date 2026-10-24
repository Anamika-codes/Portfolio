import { useCallback, useRef, useState } from 'react'
import { dna } from '../data/content'
import { useFinePointer, useMediaQuery } from '../lib/hooks'
import { useTheme } from '../lib/theme'
import { ArrowIntoList, Pointer } from './Icons'
import Reveal from './Reveal'

export default function Dna() {
  const { theme } = useTheme()
  const isFinePointer = useFinePointer()
  const isNarrow = useMediaQuery('(max-width: 767px)')

  // On touch / narrow layouts the cards behave like a classic accordion:
  // tap to open, tap again to close, tap another to switch.
  // On desktop they follow the pointer and collapse when it leaves the row.
  const tapMode = isNarrow || !isFinePointer

  const [hoverIndex, setHoverIndex] = useState(null)
  const [focusIndex, setFocusIndex] = useState(null)
  const [tapIndex, setTapIndex] = useState(null)

  // Tracks whether the last interaction came from a pointer or a keyboard so
  // that "leave the row → collapse everything" never fights keyboard users.
  const pointerDriven = useRef(true)

  const expanded = tapMode ? tapIndex : (hoverIndex ?? focusIndex)

  const collapsePointer = useCallback(() => {
    setHoverIndex(null)
    if (pointerDriven.current && !tapMode) {
      setFocusIndex(null)
      setTapIndex(null)
    }
  }, [tapMode])

  const handleActivate = (index) => {
    pointerDriven.current = true
    if (tapMode) {
      setTapIndex((current) => (current === index ? null : index))
      return
    }
    setHoverIndex(index)
  }

  const handleKeyDown = (event, index) => {
    pointerDriven.current = false
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setTapIndex((current) => (current === index ? null : index))
      setFocusIndex(index)
    }
    if (event.key === 'Escape') {
      setTapIndex(null)
      setFocusIndex(null)
      setHoverIndex(null)
    }
  }

  const eyebrow = theme === 'dark' ? 'Engineering Philosophy & DNA' : 'Core Persona & Values'

  return (
    <section id="qualities" className="section">
      <div className="shell">
        {/* Header row */}
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title mt-3">Inside the Code Mindset</h2>
            <p className="section-desc">
              Hover or tap any letter of{' '}
              <span className="font-semibold tracking-[0.12em] text-accent-ink">A-N-A-M-I-K-A</span> to
              explore the seven architectural principles defining my work.
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-2 text-[0.75rem] text-body">
            <Pointer className="h-4 w-4 text-accent-ink" />
            Hover or touch cards to expand
          </p>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={80} className="mt-10 md:mt-12">
          <div className="dna-row" onPointerLeave={collapsePointer} onMouseLeave={collapsePointer}>
            {dna.map((item, index) => {
              const isOpen = expanded === index
              return (
                <div
                  key={`${item.letter}-${item.title}`}
                  className={`dna-card ${isOpen ? 'is-open' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${item.title} — ${item.description}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse' && !tapMode) {
                      pointerDriven.current = true
                      setHoverIndex(index)
                    }
                  }}
                  onPointerDown={() => {
                    pointerDriven.current = true
                  }}
                  onFocus={() => setFocusIndex(index)}
                  onBlur={() => setFocusIndex((current) => (current === index ? null : current))}
                  onClick={() => handleActivate(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="dna-card__ghost" aria-hidden="true">
                    {item.letter}
                  </span>
                  <span className="dna-card__head" aria-hidden="true">
                    <span className="dna-card__letter">{item.letter}</span>
                  </span>
                  <span className="dna-card__action" aria-hidden="true">
                    <ArrowIntoList className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                  </span>

                  <div className="dna-card__body">
                    <p className="dna-card__eyebrow">
                      <span aria-hidden="true" className={isOpen ? 'animate-ping' : ''} />
                      Principal Quality
                    </p>
                    <h3 className="dna-card__title">{item.title}</h3>
                    <p className="dna-card__desc">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
