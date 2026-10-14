import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Shield, Compass, Calendar, Phone, Mail, MapPin, LogOut, ExternalLink, CheckCircle } from 'lucide-react';

export default function MemberAccountPage() {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('shlloka_member_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/membership/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then((data) => {
        setMember(data.member);
        localStorage.setItem('shlloka_member_user', JSON.stringify(data.member));
      })
      .catch(() => {
        // Fallback to local storage if offline
        const local = localStorage.getItem('shlloka_member_user');
        if (local) {
          try {
            setMember(JSON.parse(local));
          } catch (e) {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('shlloka_member_token');
    localStorage.removeItem('shlloka_member_user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--ivory-bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
        <p style={{ color: 'var(--warm-grey)' }}>Loading your member portal...</p>
      </div>
    );
  }

  if (!member) return null;

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', minHeight: '90vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div className="wrap" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Top Member Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2B231E 0%, #1A1512 100%)',
            borderRadius: '24px',
            padding: ' clamp(28px, 5vw, 40px)',
            color: '#FFFFFF',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(245, 184, 46, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 14px',
                  background: 'rgba(245, 184, 46, 0.2)',
                  color: 'var(--yellow-warm)',
                  border: '1px solid rgba(245, 184, 46, 0.4)',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                <CheckCircle size={13} />
                <span>Active Member</span>
              </span>
              <span style={{ fontSize: '0.85rem', color: '#D6CBC1' }}>
                Ref: <b style={{ color: 'var(--amber-soft)', fontFamily: 'monospace' }}>{member.membershipReference}</b>
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#FFFFFF', marginBottom: '6px' }}>
              Namaskaram, {member.firstName} {member.lastName}
            </h1>
            <p style={{ color: '#D6CBC1', fontSize: '0.96rem' }}>
              Member since {new Date(member.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-go btn-sm" style={{ padding: '10px 22px' }}>
              <Compass size={16} />
              <span>Book 2027 Yatra</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-out btn-sm"
              style={{ padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Card 1: Contact & Profile */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(41, 35, 30, 0.08)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--charcoal)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={20} color="var(--orange-primary)" />
              <span>Personal Details</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem' }}>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Registered Email</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.email}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Mobile Number</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.mobile}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>WhatsApp</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.whatsapp || member.mobile}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Location</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.city}, {member.state}, {member.country}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Nationality</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.nationality}</b>
              </div>
            </div>
          </div>

          {/* Card 2: Pilgrimage Interest & Actions */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(41, 35, 30, 0.08)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--charcoal)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={20} color="var(--orange-primary)" />
              <span>2027 Pilgrimage Status</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', marginBottom: '24px' }}>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Yatra Interest</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.yatraInterest || 'Kailash Mansarovar 2027'}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Preferred Departure Batch</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.preferredBatch || 'Batch 1 (May 2027)'}</b>
              </div>
              <div>
                <span style={{ color: 'var(--warm-grey)', display: 'block', fontSize: '0.8rem' }}>Preferred Travel Package</span>
                <b style={{ color: 'var(--charcoal)' }}>{member.preferredPackage || 'Option 1 (Overland via Kyirong)'}</b>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(232, 117, 24, 0.08)',
                border: '1px solid rgba(232, 117, 24, 0.25)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px',
                fontSize: '0.88rem',
                color: 'var(--charcoal)',
              }}
            >
              Ready to lock in your seat? Booking is a separate process that reserves your flight/overland permit and locks in your 2027 dates.
            </div>

            <Link
              to="/book"
              className="btn btn-go"
              style={{ width: '100%', textAlign: 'center', padding: '12px' }}
            >
              Proceed to Yatra Booking →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
