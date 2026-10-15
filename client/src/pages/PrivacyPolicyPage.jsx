import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Legal
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Privacy Policy
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            How Shlloka Yatra Private Limited collects, safeguards, and utilizes traveller personal, biometric, and medical information for pilgrimage permit issuance.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Content */}
      <section className="sec">
        <div className="wrap-sm" style={{ background: '#ffffff', padding: '48px', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #d8e5e8', color: 'var(--ink)', fontSize: '0.98rem', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--ink)' }}>1. Information We Collect</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            To organize pilgrimage journeys across international borders into Nepal and the Tibet Autonomous Region (TAR, China), we collect passport copies, photographs, contact details, emergency contacts, medical declarations, and payment metadata.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--ink)' }}>2. Purpose of Data Processing</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Your information is processed exclusively for:
            (a) Processing Tibet Travel Permits (TTP) and China group tourist visas with governmental immigration authorities;
            (b) Issuing airline tickets and border travel insurance;
            (c) Enabling our medical crew to provide appropriate high-altitude care and dietary accommodations;
            (d) Delivering transactional booking vouchers and emergency support.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--ink)' }}>3. Payment & Card Security</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            We do not store credit card numbers, CVVs, or online banking passwords on our servers. All digital payments are processed through PCI-DSS certified payment gateways and authoritative bank integrations.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--ink)' }}>4. Sharing with Third Parties</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Personal information is shared only with mandatory regulatory authorities, accredited ground partners in Kathmandu and Lhasa, and group insurance underwriters. We never sell, lease, or monetize yatri data to commercial marketing third parties.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--ink)' }}>5. Data Retention & Contact</h2>
          <p style={{ color: 'var(--muted)' }}>
            Traveller records are archived in compliance with tourism and taxation laws. For data deletion or privacy inquiries, contact our Data Officer at <b>volunteers@shlloka.com</b> or write to Shlloka Yatra Private Limited.
          </p>
        </div>
      </section>
    </div>
  );
}
