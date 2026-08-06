/**
 * The M.K Studio logo, version 4a "Waveform".
 *
 * Two shapes, and which one you want depends on whether the surrounding
 * context already names the studio:
 *
 *   · `lockup` — mark + "M.K STUDIO". For the navbar and the footer, where the
 *     mark alone would leave the visitor with no name to read.
 *   · `mark`   — the monogram alone. For the hero, where the headline and the
 *     eyebrow already say who this is, and where there is finally enough room
 *     for the amber trace to be seen at all.
 *
 * Rules from the asset pack that this component enforces so callers cannot get
 * them wrong:
 *
 *   1. **Under 40px it swaps to the small-size cut.** The full trace smears
 *      below that; the favicon file is a simplified trace with the same
 *      envelope and stays legible down to 16px. Callers just pass a size.
 *   2. **`tone="light"` loads the reversed asset**, not a CSS filter. On dark
 *      grounds the mark needs brighter silver and no black outline, which an
 *      outline in black cannot give you — it disappears.
 *   3. **No circle, no frame, no shadow, no recolour.** The mark is a free
 *      standing mark. The old logo was the one in a circle.
 *
 * The wordmark is real HTML text, not the `<text>` inside
 * `mk-studio-lockup.svg`. That SVG asks for Figtree, which this site does not
 * load, so as an <img> it would silently fall back to Arial. Heebo ExtraBold at
 * this size with this tracking is near-indistinguishable, and keeping it as
 * text means it stays selectable and readable to a screen reader.
 */

/** Below this, the full trace smears — see rule 1. */
const SMALL_CUT_THRESHOLD = 40

/**
 * How far the wordmark sits below the centre of the mark, as a share of the
 * mark's height. Centring the two boxes lines "M.K" up with the mark's letters
 * and reads too high, because the mark's silhouette carries the amber trace
 * below its letters while the wordmark has nothing below "STUDIO".
 * Tune this and nothing else if the balance needs adjusting.
 */
const WORDMARK_DROP = 0.07

interface LogoProps {
  /** `mark` = monogram only. `lockup` = monogram + wordmark. */
  variant?: 'mark' | 'lockup'
  /** `dark` marks for light grounds; `light` for dark grounds. */
  tone?: 'dark' | 'light'
  /** Height of the MARK in px. The wordmark scales from it. */
  size?: number
  className?: string
}

function markSrc(size: number, tone: 'dark' | 'light'): string {
  if (size < SMALL_CUT_THRESHOLD) {
    return tone === 'light'
      ? '/favicon/mk-studio-favicon-white.svg'
      : '/favicon/mk-studio-favicon.svg'
  }
  return tone === 'light' ? '/logo/mk-studio-mark-reversed.svg' : '/logo/mk-studio-mark.svg'
}

export default function Logo({
  variant = 'lockup',
  tone = 'dark',
  size = 40,
  className = '',
}: LogoProps) {
  /* Plain <img>, deliberately. Inlining the SVG would duplicate its gradient
     and mask ids on any page that shows the logo more than once (navbar, hero
     and footer all do), and colliding mask ids break the trace cut-out. Each
     <img> is its own document, so the ids stay isolated. next/image adds
     nothing here — SVG is not raster-optimised. */
  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={markSrc(size, tone)}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ height: size, width: 'auto' }}
      className="block shrink-0"
    />
  )

  if (variant === 'mark') {
    return <span className={`inline-flex ${className}`}>{mark}</span>
  }

  // Wordmark proportions track the mark's height, per the pack's lockup.
  const nameSize = size * 0.5
  const subSize = size * 0.21
  const gap = size * 0.46

  return (
    /* `dir="ltr"` on the whole lockup, not just on the text.
       A flex row lays its children out along the inline axis, so inside the
       RTL page the mark was landing on the RIGHT and the wordmark on the left,
       mirroring the pack's artwork. A lockup is a fixed piece of artwork and
       must not mirror: the wordmark is Latin and reads left-to-right, so a
       mirrored lockup makes the eye hit the mark and then jump backwards.
       This one attribute fixes the order AND makes every logical property
       below (`paddingInlineStart`, `borderInlineStart`) resolve to the left
       edge of the text column, which is where the pack's rule sits. */
    <span dir="ltr" className={`inline-flex items-center ${className}`} style={{ gap }}>
      {mark}
      <span
        className="flex flex-col justify-center"
        style={{
          gap: size * 0.085,
          paddingInlineStart: gap,
          borderInlineStartWidth: 1,
          borderInlineStartStyle: 'solid',
          borderInlineStartColor: tone === 'light' ? 'rgb(255 255 255 / 0.28)' : 'var(--color-line)',
          /* A transform, not a margin: with `items-center` a margin is folded
             into the centring and shifts the box by only half its value. */
          transform: `translateY(${size * WORDMARK_DROP}px)`,
        }}
      >
        <span
          className={`font-sans font-extrabold leading-none ${tone === 'light' ? 'text-white' : 'text-ink'}`}
          style={{ fontSize: nameSize, letterSpacing: '0.16em' }}
        >
          M.K
        </span>
        <span
          className={`font-sans font-medium leading-none ${tone === 'light' ? 'text-white/65' : 'text-muted'}`}
          style={{ fontSize: subSize, letterSpacing: '0.44em' }}
        >
          STUDIO
        </span>
      </span>
    </span>
  )
}
