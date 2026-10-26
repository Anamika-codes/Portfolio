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
 * Redesigned Education Section Component
 *
 * Perfectly harmonized with the rest of the portfolio:
 * - Uses the standard `.shell` container and `.section` padding
 * - Section header, subtext and card align to the same left margin
 * - Desktop 60/40 two-column split, stacked on mobile
 * - Clean vertical detail list with thin dividers (no boxed tiles)
 * - Timeline indicator placed safely inside the card
 * - Theme-aware: light theme (white bg, gray-200 border), dark theme (white/5 bg, white/10 border)
 * - Brand accent tokens used consistently across both themes
 */
export default function Education() {
  const shouldReduceMotion = useReducedMotion()
  const [hasEntered, setHasEntered] = useState(false)

  // Education text content preserved exactly as requested
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

  // Details list: "Expected" used so 2027 is not repeated alongside the badge
  const details = [
    {
      icon: Calendar,
      label: 'Graduation',
      value: 'Expected',
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

  // Animation variants (transform and opacity only for smooth 60fps performance)
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
      {/* Anchor for direct #education links while preserving #experience navigation */}
      <span id="education" className="sr-only" aria-hidden="true" />

      {/* Atmospheric purple glow tailored to the site's accent tokens */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.14)_0%,transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      {/* Standard shell container (same max-width and padding as Hero, Projects, About) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onViewportEnter={() => setHasEntered(true)}
        variants={containerVariants}
        className="shell relative"
      >
        {/* Section Header: Aligned directly to the shell's left edge */}
        <motion.div variants={itemFadeUpVariants} className="mb-8 lg:mb-10">
          <span className="eyebrow">
            EDUCATION
          </span>
          <h2 className="section-title mt-2 font-display text-heading">
            Education
          </h2>
          {/* 48px short gradient underline (pink to purple) */}
          <div
            className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-accent via-accentsoft to-accent2"
            aria-hidden="true"
          />
          {/* Subtext constrained to max-w 60ch so it does not overstretch */}
          <p className="section-desc mt-3 max-w-[60ch]">
            Focused on building a solid engineering foundation with hands-on development.
          </p>
        </motion.div>

        {/* Main Card: Spans full width of the shell, 60/40 desktop split, stacked on mobile */}
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
          className="group relative w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_32px_0_rgba(168,85,247,0.12)] dark:hover:border-accent/40 dark:hover:shadow-[0_16px_40px_-12px_rgba(168,85,247,0.22)] sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* LEFT COLUMN: 60% split (7 of 12 cols) */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
              <div className="space-y-4">
                {/* 48px rounded gradient square with GraduationCap + internal timeline beacon */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-onaccent shadow-md shadow-accent/20">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                    {/* Glowing beacon placed safely INSIDE the card next to icon */}
                    <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accentsoft opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-accent dark:border-surface" />
                    </span>
                  </div>
                </div>

                {/* Degree Title: One line on desktop with text-balance and no truncation */}
                <h3 className="font-display text-2xl font-bold tracking-tight text-heading text-balance lg:text-3xl">
                  {degree.title}
                </h3>

                {/* Description: Comfortable line-height, constrained width */}
                <p className="max-w-[60ch] text-sm leading-relaxed text-body sm:text-[0.9375rem]">
                  {degree.description}
                </p>
              </div>

              {/* Competency Tags: Neutral pill style, accent color on hover only */}
              <div className="pt-2">
                <span className="mb-2.5 block font-mono text-[0.6875rem] uppercase tracking-widest text-body">
                  Core Competencies
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
                              boxShadow: '0 4px 12px -2px rgb(var(--accent) / 0.25)',
                            }
                      }
                      className="cursor-default rounded-full border border-gray-200 bg-gray-50/80 px-3.5 py-1.5 font-mono text-xs text-body transition-colors duration-200 hover:border-accent/50 hover:bg-accent/5 hover:text-accent-ink dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-accent/50 dark:hover:bg-accent/10 dark:hover:text-accent-ink"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* RIGHT COLUMN: 40% split (5 of 12 cols), separated by thin divider */}
            <div className="flex flex-col justify-between border-t border-gray-200 pt-8 dark:border-white/10 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-gray-200 lg:pl-10 lg:pt-0 dark:lg:border-white/10">
              <div>
                {/* Single "Class of 2027" badge at top right */}
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-body">
                    Academic Overview
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-accent-ink">
                    {degree.badge}
                  </span>
                </div>

                {/* Clean vertical detail list separated by thin dividers (no boxed tiles) */}
                <div className="mt-6 divide-y divide-gray-200 dark:divide-white/10">
                  {details.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="mt-1 shrink-0 text-accent-ink">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-body">
                            {item.label}
                          </span>
                          {/* Value wraps fully without truncation */}
                          <span className="mt-0.5 block text-sm font-medium text-heading break-words">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Progress: Direct at bottom of right column with thin top divider (no separate boxed card) */}
              <div className="mt-8 border-t border-gray-200 pt-5 dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Pulsing status dot + Pursuing Degree label */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accentsoft opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-heading">
                        {degree.status}
                      </span>
                    </div>

                    {/* Single Undergraduate pill next to status label */}
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide text-body dark:border-white/10 dark:bg-white/5">
                      {degree.level}
                    </span>
                  </div>

                  {/* Degree percentage count-up */}
                  <span className="font-mono text-xs font-bold text-accent-ink">
                    <ProgressCounter
                      target={degree.progress}
                      isInView={hasEntered}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </span>
                </div>

                {/* Progress bar track & gradient fill */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200/80 dark:bg-white/10">
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

                <div className="mt-1.5 flex justify-between font-mono text-[0.6875rem] text-body">
                  <span>Year 3 of 4</span>
                  <span>75% Completed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
