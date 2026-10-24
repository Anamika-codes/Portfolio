import Reveal from './Reveal'

/**
 * Shared section header: tiny uppercase eyebrow → bold heading → muted line.
 * `action` renders on the right side of the header row (desktop only).
 */
export default function SectionHeader({ eyebrow, title, description, action, children, className = '' }) {
  return (
    <Reveal className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="min-w-0">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title mt-3">{title}</h2>
        {description ? <p className="section-desc">{description}</p> : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  )
}
