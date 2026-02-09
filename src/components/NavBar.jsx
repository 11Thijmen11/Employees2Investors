import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

export default function NavBar() {
  return (
    <header className="sticky top-10 z-40 bg-gradient-to-r from-primary via-primary to-primaryDark shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <Logo />
          <div>
            <div className="text-lg font-bold text-lightOnDark">Employees2Investors</div>
            <div className="text-xs text-cream">Investeringsadvies voor werknemers</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-cream font-semibold text-lg' : 'text-cream/90 hover:text-white transition text-lg'}>Home</NavLink>
          <NavLink to="/afspraak" className={({isActive}) => isActive ? 'text-cream font-semibold text-lg' : 'text-cream/90 hover:text-white transition text-lg'}>Afspraak maken</NavLink>
          <NavLink to="/over" className={({isActive}) => isActive ? 'text-cream font-semibold text-lg' : 'text-cream/90 hover:text-white transition text-lg'}>Over mij</NavLink>
          <a href="https://tinyurl.com/E2I-gratis-gids" target="_blank" rel="noreferrer" className="ml-4 btn btn-secondary text-lg px-6 py-3">Download gratis gids</a>
        </nav>

        {/* mobile menu */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer text-cream">☰</summary>
            <div className="absolute right-0 mt-2 w-48 bg-cream text-primary shadow-lg rounded-md p-3">
              <Link to="/" className="block py-1">Home</Link>
              <Link to="/afspraak" className="block py-1">Afspraak maken</Link>
              <Link to="/over" className="block py-1">Over mij</Link>
              <a href="https://tinyurl.com/E2I-gratis-gids" target="_blank" rel="noreferrer" className="block mt-2 btn btn-secondary text-center text-base px-4 py-2">Download gids</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
