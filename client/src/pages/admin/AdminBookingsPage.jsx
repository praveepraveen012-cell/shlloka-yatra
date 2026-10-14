import React, { useEffect, useState } from 'react';
import { Users, Search, CheckCircle, XCircle, Clock, Eye, ShieldCheck, ChevronDown, ChevronUp, Download, Filter } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [departureFilter, setDepartureFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const loadData = async () => {
    try {
      const [depRes, routeRes] = await Promise.all([api.getDepartures(), api.getRoutes()]);
      setDepartures(depRes.departures || []);
      setRoutes(routeRes.routes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadBookings = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (departureFilter) params.append('departureId', departureFilter);
      if (routeFilter) params.append('routeId', routeFilter);

      const res = await api.getAdminBookings(params.toString());
      setBookings(res.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadBookings();
  }, [statusFilter, departureFilter, routeFilter]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.updateAdminBookingStatus(id, { status: newStatus });
      setStatusMsg(`Booking status updated to ${newStatus}`);
      loadBookings();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert('Failed to update booking status: ' + err.message);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleExportCsv = () => {
    if (bookings.length === 0) return alert('No booking records to export.');

    const headers = [
      'Booking Reference',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'Departure Batch',
      'Travel Route',
      'Passport Type',
      'Total Travellers',
      'Total Amount (INR)',
      'Status',
      'Created At',
      'Traveller Names',
    ];

    const rows = [
      headers,
      ...bookings.map((b) => [
        b.bookingReference,
        b.contactName,
        b.contactEmail,
        b.contactPhone,
        b.departure?.name || '',
        b.route?.name || '',
        b.passportType,
        b.totalTravellers,
        b.totalAmount,
        b.status,
        new Date(b.createdAt).toLocaleString(),
        (b.travellers || []).map((t) => `${t.fullName} (${t.passportNumber})`).join('; '),
      ]),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows
        .map((row) =>
          row
            .map((val) => {
              const str = val === null || val === undefined ? '' : String(val);
              return `"${str.replace(/"/g, '""')}"`;
            })
            .join(',')
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shlloka_yatra_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="Bookings & Yatri Manifest" subtitle="Review pilgrim reservations, traveller rosters, and manage booking statuses">
      {statusMsg && (
        <div style={{ background: 'rgba(232, 117, 24, 0.15)', border: '1px solid var(--orange-primary)', color: 'var(--amber-soft)', padding: '12px 18px', borderRadius: '10px', marginBottom: '20px' }}>
          {statusMsg}
        </div>
      )}

      {/* Control Bar: Filters & CSV Export */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          background: '#0d1a21',
          padding: '16px 20px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: statusFilter === st ? '1px solid var(--saffron)' : '1px solid rgba(255,255,255,0.1)',
                  background: statusFilter === st ? 'rgba(233, 162, 59, 0.2)' : 'transparent',
                  color: statusFilter === st ? 'var(--saffron)' : '#c5d5d8',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                {st === '' ? 'All' : st}
              </button>
            ))}
          </div>

          {/* Departure Batch Dropdown */}
          <select
            value={departureFilter}
            onChange={(e) => setDepartureFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#12232a',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#ffffff',
              fontSize: '0.82rem',
            }}
          >
            <option value="">All Batches</option>
            {departures.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Route Dropdown */}
          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#12232a',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#ffffff',
              fontSize: '0.82rem',
            }}
          >
            <option value="">All Packages</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                Option {r.routeNumber}: {r.name.split('—')[1] || r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Export to CSV Button */}
        <button
          onClick={handleExportCsv}
          className="btn btn-out btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}
        >
          <Download size={14} />
          <span>Export Manifest to CSV</span>
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading booking records...</p>
      ) : bookings.length === 0 ? (
        <div style={{ background: '#0d1a21', padding: '40px', borderRadius: '16px', textAlign: 'center', color: '#889da3' }}>
          No bookings found for the selected filter criteria.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map((b) => {
            const isExpanded = expandedId === b.id;
            return (
              <div
                key={b.id}
                style={{
                  background: '#0d1a21',
                  borderRadius: '16px',
                  border: isExpanded ? '1px solid rgba(233,162,59,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpand(b.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: 'rgba(233,162,59,0.12)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(233,162,59,0.3)' }}>
                      <b style={{ color: 'var(--saffron)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                        {b.bookingReference}
                      </b>
                    </div>
                    <div>
                      <b style={{ color: '#ffffff', fontSize: '1.05rem', display: 'block' }}>{b.contactName}</b>
                      <small style={{ color: '#889da3' }}>{b.contactEmail} • {b.contactPhone}</small>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <small style={{ color: '#889da3', display: 'block', fontSize: '0.75rem' }}>{b.departure?.name}</small>
                      <b style={{ color: '#ffffff', fontSize: '0.95rem' }}>{b.route?.name?.split('—')[0]}</b>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`badge-pill ${b.status === 'CONFIRMED' ? 'badge-status-available' : b.status === 'PENDING' ? 'badge-status-filling' : 'badge-status-soldout'}`} style={{ fontSize: '0.72rem' }}>
                        {b.status}
                      </span>
                      <small style={{ display: 'block', color: 'var(--saffron)', marginTop: '3px' }}>
                        ₹{b.totalAmount.toLocaleString('en-IN')}
                      </small>
                    </div>

                    <div style={{ color: 'var(--glacier)' }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details View */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '24px',
                      background: '#091318',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '0.88rem',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                      <div>
                        <span style={{ color: '#7a9298', display: 'block', fontSize: '0.78rem' }}>Passport Category</span>
                        <b style={{ color: '#ffffff' }}>{b.passportType}</b>
                      </div>
                      <div>
                        <span style={{ color: '#7a9298', display: 'block', fontSize: '0.78rem' }}>Created At</span>
                        <span style={{ color: '#ffffff' }}>{new Date(b.createdAt).toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: '#7a9298', display: 'block', fontSize: '0.78rem' }}>Payment Status</span>
                        <b style={{ color: b.paymentStatus === 'PAID' ? 'var(--amber-soft)' : 'var(--orange-primary)' }}>{b.paymentStatus}</b>
                      </div>
                      <div>
                        <span style={{ color: '#7a9298', display: 'block', fontSize: '0.78rem' }}>Special Notes</span>
                        <span style={{ color: '#c5d5d8' }}>{b.notes || 'None'}</span>
                      </div>
                    </div>

                    {/* Travellers Roster */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '0.95rem' }}>
                        Registered Yatris ({b.travellers?.length || 0})
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {b.travellers?.map((t, idx) => (
                          <div
                            key={t.id}
                            style={{
                              background: '#12232a',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '8px',
                            }}
                          >
                            <div>
                              <b style={{ color: '#ffffff' }}>{idx + 1}. {t.fullName}</b>
                              <span style={{ color: '#889da3', marginLeft: '10px' }}>
                                Passport: {t.passportNumber} | {t.nationality} | {t.age} yrs ({t.gender})
                              </span>
                            </div>
                            <div style={{ color: 'var(--glacier)' }}>
                              Diet: <b>{t.dietaryPreference}</b> | Emergency: {t.emergencyContactName} ({t.emergencyContactPhone})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Change Status Buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <span style={{ color: '#889da3', fontSize: '0.85rem' }}>Update Status:</span>
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'CONFIRMED')}
                        className="btn btn-out btn-sm"
                        style={{ color: 'var(--amber-soft)', borderColor: 'var(--orange-primary)' }}
                      >
                        Mark Confirmed
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'PENDING')}
                        className="btn btn-out btn-sm"
                        style={{ color: '#f3b658', borderColor: '#e9a23b' }}
                      >
                        Mark Pending
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'CANCELLED')}
                        className="btn btn-out btn-sm"
                        style={{ color: '#f87171', borderColor: '#c2392f' }}
                      >
                        Mark Cancelled
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}
