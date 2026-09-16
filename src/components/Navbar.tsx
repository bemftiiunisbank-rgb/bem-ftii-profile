import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import '../styles/navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Struktur', path: '/struktur' },
    { label: 'Program Kerja', path: '/proker' },
    { label: 'Aspirasi', path: '/aspirasi' },
    { label: 'Berita', path: '/berita' },
    { label: 'Kontak', path: '/kontak' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-container">
          {/* Logo / Brand Lockup */}
          <Link to="/" className="navbar-brand" title="BEM FTII Universitas Stikubank">
            <div className="brand-emblem-wrap">
              <img 
                src="/img/logo-bem-ftii.png" 
                alt="Logo BEM FTII Unisbank" 
                className="brand-logo-img" 
              />
            </div>
            <div className="brand-info">
              <span className="brand-heading">BEM FTII UNISBANK</span>
              <span className="brand-subheading">Universitas Stikubank Semarang</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav">
            <ul className="nav-link-list">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    end={item.path === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Button */}
          <div className="navbar-cta-wrap">
            <Link to="/aspirasi" className="btn-navbar-cta">
              <span>Layanan Aspirasi</span>
              <ArrowRight size={14} />
            </Link>

            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    end={item.path === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="mobile-action-slot">
                <Link to="/aspirasi" className="btn-navbar-cta mobile-full">
                  <span>Layanan Aspirasi</span>
                  <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
