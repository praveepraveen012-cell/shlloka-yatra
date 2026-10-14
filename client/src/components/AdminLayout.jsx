import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  Activity,
  LogOut,
  ExternalLink,
  Shield,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('shlloka_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Member Registrations', path: '/admin/members', icon: UserCheck },
    { label: 'Departures (2027)', path: '/admin/departures', icon: Calendar },
    { label: 'Bookings & Yatris', path: '/admin/bookings', icon: Users },
    { label: 'Enquiries & Leads', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Route Pricing', path: '/admin/pricing', icon: DollarSign },
    { label: 'Audit Trail', path: '/admin/audit-logs', icon: Activity },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#081115', color: '#e8eef0', fontFamily: 'var(--sans)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#0a161b',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          {/* Brand */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
              <span style={{ fontSize: '26px', color: 'var(--saffron)' }}>ॐ</span>
              <div>
                <b style={{ display: 'block', fontSize: '1rem', letterSpacing: '0.1em', fontFamily: 'var(--serif)' }}>
                  SHLLOKA ADMIN
                </b>
                <small style={{ fontSize: '0.65rem', color: 'var(--glacier)', letterSpacing: '0.15em' }}>
                  PILGRIMAGE COMMAND
                </small>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    color: isActive ? '#ffffff' : '#9bb0b5',
                    background: isActive ? 'rgba(233, 162, 59, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(233, 162, 59, 0.3)' : '1px solid transparent',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--saffron)' : '#7a9298'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              color: 'var(--glacier)',
              fontSize: '0.85rem',
              marginBottom: '8px',
            }}
          >
            <ExternalLink size={16} />
            <span>Open Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(194, 57, 47, 0.3)',
              background: 'rgba(194, 57, 47, 0.1)',
              color: '#f87171',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Top Header */}
        <header
          style={{
            padding: '20px 36px',
            background: '#0a161b',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 400 }}>{title}</h1>
            {subtitle && <p style={{ fontSize: '0.85rem', color: '#8ca1a6', marginTop: '2px' }}>{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(232, 117, 24, 0.15)',
                color: 'var(--amber-soft)',
                fontSize: '0.8rem',
                border: '1px solid rgba(232, 117, 24, 0.35)',
              }}
            >
              <Shield size={13} />
              <span>Admin Session Active</span>
            </span>
          </div>
        </header>

        {/* Viewport */}
        <div style={{ padding: '36px', flex: 1 }}>{children}</div>
      </main>
    </div>
  );
}
