import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  Activity,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsRes, bookingsRes, enquiriesRes] = await Promise.all([
          api.getAdminDashboardStats(),
          api.getAdminBookings('take=5'),
          api.getAdminEnquiries(),
        ]);
        setStats(statsRes.stats);
        setRecentBookings((bookingsRes.bookings || []).slice(0, 5));
        setRecentEnquiries((enquiriesRes.enquiries || []).slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <AdminLayout title="Pilgrimage Operations Command" subtitle="Real-time 2027 season departure occupancy, bookings, and enquiry metrics">
      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading dashboard metrics...</p>
      ) : (
        <div>
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
            {/* Stat 1 */}
            <div style={{ background: '#0d1a21', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Total Bookings</span>
                <Users size={20} color="var(--saffron)" />
              </div>
              <b style={{ fontSize: '2.2rem', color: '#ffffff', fontFamily: 'var(--serif)' }}>{stats?.totalBookings || 0}</b>
              <small style={{ display: 'block', color: 'var(--amber-soft)', fontSize: '0.8rem', marginTop: '4px' }}>
                {stats?.confirmedBookings || 0} Confirmed • {stats?.pendingBookings || 0} Pending
              </small>
            </div>

            {/* Stat 2 */}
            <div style={{ background: '#0d1a21', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Seat Occupancy</span>
                <Calendar size={20} color="var(--saffron)" />
              </div>
              <b style={{ fontSize: '2.2rem', color: '#ffffff', fontFamily: 'var(--serif)' }}>{stats?.occupancyRate || 0}%</b>
              <small style={{ display: 'block', color: '#889da3', fontSize: '0.8rem', marginTop: '4px' }}>
                {stats?.totalBookedSeats || 0} / {stats?.totalCapacity || 0} Total Season Seats
              </small>
            </div>

            {/* Stat 3 */}
            <div style={{ background: '#0d1a21', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Total Collections</span>
                <CreditCard size={20} color="var(--saffron)" />
              </div>
              <b style={{ fontSize: '2.2rem', color: 'var(--saffron)', fontFamily: 'var(--sans)' }}>
                ₹{((stats?.totalRevenueInr || 0) / 100000).toFixed(2)}L
              </b>
              <small style={{ display: 'block', color: '#889da3', fontSize: '0.8rem', marginTop: '4px' }}>
                Authoritative verified deposits
              </small>
            </div>

            {/* Stat 4 */}
            <div style={{ background: '#0d1a21', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--glacier)', textTransform: 'uppercase' }}>Enquiries & Leads</span>
                <MessageSquare size={20} color="var(--saffron)" />
              </div>
              <b style={{ fontSize: '2.2rem', color: '#ffffff', fontFamily: 'var(--serif)' }}>{stats?.totalEnquiries || 0}</b>
              <small style={{ display: 'block', color: '#f3b658', fontSize: '0.8rem', marginTop: '4px' }}>
                {stats?.newEnquiries || 0} Awaiting callback
              </small>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', marginBottom: '36px' }}>
            {/* Recent Bookings */}
            <div style={{ background: '#0d1a21', borderRadius: '18px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Recent Pilgrimage Bookings</h3>
                <Link to="/admin/bookings" style={{ color: 'var(--saffron)', fontSize: '0.85rem' }}>View All →</Link>
              </div>

              {recentBookings.length === 0 ? (
                <p style={{ color: '#889da3' }}>No bookings created yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentBookings.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: '#12232a',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.88rem',
                      }}
                    >
                      <div>
                        <b style={{ color: '#ffffff', display: 'block' }}>{b.bookingReference} — {b.contactName}</b>
                        <span style={{ color: '#889da3', fontSize: '0.8rem' }}>{b.departure?.name} • {b.totalTravellers} Yatris</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge-pill ${b.status === 'CONFIRMED' ? 'badge-status-available' : 'badge-status-filling'}`} style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                          {b.status}
                        </span>
                        <span style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.82rem', marginTop: '3px' }}>
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Enquiries */}
            <div style={{ background: '#0d1a21', borderRadius: '18px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Recent Enquiries</h3>
                <Link to="/admin/enquiries" style={{ color: 'var(--saffron)', fontSize: '0.85rem' }}>View All →</Link>
              </div>

              {recentEnquiries.length === 0 ? (
                <p style={{ color: '#889da3' }}>No customer enquiries yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentEnquiries.map((e) => (
                    <div
                      key={e.id}
                      style={{
                        background: '#12232a',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        fontSize: '0.88rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <b style={{ color: '#ffffff' }}>{e.name}</b>
                        <span style={{ fontSize: '0.75rem', color: e.status === 'NEW' ? 'var(--saffron)' : '#889da3' }}>
                          {e.status}
                        </span>
                      </div>
                      <p style={{ color: '#a2b9be', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {e.message}
                      </p>
                      <small style={{ color: '#6a8187', fontSize: '0.75rem' }}>{e.phone} • {e.email}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
