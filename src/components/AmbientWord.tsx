/**
 * A single huge, faded Hebrew word set behind a section — the depth layer that
 * keeps the airy sections from reading as empty. Purely decorative: it is
 * `aria-hidden` and never carries meaning the copy doesn't already state.
 *
 * Keep it barely there. If you can read it comfortably, it is too strong.
 */
interface AmbientWordProps {
  children: string
  /** Where it bleeds from. RTL pages read right→left, so `start` is the right edge. */
  position?: 'start' | 'end' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

const POSITION: Record<NonNullable<AmbientWordProps['position']>, string> = {
  start: 'inset-inline-start-[-0.12em] text-start',
  end: 'inset-inline-end-[-0.12em] text-end',
  center: 'inset-inline-0 text-center',
}

export default function AmbientWord({
  children,
  position = 'start',
  tone = 'light',
  className = '',
}: AmbientWordProps) {
  return (
    <span
      aria-hidden="true"
      className={
        // Desktop only: on a phone there is no room for a background layer
        // that doesn't sit directly behind the heading and muddy it.
        'pointer-events-none absolute hidden select-none whitespace-nowrap display leading-none lg:block ' +
        'text-[clamp(12rem,26vw,22rem)] ' +
        (tone === 'light' ? 'text-ink/[0.035]' : 'text-white/[0.045]') +
        ' ' +
        POSITION[position] +
        ' ' +
        className
      }
    >
      {children}
    </span>
  )
}
