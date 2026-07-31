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

/**
 * M.K Studio — single-page MVP. Seven sections, one conversion action
 * (WhatsApp). Copy lives in src/lib/content.ts, business details in
 * src/lib/site.ts.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar overDarkHero />
      <main id="main">
        <Hero />
        <Audience />
        <Services />
        <StudioSequence />
        <About />
        <Proof />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
