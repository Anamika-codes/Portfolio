import { useEffect, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Brain } from 'lucide-react'

/**
 * Animated number counter for degree progress percentage.
 * Smoothly interpolates from 0 to target (75%) over 1.2s with easeOut curve.
 * Immediately displays target when prefers-reduced-motion is active.
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
 * Redesigned Education Section Component
 *
 * Features:
 * - Clean glass card design with 60/40 desktop split (stacked on mobile)
 * - Academic journey gradient timeline touch on card edge
 * - Framer Motion transform/opacity animations with prefers-reduced-motion support
 * - Detail rows with icons and animated degree progress bar
 */
export default function Education() {
  const shouldReduceMotion = useReducedMotion()
  const [hasEntered, setHasEntered] = useState(false)

  // Education data preserved exactly as specified
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

  const details = [
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

  // Animation variants (strictly transform & opacity for smooth 60fps performance)
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.18,
      },
    },
  }

  const headerVariants = {
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

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const tagsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
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

  const detailsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }

  const detailRowVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="experience" className="section relative overflow-hidden">
      {/* Target anchor for direct #education links while preserving #experience navigation */}
      <span id="education" className="sr-only" aria-hidden="true" />

      {/* Ambient background glow adhering to navy/purple palette */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14)_0%,transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setHasEntered(true)}
        variants={containerVariants}
        className="shell relative"
      >
        {/* 1. Section Header */}
        <motion.div variants={headerVariants} className="mb-10 lg:mb-14">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 dark:text-pink-400">
            EDUCATION
          </span>
          <h2 className="section-title mt-2">
            Education
          </h2>
          {/* Short gradient underline: 48px wide (w-12), pink to purple */}
          <div
            className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
            aria-hidden="true"
          />
          <p className="section-desc mt-4">
            Focused on building a solid engineering foundation with hands-on development.
          </p>
        </motion.div>

        {/* 2. Main Glass Card Container */}
        <motion.div
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -4,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }
          }
          className="group relative rounded-2xl border border-line/60 bg-surface/75 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:border-pink-500/30 hover:shadow-[0_16px_45px_-12px_rgba(168,85,247,0.22)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_8px_32px_0_rgba(168,85,247,0.14)] sm:p-8 lg:p-10"
        >
          {/* 3. Optional Timeline Touch: thin vertical gradient line with glowing dot on left edge */}
          <div
            className="pointer-events-none absolute left-0 top-8 bottom-8 w-[2px] rounded-full bg-gradient-to-b from-pink-500 via-purple-500/40 to-transparent"
            aria-hidden="true"
          >
            <span className="absolute -left-[3px] top-6 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />
          </div>

          {/* 2-column layout on desktop (60/40 split), stacked on mobile */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* LEFT COLUMN: Main Degree Information (approx 60% split) */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
              <div className="space-y-5">
                {/* 48px rounded gradient square with GraduationCap icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-md shadow-pink-500/25">
                  <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
                </div>

                {/* Degree Title: Largest text in the card */}
                <h3 className="font-display text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-3xl">
                  {degree.title}
                </h3>

                {/* Description: Muted gray, max-width 60ch, comfortable line-height */}
                <p className="max-w-[60ch] text-[0.95rem] leading-relaxed text-body dark:text-gray-300">
                  {degree.description}
                </p>
              </div>

              {/* Tags: Pills with subtle lift and glow hover effect */}
              <motion.div
                variants={tagsContainerVariants}
                className="flex flex-wrap gap-2 pt-2"
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

            {/* RIGHT COLUMN: Details Panel (approx 40% split), separated by thin divider */}
            <div className="flex flex-col justify-between border-t border-line/40 pt-8 dark:border-white/10 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-line/40 lg:pl-10 lg:pt-0 dark:lg:border-white/10">
              <div>
                {/* Header of details panel with Class of 2027 badge */}
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-body dark:text-gray-400">
                    Academic Overview
                  </span>
                  <span className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-pink-500 dark:text-pink-400">
                    {degree.badge}
                  </span>
                </div>

                {/* 3 Detail Rows: Calendar, MapPin, Brain */}
                <motion.div
                  variants={detailsContainerVariants}
                  className="mt-6 space-y-3.5"
                >
                  {details.map((detail) => {
                    const Icon = detail.icon
                    return (
                      <motion.div
                        key={detail.label}
                        variants={detailRowVariants}
                        className="flex items-center gap-3.5 rounded-xl border border-line/40 bg-surface2/40 p-3 transition-colors hover:border-pink-500/20 hover:bg-surface2/70 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/10 dark:hover:bg-white/[0.04]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-500 dark:text-pink-400">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-body dark:text-gray-400">
                            {detail.label}
                          </span>
                          <span className="mt-0.5 block text-sm font-medium text-heading dark:text-white sm:text-base">
                            {detail.value}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Progress Bar & Status Section */}
              <div className="mt-8 space-y-3 border-t border-line/40 pt-6 dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Status dot (pulsing pink) + Pursuing Degree label */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-body dark:text-gray-300">
                        {degree.status}
                      </span>
                    </div>

                    {/* Undergraduate pill adjacent to Pursuing Degree label */}
                    <span className="rounded-full border border-line/60 bg-surface2/60 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-body dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300">
                      {degree.level}
                    </span>
                  </div>

                  {/* Degree completion count-up percentage */}
                  <span className="font-mono text-xs font-semibold text-pink-500 dark:text-pink-400">
                    <ProgressCounter
                      target={degree.progress}
                      isInView={hasEntered}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </span>
                </div>

                {/* Progress bar fill (0 to 75% in 1.2s ease-out) */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
