import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  const isOnAdminPage = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('adminAuth');
    navigate('/');
    setMenuOpen(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar frosted-glass">
      <div className="nav-brand">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <FaHeartbeat className="brand-icon" />
          <span>Health<span className="brand-highlight">ID</span></span>
        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        {/* Admin is logged in and on admin pages */}
        {isAdmin && isOnAdminPage ? (
          <>
            <Link to="/admin/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
            <div className="nav-user-controls">
              <span className="user-greeting">Admin</span>
              <button onClick={handleAdminLogout} className="secondary-btn btn-sm">Logout</button>
            </div>
          </>
        ) : !user ? (
          <>
            <div className="nav-group">
              <Link to="/patient/login" className="nav-link" onClick={closeMenu}>Patient Login</Link>
              <Link to="/patient/register" className="nav-link primary" onClick={closeMenu}>Register</Link>
            </div>
            <div className="nav-divider"></div>
            <div className="nav-group">
              <Link to="/hospital/login" className="nav-link" onClick={closeMenu}>Hospital Portal</Link>
            </div>
            <div className="nav-divider"></div>
            <div className="nav-group">
              <Link to="/admin/login" className="nav-link" onClick={closeMenu} style={{ fontSize: '0.85rem', opacity: 0.7 }}>Admin</Link>
            </div>
          </>
        ) : (
          <>
            {role === 'patient' && (
              <>
                <Link to="/patient/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
                <Link to="/patient/records" className="nav-link" onClick={closeMenu}>Records</Link>
                <Link to="/patient/consents" className="nav-link" onClick={closeMenu}>Consents</Link>
                <Link to="/patient/healthcard" className="nav-link" onClick={closeMenu}>Health Card</Link>
              </>
            )}
            
            {role === 'hospital' && (
              <>
                <Link to="/hospital/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
                <Link to="/hospital/search" className="nav-link" onClick={closeMenu}>Search</Link>
                <Link to="/hospital/consent" className="nav-link" onClick={closeMenu}>Consent</Link>
                <Link to="/hospital/upload" className="nav-link" onClick={closeMenu}>Upload</Link>
                <Link to="/hospital/patients" className="nav-link" onClick={closeMenu}>Directory</Link>
              </>
            )}

            <div className="nav-user-controls">
              <span className="user-greeting">{user.name || user.hospitalName || 'User'}</span>
              <button onClick={handleLogout} className="secondary-btn btn-sm">Logout</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

