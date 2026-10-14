import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, User, Compass, Calendar } from 'lucide-react';

export default function MembershipSuccessPage() {
  const location = useLocation();
  const state = location.state || {};
  const memberReference = state.memberReference || localStorage.getItem('shlloka_member_ref') || 'SHL-MEM-2027-1042';
  const member = state.member || JSON.parse(localStorage.getItem('shlloka_member_user') || '{}');

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', minHeight: '90vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div className="wrap" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(32px, 6vw, 52px)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(41, 35, 30, 0.08)',
            textAlign: 'center',
          }}
        >
          {/* Saffron Check Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(232, 117, 24, 0.12)',
              border: '2px solid var(--orange-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircle2 size={44} color="var(--orange-primary)" />
          </div>

          <span className="eyebrow">Welcome to Shlloka Yatra</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', marginBottom: '12px' }}>
            Registration Successful!
          </h1>
          <p style={{ color: 'var(--warm-grey)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '32px' }}>
            {member?.firstName ? `Dear ${member.firstName}, your` : 'Your'} official Shlloka Yatra membership record has been successfully registered in our secure database.
          </p>

          {/* Membership Reference Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF9F0 0%, #FFF3DC 100%)',
              border: '1.5px dashed var(--orange-primary)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--warm-grey)',
                display: 'block',
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              Unique Membership Reference ID
            </span>
            <b
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                color: 'var(--orange-deep)',
                fontFamily: 'monospace',
                letterSpacing: '0.08em',
              }}
            >
              {memberReference}
            </b>
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: 'var(--warm-grey)',
                marginTop: '8px',
              }}
            >
              Save this reference ID for expedited communication with our volunteer desk.
            </span>
          </div>

          {/* Important Distinction Banner */}
          <div
            style={{
              background: '#FFFDF9',
              border: '1px solid rgba(41, 35, 30, 0.08)',
              borderRadius: '14px',
              padding: '18px 22px',
              textAlign: 'left',
              marginBottom: '36px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="var(--orange-primary)" />
              <b style={{ color: 'var(--charcoal)', fontSize: '0.95rem' }}>Next Step: Booking Your Yatra</b>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--warm-grey)', lineHeight: '1.6', margin: 0 }}>
              Membership registration does not automatically reserve seats or charge deposits. When you are ready to book your specific 2027 departure batch, proceed to our dedicated booking portal below.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/account" className="btn btn-go" style={{ padding: '14px 28px' }}>
              <User size={18} />
              <span>Go to My Account</span>
            </Link>

            <Link to="/book" className="btn btn-login-outline" style={{ padding: '13px 26px' }}>
              <Compass size={18} />
              <span>Book Kailash Yatra 2027</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
