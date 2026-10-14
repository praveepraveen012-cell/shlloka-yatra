import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#201A16', // Deep charcoal / warm burnt base
        color: '#D6CBC1',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Saffron and Amber Accent Line */}
      <div className="flags" />

      {/* Main Footer Container - Edge-to-Edge Full Width */}
      <div
        className="wrap"
        style={{
          paddingTop: '70px',
          paddingBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '44px',
            marginBottom: '60px',
            width: '100%',
          }}
        >
          {/* Column 1 — Shlloka Yatra */}
          <div>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#FFFDF9',
                marginBottom: '18px',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '32px', color: 'var(--orange-primary)', lineHeight: 1 }}>
                ॐ
              </span>
              <div>
                <b
                  style={{
                    display: 'block',
                    fontFamily: 'var(--serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.12em',
                    color: '#FFFDF9',
                  }}
                >
                  SHLLOKA YATRA
                </b>
                <small
                  style={{
                    display: 'block',
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    color: 'var(--amber-soft)',
                    textTransform: 'uppercase',
                  }}
                >
                  SACRED HIMALAYAN PILGRIMAGE
                </small>
              </div>
            </Link>

            <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: '#D6CBC1', marginBottom: '20px' }}>
              Thoughtfully organized pilgrimages to Mount Kailash and Lake Mansarovar. Grounded in spiritual reverence, authentic vegetarian care, and dedicated volunteer support.
            </p>

            <Link
              to="/packages"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--amber-soft)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Explore the 2027 Yatra</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4
              style={{
                color: '#FFFDF9',
                fontSize: '1.08rem',
                marginBottom: '18px',
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Explore
            </h4>
            <ul
              style={{
                listStyle: 'none',
                fontSize: '0.92rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <Link to="/" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  About Shlloka Yatra
                </Link>
              </li>
              <li>
                <Link to="/packages" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Yatra Packages
                </Link>
              </li>
              <li>
                <Link to="/departures" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  2027 Departures
                </Link>
              </li>
              <li>
                <Link to="/itinerary" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Itineraries
                </Link>
              </li>
              <li>
                <Link to="/preparation-safety" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Preparation & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Member Area */}
          <div>
            <h4
              style={{
                color: '#FFFDF9',
                fontSize: '1.08rem',
                marginBottom: '18px',
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Member Area
            </h4>
            <ul
              style={{
                listStyle: 'none',
                fontSize: '0.92rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <Link to="/login" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/membership/register"
                  style={{
                    color: 'var(--orange-primary)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/membership/register" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Membership Registration
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  My Account Portal
                </Link>
              </li>
              <li>
                <Link to="/book" style={{ color: 'var(--amber-soft)', textDecoration: 'none' }}>
                  Book Yatra (Separate Flow)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support & Verified Contact */}
          <div>
            <h4
              style={{
                color: '#FFFDF9',
                fontSize: '1.08rem',
                marginBottom: '18px',
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Support & Contact
            </h4>
            <div style={{ fontSize: '0.92rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="var(--orange-primary)" style={{ flexShrink: 0 }} />
                <a
                  href="tel:+916366852888"
                  style={{ color: '#FFFDF9', textDecoration: 'none', fontWeight: 600 }}
                >
                  +91 6366852888
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="var(--orange-primary)" style={{ flexShrink: 0 }} />
                <a
                  href="mailto:volunteers@shlloka.com"
                  style={{ color: '#FFFDF9', textDecoration: 'none' }}
                >
                  volunteers@shlloka.com
                </a>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 249, 240, 0.1)',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Link to="/contact" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Contact Us
                </Link>
                <Link to="/faqs" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  FAQs
                </Link>
                <Link to="/cancellation-policy" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Cancellation Policy
                </Link>
                <Link to="/terms-and-conditions" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Terms and Conditions
                </Link>
                <Link to="/privacy-policy" style={{ color: '#D6CBC1', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Distinct Copyright & Powered by Grexotix Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 249, 240, 0.12)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.86rem',
            color: '#B5A89C',
            width: '100%',
          }}
        >
          <div>
            © 2027 Shlloka Yatra. All rights reserved.
          </div>

          {/* Prominently Styled Powered by Grexotix Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Powered by</span>
            <a
              href="https://grexotix.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--amber-soft)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amber-soft)')}
            >
              Grexotix
            </a>
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <Link
              to="/admin/login"
              style={{
                color: '#8C7F73',
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
