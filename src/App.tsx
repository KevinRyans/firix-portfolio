import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, useReducedMotion, motion } from 'framer-motion'
import { profile } from './content/profile'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AnimatedBackground from './components/layout/AnimatedBackground'
import ScrollProgress from './components/layout/ScrollProgress'
import PageTransition from './components/layout/PageTransition'
import CommandPalette from './components/layout/CommandPalette'
import ScrollToTop from './components/layout/ScrollToTop'
import BootScreen from './components/layout/BootScreen'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import OpenSource from './pages/OpenSource'
import About from './pages/About'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const [showBoot, setShowBoot] = useState(true)
  const [bootReady, setBootReady] = useState(false)

  useEffect(() => {
    const key = 'firix_boot_at'
    const cooldown = 1000 * 60 * 30
    const now = Date.now()
    let last = 0

    try {
      last = Number(localStorage.getItem(key) ?? 0)
    } catch {
      last = 0
    }

    if (Number.isNaN(last) || now - last > cooldown) {
      setShowBoot(true)
      setBootReady(true)
      try {
        localStorage.setItem(key, String(now))
      } catch {
        // ignore storage failures
      }
      const duration = shouldReduceMotion ? 700 : 3500
      const timer = window.setTimeout(() => setShowBoot(false), duration)
      return () => window.clearTimeout(timer)
    }
    setShowBoot(false)
    setBootReady(true)
    return undefined
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!showBoot) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [showBoot])

  useEffect(() => {
    document.title = profile.meta.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', profile.meta.description)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-950 text-slate-100">
      <AnimatedBackground />
      <AnimatePresence>{showBoot ? <BootScreen /> : null}</AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <ScrollToTop />

      <motion.div
        className="relative z-10 flex min-h-screen flex-col"
        initial={false}
        animate={{
          opacity: showBoot ? 0 : 1,
          y: showBoot ? 10 : 0,
          filter: showBoot ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: showBoot ? 0.1 : 0.7, ease: 'easeOut' }}
        style={{ pointerEvents: showBoot ? 'none' : 'auto' }}
      >
        <main className="flex-1 pt-24">
          {bootReady ? (
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/open-source" element={<OpenSource />} />
                <Route path="/about" element={<About />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </AnimatePresence>
          ) : null}
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
