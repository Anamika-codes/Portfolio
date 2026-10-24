import { profile } from '../data/content'
import { Github, MapPin, Mail } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display text-[1.0625rem] font-bold tracking-tight text-heading">
              {profile.name}
            </span>
            <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-[3px] font-mono text-[0.625rem] uppercase tracking-[0.08em] text-accent-ink">
              {profile.role}
            </span>
          </div>
          <p className="mt-2 text-[0.8125rem] text-body">
            © 2025 {profile.name}. Built with craft &amp; architectural precision.
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-body">
          <li>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-accent-ink"
            >
              <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              {profile.github}
            </a>
          </li>
          <li className="group inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent-ink transition-transform duration-200 group-hover:scale-110" />
            {profile.location}
          </li>
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-accent-ink"
            >
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              {profile.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
