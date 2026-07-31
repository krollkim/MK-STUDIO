import SectionHeading from '@/components/SectionHeading'
import StaggerReveal from '@/components/StaggerReveal'
import { AUDIENCE } from '@/lib/content'

/** Section 2 — "למי זה". Qualifies the visitor before pitching the service. */
export default function Audience() {
  return (
    <section id="audience" className="bg-bg px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={AUDIENCE.eyebrow}
          title={AUDIENCE.title}
          lead={AUDIENCE.lead}
          align="center"
        />

        <StaggerReveal columns={3} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.items.map((item) => (
            <article
              key={item.title}
              className="rounded-card border border-line bg-surface p-7 transition-colors hover:border-accent/40"
            >
              <h3 className="text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
