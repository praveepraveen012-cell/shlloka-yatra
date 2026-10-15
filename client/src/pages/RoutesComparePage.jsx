import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Bus, Plane, Clock, DollarSign, Shield } from 'lucide-react';
import api from '../services/api';

export default function RoutesComparePage() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoutes().then((data) => setRoutes(data.routes || [])).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Route Options
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Compare All Three Routes
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Every yatri travels at their own pace and comfort level. Review our 3 distinct approaches to Mount Kailash and Lake Manasarovar to choose your ideal journey.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Comparison Matrix Section */}
      <section className="sec">
        <div className="wrap">
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: '850px',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(18, 33, 38, 0.1)',
              }}
            >
              <thead>
                <tr style={{ background: '#0e1c23', color: '#ffffff' }}>
                  <th style={{ padding: '24px', textAlign: 'left', width: '25%', fontSize: '1rem', fontWeight: 500 }}>
                    Feature / Sector
                  </th>
                  <th style={{ padding: '24px', textAlign: 'left', width: '25%' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--glacier)', textTransform: 'uppercase', display: 'block' }}>Option 1</span>
                    <b style={{ fontSize: '1.2rem', color: '#ffffff' }}>Classic Overland</b>
                  </th>
                  <th style={{ padding: '24px', textAlign: 'left', width: '25%', background: '#142730', borderTop: '3px solid var(--saffron)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--saffron)', textTransform: 'uppercase', display: 'block' }}>Option 2 (Popular)</span>
                    <b style={{ fontSize: '1.2rem', color: '#ffffff' }}>Fly to Lhasa</b>
                  </th>
                  <th style={{ padding: '24px', textAlign: 'left', width: '25%' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--glacier)', textTransform: 'uppercase', display: 'block' }}>Option 3</span>
                    <b style={{ fontSize: '1.2rem', color: '#ffffff' }}>Fly Lhasa & Ali</b>
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.94rem', color: 'var(--ink)' }}>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Primary Transport</td>
                  <td style={{ padding: '20px 24px' }}>Bus both ways via Kodari/Nyalam</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>Flight KTM-LXA, return road</td>
                  <td style={{ padding: '20px 24px' }}>Dual flights: KTM-LXA & LXA-NGQ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Total Duration</td>
                  <td style={{ padding: '20px 24px' }}>14 – 15 Days</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>15 – 16 Days</td>
                  <td style={{ padding: '20px 24px' }}>13 – 14 Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Lhasa Heritage Days</td>
                  <td style={{ padding: '20px 24px', color: '#889da3' }}>None (Direct overland)</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>2 Days (Potala Palace & Jokhang)</td>
                  <td style={{ padding: '20px 24px' }}>2 Days (Potala, Jokhang, Sera)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Road Fatigue Level</td>
                  <td style={{ padding: '20px 24px' }}>High (Full road travel)</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>Moderate (Reduced initial drive)</td>
                  <td style={{ padding: '20px 24px' }}>Low (Minimal road hours)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Acclimatisation Style</td>
                  <td style={{ padding: '20px 24px' }}>Nyalam & Saga high valleys</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>Gentle rest in Lhasa (3,650 m)</td>
                  <td style={{ padding: '20px 24px' }}>Rest in Lhasa before Ali flight</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Ideal For</td>
                  <td style={{ padding: '20px 24px' }}>Yatris seeking classic overland</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>Yatris wanting cultural depth</td>
                  <td style={{ padding: '20px 24px' }}>Seniors & comfort-seeking yatris</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Indian Passport Price</td>
                  <td style={{ padding: '20px 24px' }}><b>INR 3,50,000</b> + 5% GST</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}><b style={{ color: 'var(--saffron)' }}>INR 4,37,000</b> + 5% GST</td>
                  <td style={{ padding: '20px 24px' }}><b>INR 4,94,000</b> + 5% GST</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5ecee' }}>
                  <td style={{ padding: '20px 24px', fontWeight: 600, background: '#f8faf9' }}>Foreign Passport Price</td>
                  <td style={{ padding: '20px 24px' }}>INR 4,25,000</td>
                  <td style={{ padding: '20px 24px', background: 'rgba(233,162,59,0.03)' }}>INR 4,25,000 + US$ 600</td>
                  <td style={{ padding: '20px 24px' }}>INR 4,25,000 + US$ 1,200</td>
                </tr>
                <tr>
                  <td style={{ padding: '24px', background: '#f8faf9' }}></td>
                  <td style={{ padding: '24px' }}>
                    <Link to="/routes/bus-both-ways" className="btn btn-out" style={{ color: 'var(--ink)', borderColor: '#b0c5cb', width: '100%' }}>
                      Option 1 Details
                    </Link>
                  </td>
                  <td style={{ padding: '24px', background: 'rgba(233,162,59,0.03)' }}>
                    <Link to="/routes/flight-to-lhasa" className="btn btn-go" style={{ width: '100%' }}>
                      Option 2 Details
                    </Link>
                  </td>
                  <td style={{ padding: '24px' }}>
                    <Link to="/routes/lhasa-ali-pulan" className="btn btn-out" style={{ color: 'var(--ink)', borderColor: '#b0c5cb', width: '100%' }}>
                      Option 3 Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Highlights across all 3 routes */}
      <section className="sec dark" style={{ background: '#0a161b' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="t t-center">What is Included in Every Option</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Regardless of the route option you choose, every Shlloka Yatra guarantees our sacred spiritual milestones and safety protocols.
            </p>
          </div>

          <div className="grid-3">
            <div className="card-dark">
              <Check size={24} color="var(--saffron)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Rudra Homam in Kathmandu</h4>
              <p style={{ color: '#8fa4a9', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Dedicated morning Vedic Rudrabhishek at Pashupatinath Temple and Guhyeshwari Mata darshan before departing for Tibet.
              </p>
            </div>
            <div className="card-dark">
              <Check size={24} color="var(--saffron)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Lake Manasarovar Rituals</h4>
              <p style={{ color: '#8fa4a9', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Vehicle Parikrama around Lake Manasarovar, holy water sprinkling / holy dip (as permitted), and sacred Jal collection.
              </p>
            </div>
            <div className="card-dark">
              <Check size={24} color="var(--saffron)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Complete 3-Day Parikrama</h4>
              <p style={{ color: '#8fa4a9', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Yamdwar to Diraphuk, across Dolma La Pass (5,650 m) to Zutulphuk and Darchen with experienced guides, porters, and ponies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
