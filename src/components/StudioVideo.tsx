'use client'

import { useRef, useState } from 'react'

interface StudioVideoProps {
  src: string
  poster: string
  /** Accessible description of what the video shows. */
  label: string
  className?: string
}

/**
 * Native <video> with a custom poster overlay: nothing downloads until the
 * visitor actually presses play (`preload="none"`), which keeps the hero of the
 * page fast on mobile data.
 */
export default function StudioVideo({ src, poster, label, className = '' }: StudioVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    const el = ref.current
    if (!el) return
    setStarted(true)
    void el.play()
  }

  return (
    <div className={`relative overflow-hidden rounded-xl2 bg-ink ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="none"
        aria-label={label}
        onPause={() => undefined}
        className="block h-full w-full object-cover"
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`הפעלת הסרטון: ${label}`}
          className="group absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/15"
        >
          <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/95 shadow-[0_10px_34px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#14161a" aria-hidden="true" className="mr-[3px]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
