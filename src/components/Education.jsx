import { useEffect, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Brain } from 'lucide-react'

/**
 * Animated number counter for degree progress percentage.
 * Smoothly interpolates from 0 to target (75%) over 1.2s with an easeOut curve.
 * Respects prefers-reduced-motion by immediately jumping to the target value.
 */
function ProgressCounter({ target = 75, isInView, shouldReduceMotion }) {
  const [count, setCount] = useState(shouldReduceMotion ? target : 0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      setCount(target)
      return
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, shouldReduceMotion, target])

  return <span>{count}%</span>
}

/**
 * Compact Single-Card Education Section
 *
 * Sized proportionally with max-w-3xl container and styled entirely
 * using the project's native light and dark mode color tokens:
 * - surface, surface2, surface3
 * - accent, accent-ink, accent2, accentsoft
 * - heading, body
 * - softborder, chip
 */
export default function Education() {
  const shouldReduceMotion = useReducedMotion()
  const [hasEntered, setHasEntered] = useState(false)

  const degree = {
    title: 'B.Tech in Computer Science & Engineering',
    description:
      'Building a strong foundation in Data Structures, Algorithms, Web Engineering, Machine Learning, OOP, DBMS and Software Architecture.',
    badge: 'Class of 2027',
    status: 'Pursuing Degree',
    level: 'Undergraduate',
    progress: 75,
  }

  const tags = ['DSA', 'DBMS', 'Web Engineering', 'Machine Learning', 'OOP']

  const highlights = [
    {
      icon: Calendar,
      label: 'Graduation',
      value: '2027 (Expected)',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Prayagraj, India',
    },
    {
      icon: Brain,
      label: 'Focus',
      value: 'Full-Stack Development & Applied ML',
    },
  ]

  // Animation variants using transform & opacity for smooth 60fps performance
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
      },
    },
  }

  const itemFadeUpVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const tagsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const tagItemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 6,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="experience" className="section relative overflow-hidden">
      {/* Anchor for direct #education links while preserving #experience navigation */}
      <span id="education" className="sr-only" aria-hidden="true" />

      {/* Atmospheric ambient glow using project accent token */}
      <div
        className="pointer-events-none absolute -top-36 left-1/2 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.14)_0%,transparent_70%)] blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onViewportEnter={() => setHasEntered(true)}
        variants={containerVariants}
        className="shell relative"
      >
        {/* Constrained max-width container for refined card sizing */}
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <motion.div variants={itemFadeUpVariants} className="mb-7 sm:mb-9">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">
              EDUCATION
            </span>
            <h2 className="section-title mt-2">
              Education
            </h2>
            {/* 48px accent gradient underline using palette tokens */}
            <div
              className="mt-2.5 h-1 w-12 rounded-full bg-gradient-to-r from-accent via-accentsoft to-accent2"
              aria-hidden="true"
            />
            <p className="section-desc mt-3">
              Focused on building a solid engineering foundation with hands-on development.
            </p>
          </motion.div>

          {/* Compact Glass Card */}
          <motion.div
            variants={itemFadeUpVariants}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -3,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }
            }
            className="group relative overflow-hidden rounded-2xl border border-softborder bg-surface/85 p-5 shadow-card backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-lift sm:p-7"
          >
            {/* Academic journey subtle timeline indicator on the left edge */}
            <div
              className="pointer-events-none absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-accent via-accentsoft/40 to-transparent"
              aria-hidden="true"
            >
              <span className="absolute -left-[3px] top-5 h-2 w-2 rounded-full bg-accent-ink shadow-[0_0_8px_rgb(var(--accent))]" />
            </div>

            <div className="space-y-6">
              {/* 1. Header: Emblem Tile + Degree Title + Status Badges */}
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* 44px icon tile styled with palette colors */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-onaccent shadow-md shadow-accent/20">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-heading sm:text-2xl">
                      {degree.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-body">
                      B.Tech Undergraduate Programme
                    </p>
                  </div>
                </div>

                {/* Cohort & Level Pills */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-wide text-accent-ink">
                    {degree.badge}
                  </span>
                  <span className="rounded-full border border-softborder bg-surface2/70 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-wide text-body">
                    {degree.level}
                  </span>
                </div>
              </div>

              {/* 2. Degree Description */}
              <p className="text-sm leading-relaxed text-body sm:text-[0.9375rem]">
                {degree.description}
              </p>

              {/* 3. Horizontal Highlights Bar (Graduation, Location, Focus) */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-softborder bg-surface2/50 p-2.5 transition-colors hover:border-accent/30 hover:bg-surface2/80 sm:p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent-ink">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-wider text-body">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-xs font-semibold text-heading sm:text-sm">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 4. Coursework Tags using the project's native .chip styling */}
              <div className="space-y-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-body">
                  Core Engineering Competencies
                </span>
                <motion.div
                  variants={tagsContainerVariants}
                  className="flex flex-wrap gap-2"
                >
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagItemVariants}
                      className="chip cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* 5. Progress Footer Bar */}
              <div className="rounded-xl border border-softborder bg-surface2/40 p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accentsoft opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-heading">
                      {degree.status}
                    </span>
                    <span className="hidden font-mono text-[0.6875rem] text-body sm:inline">
                      · Year 3 of 4
                    </span>
                  </div>

                  {/* Percentage Counter */}
                  <span className="font-mono text-xs font-bold text-accent-ink">
                    <ProgressCounter
                      target={degree.progress}
                      isInView={hasEntered}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </span>
                </div>

                {/* Progress Bar Track & Theme Fill */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface3/60 dark:bg-surface2/80">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent via-accentsoft to-accent2"
                    initial={{ width: 0 }}
                    animate={hasEntered || shouldReduceMotion ? { width: `${degree.progress}%` } : { width: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 1.2, ease: 'easeOut' }
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
