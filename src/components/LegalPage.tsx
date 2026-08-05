import Navbar from './Navbar'
import Footer from './Footer'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, buildWhatsAppUrl } from '@/lib/site'
import type { Dictionary, LegalBlock, Locale } from '@/lib/i18n'

interface LegalPageProps {
  locale: Locale
  dict: Dictionary
  eyebrow: string
  title: string
  lastUpdated: string
  sections: LegalBlock[]
  contact: { title: string; body: string; whatsapp?: string }
}

/**
 * The shell every legal route renders. These pages carry the formal contact
 * details that the landing page deliberately does not — phone and email exist
 * here because the accessibility statement legally has to name a way to report
 * a problem, and the terms / privacy pages need a contact.
 */
export default function LegalPage({
  locale,
  dict,
  eyebrow,
  title,
  lastUpdated,
  sections,
  contact,
}: LegalPageProps) {
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main" className="silver-light px-5 pt-32 pb-24 sm:px-8 lg:pt-44">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow mb-7">{eyebrow}</p>
          <h1 className="h-section text-ink">{title}</h1>
          <p className="mt-5 text-sm text-muted">
            {dict.common.lastUpdated}: {lastUpdated}
          </p>

          {sections.map((section) => (
            <section key={section.title} className="mt-14">
              <h2 className="display-sm text-[1.75rem] text-ink">{section.title}</h2>

              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item) => (
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
          ))}

          <section className="mt-14 rounded-card border border-line bg-surface p-8">
            <h2 className="display-sm text-[1.75rem] text-ink">{contact.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{contact.body}</p>
            <ul className="mt-6 space-y-3">
              {contact.whatsapp && (
                <li>
                  <a
                    href={buildWhatsAppUrl(dict.cta.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-ink underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {contact.whatsapp}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  dir="ltr"
                  className="inline-block font-semibold text-accent-ink underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  dir="ltr"
                  className="inline-block font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
