import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, CheckCircle, ArrowRight, Bus, Plane } from 'lucide-react';
import api from '../services/api';

export default function ItineraryPage() {
  const [routes, setRoutes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoutes().then((res) => setRoutes(res.routes || [])).catch(() => {});
  }, []);

  const activeRoute = routes[activeTab] || routes[0];

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Day-by-Day Flow
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Comprehensive Pilgrimage Itineraries
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Each day of the Yatra is structured to balance spiritual devotion, gradual physiological acclimatisation, and physical endurance. Select a route below to explore the daily itinerary.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Route Switcher Tabs */}
      <section className="sec" style={{ paddingBottom: '30px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            {routes.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '999px',
                  border: activeTab === idx ? '2px solid var(--saffron)' : '1px solid #c7d5d8',
                  background: activeTab === idx ? '#0e1c22' : '#ffffff',
                  color: activeTab === idx ? '#ffffff' : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: activeTab === idx ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {r.code !== 'bus-both-ways' ? <Plane size={16} color="var(--saffron)" /> : <Bus size={16} color="var(--saffron)" />}
                <span>Option {r.routeNumber}: {r.name.split('—')[1] || r.name}</span>
              </button>
            ))}
          </div>

          {/* Active Route Overview Card */}
          {activeRoute && (
            <div
              style={{
                background: '#0d191f',
                borderRadius: '20px',
                padding: '36px',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--glacier)' }}>
                  Selected Route Details
                </span>
                <h2 style={{ fontSize: '1.8rem', color: '#ffffff', margin: '4px 0 8px' }}>
                  {activeRoute.name}
                </h2>
                <p style={{ color: '#a2b9be', maxWidth: '60ch', fontSize: '0.95rem' }}>
                  {activeRoute.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <Link to={`/book-now?routeCode=${activeRoute.code}`} className="btn btn-go">
                  <span>Book This Itinerary</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Day By Day List */}
          {activeRoute && activeRoute.itinerary && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px', margin: '0 auto' }}>
              {activeRoute.itinerary.map((day) => (
                <div
                  key={day.day}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '28px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid #e1e9ec',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(233, 162, 59, 0.15)',
                      color: 'var(--saffron)',
                      border: '1px solid rgba(233, 162, 59, 0.35)',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      minWidth: '70px',
                      flexShrink: 0,
                    }}
                  >
                    <small style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                      DAY
                    </small>
                    <b style={{ fontSize: '1.5rem', fontFamily: 'var(--serif)', lineHeight: 1 }}>
                      {String(day.day).padStart(2, '0')}
                    </b>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: '8px' }}>
                      {day.title}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.7' }}>
                      {day.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
