import React, { useState, useEffect } from 'react';
import { Search, Download, UserCheck, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [statusMsg, setStatusMsg] = useState('');

  const fetchMembers = () => {
    setLoading(true);
    const token = localStorage.getItem('shlloka_admin_token');
    let url = `/api/admin/members?status=${statusFilter}`;
    if (searchTerm.trim()) {
      url += `&search=${encodeURIComponent(searchTerm.trim())}`;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load member records');
        return res.json();
      })
      .then((data) => {
        setMembers(data.members || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMembers();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMembers();
  };

  const handleStatusChange = async (memberId, newStatus) => {
    const token = localStorage.getItem('shlloka_admin_token');
    try {
      const res = await fetch(`/api/admin/members/${memberId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setStatusMsg(`Member ${data.member.membershipReference} status changed to ${newStatus}`);
      setTimeout(() => setStatusMsg(''), 4000);
      fetchMembers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExportCSV = () => {
    const token = localStorage.getItem('shlloka_admin_token');
    window.open(`/api/admin/members/export/csv`, '_blank');
  };

  return (
    <AdminLayout title="Member Registrations" subtitle="Review registered community members, verify contact info, and manage statuses">
      {statusMsg && (
        <div
          style={{
            background: 'rgba(232, 117, 24, 0.15)',
            border: '1px solid var(--orange-primary)',
            color: 'var(--amber-soft)',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Control Bar: Search, Filters, CSV Export */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Search by name, email, mobile, or reference ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{
                background: '#0d1a21',
                paddingLeft: '40px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                fontSize: '0.88rem',
              }}
            />
            <Search size={16} color="var(--warm-grey)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="submit" className="btn btn-go btn-sm" style={{ padding: '8px 18px' }}>
            Search
          </button>
        </form>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{
              background: '#0d1a21',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              fontSize: '0.88rem',
              padding: '8px 14px',
              width: 'auto',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="SUSPENDED">Suspended Only</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="btn btn-out btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderColor: 'var(--orange-primary)',
              color: 'var(--amber-soft)',
            }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: 'var(--warm-grey)' }}>Loading member records...</p>
      ) : members.length === 0 ? (
        <div style={{ background: '#0d1a21', borderRadius: '18px', padding: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: '#c5d5d8', fontSize: '1rem', marginBottom: '8px' }}>No member records match your query.</p>
          <small style={{ color: 'var(--warm-grey)' }}>Try adjusting your search keywords or status filter.</small>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#0d1a21', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <table style={{ width: '100%', minWidth: '920px', borderCollapse: 'collapse', fontSize: '0.88rem', color: '#FFFFFF' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#091318', color: '#c5d5d8', textAlign: 'left' }}>
                <th style={{ padding: '16px 20px' }}>Reference</th>
                <th style={{ padding: '16px 20px' }}>Member Name</th>
                <th style={{ padding: '16px 20px' }}>Contact Info</th>
                <th style={{ padding: '16px 20px' }}>Location</th>
                <th style={{ padding: '16px 20px' }}>Yatra Interest</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '16px 20px', fontFamily: 'monospace', color: 'var(--amber-soft)', fontWeight: 600 }}>
                    {m.membershipReference}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <b>{m.firstName} {m.lastName}</b>
                    <small style={{ display: 'block', color: 'var(--warm-grey)', fontSize: '0.78rem' }}>
                      Registered: {new Date(m.createdAt).toLocaleDateString()}
                    </small>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div>{m.email}</div>
                    <small style={{ color: '#c5d5d8' }}>{m.mobile}</small>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {m.city}, {m.country}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ color: 'var(--amber-soft)' }}>{m.preferredBatch || 'Flexible'}</span>
                    <small style={{ display: 'block', color: 'var(--warm-grey)', fontSize: '0.78rem' }}>
                      {m.preferredPackage || 'Option 1'}
                    </small>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: m.status === 'ACTIVE' ? 'rgba(232, 117, 24, 0.2)' : 'rgba(185, 74, 22, 0.2)',
                        color: m.status === 'ACTIVE' ? 'var(--amber-soft)' : '#F87171',
                        border: `1px solid ${m.status === 'ACTIVE' ? 'rgba(232, 117, 24, 0.4)' : 'rgba(185, 74, 22, 0.4)'}`,
                      }}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {m.status === 'ACTIVE' ? (
                      <button
                        onClick={() => handleStatusChange(m.id, 'SUSPENDED')}
                        className="btn btn-out btn-sm"
                        style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#F87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(m.id, 'ACTIVE')}
                        className="btn btn-out btn-sm"
                        style={{ fontSize: '0.75rem', padding: '4px 10px', color: 'var(--amber-soft)', borderColor: 'var(--orange-primary)' }}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
