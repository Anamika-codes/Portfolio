import { timeline } from '../data/content'
import { iconMap } from './Icons'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function TrackRecord() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Track Record"
          title="Experience & Education"
          description="Verified academic trajectory and active software engineering responsibilities."
        />

        <div className="timeline mt-12 flex flex-col gap-12 md:gap-16">
          {timeline.map((row, index) => {
            const Icon = iconMap[row.icon]
            return (
              <Reveal key={row.id} delay={index * 90} className="timeline-row">
                {/* ---- Left side ---- */}
                <div className="timeline-left">
                  {row.left.card ? (
                    <div className="card group h-full p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40">
                      <h3 className="font-display text-[1.0625rem] font-bold text-heading transition-colors duration-200 group-hover:text-accent-ink">
                        {row.left.heading}
                      </h3>
                      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-body">{row.left.text}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {row.left.chips.map((chip) => (
                          <li key={chip} className="chip">
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${
                          row.left.pillTone === 'accent'
                            ? 'border-accent/40 bg-accent/12 text-accent-ink'
                            : 'border-line/20 bg-surface text-body'
                        }`}
                      >
                        {row.left.pill}
                      </span>
                      <h3 className="font-display text-xl font-bold text-heading">{row.left.title}</h3>
                      <p className="font-display text-[0.9375rem] font-semibold text-accent-ink">
                        {row.left.accent}
                      </p>
                      <p className="mono text-[0.75rem] text-body">{row.left.meta}</p>
                    </div>
                  )}
                </div>

                {/* ---- Node on the centre line ---- */}
                <div className="timeline-node">
                  <span className="timeline-dot">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                {/* ---- Right side ---- */}
                <div className="timeline-right">
                  {row.right.card ? (
                    <div className="card group h-full p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40">
                      <ul className="flex flex-col gap-3.5">
                        {row.right.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-body">
                            <span
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
                      <span className="rounded-full border border-line/20 bg-surface px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-body">
                        {row.right.pill}
                      </span>
                      <h3 className="font-display text-xl font-bold text-heading">{row.right.title}</h3>
                      <p className="font-display text-[0.9375rem] font-semibold text-accent-ink">
                        {row.right.accent}
                      </p>
                      <p className="mono text-[0.75rem] text-body">{row.right.meta}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
