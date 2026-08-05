import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalPage from '@/components/LegalPage'
import { SITE_URL } from '@/lib/site'
import { alternatesFor, getDictionary, isLocale } from '@/lib/i18n'

const ROUTE = '/terms'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { legal } = getDictionary(locale)
  return {
    title: legal.terms.metaTitle,
    description: legal.terms.metaDescription,
    alternates: alternatesFor(locale, ROUTE, SITE_URL),
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const page = dict.legal.terms

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      eyebrow={page.eyebrow}
      title={page.title}
      lastUpdated={page.lastUpdated}
      sections={page.sections}
      contact={page.contact}
    />
  )
}
