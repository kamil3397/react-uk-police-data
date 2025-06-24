import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar:FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h1 className="app-title">Police Data App</h1>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/forces">Police Forces</NavLink></li>
          <li><NavLink to="/crimes">Crimes</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
