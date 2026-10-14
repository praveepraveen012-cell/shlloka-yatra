import React, { useEffect, useState } from 'react';
import { DollarSign, Save, Edit2, X, CheckCircle2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function AdminPricingPage() {
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);

  const loadPricing = async () => {
    try {
      const res = await api.getAdminPricing();
      setPricingTiers(res.pricingTiers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, []);

  const handleEditClick = (tier) => {
    setEditingId(tier.id);
    setFormData({
      basePrice: tier.basePrice,
      gstPercentage: tier.gstPercentage,
      foreignAirfareSupplement: tier.foreignAirfareSupplement,
      depositRequired: tier.depositRequired,
    });
  };

  const handleSave = async (id) => {
    try {
      await api.updateAdminPricingTier(id, {
        basePrice: Number(formData.basePrice),
        gstPercentage: Number(formData.gstPercentage),
        foreignAirfareSupplement: Number(formData.foreignAirfareSupplement),
        depositRequired: Number(formData.depositRequired),
      });
      setStatusMsg('Pricing tier updated successfully');
      setEditingId(null);
      loadPricing();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert('Error updating pricing: ' + err.message);
    }
  };

  return (
    <AdminLayout title="Database-Managed Route Pricing" subtitle="Control base rates, GST percentages, and foreign airfare sector supplements">
      {statusMsg && (
        <div style={{ background: 'rgba(232, 117, 24, 0.15)', border: '1px solid var(--orange-primary)', color: 'var(--amber-soft)', padding: '12px 18px', borderRadius: '10px', marginBottom: '20px' }}>
          {statusMsg}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--glacier)' }}>Loading pricing tiers...</p>
      ) : (
        <div style={{ overflowX: 'auto', background: '#0d1a21', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.9rem', color: '#ffffff' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#091318', color: 'var(--glacier)', textAlign: 'left' }}>
                <th style={{ padding: '16px 20px' }}>Route Package</th>
                <th style={{ padding: '16px 20px' }}>Passport Category</th>
                <th style={{ padding: '16px 20px' }}>Base Price (INR)</th>
                <th style={{ padding: '16px 20px' }}>GST Rate (%)</th>
                <th style={{ padding: '16px 20px' }}>Air Supplement (USD)</th>
                <th style={{ padding: '16px 20px' }}>Deposit Req. (INR)</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingTiers.map((tier) => {
                const isEditing = editingId === tier.id;
                return (
                  <tr key={tier.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <b>{tier.route?.name}</b>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className="badge-pill badge-gold" style={{ fontSize: '0.72rem' }}>
                        {tier.passportType}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.basePrice}
                          onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                          className="form-input"
                          style={{ width: '120px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <b style={{ color: 'var(--saffron)' }}>₹{tier.basePrice.toLocaleString('en-IN')}</b>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={formData.gstPercentage}
                          onChange={(e) => setFormData({ ...formData, gstPercentage: e.target.value })}
                          className="form-input"
                          style={{ width: '60px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <span>{tier.gstPercentage}%</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.foreignAirfareSupplement}
                          onChange={(e) => setFormData({ ...formData, foreignAirfareSupplement: e.target.value })}
                          className="form-input"
                          style={{ width: '80px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <span>${tier.foreignAirfareSupplement}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.depositRequired}
                          onChange={(e) => setFormData({ ...formData, depositRequired: e.target.value })}
                          className="form-input"
                          style={{ width: '100px', padding: '6px 10px', fontSize: '0.85rem' }}
                        />
                      ) : (
                        <span>₹{tier.depositRequired.toLocaleString('en-IN')}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      {isEditing ? (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => handleSave(tier.id)} className="btn btn-go btn-sm" style={{ padding: '6px 12px' }}>
                            <Save size={14} /> Save
                          </button>
                          <button onClick={() => setEditingId(null)} className="btn btn-out btn-sm" style={{ padding: '6px 10px' }}>
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditClick(tier)} className="btn btn-out btn-sm" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
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
