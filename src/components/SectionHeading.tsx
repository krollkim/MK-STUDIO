import ScrollReveal from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  /** Words inside `title` to set in accent — the "keyword serif" treatment. */
  lead?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Shared section header: eyebrow + <h2> + optional lead paragraph.
 *
 * It owns its own ScrollReveal so the heading and the content below animate as
 * two separate elements — never wrap a StaggerReveal grid in another
 * ScrollReveal, the two opacity tweens fight each other.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'start',
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'
  const dark = tone === 'dark'

  return (
    <ScrollReveal
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <p className={`eyebrow mb-5 ${dark ? 'text-accent-lit' : ''}`}>{eyebrow}</p>
      <h2
        className={
          'display text-[clamp(2.5rem,6vw,4.5rem)] ' + (dark ? 'text-white' : 'text-ink')
        }
      >
        {title}
      </h2>
      {lead && (
        <p
          className={
            'mt-7 text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-relaxed ' +
            (dark ? 'text-white/70' : 'text-muted')
          }
        >
          {lead}
        </p>
      )}
    </ScrollReveal>
  )
}
