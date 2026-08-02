import Navbar from './Navbar'
import Footer from './Footer'

interface LegalPageProps {
  eyebrow: string
  title: string
  lastUpdated: string
  children: React.ReactNode
}

/**
 * Shared shell for the legal routes. These pages carry the formal contact
 * details that the landing page deliberately does not.
 */
export default function LegalPage({ eyebrow, title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main id="main" className="silver-light px-5 pt-32 pb-24 sm:px-8 lg:pt-44">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow mb-7">{eyebrow}</p>
          <h1 className="h-section text-ink">{title}</h1>
          <p className="mt-5 text-sm text-muted">עודכן לאחרונה: {lastUpdated}</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  )
}

/** A titled block inside a legal page. */
export function LegalSection({
  title,
  paragraphs,
  list,
}: {
  title: string
  paragraphs?: string[]
  list?: string[]
}) {
  return (
    <section className="mt-14">
      <h2 className="display-sm text-[1.75rem] text-ink">{title}</h2>
      {paragraphs?.map((p) => (
        <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {list && (
        <ul className="mt-5 space-y-3">
          {list.map((item) => (
            <li key={item.slice(0, 24)} className="flex gap-3.5 leading-relaxed text-muted">
              <span
                aria-hidden="true"
                className="amber-fill mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
