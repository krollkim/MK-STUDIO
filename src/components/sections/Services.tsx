import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import StaggerReveal from '@/components/StaggerReveal'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import { SERVICES } from '@/lib/content'

/** Section 3 — the three services, then the single outcome they all lead to. */
export default function Services() {
  return (
    <section id="services" className="bg-surface px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={SERVICES.eyebrow} title={SERVICES.title} lead={SERVICES.lead} />

        <StaggerReveal columns={3} className="mt-14 grid gap-5 lg:grid-cols-3">
          {SERVICES.items.map((item, i) => (
            <article
              key={item.title}
              className="flex flex-col rounded-card border border-line bg-bg p-7 transition-shadow hover:shadow-[0_24px_50px_-36px_rgba(20,22,26,0.55)]"
            >
              <span
                aria-hidden="true"
                className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-pill bg-surface px-3 py-1 text-[13px] font-medium text-muted"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </StaggerReveal>

        {/* The outcome — what the visitor actually walks away with. */}
        <ScrollReveal className="mt-16">
          <div className="grid items-center gap-10 overflow-hidden rounded-xl2 border border-line bg-bg lg:grid-cols-2">
            <div className="p-8 sm:p-11">
              <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.18em] text-accent">
                {SERVICES.outcome.eyebrow}
              </p>
              <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-tight text-ink">
                {SERVICES.outcome.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{SERVICES.outcome.body}</p>

              <ul className="mt-6 space-y-3">
                {SERVICES.outcome.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <WhatsAppCTA className="mt-8" />
            </div>

            {/* The brandmark is a square poster — keep the panel square so the
                lettering is never cropped. */}
            <div className="relative order-first aspect-square lg:order-last">
              <Image
                src="/images/studio-brandmark.webp"
                alt="גרפיקת המותג של M.K Studio — עמדת ההקלטה עם מיקרופון, מוניטורים, פסנתר וגיטרות"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
