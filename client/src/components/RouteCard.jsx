import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check, ArrowRight, Plane, Bus } from 'lucide-react';

export default function RouteCard({ route }) {
  const isFlight = route.code !== 'bus-both-ways';

  return (
    <article
      style={{
        background: '#0e1c22',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(233, 162, 59, 0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={route.image || '/images/img_3.jpg'}
          alt={route.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(11, 21, 25, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.8rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {isFlight ? <Plane size={14} color="var(--saffron)" /> : <Bus size={14} color="var(--saffron)" />}
          <span>{route.titleTag}</span>
        </div>
      </div>

      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--glacier)', fontWeight: 600 }}>
            Option {route.routeNumber}
          </span>
          <h3 style={{ fontSize: '1.45rem', color: '#ffffff', margin: '6px 0 12px' }}>
            {route.name}
          </h3>
          <p style={{ color: '#8fa4a9', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
            {route.description}
          </p>

          {/* Highlights List */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {(route.highlights || []).slice(0, 3).map((hl, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#c5d5d8' }}>
                <Check size={16} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '18px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <small style={{ color: '#73898f', fontSize: '0.78rem', display: 'block' }}>Starting from</small>
              <b style={{ color: '#ffffff', fontSize: '1.35rem', fontFamily: 'var(--sans)' }}>
                INR {route.startingFromInr.toLocaleString('en-IN')}
              </b>
              <small style={{ color: '#73898f', fontSize: '0.72rem', display: 'block' }}>+ 5% GST per person</small>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--glacier)', fontSize: '0.82rem' }}>
              <Clock size={14} />
              <span>{route.durationDays} Days</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Link to={`/routes/${route.code}`} className="btn btn-out btn-sm" style={{ padding: '10px 0' }}>
              Full Details
            </Link>
            <Link to={`/book-now?routeCode=${route.code}`} className="btn btn-go btn-sm" style={{ padding: '10px 0' }}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
