import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Phone } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered email address or mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/membership/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit reset request.');
      }

      setSuccessMsg(data.message || 'Password reset instructions have been sent.');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', minHeight: '90vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div className="wrap" style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(28px, 6vw, 44px)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(41, 35, 30, 0.08)',
          }}
        >
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--warm-grey)',
              fontSize: '0.9rem',
              marginBottom: '24px',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="eyebrow">Account Recovery</span>
            <h1 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', color: 'var(--charcoal)', marginBottom: '8px' }}>
              Reset Your Password
            </h1>
            <p style={{ color: 'var(--warm-grey)', fontSize: '0.96rem' }}>
              Enter your registered email address or mobile number to receive password recovery instructions.
            </p>
          </div>

          {successMsg ? (
            <div
              style={{
                background: 'rgba(232, 117, 24, 0.12)',
                border: '1px solid rgba(232, 117, 24, 0.35)',
                color: 'var(--orange-deep)',
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle2 size={24} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{successMsg}</span>
              </div>
              <div
                style={{
                  borderTop: '1px solid rgba(232, 117, 24, 0.2)',
                  paddingTop: '12px',
                  fontSize: '0.86rem',
                  color: 'var(--charcoal)',
                }}
              >
                For immediate volunteer assistance, reach out directly at{' '}
                <a href="tel:+916366852888" style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>
                  +91 6366852888
                </a>{' '}
                or email{' '}
                <a href="mailto:volunteers@shlloka.com" style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>
                  volunteers@shlloka.com
                </a>.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(185, 74, 22, 0.1)',
                    border: '1px solid rgba(185, 74, 22, 0.3)',
                    color: 'var(--orange-deep)',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label light" htmlFor="identifier">
                  Email Address or Mobile Number
                </label>
                <input
                  id="identifier"
                  type="text"
                  className="form-input light"
                  placeholder="e.g. yatri@example.com or +919876543210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-go"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  marginTop: '10px',
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Submitting Request...' : 'Send Reset Instructions'}
              </button>
            </form>
          )}

          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(41, 35, 30, 0.08)',
              textAlign: 'center',
              fontSize: '0.92rem',
              color: 'var(--warm-grey)',
            }}
          >
            Remember your password?{' '}
            <Link
              to="/login"
              style={{
                color: 'var(--orange-primary)',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
