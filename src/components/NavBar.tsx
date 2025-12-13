import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';

const NavBar: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useI18n();
  const { navigate, currentRoute } = useRouting();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (route: 'home' | 'about' | 'contact') => {
    navigate(route);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '2rem',
          width: '100%',
          justifyContent: 'space-between'
        }}>
          <div 
            onClick={() => { navigate('home'); if (isMobile) setIsMobileMenuOpen(false); }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2575fc',
              cursor: 'pointer'
            }}
          >
            Bookify
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <a 
                href="/"
                onClick={(e) => { e.preventDefault(); navigate('home'); }}
                style={{
                  textDecoration: 'none',
                  color: currentRoute === 'home' ? '#2575fc' : '#333',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { if (currentRoute !== 'home') e.currentTarget.style.color = '#2575fc'; }}
                onMouseLeave={(e) => { if (currentRoute !== 'home') e.currentTarget.style.color = '#333'; }}
              >
                {t('nav.home')}
              </a>
              <a 
                href="/about"
                onClick={(e) => { e.preventDefault(); navigate('about'); }}
                style={{
                  textDecoration: 'none',
                  color: currentRoute === 'about' ? '#2575fc' : '#333',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { if (currentRoute !== 'about') e.currentTarget.style.color = '#2575fc'; }}
                onMouseLeave={(e) => { if (currentRoute !== 'about') e.currentTarget.style.color = '#333'; }}
              >
                {t('nav.about')}
              </a>
              <a 
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('contact'); }}
                style={{
                  textDecoration: 'none',
                  color: currentRoute === 'contact' ? '#2575fc' : '#333',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { if (currentRoute !== 'contact') e.currentTarget.style.color = '#2575fc'; }}
                onMouseLeave={(e) => { if (currentRoute !== 'contact') e.currentTarget.style.color = '#333'; }}
              >
                {t('nav.contact')}
              </a>
            </div>
          )}

          {/* Language Selector and Hamburger */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {!isMobile && (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ cursor: 'pointer' }}
                >
                  <title>{t('language')}</title>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'de')}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #ccc',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    color: '#333'
                  }}
                  title={t('language')}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Hamburger Menu Button */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                aria-label="Toggle menu"
              >
                <span style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#333',
                  transition: 'all 0.3s',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translate(3px, 6px)' : 'none'
                }}></span>
                <span style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#333',
                  transition: 'all 0.3s',
                  opacity: isMobileMenuOpen ? 0 : 1
                }}></span>
                <span style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#333',
                  transition: 'all 0.3s',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translate(3px, -6px)' : 'none'
                }}></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          animation: 'slideDown 0.3s ease-out',
          fontFamily: 'Segoe UI, sans-serif'
        }}>
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            style={{
              textDecoration: 'none',
              color: currentRoute === 'home' ? '#2575fc' : '#333',
              fontSize: '1.1rem',
              fontWeight: '500',
              padding: '0.75rem 0',
              borderBottom: '1px solid #eee',
              transition: 'color 0.3s'
            }}
          >
            {t('nav.home')}
          </a>
          <a 
            href="/about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            style={{
              textDecoration: 'none',
              color: currentRoute === 'about' ? '#2575fc' : '#333',
              fontSize: '1.1rem',
              fontWeight: '500',
              padding: '0.75rem 0',
              borderBottom: '1px solid #eee',
              transition: 'color 0.3s'
            }}
          >
            {t('nav.about')}
          </a>
          <a 
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            style={{
              textDecoration: 'none',
              color: currentRoute === 'contact' ? '#2575fc' : '#333',
              fontSize: '1.1rem',
              fontWeight: '500',
              padding: '0.75rem 0',
              borderBottom: '1px solid #eee',
              transition: 'color 0.3s'
            }}
          >
            {t('nav.contact')}
          </a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 0'
          }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>{t('language')}</title>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'de')}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
                cursor: 'pointer',
                backgroundColor: 'white',
                color: '#333',
                flex: 1
              }}
              title={t('language')}
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

