import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion as useFramerReducedMotion } from 'framer-motion'
import { profile, stats } from '../data/content'
import { ArrowRight, Briefcase, Download, MapPin, iconMap } from './Icons'
import DotGrid from './DotGrid'

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }
const pill = { hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] } } }
const blurReveal = { hidden: { opacity: 0, y: 18, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] } } }
const pop = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } } }

const roleVariants = ['Machine Learning Enthusiast', 'Problem Solver', 'Web App Builder']

function usePrefersReducedMotion() {
  const framerReduced = useFramerReducedMotion()
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return framerReduced || reduced
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-60, 60], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-60, 60], [-8, 8]), { stiffness: 200, damping: 20 })

  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = (e) => {
    if (reduced || isTouch) return
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mx.set(0); my.set(0) }

  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roleVariants.length), 3000)
    return () => clearInterval(id)
  }, [reduced])

  const container = reduced ? {} : stagger
  const tiltEnabled = !reduced && !isTouch

  return (
    <section id="top" className="hero relative overflow-hidden" ref={sectionRef}>
      {!reduced && (
        <>
          <motion.div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
          <motion.div className="pointer-events-none absolute -bottom-48 -right-32 h-[460px] w-[460px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(circle, rgba(232,121,196,0.16) 0%, transparent 70%)' }} animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'var(--hero-wash)' }} aria-hidden="true" />
      <DotGrid />
      <div className="shell relative">
        <motion.div className="hero__cols" initial={reduced ? {} : 'hidden'} animate={reduced ? {} : 'show'} variants={reduced ? {} : container}>
          <div className="hero__copy">
            <motion.div className="hero__pills" variants={reduced ? {} : stagger}>
              <motion.span className="hero__pill" variants={reduced ? {} : pill}>
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
                Open to internships, jobs &amp; freelance work
              </motion.span>
              <motion.span className="hero__pill" variants={reduced ? {} : pill}>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Web engineering + explainable ML
              </motion.span>
            </motion.div>
            <motion.div variants={reduced ? {} : blurReveal}>
              <h1 className="hero__name hero__name--animated">
                <span className="hero__name--first">Anamika</span>{' '}
                <span className="hero__name--last">Mukherjee</span>
              </h1>
              <p className="hero__role">
                <span className="hero__role-static">Full Stack Developer · </span>
                <span className="hero__role-rotator">
                  {roleVariants.map((r, idx) => (<span key={r} className={`hero__role-word ${idx === roleIndex ? 'is-active' : ''}`}>{r}</span>))}
                </span>
              </p>
            </motion.div>
            <motion.div variants={reduced ? {} : fadeUp}>
              <p className="hero__headline">I turn ideas into fast, working web apps<br />and smart tools.</p>
            </motion.div>
            <motion.div className="hero__meta" variants={reduced ? {} : fadeUp}>
              <span className="inline-flex items-center gap-2"><MapPin className="h-[18px] w-[18px] text-accent-ink" />Prayagraj, India</span>
              <span className="inline-flex items-center gap-2"><Briefcase className="h-[18px] w-[18px] text-accent-ink" />Currently interning at <strong className="font-semibold text-heading">Zrotis</strong></span>
            </motion.div>
            <motion.div className="hero__actions" variants={reduced ? {} : stagger}>
              <motion.a href="#projects" className="btn btn-primary hero__btn btn-shine" variants={reduced ? {} : pop} whileHover={reduced ? {} : { y: -2, boxShadow: '0 12px 40px -12px rgb(var(--accent) / 0.6)' }} whileTap={reduced ? {} : { scale: 0.97 }}>View Projects<ArrowRight className="h-4 w-4 hero__btn-arrow" /></motion.a>
              <motion.a href="#contact" className="btn btn-outline hero__btn" variants={reduced ? {} : pop} whileHover={reduced ? {} : { y: -2 }} whileTap={reduced ? {} : { scale: 0.97 }}>Hire Me</motion.a>
              <motion.a href="./Resume.pdf" download="Resume.pdf" className="btn btn-outline hero__btn" variants={reduced ? {} : pop} whileHover={reduced ? {} : { y: -2 }} whileTap={reduced ? {} : { scale: 0.97 }}><Download className="h-4 w-4" />Download Resume</motion.a>
            </motion.div>
          </div>
          <motion.div className="hero__portrait-col" variants={reduced ? {} : fadeUp}>
            <figure className="hero__portrait-figure">
              <motion.div ref={cardRef} className="relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={tiltEnabled ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : {}} animate={reduced ? {} : { y: [0, -8, 0] }} transition={reduced ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="absolute -inset-3 rounded-[28px] opacity-60 blur-2xl" style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgb(var(--accent) / 0.35), transparent 72%)' }} aria-hidden="true" />
                <div className="hero__portrait-card">
                  <div className="hero__portrait-frame">
                    <img src="/images/first-photo.jpg" alt="Anamika Mukherjee, full stack developer and machine learning engineer" className="hero__portrait-img" width="1600" height="900" />
                    <motion.span className="hero__portrait-badge" initial={reduced ? {} : { opacity: 0, scale: 0.9, y: -6 }} animate={reduced ? {} : { opacity: 1, scale: 1, y: 0 }} transition={reduced ? {} : { delay: 0.8, duration: 0.4, type: 'spring', stiffness: 220, damping: 16 }}>
                      <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.22)] hero__status-dot" />
                      Active at Zrotis
                    </motion.span>
                  </div>
                  <figcaption className="hero__portrait-caption">
                    <div><p className="hero__portrait-name">Anamika Mukherjee</p><p className="hero__portrait-role">B.Tech CSE '27</p></div>
                    <span className="hero__portrait-pill">Portfolio</span>
                  </figcaption>
                </div>
              </motion.div>
            </figure>
          </motion.div>
        </motion.div>
        <motion.div className="hero__stats" initial={reduced ? {} : 'hidden'} animate={reduced ? {} : 'show'} variants={reduced ? {} : stagger}>
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((stat) => {
              const Icon = iconMap[stat.icon]
              return (
                <motion.div key={stat.label} className="card group flex items-center gap-3.5 px-4 py-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40" variants={reduced ? {} : pop}>
                  <span className="icon-tile !h-11 !w-11 !rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <dd className="truncate font-display text-lg font-bold leading-tight text-heading">{stat.value}</dd>
                    <dt className="mono mt-1 truncate text-[0.6875rem] text-body">{stat.label}</dt>
                  </div>
                </motion.div>
              )
            })}
          </dl>
        </motion.div>
      </div>
      {!reduced && (
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} aria-hidden="true">
          <span className="text-[0.7rem] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
