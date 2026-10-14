import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle,
  FileText,
  Phone,
  Mail,
  Send,
  AlertCircle,
  Bus,
  Plane,
} from 'lucide-react';
import DepartureSelector from '../components/DepartureSelector';
import PricingTable from '../components/PricingTable';
import api from '../services/api';

export default function Landing2027Page() {
  const [routes, setRoutes] = useState([]);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    routeInterest: 'Option 2: Fly to Lhasa, Continue by Road',
    preferredBatch: 'June II Batch — Full Moon (6 Jun - 21 Jun 2027)',
    notes: '',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoutes().then((data) => setRoutes(data.routes || [])).catch(() => {});
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setLeadError(null);
    try {
      await api.submitEnquiry({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        type: 'GENERAL',
        message: `Campaign Lead (2027 Landing Page) | Interested in: ${leadForm.routeInterest} | Preferred Batch: ${leadForm.preferredBatch} | Notes: ${leadForm.notes || 'None'}`,
      });
      setLeadSubmitted(true);
    } catch (err) {
      setLeadError(err.message || 'Unable to submit enquiry. Please call our team directly.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--night)', color: '#ffffff' }}>
      {/* 1. 2027 Dedicated Campaign Hero */}
      <section
        style={{
          position: 'relative',
          padding: '170px 0 110px',
          background:
            'radial-gradient(circle at 50% 20%, rgba(233, 162, 59, 0.28) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(143, 176, 189, 0.18) 0%, transparent 50%), #071216',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
        }}
      >
        <div className="wrap">
          <div
            className="badge-pill badge-gold"
            style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Sparkles size={14} />
            <span>Dedicated 2027 Pilgrimage Campaign</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(42px, 6.5vw, 84px)',
              fontWeight: 300,
              maxWidth: '19ch',
              margin: '0 auto 24px',
              lineHeight: 1.12,
            }}
          >
            Kailash Mansarovar Parikrama Yatra 2027
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.28rem)',
              color: '#d0dfe2',
              maxWidth: '660px',
              margin: '0 auto 40px',
              lineHeight: '1.7',
            }}
          >
            Confirmed departure batches from May through August 2027. Transparent pricing for Indian and Foreign passport holders, experienced Sherpa teams, and authentic pilgrimage guidance.
          </p>

          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link to="/book" className="btn btn-go" style={{ padding: '16px 36px', fontSize: '1.02rem' }}>
              <span>Book Your 2027 Yatra</span>
              <ArrowRight size={17} />
            </Link>
            <a href="#enquiry-form" className="btn btn-out" style={{ padding: '16px 32px', fontSize: '1.02rem' }}>
              <Mail size={16} />
              <span>Get 2027 Brochure & Advice</span>
            </a>
          </div>

          {/* Factual Brochure Highlights Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginTop: '70px',
              padding: '30px',
              background: 'rgba(18, 35, 42, 0.75)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--saffron)', fontFamily: 'var(--serif)' }}>
                8
              </b>
              <span style={{ fontSize: '0.85rem', color: '#b6c9cd' }}>
                Confirmed Batches (May to Aug 2027)
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--saffron)', fontFamily: 'var(--serif)' }}>
                4
              </b>
              <span style={{ fontSize: '0.85rem', color: '#b6c9cd' }}>
                Full Moon Alignments at Mansarovar
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--saffron)', fontFamily: 'var(--serif)' }}>
                5,630 m
              </b>
              <span style={{ fontSize: '0.85rem', color: '#b6c9cd' }}>
                Dolma La Pass Elevation
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--saffron)', fontFamily: 'var(--serif)' }}>
                100%
              </b>
              <span style={{ fontSize: '0.85rem', color: '#b6c9cd' }}>
                Pure Vegetarian & Jain Food
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2027 Departures Section */}
      <section className="sec" id="schedule" style={{ background: '#0b171c' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--glacier)', display: 'block', marginBottom: '8px' }}>
              8 Confirmed Departures
            </span>
            <h2 className="t t-center">2027 Fixed Departure Schedule</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Batches aligned with auspicious Full Moon nights at Lake Mansarovar and Mount Kailash. Early registration is advised as air sectors have strictly limited allocations.
            </p>
          </div>

          <DepartureSelector initialSelectedBatch={1} />
        </div>
      </section>

      {/* 3. Three Package Options */}
      <section className="sec" style={{ background: '#081115' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '46px' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--saffron)', display: 'block', marginBottom: '8px' }}>
              Transparent Travel Options
            </span>
            <h2 className="t t-center">2027 Pilgrimage Packages & Pricing</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Lock in your 2027 yatra slot today with a registration deposit of INR 25,000 (or USD 250).
            </p>
          </div>

          <PricingTable routes={routes} />
        </div>
      </section>

      {/* 4. Lead Capture Form Section */}
      <section className="sec" id="enquiry-form" style={{ background: '#0d1d25' }}>
        <div className="wrap-sm">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
              Direct Advisor Coordination
            </span>
            <h2 className="t t-center">Request 2027 Yatra Information & Callback</h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Submit your details to receive the comprehensive 2027 itinerary dossier and connect with a dedicated Yatra advisor.
            </p>
          </div>

          {leadSubmitted ? (
            <div
              style={{
                background: '#12252e',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid rgba(233, 162, 59, 0.4)',
              }}
            >
              <CheckCircle size={48} color="var(--saffron)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '10px' }}>Enquiry Received</h3>
              <p style={{ color: '#b9c9cd', maxWidth: '480px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                Thank you for your interest in the Kailash Mansarovar Yatra 2027. A Shlloka Yatra advisor will contact you within one business day with the detailed brochure and registration guidelines.
              </p>
              <Link to="/book" className="btn btn-go">
                <span>Continue to Booking Portal</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleLeadSubmit}
              style={{
                background: '#12252e',
                borderRadius: '20px',
                padding: '36px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {leadError && (
                <div style={{ background: 'rgba(255, 117, 107, 0.15)', border: '1px solid #ff756b', padding: '12px 16px', borderRadius: '8px', color: '#ffb3ae', marginBottom: '20px', fontSize: '0.88rem' }}>
                  {leadError}
                </div>
              )}

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number (with country code) *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Route Package Preference</label>
                  <select
                    value={leadForm.routeInterest}
                    onChange={(e) => setLeadForm({ ...leadForm, routeInterest: e.target.value })}
                    className="form-select"
                  >
                    <option value="Option 1: Classic Overland Yatra">Option 1: Classic Overland Yatra (₹3,50,000 + GST)</option>
                    <option value="Option 2: Fly to Lhasa, Continue by Road">Option 2: Fly to Lhasa, Continue by Road (₹4,37,000 + GST)</option>
                    <option value="Option 3: Fly to Lhasa and Ali/Pulan">Option 3: Fly to Lhasa and Ali/Pulan (₹4,94,000 + GST)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred 2027 Departure Batch</label>
                <select
                  value={leadForm.preferredBatch}
                  onChange={(e) => setLeadForm({ ...leadForm, preferredBatch: e.target.value })}
                  className="form-select"
                >
                  <option value="May Batch — Full Moon (9 May - 23 May 2027)">May Batch — Full Moon (9 May - 23 May 2027)</option>
                  <option value="June I Batch (31 May - 15 Jun 2027)">June I Batch (31 May - 15 Jun 2027)</option>
                  <option value="June II Batch — Full Moon (6 Jun - 21 Jun 2027)">June II Batch — Full Moon (6 Jun - 21 Jun 2027)</option>
                  <option value="June III Batch (14 Jun - 29 Jun 2027)">June III Batch (14 Jun - 29 Jun 2027)</option>
                  <option value="July I Batch (5 Jul - 20 Jul 2027)">July I Batch (5 Jul - 20 Jul 2027)</option>
                  <option value="July II Batch — Full Moon (11 Jul - 26 Jul 2027)">July II Batch — Full Moon (11 Jul - 26 Jul 2027)</option>
                  <option value="August I Batch (2 Aug - 17 Aug 2027)">August I Batch (2 Aug - 17 Aug 2027)</option>
                  <option value="August II Batch — Full Moon (10 Aug - 25 Aug 2027)">August II Batch — Full Moon (10 Aug - 25 Aug 2027)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Any Questions or Specific Requirements</label>
                <textarea
                  rows={3}
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  placeholder="e.g. Group size, dietary requirements, fitness queries..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={leadSubmitting}
                className="btn btn-go"
                style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '10px' }}
              >
                <Send size={18} />
                <span>{leadSubmitting ? 'Sending Enquiry...' : 'Submit 2027 Yatra Enquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. Bottom Final CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#081115' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Ready to Confirm Your 2027 Yatra?</h2>
          <p style={{ color: '#a2b9be', maxWidth: '50ch', margin: '0 auto 32px' }}>
            Slots on flight sectors and full-moon batches are limited by official permit quotas.
          </p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link to="/book" className="btn btn-go" style={{ padding: '16px 36px' }}>
              <span>Start Multi-Step Booking</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="btn btn-out" style={{ padding: '16px 32px' }}>
              <Phone size={16} />
              <span>Contact Yatra Advisory</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
