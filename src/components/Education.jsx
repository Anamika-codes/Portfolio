import { useEffect, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Brain, Sparkles } from 'lucide-react'

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
 * Unified Single-Card Education Section
 *
 * Removes the disjointed two-column split in favor of an elegant,
 * linear narrative flow:
 * 1. Prominent header with degree title, graduation cap emblem, and status badges
 * 2. Focused academic narrative description
 * 3. 3-metric horizontal highlight bar (Graduation, Location, Focus)
 * 4. Technical coursework pills with subtle hover lift and glow
 * 5. Full-width degree completion progress bar with pulsing live status
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

  // Animation variants using strictly transform & opacity for smooth 60fps performance
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
      },
    },
  }

  const itemFadeUpVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const tagsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const tagItemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="experience" className="section relative overflow-hidden">
      {/* Anchor for direct #education links while maintaining navigation to #experience */}
      <span id="education" className="sr-only" aria-hidden="true" />

      {/* Atmospheric purple glow tailored to the navy/purple palette */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.13)_0%,transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        onViewportEnter={() => setHasEntered(true)}
        variants={containerVariants}
        className="shell relative"
      >
        {/* Section Header */}
        <motion.div variants={itemFadeUpVariants} className="mb-10 lg:mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 dark:text-pink-400">
            EDUCATION
          </span>
          <h2 className="section-title mt-2">
            Education
          </h2>
          {/* 48px gradient underline (pink to purple) */}
          <div
            className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
            aria-hidden="true"
          />
          <p className="section-desc mt-4">
            Focused on building a solid engineering foundation with hands-on development.
          </p>
        </motion.div>

        {/* Unified Glass Card (Single cohesive container, no 2-column split) */}
        <motion.div
          variants={itemFadeUpVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -4,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }
          }
          className="group relative overflow-hidden rounded-2xl border border-line/60 bg-surface/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:border-pink-500/30 hover:shadow-[0_16px_45px_-12px_rgba(168,85,247,0.22)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_8px_32px_0_rgba(168,85,247,0.12)] sm:p-8 lg:p-10"
        >
          {/* Academic Journey Timeline Accent on the left edge */}
          <div
            className="pointer-events-none absolute left-0 top-8 bottom-8 w-[2px] rounded-full bg-gradient-to-b from-pink-500 via-purple-500/40 to-transparent"
            aria-hidden="true"
          >
            <span className="absolute -left-[3px] top-6 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />
          </div>

          <div className="space-y-8">
            {/* 1. Card Top Bar: Icon + Degree Title + Badges */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* 48px rounded gradient square with GraduationCap */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-md shadow-pink-500/25">
                  <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-3xl">
                    {degree.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-body dark:text-gray-400">
                    B.Tech Undergraduate Programme
                  </p>
                </div>
              </div>

              {/* Status & Cohort Badges */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-pink-500 dark:text-pink-400">
                  {degree.badge}
                </span>
                <span className="rounded-full border border-line/60 bg-surface2/60 px-3 py-1 font-mono text-xs font-medium tracking-wide text-body dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300">
                  {degree.level}
                </span>
              </div>
            </div>

            {/* 2. Degree Description */}
            <p className="max-w-4xl text-[0.95rem] leading-relaxed text-body dark:text-gray-300 sm:text-base">
              {degree.description}
            </p>

            {/* 3. Horizontal Highlights Grid (Graduation, Location, Focus) */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3.5 rounded-xl border border-line/50 bg-surface2/40 p-3.5 transition-colors hover:border-pink-500/20 hover:bg-surface2/70 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/15 dark:hover:bg-white/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-500 dark:text-pink-400">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-body dark:text-gray-400">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-heading dark:text-white">
                        {item.value}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 4. Coursework Tags Row */}
            <div className="space-y-2.5">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-body dark:text-gray-400">
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
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: -2,
                            boxShadow: '0 0 14px rgba(236, 72, 153, 0.35)',
                            borderColor: 'rgba(236, 72, 153, 0.45)',
                          }
                    }
                    className="cursor-default rounded-full border border-line/70 bg-surface2/60 px-3.5 py-1.5 font-mono text-xs font-medium text-body transition-colors dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* 5. Degree Progress Footer Bar */}
            <div className="rounded-xl border border-line/40 bg-surface2/30 p-4 dark:border-white/[0.06] dark:bg-white/[0.02] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                {/* Live Pursuing Degree indicator */}
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-heading dark:text-white">
                    {degree.status}
                  </span>
                  <span className="hidden font-mono text-[0.7rem] text-body dark:text-gray-400 sm:inline">
                    · Year 3 of 4
                  </span>
                </div>

                {/* Animated Percentage counter */}
                <span className="font-mono text-xs font-bold text-pink-500 dark:text-pink-400">
                  <ProgressCounter
                    target={degree.progress}
                    isInView={hasEntered}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </span>
              </div>

              {/* Progress Bar Track & Fill */}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600"
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
      </motion.div>
    </section>
  )
}
