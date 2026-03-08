import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
        <NavLink to="/"><div className="nav-logo">CleanUp</div></NavLink>
        <div className="nav-links">
          <NavLink to="/simulate"><button className="nav-btn">Launch Simulation</button></NavLink>
        </div>
    </nav>
  )
}

export default Navbar