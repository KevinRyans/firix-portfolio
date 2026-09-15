import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { trackPageView } from './lib/analytics'

/** Scroller til toppen ved sidebytte, men lar ankerlenker (#priser) være. */
function useScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
}

export default function App() {
  const location = useLocation()
  useScrollReset()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  // Admin har eget fullskjerm-oppsett uten nav og footer.
  if (location.pathname.startsWith('/admin')) return <Admin />

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prosjekter" element={<Projects />} />
          <Route path="/prosjekter/:slug" element={<ProjectDetail />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
