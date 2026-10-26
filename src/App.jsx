import About from './components/About'
import Contact from './components/Contact'
import Dna from './components/Dna'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HeroErrorBoundary from './components/HeroErrorBoundary'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Services from './components/Services'
import Skills from './components/Skills'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-onaccent"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <HeroErrorBoundary>
          <Hero />
        </HeroErrorBoundary>
        <Dna />
        <Projects />
        <Education />
        <Skills />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
