import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, Clock, MapPin } from 'lucide-react';

export default function YatrasPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Sacred Pilgrimages
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 300, marginBottom: '20px' }}>
            Journeys of Spiritual Transformation
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '60ch' }}>
            Begin where your heart is drawn. Explore our flagship Kailash Manasarovar expedition and forthcoming Himalayan pilgrimages.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Flagship Yatra */}
      <section className="sec">
        <div className="wrap">
          <div
            style={{
              background: '#0d1a21',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              color: '#ffffff',
              boxShadow: 'var(--shadow-lg)',
            }}
            className="flagship-card"
          >
            <div style={{ position: 'relative', minHeight: '380px' }}>
              <img
                src="/images/img_2.jpg"
                alt="Mount Kailash Flagship"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(11,21,25,0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(233, 162, 59, 0.4)',
                  color: 'var(--saffron)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                ★ Flagship Pilgrimage 2027
              </div>
            </div>

            <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--glacier)', display: 'block', marginBottom: '8px' }}>
                Tibet • Trans-Himalaya
              </span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 400 }}>
                Kailash Manasarovar
              </h2>
              <p style={{ color: '#b9c8cc', fontSize: '1rem', lineHeight: '1.7', marginBottom: '24px' }}>
                The sacred circumambulation of Mount Kailash (6,638 m) and holy rituals at Lake Manasarovar. Multiple travel options: overland bus or flight-assisted via Lhasa and Ali.
              </p>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', fontSize: '0.9rem', color: 'var(--glacier)' }}>
                <div>
                  <small style={{ display: 'block', color: '#7e969d' }}>Duration</small>
                  <b style={{ color: '#ffffff' }}>13 to 16 Days</b>
                </div>
                <div>
                  <small style={{ display: 'block', color: '#7e969d' }}>Departures</small>
                  <b style={{ color: '#ffffff' }}>8 Fixed Batches (May–Aug)</b>
                </div>
                <div>
                  <small style={{ display: 'block', color: '#7e969d' }}>Starting from</small>
                  <b style={{ color: 'var(--saffron)' }}>INR 3,50,000 + GST</b>
                </div>
              </div>

              <div className="btns">
                <Link to="/kailash-mansarovar" className="btn btn-go">
                  <span>Explore Pilgrimage</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/kailash-mansarovar-yatra-2027" className="btn btn-out">
                  <span>2027 Dedicated Page</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forthcoming Sacred Journeys */}
      <section className="sec dark" style={{ background: '#091419' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="t t-center">Expanding Spiritual Horizons</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              A growing collection of sacred Himalayan journeys curated with the same devotion, care, and attention to detail.
            </p>
          </div>

          <div className="grid-2">
            <div className="card-dark" style={{ borderStyle: 'dashed' }}>
              <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>Coming Soon</span>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Muktinath & Damodar Kund</h3>
              <p style={{ color: '#8fa4a9', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Sacred journey to Muktinath (Lord Vishnu) in the Mustang region of Nepal, and the glacial origins of the Gandaki River at holy Damodar Kund.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--glacier)' }}>Announcements scheduled for late 2027</span>
            </div>

            <div className="card-dark" style={{ borderStyle: 'dashed' }}>
              <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>Coming Soon</span>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Other Sacred Journeys</h3>
              <p style={{ color: '#8fa4a9', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Spiritual paths across high-altitude monasteries and sacred shrines designed around purpose, presence, and respectful community travel.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--glacier)' }}>Announcements scheduled for late 2027</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .flagship-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
