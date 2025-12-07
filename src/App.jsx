import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import About from './pages/About'

// Root app: holds global state such as available spots
export default function App() {
  // Make this dynamic so it's easy to update later
  const [availableSpots, setAvailableSpots] = useState(8)
  const maxSpots = 12 // changeable total capacity for FOMO effect
  const fillPercent = Math.min(100, Math.round((availableSpots / maxSpots) * 100))
  
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top banner for availability (now shows FOMO X/Y + progress) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primaryDark to-primary text-lightOnDark py-3 px-4 shadow-lg">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 md:gap-4 text-sm md:text-base font-semibold">
            <span className="text-lg">🎯</span>
            <span>Beschikbare plekken</span>
            <span className="ml-1 inline-flex items-center gap-2">
              <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full font-bold text-sm">{availableSpots}/{maxSpots}</span>
            </span>
          </div>

          {/* small progress bar */}
          <div className="mt-2 flex justify-center">
            <div className="w-40 h-2 bg-cream/20 rounded-full overflow-hidden">
              <div className="h-2 bg-secondary transition-all" style={{ width: `${fillPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* NavBar sits below the banner */}
      <div className="pt-16">{/* spacing for fixed banner */}
        <NavBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/afspraak" element={<Appointment />} />
          <Route path="/over" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
