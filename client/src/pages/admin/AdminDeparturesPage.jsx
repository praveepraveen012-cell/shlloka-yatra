import React, { useEffect, useState } from 'react';
import { Calendar, Users, Moon, Edit2, Save, X, CheckCircle2, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminDeparturesPage() {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);

  const loadDepartures = async () => {
    try {
      const res = await api.getAdminDepartures();
      setDepartures(res.departures || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartures();
  }, []);

  const handleEditClick = (dep) => {
    setEditingId(dep.id);
    setFormData({
      name: dep.name,
      totalCapacity: dep.totalCapacity,
      bookedSeats: dep.bookedSeats,
      status: dep.status,
      isFullMoon: dep.isFullMoon,
      description: dep.description || '',
    });
  };

  const handleSave = async (id) => {
    try {
      await api.updateAdminDeparture(id, {
        name: formData.name,
        totalCapacity: Number(formData.totalCapacity),
        bookedSeats: Number(formData.bookedSeats),
        status: formData.status,
        isFullMoon: Boolean(formData.isFullMoon),
        description: formData.description,
      });
      setStatusMsg('Departure batch updated successfully');
      setEditingId(null);
      loadDepartures();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert('Failed to update departure: ' + err.message);
    }
  };

  return (
    <AdminLayout title="2027 Departure Batches Management" subtitle="Manage capacity allocation, real-time seat bookings, and status flags">
      {statusMsg && (
        <div style={{ background: 'rgba(232, 117, 24, 0.15)', border: '1px solid var(--orange-primary)', color: 'var(--amber-soft)', padding: '12px 18px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} />
          <span>{statusMsg}</span>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading departures...</p>
      ) : (
        <div style={{ overflowX: 'auto', background: '#0d1a21', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', fontSize: '0.9rem', color: '#ffffff' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#091318', color: 'var(--glacier)', textAlign: 'left' }}>
                <th style={{ padding: '16px 20px' }}>#</th>
                <th style={{ padding: '16px 20px' }}>Batch Name</th>
                <th style={{ padding: '16px 20px' }}>Dates</th>
                <th style={{ padding: '16px 20px' }}>Capacity</th>
                <th style={{ padding: '16px 20px' }}>Booked Seats</th>
                <th style={{ padding: '16px 20px' }}>Full Moon</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departures.map((dep) => {
                const isEditing = editingId === dep.id;
                return (
                  <tr key={dep.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 20px', color: 'var(--saffron)', fontWeight: 600 }}>{dep.batchNumber}</td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <b>{dep.name}</b>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#889da3' }}>
                      {new Date(dep.arrivalDate).toLocaleDateString()} – {new Date(dep.departureDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.totalCapacity}
                          onChange={(e) => setFormData({ ...formData, totalCapacity: e.target.value })}
                          className="form-input"
                          style={{ width: '70px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <span>{dep.totalCapacity}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.bookedSeats}
                          onChange={(e) => setFormData({ ...formData, bookedSeats: e.target.value })}
                          className="form-input"
                          style={{ width: '70px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <span>{dep.bookedSeats}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={formData.isFullMoon}
                          onChange={(e) => setFormData({ ...formData, isFullMoon: e.target.checked })}
                          style={{ accentColor: 'var(--saffron)' }}
                        />
                      ) : dep.isFullMoon ? (
                        <span className="badge-pill badge-moon" style={{ fontSize: '0.7rem' }}>Full Moon</span>
                      ) : (
                        <span style={{ color: '#688289' }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="form-select"
                          style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                        >
                          <option value="AVAILABLE">AVAILABLE</option>
                          <option value="FAST_FILLING">FAST_FILLING</option>
                          <option value="SOLD_OUT">SOLD_OUT</option>
                        </select>
                      ) : (
                        <span className={`badge-pill ${dep.status === 'AVAILABLE' ? 'badge-status-available' : dep.status === 'FAST_FILLING' ? 'badge-status-filling' : 'badge-status-soldout'}`} style={{ fontSize: '0.7rem' }}>
                          {dep.status}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      {isEditing ? (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => handleSave(dep.id)} className="btn btn-go btn-sm" style={{ padding: '6px 12px' }}>
                            <Save size={14} /> Save
                          </button>
                          <button onClick={() => setEditingId(null)} className="btn btn-out btn-sm" style={{ padding: '6px 10px' }}>
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditClick(dep)} className="btn btn-out btn-sm" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          <Edit2 size={13} /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
