import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, ShieldCheck, CreditCard, Building2, HelpCircle } from 'lucide-react';
import { OFFICIAL_PACKAGES_2027 } from '../data/brochureData';

export default function PricingTable() {
  const [passportType, setPassportType] = useState('INDIAN'); // 'INDIAN' | 'FOREIGN'

  return (
    <div style={{ width: '100%' }}>
      {/* Nationality Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <div
          style={{
            background: '#221C18',
            border: '1.5px solid rgba(245, 184, 46, 0.25)',
            padding: '6px',
            borderRadius: '999px',
            display: 'inline-flex',
            gap: '8px',
          }}
        >
          <button
            onClick={() => setPassportType('INDIAN')}
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              border: 'none',
              background: passportType === 'INDIAN' ? 'var(--orange-primary)' : 'transparent',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            🇮🇳 Indian Passport Holders
          </button>
          <button
            onClick={() => setPassportType('FOREIGN')}
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              border: 'none',
              background: passportType === 'FOREIGN' ? 'var(--orange-primary)' : 'transparent',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            🌍 Foreign & NRI Passport Holders
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
          marginBottom: '50px',
        }}
      >
        {/* Option 1 */}
        <div
          style={{
            background: '#221C18',
            border: '1px solid rgba(255, 249, 240, 0.12)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--yellow-warm)',
                fontWeight: 700,
              }}
            >
              Option 1
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: '6px 0 4px', fontWeight: 400 }}>
              Classic Overland
            </h3>
            <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginBottom: '24px' }}>
              By bus both ways via Kodari, Nyalam & Saga
            </p>

            <div
              style={{
                padding: '20px 0',
                borderTop: '1px solid rgba(255, 249, 240, 0.1)',
                borderBottom: '1px solid rgba(255, 249, 240, 0.1)',
                marginBottom: '24px',
              }}
            >
              <small style={{ color: '#A8998C', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#FFFFFF', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? '₹3,50,000' : '₹4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--yellow-warm)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : 'No flight supplement'}
              </small>
            </div>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '30px',
                fontSize: '0.88rem',
                color: '#E9DCCB',
              }}
            >
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Tibet Travel Permit & Visa included
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Kathmandu sightseeing & Rudra Homam
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Lake Manasarovar rituals & Jal collection
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> 3-day Kailash Parikrama support
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Pure vegetarian meal crew & oxygen
              </li>
            </ul>
          </div>

          <Link
            to="/book-now?routeCode=bus-both-ways"
            className="btn btn-out"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Select Classic Overland
          </Link>
        </div>

        {/* Option 2 (Featured) */}
        <div
          style={{
            background: '#2B231E',
            border: '2px solid var(--orange-primary)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-13px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--orange-primary)',
              color: '#FFFFFF',
              padding: '4px 18px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Most Popular
          </div>

          <div>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--yellow-warm)',
                fontWeight: 700,
              }}
            >
              Option 2
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: '6px 0 4px', fontWeight: 400 }}>
              Fly to Lhasa, Road to Kailash
            </h3>
            <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fly Kathmandu to Lhasa, then continue by road
            </p>

            <div
              style={{
                padding: '20px 0',
                borderTop: '1px solid rgba(255, 249, 240, 0.1)',
                borderBottom: '1px solid rgba(255, 249, 240, 0.1)',
                marginBottom: '24px',
              }}
            >
              <small style={{ color: '#A8998C', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#FFFFFF', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? '₹4,37,000' : '₹4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--yellow-warm)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : '+ US$ 600 flight sector supplement'}
              </small>
            </div>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '30px',
                fontSize: '0.88rem',
                color: '#E9DCCB',
              }}
            >
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Includes Kathmandu-Lhasa flight
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Potala Palace & Jokhang entry included
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Smoother, gentler acclimatisation in Lhasa
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Shigatse & Tibetan plateau exploration
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Full 3-day Kailash Parikrama rituals
              </li>
            </ul>
          </div>

          <Link
            to="/book-now?routeCode=flight-to-lhasa"
            className="btn btn-go"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Select Lhasa Road
          </Link>
        </div>

        {/* Option 3 */}
        <div
          style={{
            background: '#221C18',
            border: '1px solid rgba(255, 249, 240, 0.12)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--yellow-warm)',
                fontWeight: 700,
              }}
            >
              Option 3
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: '6px 0 4px', fontWeight: 400 }}>
              Fly Lhasa & Ali/Pulan
            </h3>
            <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginBottom: '24px' }}>
              Dual flights: KTM to Lhasa & Lhasa to Ali/Pulan
            </p>

            <div
              style={{
                padding: '20px 0',
                borderTop: '1px solid rgba(255, 249, 240, 0.1)',
                borderBottom: '1px solid rgba(255, 249, 240, 0.1)',
                marginBottom: '24px',
              }}
            >
              <small style={{ color: '#A8998C', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#FFFFFF', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? '₹4,94,000' : '₹4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--yellow-warm)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : '+ US$ 1,200 dual flight supplement'}
              </small>
            </div>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '30px',
                fontSize: '0.88rem',
                color: '#E9DCCB',
              }}
            >
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Dual flight sectors: KTM-LXA & LXA-NGQ
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Minimal road travel & lowest fatigue
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Lhasa heritage + Sera Monastery
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Ideal for seniors and comfort seekers
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Check size={16} color="var(--yellow-warm)" /> Priority support throughout
              </li>
            </ul>
          </div>

          <Link
            to="/book-now?routeCode=lhasa-ali-pulan"
            className="btn btn-out"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Select Dual Flights
          </Link>
        </div>
      </div>

      {/* Payment Terms & Official Bank Account Box */}
      <div
        style={{
          background: '#1A1512',
          border: '1px solid rgba(245, 184, 46, 0.25)',
          borderRadius: '18px',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}
      >
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '1.2rem',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CreditCard size={18} color="var(--yellow-warm)" />
            <span>Booking Amount & Payment Terms</span>
          </h4>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.88rem',
              color: '#E9DCCB',
            }}
          >
            <li>
              • <b style={{ color: '#FFF9F0' }}>Registration Deposit:</b> Pay ₹25,000 (or USD 250) per person. Non-refundable.
            </li>
            <li>
              • <b style={{ color: '#FFF9F0' }}>Stage 1 Confirmation:</b> 50% payment to secure permits and yatra quota.
            </li>
            <li>
              • <b style={{ color: '#FFF9F0' }}>Stage 2 Balance:</b> Remaining 50% payable 30 days after the first payment.
            </li>
            <li>• The initial deposit forms part of the final package payment.</li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '1.2rem',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Building2 size={18} color="var(--yellow-warm)" />
            <span>Official Bank Account Information</span>
          </h4>
          <div
            style={{
              background: '#221C18',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 249, 240, 0.08)',
              fontSize: '0.85rem',
            }}
          >
            <p style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '6px' }}>Shlloka Yatra Private Limited</p>
            <p style={{ color: '#D6CBC1', marginBottom: '2px' }}>
              Account Number:{' '}
              <span style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 600 }}>201037169009</span>
            </p>
            <p style={{ color: '#D6CBC1', marginBottom: '2px' }}>
              IFSC Code:{' '}
              <span style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 600 }}>INDB0000672</span>
            </p>
            <p style={{ color: '#D6CBC1' }}>
              Bank: <span style={{ color: '#FFF9F0' }}>IndusInd Bank (Current Account)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
