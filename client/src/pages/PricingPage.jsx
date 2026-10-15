import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, DollarSign, Building2, HelpCircle, ArrowRight } from 'lucide-react';
import PricingTable from '../components/PricingTable';
import api from '../services/api';

export default function PricingPage() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoutes().then((res) => setRoutes(res.routes || [])).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Pricing & Payment Policy
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Transparent Pilgrimage Pricing
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Clear pricing structures for Indian passport holders (in INR with 5% GST) and Foreign / NRI passport holders (with flight supplements). No hidden fees.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Main Pricing Section */}
      <section className="sec">
        <div className="wrap">
          <PricingTable routes={routes} />
        </div>
      </section>

      {/* Detailed Payment Terms & Registration Guidelines */}
      <section className="sec dark" style={{ background: '#0a161c' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="t t-center">Registration & Payment Timelines</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              How your booking is secured and staged from registration to final departure.
            </p>
          </div>

          <div className="grid-3">
            <div className="card-dark">
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Stage 1</span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Initial Registration</h3>
              <p style={{ color: '#8fa4a9', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '14px' }}>
                Secure your slot in your chosen 2027 batch by paying the initial registration deposit of <b>INR 25,000</b> (or USD 250).
              </p>
              <small style={{ color: 'var(--saffron)' }}>* Non-refundable deposit, adjusted in final billing.</small>
            </div>

            <div className="card-dark">
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Stage 2</span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Confirmation (50%)</h3>
              <p style={{ color: '#8fa4a9', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '14px' }}>
                50% payment confirms your Yatra seat. This triggers the initiation of your Tibet Group Permit and visa applications with the authorities.
              </p>
              <small style={{ color: 'var(--glacier)' }}>* Due upon document submission.</small>
            </div>

            <div className="card-dark">
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Stage 3</span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Final Balance (50%)</h3>
              <p style={{ color: '#8fa4a9', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '14px' }}>
                The remaining 50% balance is payable 30 days after your first payment, ensuring all sector flight tickets and hotel bookings are finalized.
              </p>
              <small style={{ color: 'var(--glacier)' }}>* Full clearance prior to Kathmandu arrival.</small>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/book-now" className="btn btn-go">
              <span>Proceed to Booking Portal</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
