import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Moon, Users, Clock, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import DepartureSelector from '../components/DepartureSelector';
import api from '../services/api';

export default function DeparturesPage() {
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getDepartures().then((res) => setDepartures(res.departures || [])).catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            2027 Pilgrimage Calendar
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            Fixed Departure Dates for 2027
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            8 structured batches operating between May and August 2027. Four batches are specifically timed to coincide with sacred Full Moon nights at holy Lake Manasarovar and Mount Kailash.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Interactive Batch Selector */}
      <section className="sec dark" style={{ background: '#09151a' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--saffron)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              Interactive Batch Browser
            </span>
            <h2 className="t t-center">Select Your 2027 Batch</h2>
          </div>
          <DepartureSelector />
        </div>
      </section>

      {/* Full Tabular Schedule from Brochure */}
      <section className="sec">
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <h2 className="t">Complete 2027 Departure Schedule Table</h2>
            <p className="lead">
              Review arrival and final departure dates across all 8 batches.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: '700px',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #e1e9ec',
              }}
            >
              <thead>
                <tr style={{ background: '#0e1c22', color: '#ffffff', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Batch</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Kathmandu Arrival</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Final Departure</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Total Days</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Status</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, fontSize: '0.9rem' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>
                {departures.map((batch) => (
                  <tr key={batch.id} style={{ borderBottom: '1px solid #eef2f3' }}>
                    <td style={{ padding: '18px 20px', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{batch.name}</span>
                        {batch.isFullMoon && (
                          <span className="badge-pill badge-moon" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                            Full Moon
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '18px 20px' }}>{formatDate(batch.arrivalDate)}</td>
                    <td style={{ padding: '18px 20px' }}>{formatDate(batch.departureDate)}</td>
                    <td style={{ padding: '18px 20px' }}><b>{batch.totalDays} Days</b></td>
                    <td style={{ padding: '18px 20px' }}>
                      <span
                        className={`badge-pill ${
                          batch.status === 'AVAILABLE'
                            ? 'badge-status-available'
                            : batch.status === 'FAST_FILLING'
                            ? 'badge-status-filling'
                            : 'badge-status-soldout'
                        }`}
                        style={{ fontSize: '0.72rem', padding: '3px 10px' }}
                      >
                        {batch.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <Link
                        to={`/book-now?departureId=${batch.id}`}
                        className="btn btn-go btn-sm"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        Book Batch
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: '32px',
              padding: '20px 24px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e1e9ec',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}
          >
            <Info size={20} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.6' }}>
              <b>Important Departure Timing Note:</b> Air-route departures may shift by approximately one day depending on flight schedules, Tibet group permit issuance, and weather clearance in high Himalayan sectors. We strongly recommend booking your flight tickets into Kathmandu with flexible rebooking options.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
