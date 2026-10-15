import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Moon, ArrowRight, ShieldCheck, Info, Check, Sparkles } from 'lucide-react';
import api from '../services/api';
import { OFFICIAL_SCHEDULE_DISCLAIMER } from '../data/brochureData';

export default function DepartureSelector({ initialSelectedBatch = 1 }) {
  const [departures, setDepartures] = useState([]);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDepartures() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getDepartures();
        const list = data.departures || [];
        setDepartures(list);

        if (initialSelectedBatch && list.length > 0) {
          const idx = list.findIndex(
            (d) => d.batchNumber === initialSelectedBatch || d.id === initialSelectedBatch
          );
          if (idx !== -1) setSelectedBatchIndex(idx);
        }
      } catch (err) {
        setError(err.message || 'Unable to load departure batches.');
      } finally {
        setLoading(false);
      }
    }
    loadDepartures();
  }, [initialSelectedBatch]);

  // Format human-readable date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const months = [
    { key: 'ALL', label: 'All 8 Batches' },
    { key: '2027-05', label: 'May 2027' },
    { key: '2027-06', label: 'June 2027' },
    { key: '2027-07', label: 'July 2027' },
    { key: '2027-08', label: 'August 2027' },
  ];

  const filteredDepartures =
    selectedMonth === 'ALL'
      ? departures
      : departures.filter((d) => d.monthKey === selectedMonth || (d.arrivalDate && d.arrivalDate.startsWith(selectedMonth)));

  const activeBatch = departures[selectedBatchIndex] || departures[0] || null;

  const handleSelectPackage = (routeCode) => {
    if (!activeBatch) return;
    navigate(`/book-now?departureId=${activeBatch.id}&routeCode=${routeCode}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#E9DCCB' }}>
        <div
          style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(245, 184, 46, 0.3)',
            borderTopColor: 'var(--orange-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ marginTop: '16px', fontSize: '1rem', color: '#FFF9F0' }}>
          Loading 2027 departure schedule...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error && departures.length === 0) {
    return (
      <div
        style={{
          padding: '36px',
          background: 'rgba(185, 74, 22, 0.15)',
          border: '1px solid var(--orange-deep)',
          borderRadius: '16px',
          color: '#FFF9F0',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>
          Notice regarding departures
        </p>
        <p style={{ fontSize: '0.92rem', color: '#E9DCCB' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Month Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        {months.map((m) => {
          const isSelected = selectedMonth === m.key;
          return (
            <button
              key={m.key}
              onClick={() => {
                setSelectedMonth(m.key);
                if (m.key !== 'ALL') {
                  const firstMatch = departures.findIndex(
                    (d) => d.monthKey === m.key || (d.arrivalDate && d.arrivalDate.startsWith(m.key))
                  );
                  if (firstMatch !== -1) setSelectedBatchIndex(firstMatch);
                }
              }}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: isSelected ? '1.5px solid var(--orange-primary)' : '1px solid rgba(255, 249, 240, 0.16)',
                background: isSelected ? 'var(--orange-primary)' : 'rgba(43, 35, 30, 0.7)',
                color: isSelected ? '#FFFFFF' : '#E9DCCB',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Batches on Left, Selected Batch Details on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
        className="departure-widget-grid"
      >
        {/* Left Column: Batches List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredDepartures.map((batch) => {
            const indexInAll = departures.findIndex((d) => d.id === batch.id);
            const isSelected = indexInAll === selectedBatchIndex;
            const arrivalFormatted = formatDate(batch.arrivalDate);
            const departureFormatted = formatDate(batch.departureDate);

            return (
              <button
                key={batch.id}
                onClick={() => setSelectedBatchIndex(indexInAll)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: isSelected ? '#362C25' : '#221C18',
                  border: isSelected ? '1.5px solid var(--yellow-warm)' : '1px solid rgba(255, 249, 240, 0.1)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(0, 0, 0, 0.35)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'rgba(245, 184, 46, 0.5)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 249, 240, 0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: isSelected ? 'var(--yellow-warm)' : '#A8998C',
                    }}
                  >
                    {String(batch.batchNumber).padStart(2, '0')}
                  </span>
                  <div>
                    <b
                      style={{
                        display: 'block',
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: isSelected ? '#FFFFFF' : '#FFF9F0',
                      }}
                    >
                      {batch.name}
                    </b>
                    <small style={{ display: 'block', fontSize: '0.8rem', color: '#D6CBC1', marginTop: '2px' }}>
                      {arrivalFormatted} – {departureFormatted}
                    </small>
                  </div>
                </div>

                {/* Full Moon Badge */}
                {batch.isFullMoon && (
                  <span
                    title={batch.fullMoonLabel || 'Full Moon Batch'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(245, 184, 46, 0.2)',
                      color: 'var(--yellow-warm)',
                      border: '1px solid rgba(245, 184, 46, 0.4)',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    <Moon size={11} fill="var(--yellow-warm)" />
                    <span>Full Moon</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Batch Details Card */}
        {activeBatch && (
          <div
            style={{
              background: '#221C18',
              border: '1.5px solid rgba(245, 184, 46, 0.25)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--yellow-warm)',
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 600,
                  }}
                >
                  BATCH {activeBatch.batchNumber} OF 8 • {activeBatch.monthLabel || '2027 SEASON'}
                </span>
                <h3 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: '#FFFFFF', fontWeight: 400 }}>
                  {activeBatch.name}
                </h3>
              </div>

              {activeBatch.isFullMoon && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(245, 184, 46, 0.16)',
                    color: 'var(--yellow-warm)',
                    border: '1px solid rgba(245, 184, 46, 0.4)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  <Moon size={14} fill="var(--yellow-warm)" />
                  <span>{activeBatch.fullMoonLabel || 'Sacred Full Moon Alignment'}</span>
                </div>
              )}
            </div>

            {/* Date & Duration Summary Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                padding: '22px',
                background: '#1A1512',
                borderRadius: '16px',
                border: '1px solid rgba(255, 249, 240, 0.08)',
                marginBottom: '26px',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#A8998C',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  KATHMANDU ARRIVAL
                </span>
                <strong style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
                  {formatDate(activeBatch.arrivalDate)}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#A8998C',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  FINAL DEPARTURE
                </span>
                <strong style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
                  {formatDate(activeBatch.departureDate)}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#A8998C',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  STATED DURATION
                </span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--yellow-warm)', fontWeight: 700 }}>
                  {activeBatch.totalDays} Days
                </strong>
              </div>
            </div>

            {/* Batch Description & Brochure Note */}
            <p style={{ color: '#E9DCCB', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '30px' }}>
              {activeBatch.description}
            </p>

            {/* Three Travel Packages for this Batch */}
            <div style={{ marginBottom: '28px' }}>
              <h4
                style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--yellow-warm)',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Choose Package for this Batch:
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {/* Option 1 */}
                <div
                  style={{
                    background: '#1A1512',
                    border: '1px solid rgba(255, 249, 240, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--yellow-warm)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Option 1
                    </span>
                    <h5 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: '4px 0 6px', fontWeight: 600 }}>
                      Classic Overland
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#D6CBC1', marginBottom: '14px' }}>
                      By Bus Both Ways via Nyalam & Saga
                    </p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                      ₹3,50,000
                    </div>
                    <small style={{ fontSize: '0.74rem', color: '#A8998C', display: 'block', marginBottom: '16px' }}>
                      + 5% GST (Indian) • ₹4,25,000 (Foreign)
                    </small>
                  </div>
                  <button
                    onClick={() => handleSelectPackage('bus-both-ways')}
                    className="btn btn-login-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Select Option 1
                  </button>
                </div>

                {/* Option 2 */}
                <div
                  style={{
                    background: '#2B231E',
                    border: '1.5px solid var(--orange-primary)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '16px',
                        background: 'var(--orange-primary)',
                        color: '#FFFFFF',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Featured
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--yellow-warm)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Option 2
                    </span>
                    <h5 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: '4px 0 6px', fontWeight: 600 }}>
                      Fly to Lhasa + Road
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#D6CBC1', marginBottom: '14px' }}>
                      KTM to Lhasa Flight + Plateau Overland
                    </p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                      ₹4,37,000
                    </div>
                    <small style={{ fontSize: '0.74rem', color: '#A8998C', display: 'block', marginBottom: '16px' }}>
                      + 5% GST (Indian) • +$600 flight (Foreign)
                    </small>
                  </div>
                  <button
                    onClick={() => handleSelectPackage('flight-to-lhasa')}
                    className="btn btn-go btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Select Option 2
                  </button>
                </div>

                {/* Option 3 */}
                <div
                  style={{
                    background: '#1A1512',
                    border: '1px solid rgba(255, 249, 240, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--yellow-warm)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Option 3
                    </span>
                    <h5 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: '4px 0 6px', fontWeight: 600 }}>
                      Fly Lhasa & Ali/Pulan
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#D6CBC1', marginBottom: '14px' }}>
                      Dual Flight Sectors for Maximum Comfort
                    </p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                      ₹4,94,000
                    </div>
                    <small style={{ fontSize: '0.74rem', color: '#A8998C', display: 'block', marginBottom: '16px' }}>
                      + 5% GST (Indian) • +$1,200 flights (Foreign)
                    </small>
                  </div>
                  <button
                    onClick={() => handleSelectPackage('lhasa-ali-pulan')}
                    className="btn btn-login-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Select Option 3
                  </button>
                </div>
              </div>
            </div>

            {/* Official Brochure Disclaimer Banner */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px 18px',
                background: 'rgba(26, 21, 18, 0.8)',
                border: '1px solid rgba(245, 184, 46, 0.2)',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: '#D6CBC1',
                lineHeight: '1.6',
              }}
            >
              <Info size={16} color="var(--yellow-warm)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFF9F0' }}>Published Brochure Schedule: </strong>
                {OFFICIAL_SCHEDULE_DISCLAIMER}
              </div>
            </div>
          </div>
        )}
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
