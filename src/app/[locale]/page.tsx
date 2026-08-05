import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { WhatsAppFloat } from '@/components/WhatsAppCTA'
import Hero from '@/components/sections/Hero'
import Audience from '@/components/sections/Audience'
import Services from '@/components/sections/Services'
import StudioSequence from '@/components/sections/StudioSequence'
import About from '@/components/sections/About'
import Proof from '@/components/sections/Proof'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'
import { getDictionary, isLocale } from '@/lib/i18n'

/**
 * M.K Studio — the landing page, in whichever locale the segment resolves to.
 * Seven sections, one conversion action (WhatsApp). All copy comes from the
 * dictionary; nothing here hardcodes a string.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <StructuredData locale={locale} dict={dict} />
      <Navbar locale={locale} dict={dict} overDarkHero />
      <main id="main">
        <Hero dict={dict} />
        <Audience dict={dict} />
        <Services dict={dict} />
        <StudioSequence dict={dict} />
        <About dict={dict} />
        <Proof dict={dict} />
        <Process dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFloat cta={{ ...dict.cta, floatLabel: dict.cta.floatLabel }} />
    </>
  )
}
