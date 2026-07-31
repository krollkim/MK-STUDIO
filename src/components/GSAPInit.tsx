'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Prevent ScrollTrigger from recalculating on every Safari address-bar resize
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * Mount once in the root layout (inside <body>). Refreshing ScrollTrigger after
 * the first paint guarantees every trigger position is measured against the real
 * laid-out page — this is the cure for "trigger fires too early / positions are
 * wrong on first load".
 */
export default function GSAPInit() {
  useEffect(() => {
    // Refresh after first paint so all trigger positions are accurate
    ScrollTrigger.refresh()
  }, [])

  return null
}
