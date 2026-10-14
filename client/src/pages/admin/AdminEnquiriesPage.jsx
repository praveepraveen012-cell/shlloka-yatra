import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Mail, CheckCircle2, Clock, Check, Download, Filter } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const loadEnquiries = async () => {
    try {
      const res = await api.getAdminEnquiries();
      setEnquiries(res.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api.updateAdminEnquiryStatus(id, { status });
      loadEnquiries();
    } catch (err) {
      alert('Error updating enquiry: ' + err.message);
    }
  };

  const filteredEnquiries = statusFilter
    ? enquiries.filter((e) => e.status === statusFilter)
    : enquiries;

  const handleExportCsv = () => {
    if (filteredEnquiries.length === 0) return alert('No enquiries to export.');

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Type',
      'Status',
      'Preferred Batch',
      'Preferred Route',
      'Travellers Count',
      'Created At',
      'Message',
    ];

    const rows = [
      headers,
      ...filteredEnquiries.map((e) => [
        e.name,
        e.email,
        e.phone,
        e.type || 'GENERAL',
        e.status,
        e.preferredBatch || '',
        e.preferredRoute || '',
        e.travellersCount || 1,
        new Date(e.createdAt).toLocaleString(),
        e.message,
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
    link.setAttribute('download', `shlloka_yatra_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="Enquiries & Leads Desk" subtitle="Review prospective yatri queries and coordinate advisor callbacks">
      {/* Control Bar: Filter Tabs & CSV Export */}
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
        <div style={{ display: 'flex', gap: '8px' }}>
          {['', 'NEW', 'CONTACTED', 'RESOLVED'].map((st) => (
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
              {st === '' ? 'All Enquiries' : st}
            </button>
          ))}
        </div>

        <button
          onClick={handleExportCsv}
          className="btn btn-out btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}
        >
          <Download size={14} />
          <span>Export Enquiries to CSV</span>
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading enquiries...</p>
      ) : filteredEnquiries.length === 0 ? (
        <div style={{ background: '#0d1a21', padding: '40px', borderRadius: '16px', textAlign: 'center', color: '#889da3' }}>
          No customer enquiries found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredEnquiries.map((e) => (
            <div
              key={e.id}
              style={{
                background: '#0d1a21',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <b style={{ color: '#ffffff', fontSize: '1.15rem' }}>{e.name}</b>
                  <span
                    className={`badge-pill ${
                      e.status === 'NEW'
                        ? 'badge-status-filling'
                        : e.status === 'CONTACTED'
                        ? 'badge-moon'
                        : 'badge-status-available'
                    }`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {e.status}
                  </span>
                  <small style={{ color: '#6e858d' }}>{new Date(e.createdAt).toLocaleString()}</small>
                </div>

                <div style={{ display: 'flex', gap: '20px', color: 'var(--glacier)', fontSize: '0.88rem', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} /> {e.phone}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} /> {e.email}
                  </span>
                </div>

                <p style={{ color: '#c5d5d8', fontSize: '0.94rem', lineHeight: '1.6', background: '#12232a', padding: '14px 18px', borderRadius: '10px' }}>
                  "{e.message}"
                </p>

                {(e.preferredBatch || e.preferredRoute) && (
                  <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#889da3' }}>
                    Interest: <b>{e.preferredBatch || 'Any Batch'}</b> • <b>{e.preferredRoute || 'Any Route'}</b> • <b>{e.travellersCount || 1} Yatri(s)</b>
                  </div>
                )}
              </div>

              {/* Status Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleStatus(e.id, 'CONTACTED')}
                  className="btn btn-out btn-sm"
                  style={{ color: '#f3b658', borderColor: 'rgba(233, 162, 59, 0.4)' }}
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => handleStatus(e.id, 'RESOLVED')}
                  className="btn btn-out btn-sm"
                  style={{ color: 'var(--amber-soft)', borderColor: 'rgba(245, 184, 46, 0.4)' }}
                >
                  Mark Resolved
                </button>
                <button
                  onClick={() => handleStatus(e.id, 'NEW')}
                  className="btn btn-out btn-sm"
                  style={{ color: '#889da3', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Reset to New
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
