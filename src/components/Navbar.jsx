import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../lib/hooks'
import { useTheme } from '../lib/theme'
import { Close, Github, Menu, Moon, Sun } from './Icons'

const SECTION_IDS = navLinks.map((link) => link.id)

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  // Close the mobile sheet whenever the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handle = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <nav className="shell site-header__inner" aria-label="Primary">
        {/* Brand */}
        <a href="#top" className="flex shrink-0 items-center gap-2 sm:gap-2.5" onClick={close}>
          <span className="font-display text-[0.875rem] font-bold tracking-tight text-heading sm:text-[1.0625rem]">
            {profile.name}
          </span>
          <span className="mono rounded-full border border-accent/40 bg-accent/10 px-1.5 py-[3px] text-[0.5625rem] font-medium uppercase tracking-[0.08em] text-accent-ink sm:px-2 sm:text-[0.625rem]">
            {profile.badge}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`nav-link ${active === link.id ? 'is-active' : ''}`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-softborder bg-surface/70 text-heading transition-colors duration-300 hover:border-accent/50 hover:text-accent-ink"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'light'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Sun className="icon-sun absolute h-[18px] w-[18px]" />
            <Moon className="icon-moon absolute h-[18px] w-[18px]" />
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-softborder bg-surface/70 text-heading transition-all duration-200 hover:border-accent/50 hover:text-accent-ink hover:-translate-y-0.5"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>

          <a
            href="./Resume.pdf"
            download="Resume.pdf"
            className="hidden text-[0.8125rem] font-medium text-body transition-colors duration-200 hover:text-accent-ink xl:inline"
          >
            Resume
          </a>

          <a href="#contact" className="btn btn-primary btn-shine hidden !px-5 !py-2.5 sm:inline-flex">
            Hire Me
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-softborder bg-surface/70 text-heading lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderColor: 'var(--nav-border)' }}
      >
        <ul className="shell flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={close}
                className={`block rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ${
                  active === link.id
                    ? 'bg-accent/10 font-semibold text-accent-ink'
                    : 'text-body hover:bg-surface hover:text-heading'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex flex-wrap items-center gap-3 px-3">
            <a href="./Resume.pdf" download="Resume.pdf" className="btn btn-outline !py-2.5">
              Resume
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost inline-flex items-center gap-2 !py-2.5"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href="#contact" onClick={close} className="btn btn-primary !py-2.5">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
