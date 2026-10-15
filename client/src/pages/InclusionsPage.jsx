import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, AlertTriangle, ShieldCheck, ArrowRight, Info } from 'lucide-react';

export default function InclusionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inclusions = [
    'Tibet Travel Permit and Tibet / China group visa fee',
    'Kathmandu sightseeing, Rudra Homam, and special Puja arrangements',
    'Hotel accommodation in Kathmandu and route hotels / guesthouses as per itinerary',
    'Dormitory-style guesthouse accommodation at Diraphuk and Zutulphuk during Kailash Parikrama',
    'Pure vegetarian meals (breakfast, lunch, dinner) prepared freshly throughout the Yatra',
    'All ground transportation in Nepal and Tibet as specified in the selected itinerary',
    'Professional, English & Hindi-speaking Yatra leader and experienced Nepali support crew',
    'Comprehensive medical support service, pulse oximetry checks, and emergency first aid',
    'Shlloka Yatra expedition gear: Heavy-duty duffel bag, water bottle holder, rain poncho, fleece hat, and sun cap',
    'Certified medical oxygen support cylinders throughout high-altitude plateau travel',
    'Drinking water / purified mineral water provided daily during the journey',
    'Applicable Kathmandu–Lhasa and Lhasa–Ali/Pulan flight sectors for Option 2 and Option 3 packages',
    'Nandi and Ashtapad Darshan (subject to government regulations; vehicle cost to approved viewing point included)',
  ];

  const exclusions = [
    'International and domestic flights to/from Kathmandu (other than sectors specifically included in selected Option)',
    'Nepal entry visa fee (applicable for foreign passport holders; free / not required for Indian citizens)',
    'Mandatory medical and travel insurance (must explicitly cover high-altitude emergency air/land evacuation up to 6,000 m)',
    'Personal medical treatment, hospitalization, or specialized clinical expenses',
    'Pony/horse and personal porter hiring charges during the 3-day Kailash Parikrama (paid directly to local Tibetan horsemen)',
    'Extra hotel nights in Kathmandu due to early arrival, delayed flight departures, or trip shortening',
    'Hotel accommodation at Darchen if a yatri elects not to continue Parikrama and returns from Diraphuk early',
    'Vehicle evacuation cost if taken from any point during the Parikrama to exit the circuit before completion',
    'Personal expenses of any nature (telephone calls, laundry, beverages, tips for Tibetan drivers/guides)',
    'Emergency helicopter rescue costs if separately required',
    'Additional unforeseen expenses arising from natural calamities, landslides, political closures, flight cancellations, or border delays',
  ];

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Transparent Policies
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            Inclusions & Exclusions
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            We believe in complete transparency. Review the exhaustive breakdown of what is covered under your Yatra fee and what personal expenditures remain separate.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* Side-by-Side Breakdown */}
      <section className="sec">
        <div className="wrap">
          <div className="grid-2">
            {/* Inclusions Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #d8e5e8',
                borderTop: '4px solid var(--orange-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(232, 117, 24, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={22} color="var(--orange-primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}>What the Yatra Cost Includes</h3>
                  <small style={{ color: 'var(--muted)' }}>Provided comprehensively by Shlloka Yatra</small>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem', color: 'var(--charcoal)' }}>
                {inclusions.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Check size={18} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ lineHeight: '1.6' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #d8e5e8',
                borderTop: '4px solid #c2392f',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(194, 57, 47, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={22} color="#c2392f" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--ink)' }}>What the Yatra Cost Does Not Include</h3>
                  <small style={{ color: 'var(--muted)' }}>Payable separately or personal responsibility</small>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem', color: 'var(--ink)' }}>
                {exclusions.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <X size={18} color="#c2392f" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ lineHeight: '1.6' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Participation Notes from Brochure */}
          <div
            style={{
              marginTop: '50px',
              background: '#0d1a21',
              borderRadius: '20px',
              padding: '36px',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <AlertTriangle size={24} color="var(--saffron)" />
              <h3 style={{ fontSize: '1.35rem', color: 'var(--saffron)' }}>Important Participation Notes</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', fontSize: '0.9rem', color: '#b9c8cc', lineHeight: '1.7' }}>
              <p>
                <b>Remote Religious Context:</b> Travel in remote Western Tibet requires flexibility. Sudden weather changes, local authority directions, permit processing delays or border gate schedules may require immediate route adaptations.
              </p>
              <p>
                <b>Inherent Terrain Risks:</b> The journey involves high altitude, strenuous trekking, unpredictable climate, and delayed medical evacuation access. Participants must consult their physicians and undergo the recommended 12-week conditioning.
              </p>
              <p>
                <b>Insurance Mandate:</b> Every participant is required to hold comprehensive travel and emergency medical insurance valid for Tibet/China covering emergency helicopter or land evacuation.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/book-now" className="btn btn-go">
              <span>Ready to Book? Proceed to Registration</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
