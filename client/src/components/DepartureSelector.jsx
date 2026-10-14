import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Moon, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function DepartureSelector({ initialSelectedBatch = 1 }) {
  const [departures, setDepartures] = useState([]);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDepartures() {
      try {
        setLoading(true);
        const data = await api.getDepartures();
        setDepartures(data.departures || []);
        if (initialSelectedBatch && data.departures) {
          const idx = data.departures.findIndex((d) => d.batchNumber === initialSelectedBatch);
          if (idx !== -1) setSelectedBatchIndex(idx);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDepartures();
  }, [initialSelectedBatch]);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--glacier)' }}>
        <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid rgba(233,162,59,0.3)', borderTopColor: 'var(--saffron)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ marginTop: '16px', fontSize: '0.95rem' }}>Loading 2027 departure schedule...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || departures.length === 0) {
    return (
      <div style={{ padding: '40px', background: 'rgba(194,57,47,0.1)', border: '1px solid rgba(194,57,47,0.3)', borderRadius: '14px', color: '#f3b658', textAlign: 'center' }}>
        <p>Unable to load departure batches: {error || 'No dates currently listed'}</p>
      </div>
    );
  }

  const active = departures[selectedBatchIndex] || departures[0];

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

  const handleSelectPackage = (routeCode) => {
    navigate(`/book-now?departureId=${active.id}&routeCode=${routeCode}`);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 320px) 1fr',
        gap: '24px',
        alignItems: 'start',
      }}
      className="departure-widget-grid"
    >
      {/* Left Column: 8 Batches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {departures.map((batch, index) => {
          const isSelected = index === selectedBatchIndex;
          const arrival = new Date(batch.arrivalDate);
          const departure = new Date(batch.departureDate);
          const dateRange = `${arrival.getDate()} ${arrival.toLocaleString('default', { month: 'short' })} – ${departure.getDate()} ${departure.toLocaleString('default', { month: 'short' })}`;

          return (
            <button
              key={batch.id}
              onClick={() => setSelectedBatchIndex(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: isSelected ? '#152933' : '#0e1d24',
                border: isSelected ? '1px solid var(--saffron)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 8px 24px rgba(0, 0, 0, 0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(233, 162, 59, 0.5)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--saffron)' : '#6e858d',
                  }}
                >
                  {String(batch.batchNumber).padStart(2, '0')}
                </span>
                <div>
                  <b style={{ display: 'block', fontSize: '0.98rem', fontWeight: 600, color: isSelected ? '#ffffff' : '#d2dee1' }}>
                    {batch.name}
                  </b>
                  <small style={{ display: 'block', fontSize: '0.8rem', color: '#889da3', marginTop: '2px' }}>
                    {dateRange}
                  </small>
                </div>
              </div>

              {/* Full Moon Indicator Dot */}
              {batch.isFullMoon && (
                <div
                  title="Full Moon Batch"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saffron)',
                    boxShadow: '0 0 10px rgba(233, 162, 59, 0.8)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Column: Detailed Batch Card */}
      <div
        style={{
          background: '#0d1a21',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
          position: 'relative',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--glacier)', display: 'block', marginBottom: '4px' }}>
              YATRA {active.batchNumber} OF {departures.length}
            </span>
            <h3 style={{ fontSize: '2.5rem', color: '#ffffff', fontWeight: 400 }}>
              {active.name}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {active.isFullMoon && (
              <span className="badge-pill badge-moon">
                <span className="dot" />
                <span>Full Moon</span>
              </span>
            )}
            <span
              className={`badge-pill ${
                active.status === 'AVAILABLE'
                  ? 'badge-status-available'
                  : active.status === 'FAST_FILLING'
                  ? 'badge-status-filling'
                  : 'badge-status-soldout'
              }`}
            >
              {active.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Date & Duration Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '24px',
            padding: '24px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '24px',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7e969d', display: 'block', marginBottom: '4px' }}>
              KATHMANDU ARRIVAL
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 500 }}>
              {formatDate(active.arrivalDate)}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7e969d', display: 'block', marginBottom: '4px' }}>
              FINAL DEPARTURE
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 500 }}>
              {formatDate(active.departureDate)}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7e969d', display: 'block', marginBottom: '4px' }}>
              TOTAL DAYS
            </span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--saffron)', fontWeight: 600 }}>
              {active.totalDays}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7e969d', display: 'block', marginBottom: '4px' }}>
              SEATS STATUS
            </span>
            <span style={{ fontSize: '0.95rem', color: '#a2b9be' }}>
              {active.remainingSeats} seats available ({active.bookedSeats} booked)
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: '#c5d5d8', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '36px' }}>
          {active.description || 'Pashupatinath darshan, Lake Manasarovar rituals and the three-day Kailash Parikrama, with pure vegetarian meals throughout.'}
        </p>

        {/* Three Option Package Cards inside Batch card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {/* Option 1 */}
          <div
            style={{
              background: '#091318',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--glacier)', letterSpacing: '0.08em', fontWeight: 600 }}>
                OPTION 1
              </span>
              <h4 style={{ fontSize: '1.35rem', color: '#ffffff', margin: '4px 0 8px' }}>
                Standard
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#889da3', minHeight: '38px' }}>
                By bus both ways
              </p>
              <div style={{ marginTop: '16px' }}>
                <small style={{ color: '#73898f', fontSize: '0.75rem', display: 'block' }}>From</small>
                <b style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--sans)' }}>
                  INR 3,50,000
                </b>
                <small style={{ color: '#73898f', fontSize: '0.72rem', display: 'block' }}>+ 5% GST</small>
              </div>
            </div>
            <button
              onClick={() => handleSelectPackage('bus-both-ways')}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--saffron)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
              }}
            >
              <span>Select package</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Option 2 */}
          <div
            style={{
              background: '#091318',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--glacier)', letterSpacing: '0.08em', fontWeight: 600 }}>
                OPTION 2
              </span>
              <h4 style={{ fontSize: '1.35rem', color: '#ffffff', margin: '4px 0 8px' }}>
                Premium
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#889da3', minHeight: '38px' }}>
                Fly Kathmandu to Lhasa, then by road
              </p>
              <div style={{ marginTop: '16px' }}>
                <small style={{ color: '#73898f', fontSize: '0.75rem', display: 'block' }}>From</small>
                <b style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--sans)' }}>
                  INR 4,37,000
                </b>
                <small style={{ color: '#73898f', fontSize: '0.72rem', display: 'block' }}>+ 5% GST</small>
              </div>
            </div>
            <button
              onClick={() => handleSelectPackage('flight-to-lhasa')}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--saffron)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
              }}
            >
              <span>Select package</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Option 3 */}
          <div
            style={{
              background: '#091318',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--glacier)', letterSpacing: '0.08em', fontWeight: 600 }}>
                OPTION 3
              </span>
              <h4 style={{ fontSize: '1.35rem', color: '#ffffff', margin: '4px 0 8px' }}>
                Elite
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#889da3', minHeight: '38px' }}>
                Fly to Lhasa and Ali/Pulan, then by road
              </p>
              <div style={{ marginTop: '16px' }}>
                <small style={{ color: '#73898f', fontSize: '0.75rem', display: 'block' }}>From</small>
                <b style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--sans)' }}>
                  INR 4,94,000
                </b>
                <small style={{ color: '#73898f', fontSize: '0.72rem', display: 'block' }}>+ 5% GST</small>
              </div>
            </div>
            <button
              onClick={() => handleSelectPackage('lhasa-ali-pulan')}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--saffron)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
              }}
            >
              <span>Select package</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .departure-widget-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
