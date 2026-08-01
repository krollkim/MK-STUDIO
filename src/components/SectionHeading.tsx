import ScrollReveal from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  lead?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Shared section header: eyebrow + <h2> + optional lead.
 *
 * Sizes come from the `.h-section` / `.lead` scale in globals.css — nothing
 * here sets a font size, which is what keeps every section announcing itself
 * at exactly the same weight.
 *
 * It owns its own ScrollReveal so the heading and the content below animate as
 * two separate elements; never wrap a StaggerReveal grid in another
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
      className={`${centered ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'} ${className}`}
    >
      <p className={`eyebrow mb-7 ${dark ? 'text-accent-lit' : ''}`}>{eyebrow}</p>
      <h2 className={`h-section ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {lead && (
        <p className={`lead mt-8 max-w-2xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-muted'}`}>
          {lead}
        </p>
      )}
    </ScrollReveal>
  )
}
