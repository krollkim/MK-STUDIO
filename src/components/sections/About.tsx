import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import StudioVideo from '@/components/StudioVideo'
import AmbientWord from '@/components/AmbientWord'
import { ABOUT } from '@/lib/content'

/**
 * Section 5 — "למה מתן". His own story. The pull-quote leads (it is the most
 * human line on the page), the video and a scattered pair of floating frames
 * carry the visual weight, and the price objection is answered quietly at the
 * end rather than in a box shouting about value.
 */
export default function About() {
  return (
    <section
      id="about"
      className="silver-up relative overflow-hidden px-5 py-32 sm:px-8 lg:py-48"
    >
      {/* Sits low, in the gap beside the closing aside — the old top-32
          placement put it directly under the heading and the video, which
          swallowed it completely. */}
      <AmbientWord position="end" className="bottom-16">
        שיר
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="max-w-4xl">
          <p className="eyebrow mb-7">{ABOUT.eyebrow}</p>
          <h2 className="h-section text-ink">{ABOUT.title}</h2>
        </ScrollReveal>

        {/* Video leads, wide and floating — no frame, just elevation. */}
        <ScrollReveal className="mt-16 lg:mt-20">
          <StudioVideo
            src={ABOUT.video.src}
            poster={ABOUT.video.poster}
            label={ABOUT.video.label}
            className="aspect-video w-full shadow-float-lg"
          />
          <p className="mt-4 text-sm text-muted">{ABOUT.video.label}</p>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <ScrollReveal>
            <blockquote className="display text-[clamp(1.75rem,3.6vw,2.75rem)] text-ink">
              <span aria-hidden="true" className="amber-text">
                „
              </span>
              {ABOUT.quote}
              <span aria-hidden="true" className="amber-text">
                ”
              </span>
            </blockquote>

            <div className="body-lg mt-12 space-y-6 text-muted">
              {ABOUT.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {/* The price objection: a quiet aside, marked by a rule, not a card. */}
            <div className="mt-14 border-r-2 border-accent/50 pr-7">
              <h3 className="h-item text-ink">{ABOUT.valueNote.title}</h3>
              <p className="body-lg mt-3 text-muted">{ABOUT.valueNote.body}</p>
            </div>
          </ScrollReveal>

          {/* Two frames scattered on an arc rather than stacked in a grid. */}
          <ScrollReveal className="relative lg:pt-10">
            <div className="relative aspect-3/4 overflow-hidden rounded-card shadow-float lg:-rotate-2">
              <Image
                src="/images/guitar-session.webp"
                alt="מתן מקליט גיטרה עם יוצר באולפן, מול עמדת השליטה"
                fill
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover"
              />
            </div>

            <div className="relative -mt-16 mr-auto ml-0 w-[62%] overflow-hidden rounded-card shadow-float-lg lg:rotate-3">
              <div className="relative aspect-4/5">
                <Image
                  src="/images/recording-session.webp"
                  alt="הקלטה באולפן M.K Studio"
                  fill
                  sizes="(max-width: 1024px) 62vw, 20rem"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
