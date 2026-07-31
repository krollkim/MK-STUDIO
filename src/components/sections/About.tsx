import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import StudioVideo from '@/components/StudioVideo'
import { ABOUT } from '@/lib/content'

/**
 * Section 5 — "למה מתן". His own story, with the intro video and a portrait
 * frame from the studio. Also carries the gentle answer to the price objection.
 */
export default function About() {
  return (
    <section id="about" className="bg-surface px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <ScrollReveal>
            <StudioVideo
              src={ABOUT.video.src}
              poster={ABOUT.video.poster}
              label={ABOUT.video.label}
              className="aspect-video"
            />
            <p className="mt-3 text-sm text-muted">{ABOUT.video.label}</p>

            <blockquote className="mt-9 border-r-2 border-accent pr-5 text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold leading-snug text-ink">
              „{ABOUT.quote}”
            </blockquote>

            <div className="mt-9 space-y-4 text-[17px] leading-relaxed text-muted">
              {ABOUT.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col gap-8">
            <div className="relative aspect-3/4 overflow-hidden rounded-xl2 bg-bg">
              <Image
                src="/images/guitar-session.webp"
                alt="מתן מקליט גיטרה עם יוצר באולפן, מול עמדת השליטה"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Gentle answer to the price objection — value, not a price list. */}
            <div className="rounded-card border border-line bg-bg p-7">
              <h3 className="text-lg font-bold text-ink">{ABOUT.valueNote.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{ABOUT.valueNote.body}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
