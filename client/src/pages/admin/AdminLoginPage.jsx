import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@shlloka.com');
  const [password, setPassword] = useState('ShllokaAdmin@2027');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.adminLogin({ email, password });
      if (res.token) {
        localStorage.setItem('shlloka_admin_token', res.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 30%, rgba(233,162,59,0.18) 0%, transparent 60%), #081115',
        padding: '24px',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#0d1a21',
          borderRadius: '24px',
          padding: '44px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(233,162,59,0.15)',
              border: '1px solid var(--saffron)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Shield size={28} color="var(--saffron)" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#ffffff', marginBottom: '6px' }}>
            Staff & Advisor Portal
          </h1>
          <p style={{ color: '#8ca1a6', fontSize: '0.88rem' }}>
            Protected authentication for Shlloka Yatra staff
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(194, 57, 47, 0.15)',
              border: '1px solid rgba(194, 57, 47, 0.4)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--glacier)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--glacier)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-go"
            style={{ width: '100%', padding: '14px', marginTop: '12px' }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <small style={{ color: '#688289', fontSize: '0.78rem' }}>
            Default test credential: admin@shlloka.com / ShllokaAdmin@2027
          </small>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--glacier)', fontSize: '0.85rem' }}>
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
