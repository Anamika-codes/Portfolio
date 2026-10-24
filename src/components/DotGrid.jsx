import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../lib/hooks'
import { useTheme } from '../lib/theme'

const SPACING = 22
const DOT_RADIUS = 1.5
const INFLUENCE = 140
const PUSH = 6
const MAX_SCALE = 2.5
const BASE_ALPHA = 0.22
const ACTIVE_ALPHA = 0.95
const POINTER_EASE = 0.18
const RING_EASE = 0.12
const STRENGTH_EASE = 0.15
const TAU = Math.PI * 2

const capDpr = () => Math.min(window.devicePixelRatio || 1, 2)

export default function DotGrid() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const reduced = useReducedMotion()
  const finePointer = useFinePointer()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const cursor = cursorRef.current
    const dotEl = dotRef.current
    const ringEl = ringRef.current
    const area = canvas ? canvas.parentElement : null
    if (!canvas || !cursor || !dotEl || !ringEl || !area) return

    const ctx = canvas.getContext('2d')
    const grid = document.createElement('canvas')
    const gctx = grid.getContext('2d')
    if (!ctx || !gctx) return

    let width = 1
    let height = 1
    let dpr = capDpr()
    let points = new Float64Array(0)
    let dotColor = [255, 219, 176]
    let textColor = [255, 255, 255]

    const readColors = () => {
      const styles = getComputedStyle(area)
      const read = (name, fallback) => {
        const raw = styles.getPropertyValue(name).trim()
        if (!raw) return fallback
        const rgb = raw
          .split(/[\s,/]+/)
          .filter(Boolean)
          .slice(0, 3)
          .map(Number)
        return rgb.length === 3 && rgb.every((n) => Number.isFinite(n)) ? rgb : fallback
      }
      dotColor = read('--color-dot', dotColor)
      textColor = read('--color-text', textColor)
    }

    const buildGrid = () => {
      const cols = Math.max(1, Math.ceil(width / SPACING))
      const rows = Math.max(1, Math.ceil(height / SPACING))
      const offX = (width - (cols - 1) * SPACING) / 2
      const offY = (height - (rows - 1) * SPACING) / 2
      points = new Float64Array(cols * rows * 2)
      let i = 0
      for (let r = 0; r < rows; r += 1) {
        const y = offY + r * SPACING
        for (let c = 0; c < cols; c += 1) {
          points[i] = offX + c * SPACING
          points[i + 1] = y
          i += 2
        }
      }
    }

    const buildGridImage = () => {
      grid.width = canvas.width
      grid.height = canvas.height
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gctx.clearRect(0, 0, width, height)
      gctx.fillStyle = `rgba(${dotColor[0]}, ${dotColor[1]}, ${dotColor[2]}, ${BASE_ALPHA})`
      gctx.beginPath()
      const total = points.length / 2
      for (let i = 0; i < total; i += 1) {
        const x = points[i * 2]
        const y = points[i * 2 + 1]
        gctx.moveTo(x + DOT_RADIUS, y)
        gctx.arc(x, y, DOT_RADIUS, 0, TAU)
      }
      gctx.fill()
    }

    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = capDpr()
      const w = Math.max(1, Math.round(width * dpr))
      const h = Math.max(1, Math.round(height * dpr))
      if (canvas.width !== w) canvas.width = w
      if (canvas.height !== h) canvas.height = h
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGrid()
      buildGridImage()
    }

    const paintBase = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(grid, 0, 0, width, height)
    }

    const paint = (mx, my, power) => {
      paintBase()
      if (power <= 0.001) return

      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(mx, my, INFLUENCE, 0, TAU)
      ctx.fillStyle = '#000'
      ctx.fill()
      ctx.restore()

      const range = INFLUENCE * INFLUENCE
      const total = points.length / 2
      for (let i = 0; i < total; i += 1) {
        const x = points[i * 2]
        const y = points[i * 2 + 1]
        const dx = x - mx
        const dy = y - my
        const d2 = dx * dx + dy * dy
        if (d2 > range) continue

        const dist = Math.sqrt(d2)
        const t = 1 - dist / INFLUENCE
        const f = t * t * t * power
        const nx = dist > 0.0001 ? dx / dist : 0
        const ny = dist > 0.0001 ? dy / dist : 0
        const px = x + nx * PUSH * f
        const py = y + ny * PUSH * f
        const radius = DOT_RADIUS * (1 + (MAX_SCALE - 1) * f)
        const alpha = BASE_ALPHA + (ACTIVE_ALPHA - BASE_ALPHA) * f
        const cr = Math.round(dotColor[0] + (textColor[0] - dotColor[0]) * f)
        const cg = Math.round(dotColor[1] + (textColor[1] - dotColor[1]) * f)
        const cb = Math.round(dotColor[2] + (textColor[2] - dotColor[2]) * f)

        ctx.beginPath()
        ctx.arc(px, py, radius, 0, TAU)
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    const redraw = () => {
      readColors()
      measure()
      paintBase()
    }

    /* ---------------- reduced motion: a still grid, no listeners ---------------- */

    if (reduced) {
      area.classList.remove('has-custom-cursor')
      cursor.classList.remove('is-on')
      redraw()
      const ro = new ResizeObserver(redraw)
      ro.observe(area)
      window.addEventListener('resize', redraw)
      return () => {
        ro.disconnect()
        window.removeEventListener('resize', redraw)
      }
    }

    /* ---------------- interactive grid ---------------- */

    readColors()
    measure()
    paintBase()
    if (finePointer) area.classList.add('has-custom-cursor')

    const target = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    const ringAt = { x: 0, y: 0 }
    let power = 0
    let targetPower = 0
    let paintedPower = 0
    let raf = 0
    let running = false

    const local = (event) => {
      const rect = area.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const setCursor = (on) => cursor.classList.toggle('is-on', on)

    const overInteractive = (node) =>
      node instanceof Element &&
      !!node.closest('a, button, input, textarea, select, label, [role="button"]')

    const onEnter = (event) => {
      if (event.pointerType === 'touch') return
      const p = local(event)
      target.x = p.x
      target.y = p.y
      smooth.x = p.x
      smooth.y = p.y
      ringAt.x = p.x
      ringAt.y = p.y
      targetPower = 1
      setCursor(!overInteractive(event.target))
    }

    const onMove = (event) => {
      const p = local(event)
      if (targetPower === 0) {
        smooth.x = p.x
        smooth.y = p.y
        ringAt.x = p.x
        ringAt.y = p.y
      }
      target.x = p.x
      target.y = p.y
      targetPower = 1
      setCursor(event.pointerType !== 'touch' && !overInteractive(event.target))
    }

    const onLeave = () => {
      targetPower = 0
      setCursor(false)
    }

    const onDown = (event) => {
      if (event.pointerType !== 'touch') return
      const p = local(event)
      target.x = p.x
      target.y = p.y
      smooth.x = p.x
      smooth.y = p.y
      ringAt.x = p.x
      ringAt.y = p.y
      targetPower = 1
    }

    const onUp = (event) => {
      if (event.pointerType === 'touch') targetPower = 0
    }

    const onScroll = () => {
      targetPower = 0
      setCursor(false)
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)

      smooth.x += (target.x - smooth.x) * POINTER_EASE
      smooth.y += (target.y - smooth.y) * POINTER_EASE
      ringAt.x += (target.x - ringAt.x) * RING_EASE
      ringAt.y += (target.y - ringAt.y) * RING_EASE
      power += (targetPower - power) * STRENGTH_EASE
      if (Math.abs(targetPower - power) < 0.0015) power = targetPower

      if (power > 0 || paintedPower > 0) paint(smooth.x, smooth.y, power)
      paintedPower = power

      dotEl.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      ringEl.style.transform = `translate3d(${ringAt.x}px, ${ringAt.y}px, 0)`
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
    }

    const onResize = () => {
      readColors()
      measure()
      if (!running) paintBase()
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(area)
    window.addEventListener('resize', onResize)

    let onScreen = true
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting)
        if (onScreen && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    area.addEventListener('pointerenter', onEnter)
    area.addEventListener('pointermove', onMove, { passive: true })
    area.addEventListener('pointerleave', onLeave)
    area.addEventListener('pointerdown', onDown, { passive: true })
    area.addEventListener('pointerup', onUp, { passive: true })
    area.addEventListener('pointercancel', onUp, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      area.removeEventListener('pointerenter', onEnter)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      area.removeEventListener('pointerdown', onDown)
      area.removeEventListener('pointerup', onUp)
      area.removeEventListener('pointercancel', onUp)
      window.removeEventListener('scroll', onScroll)
      area.classList.remove('has-custom-cursor')
      cursor.classList.remove('is-on')
    }
  }, [reduced, finePointer, theme])

  return (
    <>
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div ref={cursorRef} className="hero__cursor" aria-hidden="true">
        <span ref={dotRef} className="hero__cursor-dot" />
        <span ref={ringRef} className="hero__cursor-ring" />
      </div>
    </>
  )
}
