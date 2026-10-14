import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Legal Terms
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            Terms and Conditions
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            Terms governing participation, booking confirmation, permit compliance, and high-altitude responsibility with Shlloka Yatra Private Limited.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Content */}
      <section className="sec">
        <div className="wrap-sm" style={{ background: '#ffffff', padding: '48px', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #d8e5e8', color: 'var(--ink)', fontSize: '0.98rem', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Agreement to Terms</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            By submitting a booking form, paying a registration deposit, or participating in the Kailash Mansarovar Yatra organized by Shlloka Yatra Private Limited, the yatri agrees to be bound by these Terms and Conditions.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. Passport, Visa and Permit Approvals</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Tibet Travel Permits and group tourist visas are issued at the sole discretion of the Tibet Tourism Bureau and relevant government departments. While Shlloka Yatra undertakes all necessary filings, we cannot be held liable for permit denials or policy changes implemented by foreign governments.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Route & Schedule Alterations (Force Majeure)</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Himalayan travel involves weather extremes, altitude constraints, and sudden border closures. The company reserves the right to adjust itineraries, transport modes, or departure timings for group safety. Additional hotel nights or rerouting costs caused by force majeure events remain the traveller's responsibility.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Physical Fitness & Medical Assumption of Risk</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Pilgrimage to altitudes exceeding 5,000 meters entails inherent medical risks including Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE). Yatris assume all voluntary risks associated with high altitude trekking and must maintain mandatory travel insurance.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>5. Code of Conduct & Sacred Sanctity</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            All pilgrims are expected to respect local Tibetan customs, monastic traditions, fellow yatris, and accompanying Nepali staff. Non-vegetarian food, alcohol, and disruptive behavior are strictly prohibited during the Yatra.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>6. Governing Law & Jurisdiction</h2>
          <p style={{ color: 'var(--muted)' }}>
            These terms are governed by the laws of India. Any legal dispute or claim arising out of pilgrimage services shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </div>
      </section>
    </div>
  );
}
