import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Compass, Users, Sparkles, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(233,162,59,0.2) 0%, transparent 60%), var(--night)',
          color: '#ffffff',
          padding: '160px 0 90px',
        }}
      >
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '18px' }}>
            About Shlloka Yatra
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 300, marginBottom: '24px' }}>
            Faithful journeys. Higher horizons.
          </h1>
          <p className="lead" style={{ color: '#d0dfe2', maxWidth: '64ch' }}>
            Shlloka Yatra Private Limited was founded on a simple conviction: sacred pilgrimages are not ordinary holidays. They demand deep reverent context, uncompromising high-altitude safety, and meticulous logistical care.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Philosophy Section */}
      <section className="sec">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--saffron)', fontWeight: 600 }}>
                Our Foundation
              </span>
              <h2 className="t" style={{ marginTop: '8px' }}>
                Pilgrimage • People • Purpose
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                At Shlloka Yatra, we view every participant not as a tourist, but as a yatri. Whether stepping into the sanctum of Pashupatinath in Kathmandu or traversing the rigorous 5,650-meter Dolma La Pass under the watchful gaze of Mount Kailash, you are supported at every step.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                We bridge ancient Vedic traditions with modern expedition standards. From medical oxygen backups and heart-rate monitoring to pure sattvic vegetarian food prepared by our own accompanying crew, our mission is to ensure every yatri completes their sacred circumambulation safely and joyfully.
              </p>
            </div>

            <div>
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid rgba(18, 33, 38, 0.08)',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--ink)' }}>
                  The Shlloka Commitment
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.98rem' }}>
                  <li style={{ display: 'flex', gap: '12px' }}>
                    <ShieldCheck size={20} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><b>Uncompromised Safety:</b> Acclimatisation days, oxygen cylinders, pulse oximetry, and altitude trained staff.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px' }}>
                    <Heart size={20} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><b>Spiritual Authenticity:</b> Rudra Homam, Lake Manasarovar rituals, puja arrangements, and sacred guidance.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px' }}>
                    <Users size={20} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><b>Veteran Nepali Crew:</b> Guides with 140+ Kailash expeditions between them, ensuring smooth border crossings and trekking pacing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Registry Info */}
      <section className="sec dark" style={{ background: '#0a171d' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="t t-center">Corporate & Operational Integrity</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Registered and operated under full legal compliance with Nepal and China-Tibet tourism and religious expedition regulations.
            </p>
          </div>

          <div className="grid-3">
            <div className="card-dark">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Registered Entity</h4>
              <p style={{ color: '#8ea3a8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Shlloka Yatra Private Limited is a registered pilgrimage management entity dedicated exclusively to high-altitude spiritual expeditions.
              </p>
            </div>
            <div className="card-dark">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Banking Channel</h4>
              <p style={{ color: '#8ea3a8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                All transactions are processed through verified corporate bank accounts with IndusInd Bank (A/c 201037169009) with full GST and tax invoicing.
              </p>
            </div>
            <div className="card-dark">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Yatri Support Cell</h4>
              <p style={{ color: '#8ea3a8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Dedicated yatra advisors available at +91 6366852888 and volunteers@shlloka.com to guide your document submission, medicals, and preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'var(--deep)', color: '#ffffff' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Begin Your Journey With Us</h2>
          <p style={{ color: '#b9c8cc', maxWidth: '50ch', margin: '0 auto 30px' }}>
            Explore our 2027 departures and discover the route that speaks to your comfort and schedule.
          </p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link to="/kailash-mansarovar-yatra-2027" className="btn btn-go">
              <span>View 2027 Yatra</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-out">
              <span>Contact Yatra Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
