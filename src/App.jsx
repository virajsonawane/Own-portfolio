import { motion } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { ScrollProgress } from './components/ScrollProgress'
import { SmoothScroll } from './components/SmoothScroll'
import { VelocitySkew } from './components/VelocitySkew'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Resume } from './components/Resume'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function AppContent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={
        isDark
          ? 'min-h-svh bg-neutral-950 text-neutral-100'
          : 'min-h-svh bg-white text-neutral-900'
      }
    >
      <a
        href="#hero"
        className="absolute -left-[9999px] top-4 z-[100] rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white shadow-lg focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <VelocitySkew>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <Testimonials />
          <Contact />
        </VelocitySkew>
      </main>
      <Footer />
    </motion.div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
