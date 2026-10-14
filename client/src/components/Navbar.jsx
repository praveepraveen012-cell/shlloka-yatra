import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [member, setMember] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll to transition from transparent hero header to solid ivory/white
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check member session
  useEffect(() => {
    const token = localStorage.getItem('shlloka_member_token');
    const stored = localStorage.getItem('shlloka_member_user');
    if (token && stored) {
      try {
        setMember(JSON.parse(stored));
      } catch (e) {
        setMember(null);
      }
    } else {
      setMember(null);
    }
  }, [location.pathname]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('shlloka_member_token');
    localStorage.removeItem('shlloka_member_user');
    setMember(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Yatra Packages', path: '/packages' },
    { name: '2027 Departures', path: '/departures' },
    { name: 'Itineraries', path: '/itinerary' },
    { name: 'Preparation & Safety', path: '/preparation-safety' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic header styles:
  // Over video hero (unscrolled on homepage or dark pages): transparent dark overlay
  // Scrolled: solid ivory/white sticky header with charcoal text and orange buttons
  const isDarkHero = !isScrolled && (location.pathname === '/' || location.pathname === '/kailash-mansarovar-yatra-2027');

  const headerBg = isScrolled
    ? '#FFFDF9'
    : isDarkHero
    ? 'linear-gradient(to bottom, rgba(20, 16, 14, 0.82) 0%, rgba(20, 16, 14, 0) 100%)'
    : '#FFF9F0';

  const textColor = isDarkHero ? '#FFFDF9' : 'var(--charcoal)';
  const brandSubColor = isDarkHero ? '#E0D5C7' : 'var(--warm-grey)';
  const navHoverColor = 'var(--orange-primary)';
  const borderBottom = isScrolled ? '1px solid rgba(41, 35, 30, 0.08)' : 'none';
  const shadow = isScrolled ? '0 4px 20px rgba(41, 35, 30, 0.06)' : 'none';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease',
        background: headerBg,
        borderBottom,
        boxShadow: shadow,
        padding: isScrolled ? '12px 0' : '18px 0',
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Left Side: Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '32px',
              color: 'var(--orange-primary)',
              lineHeight: 1,
              fontFamily: 'serif',
            }}
          >
            ॐ
          </span>
          <div>
            <b
              style={{
                display: 'block',
                fontFamily: 'var(--serif)',
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                color: textColor,
                lineHeight: 1.15,
                transition: 'color 0.3s ease',
              }}
            >
              SHLLOKA YATRA
            </b>
            <small
              style={{
                display: 'block',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: brandSubColor,
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              SACRED HIMALAYAN PILGRIMAGE
            </small>
          </div>
        </Link>

        {/* Middle Navigation (Desktop) */}
        <nav
          className="desktop-nav"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '22px',
            fontSize: '0.92rem',
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive ? 'var(--orange-primary)' : textColor,
                  fontWeight: isActive ? 600 : 500,
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = navHoverColor)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive ? 'var(--orange-primary)' : textColor)
                }
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Login & Become a Member Buttons */}
        <div
          className="desktop-actions"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '14px',
            flexShrink: 0,
          }}
        >
          {member ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/account"
                className="btn-login-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  padding: '8px 16px',
                }}
              >
                <User size={15} />
                <span>{member.firstName || 'My Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkHero ? '#D6CBC1' : 'var(--warm-grey)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px',
                }}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              {/* Login Button (Outlined Orange) */}
              <Link
                to="/login"
                className="btn-login-outline"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  padding: '8px 20px',
                  whiteSpace: 'nowrap',
                }}
              >
                Login
              </Link>

              {/* Become a Member Button (Solid Orange) */}
              <Link
                to="/membership/register"
                className="btn-member"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  padding: '9px 22px',
                  whiteSpace: 'nowrap',
                }}
              >
                Become a Member
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-actions">
          {!member && (
            <Link
              to="/membership/register"
              className="btn-member"
              style={{
                fontSize: '0.78rem',
                padding: '6px 14px',
                textDecoration: 'none',
              }}
            >
              Join
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '6px',
              transition: 'color 0.3s ease',
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            background: '#FFF9F0',
            borderBottom: '2px solid var(--orange-primary)',
            boxShadow: '0 12px 36px rgba(41, 35, 30, 0.14)',
            padding: '24px 6%',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? 'var(--orange-primary)' : 'var(--charcoal)',
                fontWeight: location.pathname === link.path ? 700 : 500,
                fontSize: '1.05rem',
                padding: '10px 0',
                borderBottom: '1px solid rgba(41, 35, 30, 0.08)',
                textDecoration: 'none',
              }}
            >
              {link.name}
            </Link>
          ))}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '12px',
            }}
          >
            {member ? (
              <>
                <Link
                  to="/account"
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  My Member Account ({member.firstName})
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-login-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-login-outline"
                  style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}
                >
                  Login to Member Portal
                </Link>
                <Link
                  to="/membership/register"
                  className="btn btn-member"
                  style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}
                >
                  Become a Member
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1100px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-actions { display: none !important; }
        }
      `}</style>
    </header>
  );
}
