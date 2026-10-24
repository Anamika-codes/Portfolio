import { skills } from '../data/content'
import { iconMap } from './Icons'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Verified Competencies"
          title="Technical Stack"
          description="Clean tools and runtimes actively used in production environments and real engineering projects."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon]
            return (
              <Reveal
                key={skill.title}
                delay={index * 70}
                className="card group flex flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40"
              >
                <span className="icon-tile transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-heading transition-colors duration-200 group-hover:text-accent-ink">{skill.title}</h3>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-body">{skill.description}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {skill.chips.map((chip) => (
                    <li key={chip} className="chip">
                      {chip}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
