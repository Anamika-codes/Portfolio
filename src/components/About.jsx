import { about } from '../data/content'
import { iconMap, Quote } from './Icons'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">Behind the Code</span>
            <h2 className="section-title mt-3">About Me</h2>
          </Reveal>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:mt-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-10">
          {/* Text column */}
          <Reveal className="flex flex-col gap-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[0.9375rem] leading-[1.8] text-body">
                {paragraph}
              </p>
            ))}

            <ul className="mt-2 flex flex-wrap gap-2.5">
              {about.tags.map((tag) => {
                const Icon = iconMap[tag.icon]
                return (
                  <li
                    key={tag.label}
                    className="group inline-flex items-center gap-2 rounded-full border border-softborder bg-surface px-3.5 py-2 text-[0.8125rem] font-medium text-heading transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4 text-accent-ink transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
                    <span>{tag.label}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Photo + quote overlay */}
          <Reveal delay={110} className="flex justify-center xl:-mt-[104px]">
            <figure className="relative w-full max-w-[360px] transition-transform duration-500 hover:scale-[1.02]">
              <div
                className="absolute -inset-3 rounded-[28px] opacity-50 blur-2xl"
                style={{
                  background:
                    'radial-gradient(60% 60% at 50% 60%, rgb(var(--accent) / 0.35), transparent 72%)',
                }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[22px] border border-softborder bg-surface shadow-lift">
                <img
                  src="/images/aboutme.jpg"
                  alt="Anamika Mukherjee"
                  className="block h-auto w-full"
                  width="1086"
                  height="1185"
                />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-[16px] border border-softborder bg-bg/90 p-3 backdrop-blur-md">
                  <span className="eyebrow !text-[0.625rem]">{about.quote.label}</span>
                  <p className="mt-1.5 font-display text-xs italic leading-relaxed text-heading">
                    “{about.quote.text}”
                  </p>
                </figcaption>
              </div>
              <Quote
                className="absolute -left-3 -top-3 h-10 w-10 rotate-180 text-accent-ink/35"
                aria-hidden="true"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
