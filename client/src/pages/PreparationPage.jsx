import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, CheckSquare, HeartPulse, Sparkles, ArrowRight, Thermometer, Luggage } from 'lucide-react';

export default function PreparationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Preparation & Safety
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px', color: '#FFFFFF' }}>
            The 12-Week Yatri Preparation Guide
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            The sacred journey begins months before you touch down in Kathmandu. Through physical conditioning, altitude awareness, and purposeful packing, you arrive ready to embrace Kailash with peace of mind.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* 12-Week Fitness Regimen */}
      <section className="sec">
        <div className="wrap">
          <div style={{ marginBottom: '44px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--saffron)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              Physical Conditioning
            </span>
            <h2 className="t">Structured 12-Week Training Plan</h2>
            <p className="lead">
              Mount Kailash Parikrama reaches 5,650 meters. Building cardiovascular efficiency and leg stamina ensures a comfortable, transformative yatra.
            </p>
          </div>

          <div className="grid-3">
            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid #e1e9ec', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Weeks 1 – 4</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--ink)' }}>Foundation & Aerobics</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--muted)' }}>
                <li>• <b>Brisk Walking:</b> 45 minutes daily at comfortable conversational pace.</li>
                <li>• <b>Breathing exercises:</b> 15 minutes of Pranayama (Anulom Vilom & Kapalabhati) every morning.</li>
                <li>• <b>Hydration habit:</b> Drink 3 to 4 liters of clean water daily.</li>
                <li>• <b>Medical check:</b> Baseline ECG, blood pressure, and physician sign-off.</li>
              </ul>
            </div>

            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '2px solid var(--saffron)', boxShadow: 'var(--shadow-md)' }}>
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Weeks 5 – 8</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--ink)' }}>Stamina & Stair Incline</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--muted)' }}>
                <li>• <b>Stair Climbing:</b> 20–30 minutes climbing stairs without elevator use.</li>
                <li>• <b>Weekend Hikes:</b> 8–10 km walks on natural trails with gentle inclines.</li>
                <li>• <b>Strength Training:</b> Bodyweight squats, calf raises, and core plank holds.</li>
                <li>• <b>Gear Break-in:</b> Begin wearing your trekking boots to prevent trail blisters.</li>
              </ul>
            </div>

            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid #e1e9ec', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>Weeks 9 – 12</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--ink)' }}>Endurance & Pack Training</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--muted)' }}>
                <li>• <b>Weighted Daypack:</b> Walk with a 4–5 kg backpack simulating yatra gear.</li>
                <li>• <b>Long Duration Walk:</b> One 12–14 km continuous walk every weekend.</li>
                <li>• <b>Taper & Rest:</b> In the final week, reduce intense strain; focus on restful sleep and positive mental presence.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* High Altitude Sickness & Health Protocol */}
      <section className="sec dark" style={{ background: '#0a161b' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--saffron)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                High-Altitude Awareness
              </span>
              <h2 className="t" style={{ marginTop: '8px' }}>
                Understanding AMS & Safety Protocols
              </h2>
              <p style={{ color: '#b6c9cd', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '18px' }}>
                At altitudes above 3,500 meters, atmospheric pressure drops and oxygen molecules per breath are reduced. Our team follows proven acclimatisation rules:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.94rem', color: '#c5d5d8' }}>
                <li><b>1. Climb High, Sleep Low:</b> Gradual altitude gain with built-in rest days in Nyalam and Lhasa.</li>
                <li><b>2. Daily Vitals Check:</b> Morning and evening SpO2 (blood oxygen) and pulse rate monitoring by our medical crew.</li>
                <li><b>3. Continuous Oxygen Backup:</b> Certified medical oxygen cylinders and portable canisters accompanying the group at all times.</li>
                <li><b>4. Proactive Communication:</b> Yatris must inform guides immediately of headache, nausea, or dizziness.</li>
              </ul>
            </div>

            <div>
              <div style={{ background: '#12232a', padding: '36px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <HeartPulse size={32} color="var(--saffron)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>
                  Medical Clearance Checklist
                </h3>
                <p style={{ color: '#8fa4a9', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  All yatris are required to complete a medical fitness questionnaire prior to visa submission. Yatris with pre-existing coronary, pulmonary or severe hypertension conditions must obtain clearance from a cardiologist.
                </p>
                <div style={{ background: '#091318', padding: '16px 20px', borderRadius: '12px', borderLeft: '3px solid var(--saffron)' }}>
                  <small style={{ color: 'var(--saffron)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Safety Guarantee</small>
                  <span style={{ fontSize: '0.85rem', color: '#c5d5d8' }}>
                    If any yatri experiences acute mountain discomfort during Parikrama, emergency descent vehicles and trained escorts are deployed immediately without delay.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packing Checklist */}
      <section className="sec">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 className="t t-center">Essential Packing Checklist</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Temperatures at Kailash can fluctuate between +18°C during sunny afternoons to -8°C at night at Diraphuk. Layering is key.
            </p>
          </div>

          <div className="grid-3">
            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e9ec' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--ink)' }}>Clothing & Layering</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                <li>✓ 2–3 pairs thermal innerwear (merino wool/poly)</li>
                <li>✓ Fleece jacket / windproof softshell</li>
                <li>✓ Heavy down jacket with hood (suitable for -10°C)</li>
                <li>✓ Waterproof / quick-dry trekking trousers</li>
                <li>✓ Woolen gloves + waterproof outer mittens</li>
                <li>✓ Woolen trekking socks (4–5 pairs)</li>
              </ul>
            </div>

            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e9ec' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--ink)' }}>Footwear & Trek Gear</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                <li>✓ Sturdy waterproof trekking boots with ankle support</li>
                <li>✓ Camp shoes / comfortable slip-on sneakers</li>
                <li>✓ Pair of adjustable trekking poles</li>
                <li>✓ UV400 polarized sunglasses (essential for snow glare)</li>
                <li>✓ High-lumen headlamp with spare batteries</li>
                <li>✓ 1-liter insulated thermos flask for warm water</li>
              </ul>
            </div>

            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e9ec' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--ink)' }}>Provided by Shlloka</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                <li>★ Heavy-duty Shlloka Yatra duffel bag for main luggage</li>
                <li>★ Waterproof rain poncho</li>
                <li>★ Warm fleece beanie hat</li>
                <li>★ Wide-brim sun cap</li>
                <li>★ Water bottle hanging holster</li>
                <li>★ Certified medical oxygen cylinders for the group</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
