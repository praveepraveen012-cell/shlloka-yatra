import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Check, Clock, Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import api from '../services/api';

export default function RouteLhasaAliPage() {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoute('lhasa-ali-pulan').then((res) => setRoute(res.route)).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge-pill badge-gold">Option 3</span>
            <span style={{ color: 'var(--glacier)', fontSize: '0.85rem' }}>The Fastest and Most Convenient Option</span>
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 70px)', fontWeight: 300, marginBottom: '20px' }}>
            Fly to Lhasa & Ali/Pulan
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            The premier approach with dual flight sectors minimizing long overland road travel. Direct access to Western Tibet, ideal for seniors and yatris seeking maximum comfort and time efficiency.
          </p>
          <div className="btns" style={{ marginTop: '30px' }}>
            <Link to="/book-now?routeCode=lhasa-ali-pulan" className="btn btn-go">
              <span>Book Option 3</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/departures-2027" className="btn btn-out">
              <span>View 2027 Batches</span>
            </Link>
          </div>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Overview & Key Stats */}
      <section className="sec">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'flex-start' }}>
            <div>
              <h2 className="t">Minimum Road Travel, Maximum Pilgrimage Focus</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Option 3 is specifically designed for pilgrims who wish to avoid arduous multi-day journeys on high-altitude plateau highways.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
                By connecting a trans-Himalayan flight to Lhasa with a domestic flight directly to Ali Gunsa / Pulan Airport, yatris arrive fresh and focused right at the doorstep of Lake Manasarovar and Mount Kailash. This route provides the highest comfort and success rate for seniors.
              </p>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e9ec', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '14px', color: 'var(--ink)' }}>Route Overview</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.8' }}>
                  Kathmandu → Flight to Lhasa → Potala Palace, Jokhang & Sera Monastery → Flight to Ali/Pulan → Lake Manasarovar → Darchen → Yamdwar → Diraphuk → Dolma La Pass → Zutulphuk → Darchen → Saga → Kathmandu
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: '#0e1c22', borderRadius: '20px', padding: '36px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'var(--saffron)' }}>Package Highlights</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#c5d5d8' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> 13 – 14 Days time-efficient journey</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Two flight sectors: KTM-LXA & LXA-NGQ</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Sightseeing in Lhasa with all monument fees</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Drastically reduced road hours and physical strain</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Full 3-day Kailash Parikrama & Manasarovar puja</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Priority horse / porter booking coordination</li>
                </ul>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '24px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Pricing per person</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#ffffff', margin: '4px 0' }}>
                    INR 4,94,000 <small style={{ fontSize: '0.9rem', color: 'var(--saffron)' }}>+ 5% GST</small>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#889da3' }}>Foreign Passport Holders: INR 4,25,000 + US$ 1,200</span>
                </div>

                <Link to="/book-now?routeCode=lhasa-ali-pulan" className="btn btn-go" style={{ width: '100%', marginTop: '24px' }}>
                  Reserve Option 3
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day by Day Itinerary */}
      {route && route.itinerary && (
        <section className="sec dark" style={{ background: '#0a161b' }}>
          <div className="wrap">
            <h2 className="t t-center">Day-by-Day Journey (Option 3)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '840px', margin: '40px auto 0' }}>
              {route.itinerary.map((item) => (
                <div
                  key={item.day}
                  style={{
                    background: '#12232a',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    gap: '20px',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--saffron)', minWidth: '60px' }}>
                    Day {item.day}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '6px' }}>{item.title}</h4>
                    <p style={{ color: '#a2b9be', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
