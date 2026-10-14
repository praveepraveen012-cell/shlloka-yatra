import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, Building, MapPin, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import api from '../services/api';

const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone / mobile number'),
  preferredBatch: z.string().optional(),
  preferredRoute: z.string().optional(),
  travellersCount: z.coerce.number().int().min(1).max(20).default(1),
  message: z.string().min(5, 'Please provide details or specific questions regarding your yatra'),
});

export default function ContactPage() {
  const [departures, setDepartures] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getDepartures().then((res) => setDepartures(res.departures || [])).catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      travellersCount: 1,
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await api.submitEnquiry(data);
      setSuccessMsg(res.message || 'Your enquiry has been received. Our Yatra advisor will connect with you shortly.');
      reset();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try calling directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Get in Touch
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            Speak with a Yatra Advisor
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            Have questions about physical fitness, visa documentation, air route availability, or booking procedures? Our team is here to guide your pilgrimage planning with transparency and care.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Main Grid: Form + Office Info */}
      <section className="sec">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'flex-start' }}>
            {/* Form */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '44px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid #d8e5e8',
              }}
            >
              <h2 style={{ fontSize: '1.8rem', color: 'var(--ink)', marginBottom: '8px' }}>
                Send a Pilgrimage Enquiry
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
                Fill in the details below and we will prepare a personalized itinerary and preparation pack for you.
              </p>

              {successMsg && (
                <div
                  style={{
                    background: 'rgba(232, 117, 24, 0.12)',
                    border: '1px solid rgba(232, 117, 24, 0.4)',
                    color: 'var(--orange-deep)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <CheckCircle2 size={22} color="var(--orange-primary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem' }}>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(194, 57, 47, 0.1)',
                    border: '1px solid rgba(194, 57, 47, 0.3)',
                    color: '#c2392f',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <AlertCircle size={22} color="#c2392f" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem' }}>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label light">Your Full Name *</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Suresh Nair"
                    className="form-input light"
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label light">Email Address *</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="suresh@example.com"
                      className="form-input light"
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label light">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 9876543210"
                      className="form-input light"
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label light">Preferred Batch</label>
                    <select {...register('preferredBatch')} className="form-select light">
                      <option value="">Select a 2027 Batch...</option>
                      {departures.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} {d.isFullMoon ? '(Full Moon)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label light">Preferred Route</label>
                    <select {...register('preferredRoute')} className="form-select light">
                      <option value="">Select Route Option...</option>
                      <option value="Option 1 — Bus Both Ways">Option 1 — Bus Both Ways</option>
                      <option value="Option 2 — Fly to Lhasa, Road">Option 2 — Fly to Lhasa, Road</option>
                      <option value="Option 3 — Fly Lhasa & Ali">Option 3 — Fly Lhasa & Ali</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label light">No. of Travellers</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      {...register('travellersCount')}
                      className="form-input light"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label light">Message / Questions *</label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Tell us about your fitness level, any medical questions, or travel preferences..."
                    className="form-textarea light"
                  />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-go"
                  style={{ width: '100%', padding: '16px 28px', marginTop: '10px' }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Submitting Enquiry...' : 'Submit Pilgrimage Enquiry'}</span>
                </button>
              </form>
            </div>

            {/* Direct Contact & Bank Info */}
            <div>
              <div
                style={{
                  background: '#0d1a21',
                  borderRadius: '24px',
                  padding: '40px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '28px',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#ffffff' }}>
                  Direct Contact Channels
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(233,162,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} color="var(--saffron)" />
                    </div>
                    <div>
                      <small style={{ color: 'var(--glacier)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Telephone / Helpline</small>
                      <a href="tel:+916366852888" style={{ display: 'block', fontSize: '1.2rem', color: '#ffffff', fontWeight: 600 }}>
                        +91 6366852888
                      </a>
                      <span style={{ fontSize: '0.82rem', color: '#889da3' }}>Mon–Sat: 9:00 AM – 7:00 PM IST</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(233,162,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} color="var(--saffron)" />
                    </div>
                    <div>
                      <small style={{ color: 'var(--glacier)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Electronic Mail</small>
                      <a href="mailto:volunteers@shlloka.com" style={{ display: 'block', fontSize: '1.15rem', color: '#ffffff' }}>
                        volunteers@shlloka.com
                      </a>
                      <span style={{ fontSize: '0.82rem', color: '#889da3' }}>Official enquiry & document submission desk</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(233,162,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building size={20} color="var(--saffron)" />
                    </div>
                    <div>
                      <small style={{ color: 'var(--glacier)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Operating Company</small>
                      <span style={{ display: 'block', fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>
                        Shlloka Yatra Private Limited
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#889da3' }}>Pilgrimage • People • Purpose</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Bank Transfer Info */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid #d8e5e8',
                }}
              >
                <h4 style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '14px' }}>
                  Bank Transfer Account (RTGS / NEFT / IMPS)
                </h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p><b>Account Name:</b> Shlloka Yatra Private Limited</p>
                  <p><b>Account Number:</b> 201037169009</p>
                  <p><b>IFSC Code:</b> INDB0000672</p>
                  <p><b>Account Type:</b> Current Account</p>
                  <p><b>Bank Name:</b> IndusInd Bank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
