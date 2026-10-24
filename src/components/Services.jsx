import { process, services } from '../data/content'
import { iconMap } from './Icons'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Offerings"
          title="Freelance & Client Services"
          description="Clean solutions with straightforward timelines, direct communication, and reliable turnaround."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <Reveal
                key={service.title}
                delay={index * 70}
                className="card group flex flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40"
              >
                <span className="icon-tile transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug text-heading transition-colors duration-200 group-hover:text-accent-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-body">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-hairline pt-3.5">
                  <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-body">
                    Timeline:
                  </span>
                  <span className="mono rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.6875rem] font-medium text-accent-ink transition-transform duration-200 group-hover:scale-105">
                    {service.timeline}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Standard operating procedure */}
        <Reveal delay={120} className="mt-6 md:mt-8">
          <div className="overflow-hidden rounded-[20px] border border-accent/25 bg-accent/[0.07] p-6 md:p-8">
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow">Standard Operating Procedure</span>
              <h3 className="font-display text-xl font-bold text-heading md:text-2xl">How I Work</h3>
            </div>

            <ol className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step) => (
                <li key={step.step} className="group flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-[0.8125rem] font-semibold text-onaccent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
                    {step.step}
                  </span>
                  <h4 className="font-display text-[1.0625rem] font-bold text-heading transition-colors duration-200 group-hover:text-accent-ink">{step.title}</h4>
                  <p className="text-[0.8125rem] leading-relaxed text-body">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
