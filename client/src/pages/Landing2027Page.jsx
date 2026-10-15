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
  ChevronDown,
  Info,
  Check,
  X as XIcon,
  Compass,
  MapPin,
  Clock,
  CreditCard,
  Building2,
} from 'lucide-react';
import DepartureSelector from '../components/DepartureSelector';
import PricingTable from '../components/PricingTable';
import api from '../services/api';
import { assetUrl } from '../utils/assets';
import {
  OFFICIAL_DEPARTURES_2027,
  OFFICIAL_PACKAGES_2027,
  PARIKRAMA_STAGES_2027,
  DAY_BY_DAY_ITINERARIES,
  OFFICIAL_INCLUSIONS,
  OFFICIAL_EXCLUSIONS,
  OFFICIAL_PREPARATION_SAFETY,
  OFFICIAL_BOOKING_STEPS,
  OFFICIAL_FAQS_2027,
  OFFICIAL_SCHEDULE_DISCLAIMER,
} from '../data/brochureData';

export default function Landing2027Page() {
  const [videoError, setVideoError] = useState(false);
  const [activeItineraryRoute, setActiveItineraryRoute] = useState('flight-to-lhasa');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    preferredBatch: 'batch-3',
    preferredPackage: 'Option 2: Fly to Lhasa, Continue by Road',
    travellers: '1',
    message: '',
    consent: false,
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your contact phone number.';
    } else if (formData.phone.trim().length < 8) {
      errors.phone = 'Please provide a valid phone number with area/country code.';
    }
    if (!formData.consent) {
      errors.consent = 'Please confirm that you agree to be contacted for your Yatra enquiry.';
    }
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setFormSubmitting(true);
    setFormError(null);

    try {
      await api.submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        type: 'CAMPAIGN_2027',
        message: `Kailash 2027 Campaign Enquiry | Batch: ${formData.preferredBatch} | Package: ${formData.preferredPackage} | Travellers: ${formData.travellers} | Notes: ${formData.message || 'None'}`,
      });
      setFormSuccess(true);
    } catch (err) {
      // Clear reporting as required by prompt
      setFormError(
        err.message ||
          'Online form submission is not connected on this static preview. Please contact our Yatra coordinators directly at +91 6366852888 or email volunteers@shlloka.com.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const currentItinerary = DAY_BY_DAY_ITINERARIES[activeItineraryRoute] || [];

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', color: 'var(--charcoal)', width: '100%', overflowX: 'hidden' }}>
      {/* =========================================================================
          SECTION 1: HERO BANNER (Cinematic Video + Fallback)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFFFFF',
          overflow: 'hidden',
          padding: '160px 0 100px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        {/* Fallback Poster Image */}
        <img
          src={assetUrl('/images/hero-poster.jpg')}
          alt="Mount Kailash sacred Himalayan peak"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Cinematic Video Layer */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={assetUrl('/images/hero-poster.jpg')}
            onError={() => setVideoError(true)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <source src={assetUrl('/videos/kailash-yatra-hero.mp4')} type="video/mp4" />
            <source src={assetUrl('/videos/kailash-yatra-hero.webm')} type="video/webm" />
          </video>
        )}

        {/* High-Contrast Scrim Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(26, 21, 18, 0.82) 0%, rgba(26, 21, 18, 0.55) 45%, rgba(26, 21, 18, 0.94) 100%)',
            zIndex: 2,
          }}
        />

        {/* Hero Content */}
        <div className="wrap" style={{ position: 'relative', zIndex: 3, maxWidth: '1000px' }}>
          <div
            className="badge badge-gold"
            style={{ marginBottom: '22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Sparkles size={14} color="var(--yellow-warm)" />
            <span>Official 2027 Pilgrimage Programme</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.6rem, 6.2vw, 5.2rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: '0 auto 24px',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.65)',
            }}
          >
            Kailash Mansarovar Yatra 2027
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
              color: '#FFF9F0',
              lineHeight: 1.65,
              maxWidth: '740px',
              margin: '0 auto 36px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            }}
          >
            Undertake the sacred circumambulation of holy Mount Kailash and sacred Lake Manasarovar. Eight published departure batches from May through August 2027, transparent package pricing, and experienced Sherpa-guided care.
          </p>

          <div className="btns" style={{ justifyContent: 'center', gap: '16px' }}>
            <a href="#packages" className="btn btn-go" style={{ padding: '16px 36px', fontSize: '1.02rem' }}>
              <span>Explore Packages</span>
              <ArrowRight size={18} />
            </a>
            <a href="#enquiry-form" className="btn btn-out" style={{ padding: '16px 32px', fontSize: '1.02rem' }}>
              <Mail size={17} />
              <span>Register Your Interest</span>
            </a>
          </div>

          {/* Quick Statistics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              marginTop: '60px',
              padding: '24px 28px',
              background: 'rgba(34, 28, 24, 0.85)',
              borderRadius: '20px',
              border: '1px solid rgba(245, 184, 46, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--yellow-warm)', fontFamily: 'var(--serif)', lineHeight: 1.1 }}>
                8
              </b>
              <span style={{ fontSize: '0.85rem', color: '#E9DCCB' }}>
                Published Departure Batches
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--yellow-warm)', fontFamily: 'var(--serif)', lineHeight: 1.1 }}>
                4
              </b>
              <span style={{ fontSize: '0.85rem', color: '#E9DCCB' }}>
                Full Moon Alignments
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--yellow-warm)', fontFamily: 'var(--serif)', lineHeight: 1.1 }}>
                5,630 m
              </b>
              <span style={{ fontSize: '0.85rem', color: '#E9DCCB' }}>
                Dolma La Pass Elevation
              </span>
            </div>
            <div>
              <b style={{ display: 'block', fontSize: '2.4rem', color: 'var(--yellow-warm)', fontFamily: 'var(--serif)', lineHeight: 1.1 }}>
                100%
              </b>
              <span style={{ fontSize: '0.85rem', color: '#E9DCCB' }}>
                Pure Vegetarian Food
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Saffron & Amber Gradient Divider */}
      <div className="flags" />

      {/* =========================================================================
          SECTION 2: INTRODUCTION
          ========================================================================= */}
      <section className="sec sec-ivory" id="introduction">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">The Ultimate Pilgrimage</span>
              <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
                The Eternal Sanctuary of Shiva and the Lake of Consciousness
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#40362E', lineHeight: '1.8', marginBottom: '18px' }}>
                Revered across ancient traditions as the spiritual axis of the world (Mount Meru), Mount Kailash (Kang Rinpoche, 6,638 m) stands unclimbed and solitary in the windswept high plateau of Western Tibet.
              </p>
              <p style={{ fontSize: '1.02rem', color: '#65584D', lineHeight: '1.8', marginBottom: '24px' }}>
                Beside Kailash lies holy Lake Manasarovar (4,590 m), the highest body of freshwater in the world. Formed in the universal mind (Manas) of Lord Brahma, its turquoise waters reflect the snow-crested Himalayas. Undertaking the sacred 52-kilometre Parikrama circumambulation is regarded by sages as a lifetime rebirth and ultimate spiritual liberation.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '24px',
                }}
              >
                <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E6DED4' }}>
                  <b style={{ display: 'block', fontSize: '1.05rem', color: '#29231E', marginBottom: '4px' }}>
                    Lake Manasarovar
                  </b>
                  <p style={{ fontSize: '0.86rem', color: '#65584D' }}>
                    Sacred hawan, prayers, and collection of holy Jal at 4,590 metres.
                  </p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E6DED4' }}>
                  <b style={{ display: 'block', fontSize: '1.05rem', color: '#29231E', marginBottom: '4px' }}>
                    52 km Parikrama
                  </b>
                  <p style={{ fontSize: '0.86rem', color: '#65584D' }}>
                    Three-day circumambulation on foot or with horse/pony assistance.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 48px rgba(41, 35, 30, 0.16)',
                  border: '4px solid #FFFFFF',
                }}
              >
                <img
                  src={assetUrl('/images/hero-poster.jpg')}
                  alt="Holy Mount Kailash North Face"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '20px',
                  right: '20px',
                  background: '#221C18',
                  color: '#FFFFFF',
                  padding: '18px 24px',
                  borderRadius: '16px',
                  border: '1.5px solid var(--yellow-warm)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                }}
              >
                <b style={{ display: 'block', color: 'var(--yellow-warm)', fontSize: '0.95rem' }}>
                  Shlloka Yatra Devotion & Care
                </b>
                <p style={{ fontSize: '0.82rem', color: '#E9DCCB', marginTop: '4px' }}>
                  Guided by experienced Tibetan sherpas, certified high-altitude medics, and wholesome vegetarian kitchen teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THREE TRAVEL PACKAGES (Options 1, 2, 3)
          ========================================================================= */}
      <section className="sec sec-dark" id="packages" style={{ background: 'var(--night)', padding: '100px 0' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Transparent Brochure Pricing
            </span>
            <h2 className="sec-title" style={{ color: '#FFFFFF' }}>
              Three Approaches for Kailash Yatra 2027
            </h2>
            <p className="sec-desc" style={{ color: '#E9DCCB' }}>
              Choose between the classic overland bus route, the flight to Lhasa with scenic road travel, or the premier dual-flight itinerary. All rates reflect published brochure terms.
            </p>
          </div>

          <PricingTable />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 2027 DEPARTURE CALENDAR
          ========================================================================= */}
      <section className="sec sec-dark" id="calendar" style={{ background: 'var(--deep)', padding: '100px 0' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Official 2027 Schedule
            </span>
            <h2 className="sec-title" style={{ color: '#FFFFFF' }}>
              Select Your 2027 Departure Batch
            </h2>
            <p className="sec-desc" style={{ color: '#E9DCCB' }}>
              All eight departure batches for 2027 with arrival and departure dates. Explore batch details, Full Moon timing, and select your travel option.
            </p>
          </div>

          <DepartureSelector />
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ITINERARY HIGHLIGHTS & PARIKRAMA STAGES
          ========================================================================= */}
      <section className="sec sec-ivory" id="itinerary">
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow">Day-by-Day Experience</span>
            <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
              Itinerary Highlights & The 3 Parikrama Stages
            </h2>
            <p className="sec-desc" style={{ color: '#65584D' }}>
              Detailed day-by-day itineraries preserving the unique route flow for each of the three options.
            </p>
          </div>

          {/* 3 Parikrama Stages Highlight Strip */}
          <div style={{ marginBottom: '50px' }}>
            <h3
              style={{
                fontSize: '1.4rem',
                color: 'var(--charcoal)',
                textAlign: 'center',
                marginBottom: '24px',
                fontWeight: 600,
              }}
            >
              The Three Sacred Parikrama Stages (52 km Total)
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {PARIKRAMA_STAGES_2027.map((stage) => (
                <div
                  key={stage.stageNumber}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E6DED4',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'rgba(232, 117, 24, 0.12)',
                        color: 'var(--orange-deep)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                      }}
                    >
                      Stage {stage.stageNumber}
                    </span>
                    <h4 style={{ fontSize: '1.25rem', color: '#29231E', marginBottom: '8px' }}>
                      {stage.title}
                    </h4>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        fontSize: '0.82rem',
                        color: '#A94312',
                        fontWeight: 600,
                        marginBottom: '14px',
                      }}
                    >
                      <span>{stage.distance}</span>
                      <span>•</span>
                      <span>{stage.duration}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#65584D', marginBottom: '12px' }}>
                      <b>Elevation:</b> {stage.elevation}
                    </p>
                    <p style={{ fontSize: '0.92rem', color: '#40362E', lineHeight: '1.65' }}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Route Switcher Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {OFFICIAL_PACKAGES_2027.map((pkg) => {
              const isSelected = activeItineraryRoute === pkg.code;
              return (
                <button
                  key={pkg.code}
                  onClick={() => setActiveItineraryRoute(pkg.code)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '999px',
                    border: isSelected ? '1.5px solid var(--orange-primary)' : '1px solid #D6CBC1',
                    background: isSelected ? 'var(--orange-primary)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#40362E',
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {pkg.name} ({pkg.durationDays} Days)
                </button>
              );
            })}
          </div>

          {/* Day-by-Day Accordion/Timeline */}
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid #E6DED4',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h4
              style={{
                fontSize: '1.25rem',
                color: '#29231E',
                marginBottom: '24px',
                paddingBottom: '14px',
                borderBottom: '1px solid #F0E8DF',
              }}
            >
              Day-by-Day Journey Flow
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentItinerary.map((item) => (
                <div
                  key={item.day}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '14px 18px',
                    background: '#FFFDF9',
                    borderRadius: '12px',
                    border: '1px solid #F0E8DF',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(232, 117, 24, 0.15)',
                      color: 'var(--orange-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}
                  >
                    D{item.day}
                  </div>
                  <div>
                    <b style={{ display: 'block', fontSize: '1rem', color: '#29231E', marginBottom: '4px' }}>
                      {item.title}
                    </b>
                    <p style={{ fontSize: '0.92rem', color: '#40362E', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INCLUSIONS & EXCLUSIONS
          ========================================================================= */}
      <section className="sec sec-amber" id="inclusions" style={{ background: '#FFFDF9' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow">Clear Package Conditions</span>
            <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
              Inclusions and Exclusions
            </h2>
            <p className="sec-desc" style={{ color: '#65584D' }}>
              Complete clarity on what is covered by your package and personal incidentals to budget for.
            </p>
          </div>

          <div className="grid-2">
            {/* Inclusions Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px',
                border: '1.5px solid rgba(232, 117, 24, 0.3)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: '#29231E',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <CheckCircle size={22} color="var(--orange-deep)" />
                <span>What Is Included</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {OFFICIAL_INCLUSIONS.map((inc, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      fontSize: '0.92rem',
                      color: '#40362E',
                      lineHeight: '1.55',
                    }}
                  >
                    <Check size={16} color="var(--orange-deep)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px',
                border: '1.5px solid #E6DED4',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: '#29231E',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <AlertCircle size={22} color="var(--orange-deep)" />
                <span>What Is Not Included (Exclusions)</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {OFFICIAL_EXCLUSIONS.map((exc, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      fontSize: '0.92rem',
                      color: '#40362E',
                      lineHeight: '1.55',
                    }}
                  >
                    <XIcon size={16} color="var(--orange-deep)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PREPARATION & SAFETY
          ========================================================================= */}
      <section className="sec sec-dark" id="safety" style={{ background: 'var(--night)', padding: '100px 0' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Medical Protocols & Training
            </span>
            <h2 className="sec-title" style={{ color: '#FFFFFF' }}>
              Preparation and High-Altitude Safety
            </h2>
            <p className="sec-desc" style={{ color: '#E9DCCB' }}>
              Truthful medical realities, staged physiological acclimatisation, and physical fitness guidelines for high-altitude Himalayas.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {OFFICIAL_PREPARATION_SAFETY.map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#221C18',
                  border: '1px solid rgba(255, 249, 240, 0.12)',
                  borderRadius: '18px',
                  padding: '30px',
                }}
              >
                <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 600 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.94rem', color: '#E9DCCB', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Honest Mountain Disclaimer */}
          <div
            style={{
              marginTop: '40px',
              padding: '24px 30px',
              background: '#2B231E',
              border: '1.5px solid rgba(245, 184, 46, 0.3)',
              borderRadius: '16px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <ShieldCheck size={26} color="var(--yellow-warm)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <b style={{ display: 'block', color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                Health Disclaimer & Realistic Mountain Travel Conditions
              </b>
              <p style={{ fontSize: '0.88rem', color: '#D6CBC1', lineHeight: '1.65' }}>
                We provide certified oxygen, medical monitors, and seasoned Himalayan leaders, but traveling above 5,000 metres involves intrinsic physical challenges. We do not promise guaranteed medical outcomes or emergency immunities; each yatri is required to take personal responsibility for conditioning and travel insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: BOOKING PROCESS & PAYMENT TERMS
          ========================================================================= */}
      <section className="sec sec-ivory" id="booking-process">
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow">Clear Four-Step Registration</span>
            <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
              Booking Process & Deposit Milestones
            </h2>
            <p className="sec-desc" style={{ color: '#65584D' }}>
              Transparent payment terms as published in the official brochure. Submitting an enquiry expresses your intent and initiates document checks before deposit payment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginBottom: '44px',
            }}
          >
            {OFFICIAL_BOOKING_STEPS.map((step) => (
              <div
                key={step.step}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '28px',
                  border: '1.5px solid #E6DED4',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--orange-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginBottom: '16px',
                  }}
                >
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: '#29231E', marginBottom: '8px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#40362E', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Official Bank Account Information */}
          <div
            style={{
              background: '#221C18',
              borderRadius: '20px',
              padding: '32px',
              color: '#FFFFFF',
              border: '1.5px solid rgba(245, 184, 46, 0.3)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                Official Remittance Account
              </span>
              <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF', margin: '4px 0 8px' }}>
                Shlloka Yatra Private Limited
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#E9DCCB' }}>
                Bank: <b>IndusInd Bank (Current Account)</b> • Account: <span style={{ fontFamily: 'monospace' }}>201037169009</span> • IFSC: <span style={{ fontFamily: 'monospace' }}>INDB0000672</span>
              </p>
            </div>
            <Link to="/book" className="btn btn-go" style={{ padding: '12px 28px' }}>
              <span>Proceed to Booking Flow</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="sec sec-amber" id="faqs" style={{ background: '#FFFDF9' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow">Everything You Need to Know</span>
            <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
              Frequently Asked Questions
            </h2>
            <p className="sec-desc" style={{ color: '#65584D' }}>
              Clear answers regarding departure batches, packages, itinerary adjustments, and travel requirements.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {OFFICIAL_FAQS_2027.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E6DED4',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#29231E',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      gap: '16px',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      color="var(--orange-deep)"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 22px',
                        fontSize: '0.95rem',
                        color: '#40362E',
                        lineHeight: '1.7',
                        borderTop: '1px solid #F0E8DF',
                        paddingTop: '16px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: ENQUIRY FORM
          ========================================================================= */}
      <section className="sec sec-dark" id="enquiry-form" style={{ background: 'var(--night)', padding: '100px 0' }}>
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Direct Batch Registration
            </span>
            <h2 className="sec-title" style={{ color: '#FFFFFF' }}>
              Register Your 2027 Yatra Interest
            </h2>
            <p className="sec-desc" style={{ color: '#E9DCCB' }}>
              Provide your details below to register interest for your preferred batch and approach option.
            </p>
          </div>

          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              background: '#221C18',
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 48px)',
              border: '1.5px solid rgba(245, 184, 46, 0.3)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(232, 117, 24, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle size={36} color="var(--yellow-warm)" />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  Enquiry Received with Reverence
                </h3>
                <p style={{ color: '#E9DCCB', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '24px' }}>
                  Thank you, <b>{formData.name}</b>. Your interest for <b>{formData.preferredPackage}</b> has been recorded. Our senior pilgrimage coordinator will reach out to you via {formData.countryCode} {formData.phone} with complete documentation guidelines.
                </p>
                <button
                  onClick={() => {
                    setFormSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      countryCode: '+91',
                      preferredBatch: 'batch-3',
                      preferredPackage: 'Option 2: Fly to Lhasa, Continue by Road',
                      travellers: '1',
                      message: '',
                      consent: false,
                    });
                  }}
                  className="btn btn-login-outline"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} noValidate>
                {formError && (
                  <div
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(185, 74, 22, 0.2)',
                      border: '1px solid var(--orange-deep)',
                      borderRadius: '12px',
                      color: '#FFF9F0',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    <b style={{ display: 'block', color: 'var(--yellow-warm)', marginBottom: '4px' }}>
                      Server Notification:
                    </b>
                    {formError}
                  </div>
                )}

                <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  {/* Name */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-input dark"
                      placeholder="e.g. Ramesh Chandra Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {validationErrors.name && (
                      <span className="form-error" style={{ color: 'var(--yellow-warm)' }}>
                        {validationErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-input dark"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {validationErrors.email && (
                      <span className="form-error" style={{ color: 'var(--yellow-warm)' }}>
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  {/* Phone */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select
                        className="form-select dark"
                        style={{ width: '100px', flexShrink: 0 }}
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+977">+977 (NP)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+61">+61 (AU)</option>
                      </select>
                      <input
                        type="tel"
                        className="form-input dark"
                        placeholder="Mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    {validationErrors.phone && (
                      <span className="form-error" style={{ color: 'var(--yellow-warm)' }}>
                        {validationErrors.phone}
                      </span>
                    )}
                  </div>

                  {/* Number of Travellers */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Number of Travellers
                    </label>
                    <select
                      className="form-select dark"
                      value={formData.travellers}
                      onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons (Couple / Pair)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Family Group)</option>
                      <option value="5+">5 or more persons</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  {/* Preferred Batch */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Preferred Departure Batch
                    </label>
                    <select
                      className="form-select dark"
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                    >
                      {OFFICIAL_DEPARTURES_2027.map((batch) => (
                        <option key={batch.id} value={batch.name}>
                          {batch.name} ({batch.totalDays} Days)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Package */}
                  <div>
                    <label className="form-label" style={{ color: '#FFF9F0' }}>
                      Preferred Approach Option
                    </label>
                    <select
                      className="form-select dark"
                      value={formData.preferredPackage}
                      onChange={(e) => setFormData({ ...formData, preferredPackage: e.target.value })}
                    >
                      <option value="Option 1: Classic Overland">Option 1: Classic Overland (₹3,50,000)</option>
                      <option value="Option 2: Fly to Lhasa, Continue by Road">Option 2: Fly to Lhasa, Continue by Road (₹4,37,000)</option>
                      <option value="Option 3: Fly to Lhasa and Ali/Pulan">Option 3: Fly to Lhasa and Ali/Pulan (₹4,94,000)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Special Needs */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label" style={{ color: '#FFF9F0' }}>
                    Special Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    className="form-textarea dark"
                    placeholder="E.g. Jain meal preference, horse/pony requirement, senior citizen considerations, or queries regarding permits..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Consent Checkbox */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      style={{ marginTop: '4px', accentColor: 'var(--orange-primary)' }}
                    />
                    <span style={{ fontSize: '0.86rem', color: '#D6CBC1', lineHeight: '1.5' }}>
                      I consent to Shlloka Yatra contacting me via WhatsApp, phone, and email regarding the 2027 pilgrimage, permits, and payment milestones. I understand that submitting an enquiry does not automatically confirm seats.
                    </span>
                  </label>
                  {validationErrors.consent && (
                    <span className="form-error" style={{ color: 'var(--yellow-warm)', display: 'block' }}>
                      {validationErrors.consent}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="btn btn-go"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', justifyContent: 'center' }}
                >
                  {formSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit 2027 Batch Enquiry</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FINAL CALL TO ACTION
          ========================================================================= */}
      <section
        style={{
          background: 'linear-gradient(135deg, #221C18 0%, #1A1512 100%)',
          padding: '90px 0',
          textAlign: 'center',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(245, 184, 46, 0.25)',
        }}
      >
        <div className="wrap" style={{ maxWidth: '840px' }}>
          <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
            Commence Your Pilgrimage
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#FFFFFF', marginBottom: '18px' }}>
            Plan Your Sacred Kailash Yatra
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#E9DCCB', lineHeight: '1.7', marginBottom: '36px' }}>
            Spaces on each of the eight 2027 departure batches are structured to guarantee high-altitude safety and authentic volunteer care. Connect with our coordinators today.
          </p>

          <div className="btns" style={{ justifyContent: 'center', gap: '16px' }}>
            <Link to="/book" className="btn btn-go" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              <span>Book Your Yatra Now</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/membership/register" className="btn btn-out" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
              <span>Become a Shlloka Member</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
