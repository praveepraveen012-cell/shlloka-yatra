import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, ShieldCheck, CreditCard, Building2, HelpCircle } from 'lucide-react';

export default function PricingTable({ routes = [] }) {
  const [passportType, setPassportType] = useState('INDIAN'); // 'INDIAN' | 'FOREIGN'

  return (
    <div style={{ width: '100%' }}>
      {/* Nationality Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <div
          style={{
            background: '#09151a',
            border: '1px solid rgba(255, 255, 255, 0.14)',
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
              background: passportType === 'INDIAN' ? 'var(--saffron)' : 'transparent',
              color: passportType === 'INDIAN' ? '#122126' : '#c5d5d8',
              fontWeight: 600,
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
              background: passportType === 'FOREIGN' ? 'var(--saffron)' : 'transparent',
              color: passportType === 'FOREIGN' ? '#122126' : '#c5d5d8',
              fontWeight: 600,
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '50px' }}>
        {/* Option 1 */}
        <div
          style={{
            background: '#0e1c22',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--glacier)', fontWeight: 600 }}>
              Option 1
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '6px 0 4px' }}>
              Standard Overland
            </h3>
            <p style={{ color: '#889da3', fontSize: '0.9rem', marginBottom: '24px' }}>
              By bus both ways via Kodari & Nyalam
            </p>

            <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
              <small style={{ color: '#73898f', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#ffffff', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? 'INR 3,50,000' : 'INR 4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--saffron)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : 'No air supplement'}
              </small>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', fontSize: '0.88rem', color: '#c5d5d8' }}>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Tibet Travel Permit & Visa included</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Kathmandu sightseeing & Rudra Homam</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Lake Manasarovar rituals & Jal</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> 3-day Kailash Parikrama support</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Pure vegetarian meal crew & oxygen</li>
            </ul>
          </div>

          <Link to="/book-now?routeCode=bus-both-ways" className="btn btn-out" style={{ width: '100%' }}>
            Select Standard
          </Link>
        </div>

        {/* Option 2 (Featured) */}
        <div
          style={{
            background: 'linear-gradient(180deg, #162c36 0%, #0e1e25 100%)',
            border: '2px solid var(--saffron)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-13px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--saffron)',
              color: '#1a1205',
              padding: '4px 16px',
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
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--glacier)', fontWeight: 600 }}>
              Option 2
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '6px 0 4px' }}>
              Premium Lhasa Road
            </h3>
            <p style={{ color: '#889da3', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fly Kathmandu to Lhasa, then continue by road
            </p>

            <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '24px' }}>
              <small style={{ color: '#73898f', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#ffffff', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? 'INR 4,37,000' : 'INR 4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--saffron)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : '+ US$ 600 flight sector supplement'}
              </small>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', fontSize: '0.88rem', color: '#c5d5d8' }}>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Includes Kathmandu-Lhasa flight</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Potala Palace & Jokhang entry included</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Smoother, gentler acclimatisation in Lhasa</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Shigatse & Tibetan plateau exploration</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Full 3-day Kailash Parikrama rituals</li>
            </ul>
          </div>

          <Link to="/book-now?routeCode=flight-to-lhasa" className="btn btn-go" style={{ width: '100%' }}>
            Select Premium
          </Link>
        </div>

        {/* Option 3 */}
        <div
          style={{
            background: '#0e1c22',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--glacier)', fontWeight: 600 }}>
              Option 3
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '6px 0 4px' }}>
              Elite Dual Flights
            </h3>
            <p style={{ color: '#889da3', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fly Kathmandu to Lhasa & Lhasa to Ali/Pulan
            </p>

            <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
              <small style={{ color: '#73898f', fontSize: '0.8rem', display: 'block' }}>Per Person</small>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <b style={{ color: '#ffffff', fontSize: '2rem', fontFamily: 'var(--sans)' }}>
                  {passportType === 'INDIAN' ? 'INR 4,94,000' : 'INR 4,25,000'}
                </b>
              </div>
              <small style={{ color: 'var(--saffron)', fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                {passportType === 'INDIAN' ? '+ 5% GST applicable' : '+ US$ 1,200 dual flight supplement'}
              </small>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', fontSize: '0.88rem', color: '#c5d5d8' }}>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Dual flight sectors: KTM-LXA & LXA-NGQ</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Minimal road travel & fatigue</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Lhasa heritage + Sera Monastery</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Ideal for seniors and comfort seekers</li>
              <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--saffron)" /> Dedicated priority support throughout</li>
            </ul>
          </div>

          <Link to="/book-now?routeCode=lhasa-ali-pulan" className="btn btn-out" style={{ width: '100%' }}>
            Select Elite
          </Link>
        </div>
      </div>

      {/* Payment Milestones & Bank Info Box */}
      <div
        style={{
          background: '#0d1b22',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '18px',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}
      >
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--saffron)" />
            <span>Booking Amount & Payment Terms</span>
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#b9c8cc' }}>
            <li>• <b>Registration Deposit:</b> Pay INR 25,000 (or USD 250) per person. Non-refundable.</li>
            <li>• <b>Confirmation (Stage 1):</b> 50% payment to secure permit applications and yatra confirmation.</li>
            <li>• <b>Balance (Stage 2):</b> Remaining 50% payable 30 days after the first payment.</li>
            <li>• The initial deposit forms part of the final package payment.</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="var(--saffron)" />
            <span>Official Bank Account Information</span>
          </h4>
          <div style={{ background: '#081216', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
            <p style={{ color: '#ffffff', fontWeight: 600, marginBottom: '4px' }}>Shlloka Yatra Private Limited</p>
            <p style={{ color: '#889da3' }}>Account Number: <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>201037169009</span></p>
            <p style={{ color: '#889da3' }}>IFSC Code: <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>INDB0000672</span></p>
            <p style={{ color: '#889da3' }}>Bank: <span style={{ color: '#ffffff' }}>IndusInd Bank (Current Account)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
