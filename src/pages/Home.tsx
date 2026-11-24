import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Work from '../components/sections/Work'
import About from '../components/sections/About'
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
      <Services />
      <Work limit={3} />
      <About />
      <Process />
      <Faq />
      <FinalCta />
    </>
  )
}
