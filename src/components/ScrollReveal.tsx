'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

/**
 * Single-block fade-up. Use this to reveal ONE element/section as a whole.
 *
 * Do NOT wrap a grid of cards in this AND also use StaggerReveal on the same
 * cards — both animate `opacity`, and the two tweens fight, producing the
 * "two-stage"/double-fade feel. One element = one reveal owner.
 *
 * Defaults below (duration 0.55, y 30, ease power2.out, start 'top 85%') are
 * sensible starting points — tune per project.
 */
export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
