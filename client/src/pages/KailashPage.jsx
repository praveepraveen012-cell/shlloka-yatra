import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mountain, Droplet, Sun, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function KailashPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Main Pilgrimage Overview
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Mount Kailash & Lake Manasarovar
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Known as Mount Meru, the Axis Mundi, and the eternal abode of Lord Shiva and Goddess Parvati, Kailash is considered the spiritual epicenter of the universe.
          </p>
          <div className="btns" style={{ marginTop: '30px' }}>
            <Link to="/packages" className="btn btn-go">
              <span>View 3 Route Options</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/departures" className="btn btn-out">
              <span>2027 Departure Dates</span>
            </Link>
          </div>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* The Spiritual Dimensions */}
      <section className="sec">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--saffron)', fontWeight: 600 }}>
                Sacred Geography
              </span>
              <h2 className="t" style={{ marginTop: '8px' }}>
                The Four Sacred Faces
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '18px' }}>
                Rising dramatically to 6,638 meters above sea level on the high Tibetan plateau, Mount Kailash is distinct from all surrounding mountains. Its four symmetrical faces point toward the four cardinal directions:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.96rem', color: 'var(--ink)' }}>
                <li><b>• North Face (Gold):</b> Seen with overwhelming majesty from Diraphuk, this is the sheer rock and ice face revered during Day 1 of the Parikrama.</li>
                <li><b>• South Face (Sapphire):</b> The side visible from Yamdwar and Darchen, striped by natural horizontal ice bands resembling Lord Shiva’s Trishul and Tripundra.</li>
                <li><b>• West Face (Ruby):</b> Towering over the steep gorge, flanked by high glaciated pinnacles.</li>
                <li><b>• East Face (Crystal):</b> Greeting the morning sun and visible as pilgrims descend from Dolma La Pass into Zutulphuk.</li>
              </ul>
            </div>

            <div>
              <div
                style={{
                  background: '#0d191f',
                  borderRadius: '20px',
                  padding: '36px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Mountain size={32} color="var(--saffron)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Four Great Asian Rivers</h3>
                <p style={{ color: '#8fa4a9', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  From the glaciers of Kailash and the catchment of Lake Manasarovar spring four of Asia’s most sacred life-giving rivers:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.9rem' }}>
                  <div style={{ background: '#12252e', padding: '12px 16px', borderRadius: '10px' }}>
                    <b style={{ color: '#ffffff' }}>Indus (Sengge Zangbo)</b>
                    <small style={{ color: 'var(--glacier)', display: 'block' }}>Lion River (North)</small>
                  </div>
                  <div style={{ background: '#12252e', padding: '12px 16px', borderRadius: '10px' }}>
                    <b style={{ color: '#ffffff' }}>Brahmaputra (Yarlung)</b>
                    <small style={{ color: 'var(--glacier)', display: 'block' }}>Horse River (East)</small>
                  </div>
                  <div style={{ background: '#12252e', padding: '12px 16px', borderRadius: '10px' }}>
                    <b style={{ color: '#ffffff' }}>Sutlej (Langqen Zangbo)</b>
                    <small style={{ color: 'var(--glacier)', display: 'block' }}>Elephant River (West)</small>
                  </div>
                  <div style={{ background: '#12252e', padding: '12px 16px', borderRadius: '10px' }}>
                    <b style={{ color: '#ffffff' }}>Karnali (Peacock River)</b>
                    <small style={{ color: 'var(--glacier)', display: 'block' }}>Ganges Tributary (South)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lake Manasarovar & Rakshastal */}
      <section className="sec dark" style={{ background: '#0a151b' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--saffron)', display: 'block', marginBottom: '8px' }}>
              The Dual Waters
            </span>
            <h2 className="t t-center">Lake Manasarovar & Rakshastal</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Side-by-side on the Tibetan plateau lie two starkly contrasting bodies of water, embodying the dual cosmic energies of light and shadow.
            </p>
          </div>

          <div className="grid-2">
            <div className="card-dark">
              <Droplet size={30} color="#60a5fa" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: '#ffffff' }}>Lake Manasarovar (Mapam Yumtso)</h3>
              <p style={{ color: '#9bb1b7', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
                Created in the mind (Manas) of Lord Brahma, Lake Manasarovar sits at 4,590 meters as the highest freshwater body in the world. Its round shape represents the sun and the light of divine consciousness.
              </p>
              <p style={{ color: '#9bb1b7', fontSize: '0.98rem', lineHeight: '1.7' }}>
                Yatris undertake a vehicle parikrama around its perimeter, offer Vedic Hawan and morning prayers, and collect sacred Manasarovar Jal to carry back home.
              </p>
            </div>

            <div className="card-dark">
              <Sun size={30} color="var(--saffron)" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: '#ffffff' }}>Lake Rakshastal (Lhanag Tso)</h3>
              <p style={{ color: '#9bb1b7', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
                Directly adjacent lies the crescent-shaped, saltwater Lake Rakshastal, historically associated with King Ravana’s intense penance to Lord Shiva. Shaped like a crescent moon, it represents night and the untamed elemental forces.
              </p>
              <p style={{ color: '#9bb1b7', fontSize: '0.98rem', lineHeight: '1.7' }}>
                Contemplating these two lakes side-by-side teaches the pilgrim the necessity of balance and spiritual equilibrium on the road to Kailash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parikrama Key Landmarks */}
      <section className="sec">
        <div className="wrap">
          <h2 className="t">Sacred Milestones on the Parikrama</h2>
          <div className="grid-3" style={{ marginTop: '40px' }}>
            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(18,33,38,0.08)' }}>
              <span style={{ color: 'var(--saffron)', fontWeight: 700, fontSize: '1.1rem' }}>01</span>
              <h4 style={{ fontSize: '1.3rem', margin: '8px 0 10px', color: 'var(--ink)' }}>Yamdwar (Tarboche)</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                The Gate of Salvation. Pilgrims walk through the arched Yamdwar leaving behind fear of death and spiritual burdens before taking their first steps on the parikrama trail.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(18,33,38,0.08)' }}>
              <span style={{ color: 'var(--saffron)', fontWeight: 700, fontSize: '1.1rem' }}>02</span>
              <h4 style={{ fontSize: '1.3rem', margin: '8px 0 10px', color: 'var(--ink)' }}>Dolma La Pass (5,650 m)</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Dedicated to Goddess Tara (Dolma), this is the highest and most spiritually intense altitude of the yatra. Crossing the pass symbolizes spiritual rebirth and redemption.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(18,33,38,0.08)' }}>
              <span style={{ color: 'var(--saffron)', fontWeight: 700, fontSize: '1.1rem' }}>03</span>
              <h4 style={{ fontSize: '1.3rem', margin: '8px 0 10px', color: 'var(--ink)' }}>Gauri Kund (Lake of Compassion)</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Just beneath Dolma La Pass lies the emerald-green glacial tarn where Goddess Parvati is believed to have bathed. Pilgrims offer quiet prostrations from the ridge above.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'var(--deep)', color: '#ffffff' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Ready to Experience Mount Kailash?</h2>
          <p style={{ color: '#b9c8cc', maxWidth: '50ch', margin: '0 auto 30px' }}>
            Choose your preferred route and explore our 8 fixed departure batches for the 2027 season.
          </p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link to="/routes" className="btn btn-go">
              <span>Compare Route Options</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/departures-2027" className="btn btn-out">
              <span>View 2027 Dates</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
