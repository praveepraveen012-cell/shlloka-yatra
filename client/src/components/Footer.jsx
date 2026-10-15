import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1A1512', // Deep warm charcoal base
        color: '#FFF9F0',
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
                color: '#FFFFFF',
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
                    color: '#FFFFFF',
                  }}
                >
                  SHLLOKA YATRA
                </b>
                <small
                  style={{
                    display: 'block',
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    color: 'var(--yellow-warm)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  SACRED HIMALAYAN PILGRIMAGE
                </small>
              </div>
            </Link>

            <p style={{ fontSize: '0.94rem', lineHeight: '1.7', color: '#E9DCCB', marginBottom: '20px' }}>
              Thoughtfully organized pilgrimages to Mount Kailash and Lake Manasarovar. Grounded in spiritual reverence, authentic vegetarian care, and dedicated volunteer support.
            </p>

            <Link
              to="/kailash-mansarovar-yatra-2027"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--yellow-warm)',
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Sparkles size={16} />
              <span>Kailash Yatra 2027 Campaign</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
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
                fontSize: '0.94rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <Link to="/" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/kailash-mansarovar-yatra-2027"
                  style={{
                    color: 'var(--yellow-warm)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Kailash Yatra 2027</span>
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  About Shlloka Yatra
                </Link>
              </li>
              <li>
                <Link to="/packages" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Yatra Packages
                </Link>
              </li>
              <li>
                <Link to="/departures" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  2027 Departures
                </Link>
              </li>
              <li>
                <Link to="/itinerary" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Itineraries
                </Link>
              </li>
              <li>
                <Link to="/preparation-safety" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Preparation & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Member Area */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
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
                fontSize: '0.94rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <Link to="/login" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/membership/register"
                  style={{
                    color: 'var(--orange-primary)',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  My Account Portal
                </Link>
              </li>
              <li>
                <Link to="/book" style={{ color: 'var(--yellow-warm)', textDecoration: 'none' }}>
                  Book Yatra (Reservation Flow)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support & Verified Contact */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
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
            <div style={{ fontSize: '0.94rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="var(--orange-primary)" style={{ flexShrink: 0 }} />
                <a
                  href="tel:+916366852888"
                  style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
                >
                  +91 6366852888
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="var(--orange-primary)" style={{ flexShrink: 0 }} />
                <a
                  href="mailto:volunteers@shlloka.com"
                  style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                  volunteers@shlloka.com
                </a>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 249, 240, 0.12)',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Link to="/contact" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Contact Us
                </Link>
                <Link to="/faqs" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  FAQs
                </Link>
                <Link to="/cancellation-policy" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Cancellation Policy
                </Link>
                <Link to="/terms-and-conditions" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Terms and Conditions
                </Link>
                <Link to="/privacy-policy" style={{ color: '#E9DCCB', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Distinct Copyright & Powered by Grexotix Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 249, 240, 0.14)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.88rem',
            color: '#D6CBC1',
            width: '100%',
          }}
        >
          <div>
            © 2027 Shlloka Yatra. All rights reserved.
          </div>

          {/* Exact Text "Powered by Grexotix" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="https://grexotix.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--yellow-warm)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--yellow-warm)')}
            >
              Powered by Grexotix
            </a>
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <Link
              to="/admin/login"
              style={{
                color: '#A8998C',
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
