import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Moon, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import DepartureSelector from '../components/DepartureSelector';
import api from '../services/api';
import { OFFICIAL_SCHEDULE_DISCLAIMER } from '../data/brochureData';

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
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Hero Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            2027 Pilgrimage Calendar
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Official 2027 Departure Batches
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Eight brochure-published departure batches operating between May and August 2027. Four batches are specifically timed to coincide with sacred Full Moon nights at holy Lake Manasarovar and Mount Kailash.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Interactive Batch Selector */}
      <section className="sec sec-dark" style={{ background: 'var(--deep)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              Interactive Batch Calendar
            </span>
            <h2 className="t t-center" style={{ color: '#FFFFFF' }}>Select Your 2027 Batch</h2>
          </div>
          <DepartureSelector />
        </div>
      </section>

      {/* Full Tabular Schedule from Brochure */}
      <section className="sec">
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <span className="eyebrow">Brochure Published Dates</span>
            <h2 className="t" style={{ color: 'var(--charcoal)' }}>Complete 2027 Departure Schedule Table</h2>
            <p className="lead" style={{ color: 'var(--muted)' }}>
              Official schedule as published in the Shlloka Yatra 2027 brochure.
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
                border: '1px solid #E5DDD3',
              }}
            >
              <thead>
                <tr style={{ background: '#29231E', color: '#FFFFFF', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Batch</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Kathmandu Arrival</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Final Departure</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Duration</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Full Moon Alignment</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.92rem', color: 'var(--charcoal)' }}>
                {departures.map((batch) => (
                  <tr key={batch.id} style={{ borderBottom: '1px solid #F0E8DF' }}>
                    <td style={{ padding: '18px 20px', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#29231E' }}>{batch.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '18px 20px', color: '#40362E' }}>{formatDate(batch.arrivalDate)}</td>
                    <td style={{ padding: '18px 20px', color: '#40362E' }}>{formatDate(batch.departureDate)}</td>
                    <td style={{ padding: '18px 20px', color: '#29231E', fontWeight: 600 }}>{batch.totalDays} Days</td>
                    <td style={{ padding: '18px 20px' }}>
                      {batch.isFullMoon ? (
                        <span
                          className="badge-pill badge-moon"
                          style={{
                            fontSize: '0.74rem',
                            padding: '4px 10px',
                            background: 'rgba(245, 184, 46, 0.18)',
                            color: 'var(--orange-deep)',
                            border: '1px solid rgba(245, 184, 46, 0.45)',
                          }}
                        >
                          <Moon size={11} fill="var(--orange-deep)" />
                          <span>{batch.fullMoonLabel || 'Full Moon'}</span>
                        </span>
                      ) : (
                        <span style={{ color: '#8C7F73', fontSize: '0.82rem' }}>Regular Season</span>
                      )}
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <Link
                        to={`/book-now?departureId=${batch.id}`}
                        className="btn btn-go btn-sm"
                        style={{ padding: '7px 16px', fontSize: '0.82rem' }}
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
              marginTop: '28px',
              padding: '20px 24px',
              background: '#FFF9F0',
              borderRadius: '14px',
              border: '1px solid rgba(232, 117, 24, 0.25)',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}
          >
            <Info size={20} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.9rem', color: '#40362E', lineHeight: '1.6' }}>
              <b style={{ color: '#29231E' }}>Schedule & Permit Notice: </b>
              {OFFICIAL_SCHEDULE_DISCLAIMER}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
