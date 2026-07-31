'use client'

import { gsap as gsapLib } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsapLib.registerPlugin(ScrollTrigger)
}

export const gsap = gsapLib
export { ScrollTrigger }

export const fadeUp = (
  target: string | HTMLElement | Element,
  vars?: gsap.TweenVars
) =>
  gsap.fromTo(
    target,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ...vars }
  )

export const staggerFadeUp = (
  targets: string | HTMLElement[] | Element[],
  stagger = 0.1,
  vars?: gsap.TweenVars
) =>
  gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger, ...vars }
  )

export const parallax = (target: string | HTMLElement | Element, speed = 0.5) =>
  ScrollTrigger.create({
    trigger: target,
    onUpdate: (self) => {
      gsap.to(target, { y: self.getVelocity() * speed, overwrite: 'auto' })
    },
  })
