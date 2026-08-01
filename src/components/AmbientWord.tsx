/**
 * A single huge, faded Hebrew word set behind a section: the depth layer that
 * keeps the airy sections from reading as empty. Purely decorative — it is
 * `aria-hidden` and never carries meaning the copy doesn't already state.
 *
 * Two rules learned the hard way:
 *
 * 1. ONE opacity for all of them, and it has a hard ceiling. Body copy has to
 *    stay readable where a word passes behind it: `muted` on the darkest point
 *    of the silver ombré is already only 4.9:1, and a 6% ink wash on top drops
 *    it to 4.4:1 — under AA. At 4.5% it lands at 4.55:1 and holds. So this is
 *    not a taste value; going higher breaks the text.
 *
 * 2. Placement matters more than opacity, and it is the caller's job. A ghost
 *    word behind a heading or a photo is invisible however strong it is, so
 *    each usage anchors to a genuinely empty part of its own section rather
 *    than to a fixed offset.
 */
interface AmbientWordProps {
  children: string
  /** Which edge it bleeds from. RTL reads right→left, so `start` is the right. */
  position?: 'start' | 'end' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

const POSITION: Record<NonNullable<AmbientWordProps['position']>, string> = {
  start: 'inset-inline-start-[-0.1em] text-start',
  end: 'inset-inline-end-[-0.1em] text-end',
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
        'pointer-events-none absolute select-none whitespace-nowrap display leading-none ' +
        // Scaled down on phones rather than hidden: the depth layer is part of
        // the design, and dropping it made mobile feel like a different site.
        'text-[clamp(6rem,24vw,20rem)] ' +
        (tone === 'light' ? 'text-ink/4.5' : 'text-white/7') +
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
