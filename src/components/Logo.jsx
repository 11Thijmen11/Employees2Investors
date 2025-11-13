import React from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../assets/logoE2I.jpg'

// Logo component — imports logo from `src/assets/logoE2I.jpg` and links to home.
// If your logo is a horizontal wordmark, consider removing `rounded-full` and
// using `object-contain` with `h-10` or `w-32` instead.
export default function Logo() {
  return (
    <Link to="/" title="Employees2Investors">
      <img
        src={LogoImg}
        alt="Employees2Investors logo"
        className="w-12 h-12 object-center object-cover rounded-full shadow-md bg-white p-0.5"
      />
    </Link>
  )
}