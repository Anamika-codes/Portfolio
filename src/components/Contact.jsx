import { useState } from 'react'
import { contactCards, profile, projectTypes } from '../data/content'
import { ArrowUpRight, Check, Mail, Send, iconMap } from './Icons'
import Reveal from './Reveal'

const initialForm = {
  name: '',
  email: '',
  type: projectTypes[0],
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell me your name.'
    if (!form.email.trim()) next.email = 'An email address is required.'
    else if (!emailPattern.test(form.email.trim())) next.email = 'That email address looks invalid.'
    if (!form.message.trim()) next.message = 'Add a short message so I can help.'
    else if (form.message.trim().length < 12) next.message = 'A little more detail would help.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setSending(true)
    setError('')
    try {
      const formEl = event.target
      const fd = new FormData(formEl)
      fd.append('_subject', 'New message from portfolio')
      fd.append('_captcha', 'false')
      const res = await fetch('https://formsubmit.co/' + profile.email, {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        setSent(true)
        setForm(initialForm)
      } else {
        setError('Failed to send message. Please try again or email directly.')
      }
    } catch {
      setError('Failed to send message. Please try again or email directly.')
    } finally {
      setSending(false)
    }
  }

  const fieldProps = (field) => ({
    id: field,
    name: field,
    value: form[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Initiate Conversation</span>
          <h2 className="section-title mt-3">Get in Touch</h2>
          <p className="section-desc">
            Whether you have an internship opening, a freelance project, or simply want to connect.
          </p>
        </Reveal>

        <div className="mt-10 grid min-w-0 items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          {/* -------- Contact cards -------- */}
          <Reveal className="flex min-w-0 flex-col gap-3.5">
            {contactCards.map((card) => {
              const Icon = iconMap[card.icon] ?? Mail
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card group flex min-w-0 items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="icon-tile shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-body">
                      {card.label}
                    </span>
                    <span className="mt-1 block break-words text-[0.9375rem] font-medium text-heading">
                      {card.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-body transition-all duration-200 group-hover:text-accent-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )
            })}

            <p className="mt-1 flex items-center gap-2 text-[0.8125rem] text-body">
              <span className="live-dot" aria-hidden="true" />
              Response time: usually within 24 hours. Direct communication guaranteed.
            </p>
          </Reveal>

          {/* -------- Form -------- */}
          <Reveal delay={100} className="min-w-0">
            <div className="card p-4 md:p-5">
              {sent ? (
                <div
                  className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/12 text-accent-ink">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-heading">Message sent</h3>
                  <p className="max-w-sm text-[0.875rem] leading-relaxed text-body">
                    Thank you for reaching out. I read every message and will reply to{' '}
                    <span className="text-heading">{profile.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn btn-outline mt-1"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mono mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-body"
                      >
                        Full Name
                      </label>
                      <input
                        {...fieldProps('name')}
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Alex Sharma"
                        className="form-field"
                      />
                      {errors.name ? (
                        <p id="name-error" className="mt-1 text-[0.75rem] text-red-400">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mono mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-body"
                      >
                        Email Address
                      </label>
                      <input
                        {...fieldProps('email')}
                        type="email"
                        autoComplete="email"
                        placeholder="alex@company.com"
                        className="form-field"
                      />
                      {errors.email ? (
                        <p id="email-error" className="mt-1 text-[0.75rem] text-red-400">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="mono mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-body"
                    >
                      Project Type
                    </label>
                    <select {...fieldProps('type')} className="form-field" required>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mono mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-body"
                    >
                      Message Box
                    </label>
                    <textarea
                      {...fieldProps('message')}
                      rows={4}
                      placeholder="Tell me about your team, the scope of work, or how we might collaborate..."
                      className="form-field resize-y"
                    />
                    {errors.message ? (
                      <p id="message-error" className="mt-1 text-[0.75rem] text-red-400">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                <button type="submit" className="btn btn-primary btn-shine group mt-0.5 w-fit self-center !px-6 !py-2 text-sm" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                </button>
                {error ? <p className="text-center text-[0.75rem] text-red-400">{error}</p> : null}

                  <p className="mono pt-1 text-center text-[0.6875rem] text-body">
                    Or email directly at{' '}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-accent-ink transition-colors duration-200 hover:text-accent-soft"
                    >
                      {profile.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
