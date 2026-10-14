import React, { useEffect, useState } from 'react';
import { Activity, Shield, Clock, FileText } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminAuditLogs()
      .then((res) => setLogs(res.logs || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="System Audit Trail & History" subtitle="Immutable operational log of administrative actions, pricing edits, and booking state transitions">
      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading audit records...</p>
      ) : logs.length === 0 ? (
        <div style={{ background: '#0d1a21', padding: '40px', borderRadius: '16px', textAlign: 'center', color: '#889da3' }}>
          No audit entries recorded yet.
        </div>
      ) : (
        <div style={{ background: '#0d1a21', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: '#ffffff' }}>
            <thead>
              <tr style={{ background: '#091318', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--glacier)', textAlign: 'left' }}>
                <th style={{ padding: '16px 20px' }}>Timestamp</th>
                <th style={{ padding: '16px 20px' }}>Action</th>
                <th style={{ padding: '16px 20px' }}>Entity</th>
                <th style={{ padding: '16px 20px' }}>User / Actor</th>
                <th style={{ padding: '16px 20px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 20px', color: '#889da3', whiteSpace: 'nowrap' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(233,162,59,0.12)',
                        color: 'var(--saffron)',
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--glacier)' }}>
                    {log.entity} {log.entityId ? `#${log.entityId.slice(0, 8)}` : ''}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#d2dee1' }}>
                    {log.userEmail || 'System / Public'}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#8fa4a9', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    {log.details || '-'}
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
