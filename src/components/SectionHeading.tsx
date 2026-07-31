import ScrollReveal from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  lead?: string
  /** Center the block (used by the wider, more "statement" sections). */
  align?: 'start' | 'center'
  className?: string
}

/**
 * Shared section header: eyebrow + <h2> + optional lead paragraph.
 *
 * It owns its own ScrollReveal so the heading and the content grid below it
 * animate as two separate elements — never wrap a StaggerReveal grid in another
 * ScrollReveal, the two opacity tweens fight each other.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'start',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <ScrollReveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-muted">{lead}</p>}
    </ScrollReveal>
  )
}
