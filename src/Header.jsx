import React, { useState } from 'react';
import './Header.css';
import {
  FiSun, FiMoon, FiHome, FiBell, FiMenu, FiUser, FiSettings, FiBookOpen, FiX, FiLogOut
} from 'react-icons/fi';

function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="left">
          <h2>Rohith</h2>
          <p>Student at IIITB</p>
        </div>

        <div className="right-icons">
          {/* Dark Mode toggle stays always */}
          <div className="icon-btn" title={darkMode ? "Light Mode" : "Dark Mode"}>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          {/* Always visible icons */}
          <div className="icon-btn" title="Home"><FiHome /></div>
          <div className="icon-btn" title="Directory"><FiBookOpen /></div>
          <div className="icon-btn" title="Notifications">
            <FiBell />
            <span className="badge">1</span>
          </div>

          {/* Menu icon */}
          <div className="icon-btn" title="Menu">
            <button onClick={() => setMenuOpen(!menuOpen)}><FiMenu /></button>
          </div>
        </div>
      </header>

      {/* Show overlay only if menu is open */}
      {menuOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />

          <div className="sidebar-menu">
            <button className="sidebar-close" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>
            <a href="#"><FiHome /> Home</a>
            <a href="#"><FiBookOpen /> Directory</a>
            <a href="#"><FiBell /> Notifications</a>
            <a href="#"><FiUser /> Profile</a>
            <a href="#"><FiSettings /> Settings</a>
            <a href="#"><FiLogOut /> Log Out</a>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
