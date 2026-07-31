import SectionHeading from '@/components/SectionHeading'
import StaggerReveal from '@/components/StaggerReveal'
import AmbientWord from '@/components/AmbientWord'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import { PROCESS } from '@/lib/content'

/**
 * Section 7a — the four steps as a hairline timeline rather than four boxes,
 * so the CTA that follows feels like a small next move.
 */
export default function Process() {
  return (
    <section
      id="process"
      className="silver-up relative overflow-hidden px-5 py-28 sm:px-8 lg:py-40"
    >
      <AmbientWord position="start" className="bottom-10">
        מכאן
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

        <StaggerReveal
          columns={4}
          stagger={0.1}
          className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS.steps.map((step, i) => (
            <article key={step.title} className="border-t border-line pt-7">
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="amber-text display-sm text-2xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < PROCESS.steps.length - 1 && (
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                )}
              </div>
              <h3 className="display-sm text-[1.375rem] text-ink">{step.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </StaggerReveal>

        <div className="mt-16 flex justify-start">
          <WhatsAppCTA />
        </div>
      </div>
    </section>
  )
}
