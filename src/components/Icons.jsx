/**
 * Inline SVG icon set — stroke based, inherits `currentColor`.
 * Keeps the bundle free of an icon dependency and guarantees consistent
 * rendering in both themes.
 */
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

const make = (paths, extra = {}) =>
  function Icon(props) {
    return (
      <svg {...base} {...extra} {...props}>
        {paths}
      </svg>
    )
  }

export const MapPin = make(
  <>
    <path d="M20 10.5c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10.3" r="2.8" />
  </>,
)

export const Briefcase = make(
  <>
    <rect x="2.5" y="7" width="19" height="13" rx="2.5" />
    <path d="M8.5 7V5.6A2.1 2.1 0 0 1 10.6 3.5h2.8A2.1 2.1 0 0 1 15.5 5.6V7" />
    <path d="M2.5 12.5h19" />
  </>,
)

export const ArrowRight = make(
  <>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </>,
)

export const ArrowUpRight = make(
  <>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </>,
)

export const Download = make(
  <>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 18.5h15" />
  </>,
)

export const Github = make(
  <>
    <path d="M9.2 20.5c-4.4 1.3-4.4-2.2-6.2-2.7m12.4 5.2v-3.4a2.9 2.9 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-5.9a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 4.7 5.8 5 5.8 5a4.3 4.3 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.8 5.6 5.5 5.9a2.9 2.9 0 0 0-.8 2.2V23" />
  </>,
)

export const Sun = make(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </>,
)

export const Moon = make(
  <path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a6.6 6.6 0 0 0 10.8 10.8Z" />,
)

export const Menu = make(
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </>,
)

export const Close = make(
  <>
    <path d="m6 6 12 12M18 6 6 18" />
  </>,
)

export const ChevronLeft = make(
  <>
    <path d="m14.5 5-7 7 7 7" />
  </>,
)

export const ChevronRight = make(
  <>
    <path d="m9.5 5 7 7-7 7" />
  </>,
)

export const Check = make(
  <>
    <path d="m4.5 12.5 5 5 10-11" />
  </>,
)

export const Sparkles = make(
  <>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
    <path d="M18.5 3v3M20 4.5h-3M6 16.5v3M7.5 18h-3" />
  </>,
)

export const Code = make(
  <>
    <path d="m9 8-4.5 4L9 16" />
    <path d="m15 8 4.5 4L15 16" />
    <path d="m13.5 5-3 14" />
  </>,
)

export const Layers = make(
  <>
    <path d="m12 3 9 4.8-9 4.8-9-4.8L12 3Z" />
    <path d="m3 12.4 9 4.8 9-4.8" />
    <path d="m3 16.9 9 4.8 9-4.8" />
  </>,
)

export const Database = make(
  <>
    <ellipse cx="12" cy="6" rx="7.5" ry="3.2" />
    <path d="M4.5 6v12c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2V6" />
    <path d="M4.5 12c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2" />
  </>,
)

export const Cpu = make(
  <>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3" />
  </>,
)

export const Wrench = make(
  <>
    <path d="M15.5 3.5a5.5 5.5 0 0 0-6.9 7L3.6 15.5a2 2 0 0 0 2.8 2.8l5-5a5.5 5.5 0 0 0 7-6.9l-3 3-2.6-.7-.7-2.6 3.4-2.6Z" />
  </>,
)

export const Globe = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z" />
  </>,
)

export const Rocket = make(
  <>
    <path d="M12 3c3.4 2.3 5.3 5.7 5.3 9.4L14 15.8h-4L6.7 12.4C6.7 8.7 8.6 5.3 12 3Z" />
    <path d="M9.9 15.8 7 18.7M14.1 15.8 17 18.7" />
    <path d="M10.5 8.2h.01M13.5 8.2h.01" />
  </>,
)

export const Monitor = make(
  <>
    <rect x="2.8" y="4" width="18.4" height="12.5" rx="2.2" />
    <path d="M8.5 20.5h7M12 16.5v4" />
  </>,
)

export const Mail = make(
  <>
    <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.4" />
    <path d="m3.6 7 8.4 5.8L20.4 7" />
  </>,
)

export const Send = make(
  <>
    <path d="M20.5 3.5 10.8 13.2" />
    <path d="M20.5 3.5 14.4 20.5l-3.6-7.3-7.3-3.6 17-6.1Z" />
  </>,
)

export const GraduationCap = make(
  <>
    <path d="M2.8 9 12 4.6 21.2 9 12 13.4 2.8 9Z" />
    <path d="M6.5 11v5.2c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6V11" />
    <path d="M21.2 9v5.4" />
  </>,
)

export const Target = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </>,
)

export const Quote = make(
  <path d="M9.5 6.5C6.9 7.6 5.5 9.7 5.5 12.6c0 2.9 1.6 4.9 3.9 4.9 1.9 0 3.2-1.3 3.2-3.1 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.9.1.3-1.4 1.4-2.6 3-3.3l-2.4-1.8Zm8.4 0c-2.6 1.1-4 3.2-4 6.1 0 2.9 1.6 4.9 3.9 4.9 1.9 0 3.2-1.3 3.2-3.1 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.9.1.3-1.4 1.4-2.6 3-3.3l-2.4-1.8Z" />,
)

export const Pointer = make(
  <>
    <path d="m5.5 3.5 6.2 16 2-6.4 6.3-2L5.5 3.5Z" />
    <path d="m13.7 13.2 4.3 4.3" />
  </>,
)

export const ArrowIntoList = make(
  <>
    <path d="M10 8h9M10 12h9M10 16h9" />
    <path d="M3.8 10.5 6.6 13.3 3.8 16.1" />
    <path d="M6.6 13.3H14" />
  </>,
)

export const Folder = make(
  <>
    <path d="M3.5 7.4a2 2 0 0 1 2-2h3.2l2 2.4h7.8a2 2 0 0 1 2 2v8.4a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.4Z" />
  </>,
)

export const Bolt = make(
  <path d="M13.2 2.8 4.8 13.3h5.5l-.6 7.9 8.5-10.6h-5.6l.6-7.8Z" />,
)

export const Chat = make(
  <>
    <path d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2-1 0-2-.15-2.9-.43L4 20.2l1.4-3.6A6.9 6.9 0 0 1 3.5 11.6c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
  </>,
)

export const Compass = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m14.9 9.1-1.6 4.2-4.2 1.6 1.6-4.2 4.2-1.6Z" />
  </>,
)

export const Chart = make(
  <>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="m7.5 15 3.5-4 3 2.5L19 7.5" />
  </>,
)

export const Chess = make(
  <>
    <path d="M9 3.5h6l-.6 2.6 1.9 1.7v2.4H7.7V7.8l1.9-1.7L9 3.5Z" />
    <path d="M6.4 10.2h11.2l-.8 3.4H7.2l-.8-3.4Z" />
    <path d="M6.4 13.6h11.2l1 3.2H5.4l1-3.2Z" />
    <path d="M5 16.8h14v2H5z" />
    <path d="M10 18.8v1.7h4v-1.7" />
  </>,
)

export const Pen = make(
  <>
    <path d="M15.5 4.2 19.8 8.5 8.6 19.7l-5.1 1.1 1.1-5.1L15.5 4.2Z" />
    <path d="m13.4 6.3 4.3 4.3" />
  </>,
)

export const Social = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M4.2 9.5h15.6M4.2 14.5h15.6M12 3.5c2.1 2.4 3.2 5.4 3.2 8.5s-1.1 6.1-3.2 8.5c-2.1-2.4-3.2-5.4-3.2-8.5S9.9 5.9 12 3.5Z" />
  </>,
)

export const Instagram = make(
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17" cy="7" r="1"/>
  </svg>,
)
export const iconMap = {
  map: MapPin,
  briefcase: Briefcase,
  folder: Folder,
  bolt: Bolt,
  cap: GraduationCap,
  code: Code,
  layers: Layers,
  database: Database,
  cpu: Cpu,
  wrench: Wrench,
  monitor: Monitor,
  rocket: Rocket,
  mail: Mail,
  chat: Chat,
  compass: Compass,
  chart: Chart,
  chess: Chess,
  pen: Pen,
  spark: Sparkles,
  github: Github,
  instagram: Instagram,
}
