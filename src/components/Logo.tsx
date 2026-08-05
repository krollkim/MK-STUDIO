interface LogoProps {
  /** "Florentin · Tel Aviv", already in the current language. */
  location?: string
  /** `dark` = graphite marks for light backgrounds. `light` = white for photos. */
  tone?: 'dark' | 'light'
  /** Monogram diameter in px. The wordmark scales with it. */
  size?: number
  /** Hide the wordmark and show the monogram alone (tight spaces). */
  markOnly?: boolean
  className?: string
}

/**
 * M.K Studio wordmark — an inline SVG rebuild of the studio's circular MK
 * monogram (thin ring + waveform under the letters) plus the wordmark.
 *
 * Inline SVG so it stays crisp, themeable and zero-request. Replace with the
 * real vector file if/when Matan supplies one.
 */
export default function Logo({
  tone = 'dark',
  size = 40,
  markOnly = false,
  location,
  className = '',
}: LogoProps) {
  const stroke = tone === 'light' ? '#ffffff' : 'var(--color-ink)'
  const sub = tone === 'light' ? 'rgba(255,255,255,0.72)' : 'var(--color-muted)'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="32" cy="32" r="30" stroke={stroke} strokeWidth="1.4" opacity="0.55" />
        <g stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          {/* M */}
          <path d="M17 38V25l6.5 8 6.5-8v13" />
          {/* K */}
          <path d="M38 25v13M47 25l-8 6.5 8 6.5" />
        </g>
        {/* waveform bar under the letters */}
        <g stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
          <path d="M21 45v3M25 43.5v6M29 45.5v2M33 42v9M37 44.5v3M41 43v6M45 45v3" />
        </g>
      </svg>

      {!markOnly && (
        <span className="flex flex-col leading-none" style={{ color: stroke }}>
          <span
            className="font-extrabold tracking-[0.14em]"
            style={{ fontSize: size * 0.42 }}
            dir="ltr"
          >
            M.K STUDIO
          </span>
          {location && (
            <span
              className="mt-1 tracking-[0.22em]"
              style={{ fontSize: size * 0.235, color: sub }}
            >
              {location}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
