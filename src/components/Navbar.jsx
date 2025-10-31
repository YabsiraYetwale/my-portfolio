import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div 
          className="navbar-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      <button 
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink to="/" className="navbar-link" data-nav-link onClick={closeMenu}>
              About
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to="/resume" className="navbar-link" data-nav-link onClick={closeMenu}>
              Resume
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to="/portfolio" className="navbar-link" data-nav-link onClick={closeMenu}>
              Portfolio
            </NavLink>
          </li>

          {/* <li className="navbar-item">
            <NavLink to="/blogs" className="navbar-link" data-nav-link onClick={closeMenu}>
              Blog
            </NavLink>
          </li> */}

          <li className="navbar-item">
            <NavLink to="/contact" className="navbar-link" data-nav-link onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar