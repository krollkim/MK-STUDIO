import SectionHeading from '@/components/SectionHeading'
import StaggerReveal from '@/components/StaggerReveal'
import { PROCESS } from '@/lib/content'

/** Section 7a — the four steps, so the CTA feels like a small next move. */
export default function Process() {
  return (
    <section id="process" className="bg-bg px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} align="center" />

        <StaggerReveal
          columns={4}
          stagger={0.12}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS.steps.map((step, i) => (
            <article key={step.title} className="relative rounded-card bg-surface p-7">
              <span
                aria-hidden="true"
                className="block text-4xl font-extrabold leading-none text-accent/35"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
