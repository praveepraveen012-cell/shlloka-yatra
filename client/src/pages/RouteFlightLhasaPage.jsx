import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Check, Clock, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../services/api';

export default function RouteFlightLhasaPage() {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoute('flight-to-lhasa').then((res) => setRoute(res.route)).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge-pill badge-gold">Option 2</span>
            <span style={{ color: 'var(--glacier)', fontSize: '0.85rem' }}>A More Comfortable Start</span>
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 70px)', fontWeight: 300, marginBottom: '20px' }}>
            Fly Kathmandu to Lhasa, Then Continue by Road
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            Fly over the Himalayan giants straight from Kathmandu to Lhasa. Experience the cultural soul of Tibet, visit Potala Palace and Jokhang Temple, acclimatise gently, and journey westward to Kailash.
          </p>
          <div className="btns" style={{ marginTop: '30px' }}>
            <Link to="/book-now?routeCode=flight-to-lhasa" className="btn btn-go">
              <span>Book Option 2</span>
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
              <h2 className="t">A Smoother Ascent with Lhasa Heritage</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Option 2 eliminates the steep initial road ascent from the Nepal border by flying directly across the Himalayas into Lhasa Gonggar Airport.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
                Lhasa sits at 3,650 meters with modern medical facilities, comfortable hotels, and rich spiritual heritage. Spending two full days acclimatising in Lhasa while exploring Potala Palace and Jokhang Temple provides our yatris with both spiritual enrichment and physiological adaptation.
              </p>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e9ec', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '14px', color: 'var(--ink)' }}>Route Overview</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.8' }}>
                  Kathmandu → Flight to Lhasa (3,650 m) → Potala Palace, Jokhang Temple & Barkhor → Shigatse (3,840 m) → Saga → Lake Manasarovar → Darchen → Yamdwar → Diraphuk → Dolma La Pass → Zutulphuk → Darchen → Saga → Kathmandu
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: '#0e1c22', borderRadius: '20px', padding: '36px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'var(--saffron)' }}>Package Highlights</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#c5d5d8' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> 15 – 16 Days journey</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Trans-Himalayan flight KTM to Lhasa included</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Potala Palace & Jokhang Temple entry fees included</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Gentler acclimatisation profile before high passes</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Complete 3-day sacred Kailash Parikrama</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--saffron)" /> Full Lake Manasarovar vehicle parikrama & puja</li>
                </ul>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '24px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Pricing per person</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#ffffff', margin: '4px 0' }}>
                    INR 4,37,000 <small style={{ fontSize: '0.9rem', color: 'var(--saffron)' }}>+ 5% GST</small>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#889da3' }}>Foreign Passport Holders: INR 4,25,000 + US$ 600</span>
                </div>

                <Link to="/book-now?routeCode=flight-to-lhasa" className="btn btn-go" style={{ width: '100%', marginTop: '24px' }}>
                  Reserve Option 2
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
            <h2 className="t t-center">Day-by-Day Journey (Option 2)</h2>
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
