'use client'

import { useEffect, useState } from 'react'

/** The hero section's id, and the anchor the navbar's "back to top" targets. */
const HERO_ID = 'top'

/**
 * True once the hero has scrolled completely out of view.
 *
 * Both floating controls hang off this. Over the hero they are in the way: the
 * hero already carries a full-width WhatsApp CTA, and on a phone the two
 * circles land on top of it. They belong to the rest of the page, so they
 * appear exactly when the section after the hero takes over the viewport.
 *
 * An IntersectionObserver on the hero itself, rather than a scroll listener
 * against a measured height: the hero is `min-h-svh`, so its height changes
 * when a mobile browser's URL bar collapses, and a cached measurement goes
 * stale mid-scroll.
 *
 * Starts `false` and flips to `true` on mount for pages with no hero (the
 * legal routes), so the controls are never withheld where there is no hero to
 * withhold them for. That costs one frame before they fade in, which is
 * invisible against the fade itself.
 */
export function usePastHero(): boolean {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(HERO_ID)

    if (!hero) {
      setPastHero(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return pastHero
}
