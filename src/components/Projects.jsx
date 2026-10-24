import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/content'
import { Check, ChevronLeft, ChevronRight, Github, Rocket, iconMap } from './Icons'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Projects() {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft >= max - 4,
    })
  }, [])

  useEffect(() => {
    updateEdges()
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      track.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.project-card')
    const gap = 24
    const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Selected Engineering Projects"
          title="Featured Software & Systems"
          description="Real repositories, verified architectures, and functional technical implementation."
          action={
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                aria-label="Previous project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-softborder bg-surface text-heading transition-all duration-200 hover:border-accent/60 hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-softborder disabled:hover:text-heading"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                aria-label="Next project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-softborder bg-surface text-heading transition-all duration-200 hover:border-accent/60 hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-softborder disabled:hover:text-heading"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href="https://github.com/Anamika-codes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-softborder bg-surface px-4 py-2.5 text-[0.8125rem] font-medium text-accent-ink transition-colors duration-200 hover:border-accent/50"
              >
                More on GitHub
              </a>
            </div>
          }
        />

        <Reveal delay={80} className="mt-10 md:mt-12">
          <div
            ref={trackRef}
            className="project-track"
            role="region"
            aria-label="Featured projects carousel"
            tabIndex={0}
          >
            {projects.map((project) => {
              const Icon = iconMap[project.icon]
              const isLive = project.statusTone === 'live'
              return (
                <article key={project.title} className="project-card card group flex flex-col overflow-hidden">
                  <div className="project-head">
                    <span
                      className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-line/20 bg-bg/60 text-accent-ink backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7" />
                    </span>

                    <span className="absolute left-3 top-3 z-10 rounded-full border border-line/20 bg-bg/70 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-heading backdrop-blur-sm">
                      {project.tag}
                    </span>

                    <span
                      className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] backdrop-blur-sm ${
                        isLive
                          ? 'border-green-500/40 bg-green-500/15 text-green-400'
                          : 'border-amber-500/40 bg-amber-500/15 text-amber-500'
                      }`}
                    >
                      {isLive ? (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                        </span>
                      ) : (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-amber-400"
                          aria-hidden="true"
                        />
                      )}
                      {project.status}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-heading transition-colors duration-200 group-hover:text-accent-ink">{project.title}</h3>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-body">
                        {project.description}
                      </p>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-[0.8125rem] text-body">
                          <Check className="mt-[3px] h-4 w-4 shrink-0 text-accent-ink" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap gap-1.5">
                      {project.chips.map((chip) => (
                        <li key={chip} className="chip">
                          {chip}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {project.buttons.map((button) => (
                        <a
                          key={button.label}
                          href={button.href}
                          target={button.href.startsWith('http') ? '_blank' : undefined}
                          rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`btn ${button.variant === 'primary' ? 'btn-primary btn-shine' : 'btn-outline'} !px-4 !py-2.5 !text-[0.8125rem]`}
                        >
                          {button.variant === 'primary' ? (
                            <Rocket className="h-4 w-4" />
                          ) : (
                            <Github className="h-4 w-4" />
                          )}
                          {button.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
