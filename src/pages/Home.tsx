import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import Services from '../components/sections/Services'
import Work from '../components/sections/Work'
import About from '../components/sections/About'
import Pricing from '../components/sections/Pricing'
import Process from '../components/sections/Process'
import Faq from '../components/sections/Faq'
import FinalCta from '../components/sections/FinalCta'

/**
 * Én lang side som tar en bedriftskunde fra «hvem er dette» til «jeg tar
 * kontakt» uten å kreve et eneste ekstra klikk.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Work limit={3} />
      <About />
      <Pricing />
      <Process />
      <Faq />
      <FinalCta />
    </>
  )
}
