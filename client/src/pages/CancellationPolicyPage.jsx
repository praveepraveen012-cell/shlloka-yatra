import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, ArrowRight, Info } from 'lucide-react';

export default function CancellationPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Official Terms & Conditions
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            Cancellation & Refund Policy
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            Official cancellation terms and refund conditions for the 2027 Kailash Mansarovar Yatra season as stated in the source brochure.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Main Cancellation Content */}
      <section className="sec">
        <div className="wrap-sm">
          {/* Important Administrative Advisory Note */}
          <div
            style={{
              padding: '20px 24px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #dce5e8',
              marginBottom: '36px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Info size={22} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.6' }}>
              <b style={{ color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>
                Note for Yatri Awareness & Administrative Review:
              </b>
              The cancellation terms below are reproduced verbatim from the Kailash Mansarovar Yatra 2027 brochure. The time thresholds (25% refund before 75 days, and 50% refund before 50 days) contain potential source wording ambiguity and are currently flagged for formal review and clarification by the management prior to final contract signing.
            </div>
          </div>

          {/* Timeline Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '44px' }}>
            {/* Tier 1 */}
            <div style={{ background: '#ffffff', padding: '28px 32px', borderRadius: '18px', border: '1px solid #d8e5e8', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(233,162,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} color="var(--saffron)" />
              </div>
              <div>
                <b style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>25% Refund</b>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginTop: '3px' }}>
                  Notice received <b>before 75 days</b> from the official start date of the program.
                </p>
              </div>
            </div>

            {/* Tier 2 */}
            <div style={{ background: '#ffffff', padding: '28px 32px', borderRadius: '18px', border: '1px solid #d8e5e8', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(233,162,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} color="var(--saffron)" />
              </div>
              <div>
                <b style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>50% Refund</b>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginTop: '3px' }}>
                  Notice received <b>before 50 days</b> from the official start date of the program.
                </p>
              </div>
            </div>

            {/* Tier 3 */}
            <div style={{ background: '#ffffff', padding: '28px 32px', borderRadius: '18px', border: '1px solid #fecaca', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(194,57,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldAlert size={24} color="#c2392f" />
              </div>
              <div>
                <b style={{ fontSize: '1.25rem', color: '#b91c1c' }}>No Refund (0%)</b>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginTop: '3px' }}>
                  Notice received <b>before 30 days</b> of the start date of the program, or inside 30 days. No refund for no-shows.
                </p>
              </div>
            </div>
          </div>

          {/* Key Conditions from Brochure */}
          <div
            style={{
              background: '#0d1a21',
              borderRadius: '20px',
              padding: '36px',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '40px',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', color: 'var(--saffron)', marginBottom: '18px' }}>
              Brochure Terms on Non-Attendance & Departures
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#c5d5d8', lineHeight: '1.6' }}>
              <li>• <b>Unable to Attend:</b> If you are unable to attend the program, there will be no refund or re-registration to future batches, as stated in the brochure.</li>
              <li>• <b>Leaving Midway:</b> Leaving the program after commencement (due to personal, medical, altitude, or logistical reasons) does not entitle the participant to any refund for unused hotel nights, meals, transport sectors, or permits.</li>
              <li>• <b>No-Show Policy:</b> No refund whatsoever will be issued for a no-show on the arrival date in Kathmandu.</li>
              <li>• <b>Online Payment Processing:</b> For payments made online, refunds will be credited back via the same payment mode directly to the originating bank account.</li>
              <li>• <b>Processing Window:</b> Online payment refunds may take up to <b>four weeks</b> for bank and regulatory processing.</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-ink">
              <span>Contact Yatra Advisory with Policy Questions</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
