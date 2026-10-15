import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Heart,
  Compass,
  CheckCircle2,
  ChevronDown,
  Phone,
  Bus,
  Plane,
  Calendar,
  Mountain,
  Sun,
  MapPin,
  HelpCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Check,
} from 'lucide-react';
import DepartureSelector from '../components/DepartureSelector';
import api from '../services/api';
import { assetUrl } from '../utils/assets';

export default function HomePage() {
  const [routes, setRoutes] = useState([]);
  const [videoError, setVideoError] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getRoutes().then((data) => setRoutes(data.routes || [])).catch(() => {});
  }, []);

  const faqs = [
    {
      q: 'Who can undertake the Kailash Mansarovar Yatra?',
      a: 'Yatris holding valid passports between the ages of 12 and 85 with satisfactory cardiovascular and pulmonary fitness. Prior consultation and medical fitness clearance from your physician is mandatory prior to travel.',
    },
    {
      q: 'What is the visa and permit procedure for Tibet (China)?',
      a: 'The Tibet Travel Permit and China Group Visa are arranged comprehensively by Shlloka Yatra through the Foreign Affairs Office and the Chinese Embassy. Yatris arrive in Kathmandu with their original passport where the group visa is stamped.',
    },
    {
      q: 'What are the accommodation standards along the route?',
      a: 'In Kathmandu, accommodation is in quality 4-star / 5-star hotels. Across the Tibetan plateau (Saga, Paryang, Darchen), quality guesthouses with heating and twin/triple sharing are provided. During the 3-day Parikrama at Diraphuk and Zutulphuk, basic high-altitude dormitory lodges are used due to extreme remote wilderness conditions.',
    },
    {
      q: 'Is pure vegetarian food guaranteed throughout the Yatra?',
      a: 'Yes, absolutely. Our dedicated Sherpa kitchen crew travels with our groups to prepare 100% pure vegetarian, freshly cooked Indian meals, soups, herbal teas, and hot drinking water at every halt.',
    },
    {
      q: 'Can yatris hire a pony or porter during the 3-day Kailash Parikrama?',
      a: 'Yes. For yatris needing support during the 52-km circumambulation, local Tibetan horsemen and porters can be arranged at Yamdwar for an additional fee paid directly to the local Tibetan yak/horse association.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', width: '100%', overflowX: 'hidden' }}>
      {/* =========================================================================
          SECTION 1: CINEMATIC VIDEO HERO BANNER (Section 6 Requirements)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFFFFF',
          overflow: 'hidden',
          padding: '160px 0 100px',
          boxSizing: 'border-box',
        }}
      >
        {/* Baseline High-Res Poster Layer (Immediate visual render with no blank gap) */}
        <img
          src={assetUrl('/images/hero-poster.jpg')}
          alt="Mount Kailash Himalayan landscape"
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

        {/* Cinematic Background Video Layer with assetUrl */}
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

        {/* Dark Mountain Overlay for Supreme Text Legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(20, 16, 14, 0.75) 0%, rgba(20, 16, 14, 0.45) 45%, rgba(20, 16, 14, 0.92) 100%)',
            zIndex: 2,
          }}
        />

        {/* Hero Copy (Exact Required Text) */}
        <div className="wrap" style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '999px',
              background: 'rgba(232, 117, 24, 0.22)',
              border: '1px solid rgba(245, 184, 46, 0.5)',
              color: 'var(--yellow-warm)',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={14} />
            <span>SHLLOKA YATRA · 2027</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              maxWidth: '22ch',
              margin: '0 auto 24px',
              color: '#FFFFFF',
              textShadow: '0 4px 32px rgba(0, 0, 0, 0.8)',
            }}
          >
            A Journey to the Sacred Abode of Mount Kailash
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              maxWidth: '720px',
              margin: '0 auto 40px',
              color: '#F4ECE4',
              lineHeight: 1.68,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)',
            }}
          >
            Experience the awe-inspiring landscapes of Mount Kailash and Lake Mansarovar with a thoughtfully organized pilgrimage journey.
          </p>

          {/* Buttons: Primary "Explore the Yatra" & Secondary "Become a Member" */}
          <div className="btns" style={{ justifyContent: 'center', gap: '18px' }}>
            <Link
              to="/packages"
              className="btn btn-go"
              style={{ padding: '16px 36px', fontSize: '1.02rem', textDecoration: 'none' }}
            >
              <span>Explore the Yatra</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/membership/register"
              className="btn btn-out"
              style={{
                padding: '16px 32px',
                fontSize: '1.02rem',
                textDecoration: 'none',
                borderColor: 'var(--yellow-warm)',
                color: '#FFFFFF',
              }}
            >
              <UserCheck size={18} />
              <span>Become a Member</span>
            </Link>
          </div>
        </div>

        {/* Discreet Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '26px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            color: 'rgba(255, 249, 240, 0.75)',
            fontSize: '0.74rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll to Discover</span>
          <ChevronDown size={18} />
        </div>

        {/* Saffron & Amber Accent Line */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3 }}>
          <div className="flags" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SPIRITUAL SIGNIFICANCE OF THE JOURNEY
          ========================================================================= */}
      <section className="sec sec-white">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Spiritual Significance</span>
              <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
                Where Devotion Meets the Eternal Axis
              </h2>
              <p style={{ fontSize: '1.12rem', color: 'var(--charcoal)', lineHeight: '1.75', marginBottom: '20px' }}>
                Revered for millennia across Hinduism, Buddhism, Jainism, and Bon, <b>Mount Kailash (6,638 m)</b> stands unclimbed as Mount Meru—the spiritual cosmic center of our universe.
              </p>
              <p style={{ color: 'var(--warm-grey)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px' }}>
                Pilgrims circumambulate its 52-kilometer rocky perimeter to cleanse lifelong karmas and experience an inner stillness found nowhere else on earth. Beside the mountain rests <b>Lake Mansarovar (4,590 m)</b>, conceived in the mind of Lord Brahma, radiating crystal azure waters against snow peaks.
              </p>
              <div className="btns">
                <Link to="/about" className="btn btn-ink">
                  <span>About Shlloka Yatra</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/kailash-mansarovar" className="btn btn-login-outline">
                  <span>The Sacred Geography</span>
                </Link>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(41, 35, 30, 0.1)',
                  width: '100%',
                  maxWidth: '520px',
                  background: '#FFFFFF',
                }}
              >
                <img
                  src={assetUrl('/images/img_6.jpg')}
                  alt="Holy Lake Mansarovar with colorful prayer flags"
                  style={{ width: '100%', height: '360px', objectFit: 'cover' }}
                />
                <div style={{ padding: '26px', background: '#251D18', color: '#FFFDF9' }}>
                  <small style={{ color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.76rem', fontWeight: 700 }}>
                    Sacred Waters • 4,590 m Elevation
                  </small>
                  <h3 style={{ fontSize: '1.3rem', marginTop: '6px', color: '#FFFDF9' }}>
                    Lake Mansarovar Snan & Havans
                  </h3>
                  <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginTop: '6px', lineHeight: '1.6' }}>
                    Purifying morning dip, Rudra Abhishekam, and quiet meditation upon the sanctified Tibetan lakeshore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FULL-WIDTH SCENIC MOUNT KAILASH & LAKE MANSAROVAR FEATURE
          ========================================================================= */}
      <section className="sec sec-dark">
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Sacred Himalayan Landscapes
            </span>
            <h2 className="sec-title" style={{ color: '#FFFFFF' }}>The Twin Jewels of Western Tibet</h2>
            <p className="sec-desc" style={{ color: '#F0E6DF' }}>
              An untouched sanctuary of high Tibetan plateaus, turquoise glacial lakes, and divine monolithic granite faces.
            </p>
          </div>

          <div className="grid-3">
            {/* Card 1 */}
            <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={assetUrl('/images/img_1.jpg')}
                alt="Mount Kailash North Face at sunrise"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                  North Face Darshan
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFDF9', margin: '8px 0 10px' }}>
                  Mount Kailash (6,638 m)
                </h3>
                <p style={{ color: '#D6CBC1', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  The sheer golden pyramid of the North Face viewed from Diraphuk lodge, where the holy mountain reveals its majesty in morning sunlight.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={assetUrl('/images/img_7.jpg')}
                alt="Lake Mansarovar azure waters"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                  Holy Waters
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFDF9', margin: '8px 0 10px' }}>
                  Lake Mansarovar (4,590 m)
                </h3>
                <p style={{ color: '#D6CBC1', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  Crystal clear waters mirroring snow peaks. Yatris participate in morning havan and collect sacred Mansarovar Jal for their families.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={assetUrl('/images/img_10.jpg')}
                alt="Dolma La Pass at 5630 meters"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--yellow-warm)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                  High Altitude Pass
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFDF9', margin: '8px 0 10px' }}>
                  Dolma La Pass (5,630 m)
                </h3>
                <p style={{ color: '#D6CBC1', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  The pinnacle of the circumambulation, adorned with thousands of fluttering Tibetan prayer flags, looking down upon the sacred Gauri Kund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THREE TRAVEL PACKAGE OPTIONS (Premium Layout)
          ========================================================================= */}
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="split" style={{ marginBottom: '52px', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow">2027 Pilgrimage Itinerary Options</span>
              <h2 className="sec-title" style={{ margin: 0 }}>
                Three Ways to Make the Journey
              </h2>
            </div>
            <div>
              <p className="sec-desc" style={{ margin: 0 }}>
                From the classic road route through Himalayan gorges to high-altitude flight routes, choose what best aligns with your time and physical pacing.
              </p>
            </div>
          </div>

          <div className="grid-3">
            {/* Option 1 */}
            <div
              className="card-light"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Bus size={18} color="var(--orange-primary)" />
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--warm-grey)', fontWeight: 700 }}>
                    Overland Road Both Ways
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  Option 1: Classic Overland Yatra
                </h3>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem', marginBottom: '22px', lineHeight: '1.6' }}>
                  By bus both ways via Kyirong border, Saga, Lake Mansarovar, Darchen and the sacred 3-day Parikrama circuit.
                </p>

                <div style={{ padding: '16px 0', borderTop: '1px solid #ECE4DA', borderBottom: '1px solid #ECE4DA', marginBottom: '22px' }}>
                  <small style={{ color: 'var(--warm-grey)', fontSize: '0.8rem', display: 'block' }}>Indian Passport Rate</small>
                  <b style={{ fontSize: '1.85rem', color: 'var(--charcoal)', fontFamily: 'var(--sans)' }}>₹3,50,000</b>
                  <small style={{ color: 'var(--orange-deep)', fontSize: '0.82rem', display: 'block', marginTop: '2px' }}>+ 5% GST (Foreign: ₹4,25,000)</small>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--charcoal)' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Steady natural overland acclimatisation</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Pashupatinath Temple & Rudra Homam</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Full 3-day sacred Kailash Parikrama</li>
                </ul>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <Link to="/packages" className="btn btn-ink" style={{ flex: 1, padding: '12px 18px', fontSize: '0.88rem' }}>
                  Details
                </Link>
                <Link to="/book" className="btn btn-go" style={{ padding: '12px 22px', fontSize: '0.88rem' }}>
                  Book
                </Link>
              </div>
            </div>

            {/* Option 2 (Featured) */}
            <div
              style={{
                background: 'linear-gradient(180deg, #2B231E 0%, #1A1512 100%)',
                color: '#FFFDF9',
                border: '2px solid var(--orange-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 20px 48px rgba(41, 35, 30, 0.25)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--orange-primary)',
                  color: '#FFFFFF',
                  padding: '4px 16px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Most Popular
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Plane size={18} color="var(--yellow-warm)" />
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--amber-soft)', fontWeight: 700 }}>
                    Fly to Lhasa, Road to Kailash
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', color: '#FFFDF9', marginBottom: '8px' }}>
                  Option 2: Fly to Lhasa & Road
                </h3>
                <p style={{ color: '#D6CBC1', fontSize: '0.92rem', marginBottom: '22px', lineHeight: '1.6' }}>
                  Kathmandu to Lhasa flight over Everest, historic Potala Palace exploration, then road across Tibet to Kailash.
                </p>

                <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255, 249, 240, 0.12)', borderBottom: '1px solid rgba(255, 249, 240, 0.12)', marginBottom: '22px' }}>
                  <small style={{ color: '#D6CBC1', fontSize: '0.8rem', display: 'block' }}>Indian Passport Rate</small>
                  <b style={{ fontSize: '1.85rem', color: '#FFFDF9', fontFamily: 'var(--sans)' }}>₹4,37,000</b>
                  <small style={{ color: 'var(--yellow-warm)', fontSize: '0.82rem', display: 'block', marginTop: '2px' }}>+ 5% GST (Foreign: ₹4,25,000 + USD 600)</small>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#FFFDF9' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--yellow-warm)" /> Trans-Himalayan scenic flight included</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--yellow-warm)" /> Potala Palace & Jokhang Temple entry</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--yellow-warm)" /> Gentle acclimatisation in historic Lhasa</li>
                </ul>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <Link to="/packages" className="btn btn-out" style={{ flex: 1, padding: '12px 18px', fontSize: '0.88rem' }}>
                  Details
                </Link>
                <Link to="/book" className="btn btn-go" style={{ padding: '12px 22px', fontSize: '0.88rem' }}>
                  Book
                </Link>
              </div>
            </div>

            {/* Option 3 */}
            <div
              className="card-light"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Plane size={18} color="var(--orange-primary)" />
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--warm-grey)', fontWeight: 700 }}>
                    Dual Flight Sectors
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  Option 3: Fly to Lhasa & Ali/Pulan
                </h3>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem', marginBottom: '22px', lineHeight: '1.6' }}>
                  Kathmandu to Lhasa & Lhasa to Ali/Pulan by air, minimizing overland travel hours to Mount Kailash.
                </p>

                <div style={{ padding: '16px 0', borderTop: '1px solid #ECE4DA', borderBottom: '1px solid #ECE4DA', marginBottom: '22px' }}>
                  <small style={{ color: 'var(--warm-grey)', fontSize: '0.8rem', display: 'block' }}>Indian Passport Rate</small>
                  <b style={{ fontSize: '1.85rem', color: 'var(--charcoal)', fontFamily: 'var(--sans)' }}>₹4,94,000</b>
                  <small style={{ color: 'var(--orange-deep)', fontSize: '0.82rem', display: 'block', marginTop: '2px' }}>+ 5% GST (Foreign: ₹4,25,000 + USD 1,200)</small>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--charcoal)' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Fastest travel time: 10 Days</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Fly directly into western Ngari prefecture</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--orange-primary)" /> Full Lake Mansarovar & Parikrama rituals</li>
                </ul>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <Link to="/packages" className="btn btn-ink" style={{ flex: 1, padding: '12px 18px', fontSize: '0.88rem' }}>
                  Details
                </Link>
                <Link to="/book" className="btn btn-go" style={{ padding: '12px 22px', fontSize: '0.88rem' }}>
                  Book
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 2027 DEPARTURE CALENDAR
          ========================================================================= */}
      <section className="sec sec-dark" id="departures">
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
              Official 2027 Calendar
            </span>
            <h2 className="sec-title">Upcoming 2027 Departure Batches</h2>
            <p className="sec-desc">
              Eight confirmed departure batches from May through August 2027. Four batches align with sacred Full Moon nights at Lake Mansarovar and Kailash.
            </p>
          </div>

          <DepartureSelector />

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/departures" className="btn btn-out">
              <Calendar size={18} />
              <span>View Full 2027 Schedule & Disclaimers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: VISUAL DAY-BY-DAY ITINERARY PREVIEW
          ========================================================================= */}
      <section className="sec sec-white">
        <div className="wrap">
          <div className="sec-head centered">
            <span className="eyebrow">The 52-km Sacred Circumambulation</span>
            <h2 className="sec-title">The Three Demanding Stages of Parikrama</h2>
            <p className="sec-desc">
              The circumambulation is undertaken over three days of high-altitude trekking under dedicated Sherpa guidance.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: '48px' }}>
            <div className="card-light">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span className="badge badge-moon">Stage 1</span>
                <b style={{ color: 'var(--charcoal)', fontSize: '1.25rem' }}>~14 km</b>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                Yamdwar to Diraphuk
              </h3>
              <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '14px' }}>
                Approx. 3–4 hours of gradual uphill trek following the Lha Chu river to 4,900 m, reaching the breathtaking direct face-to-face view of Mount Kailash’s North Face.
              </p>
              <small style={{ color: 'var(--orange-deep)', fontWeight: 600 }}>Overnight: Basic lodge at Diraphuk</small>
            </div>

            <div className="card-light" style={{ border: '2px solid var(--orange-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span className="badge badge-moon">Stage 2 — High Pass</span>
                <b style={{ color: 'var(--orange-primary)', fontSize: '1.25rem' }}>~22 km</b>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                Diraphuk over Dolma La to Zutulphuk
              </h3>
              <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '14px' }}>
                Approx. 7–8 hours of strenuous ascent over the highest pass, Dolma La (5,630 m / 18,600 ft), passing sacred Gauri Kund, followed by a steep rocky descent to the valley floor.
              </p>
              <small style={{ color: 'var(--orange-deep)', fontWeight: 600 }}>Overnight: Basic lodge at Zutulphuk</small>
            </div>

            <div className="card-light">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span className="badge badge-moon">Stage 3 — Completion</span>
                <b style={{ color: 'var(--charcoal)', fontSize: '1.25rem' }}>~8–10 km</b>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                Zutulphuk to Darchen
              </h3>
              <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '14px' }}>
                Approx. 3–4 hours of gentle winding descent through Milarepa Cave gorges, reaching the endpoint where our vehicles wait to transfer yatris back to Darchen.
              </p>
              <small style={{ color: 'var(--orange-deep)', fontWeight: 600 }}>Overnight: Hotel in Darchen</small>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/itinerary" className="btn btn-ink">
              <span>Explore Day-by-Day Itineraries for All Routes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PREPARATION & HIGH-ALTITUDE TRAVEL CHALLENGES
          ========================================================================= */}
      <section className="sec sec-dark">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
                Medical Diligence & Safety
              </span>
              <h2 className="sec-title">
                Physical Preparation Without False Guarantees
              </h2>
              <p style={{ color: '#D6CBC1', fontSize: '1.08rem', lineHeight: '1.7', marginBottom: '24px' }}>
                High-altitude pilgrimage in western Tibet involves extreme remoteness, thin atmospheric pressure, and altitudes exceeding 5,000 meters. Shlloka Yatra manages this with absolute clinical transparency and seasoned mountaineering care.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Shield size={20} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <b style={{ color: '#FFFDF9', display: 'block', fontSize: '1rem' }}>12-Week Aerobic & Conditioning Roadmap</b>
                    <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginTop: '2px' }}>
                      Structured brisk walking, stair climbing, and respiratory pranayama to prepare lungs and cardiovascular endurance.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Shield size={20} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <b style={{ color: '#FFFDF9', display: 'block', fontSize: '1rem' }}>Clinical Oxygen & Acclimatisation Oversight</b>
                    <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginTop: '2px' }}>
                      Twice-daily pulse oximetry monitoring (SpO2), Gamow hyperbaric bag availability, emergency oxygen cylinders, and strict gradual ascent pacing.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <AlertCircle size={20} color="var(--yellow-warm)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <b style={{ color: '#FFFDF9', display: 'block', fontSize: '1rem' }}>High-Altitude Evacuation Insurance Mandatory</b>
                    <p style={{ color: '#D6CBC1', fontSize: '0.9rem', marginTop: '2px' }}>
                      Every yatri must hold travel insurance covering high-altitude emergency medical evacuation up to 6,000 m.
                    </p>
                  </div>
                </div>
              </div>

              <div className="btns">
                <Link to="/preparation-safety" className="btn btn-go">
                  <span>View 12-Week Guide & Packing List</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Inclusions Summary Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="card-dark" style={{ maxWidth: '480px', width: '100%' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFDF9', marginBottom: '18px' }}>
                  What Your Yatra Covers
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#FFFDF9' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> Tibet Travel Permit & China Group Visa</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> Kathmandu hotel accommodation (twin share)</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> 100% Pure vegetarian meals & hot drinking water</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> Ground transport in deluxe Tibetan coaches</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> Experienced Sherpa crew & English/Hindi guide</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Check size={18} color="var(--yellow-warm)" /> Travel kit (down jacket & duffel bag on returnable basis)</li>
                </ul>

                <div style={{ borderTop: '1px solid rgba(255, 249, 240, 0.12)', marginTop: '24px', paddingTop: '18px' }}>
                  <Link to="/inclusions-exclusions" style={{ color: 'var(--yellow-warm)', fontSize: '0.92rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>Read Full Inclusions & Exclusions Details</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: ABOUT SHLLOKA YATRA (Verified Information Only)
          ========================================================================= */}
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid rgba(41, 35, 30, 0.1)',
                  maxWidth: '480px',
                  width: '100%',
                }}
              >
                <img
                  src={assetUrl('/images/img_9.jpg')}
                  alt="Sherpa guide and yatris on Himalayan mountain pass"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span className="eyebrow">About Shlloka Yatra</span>
              <h2 className="sec-title" style={{ color: 'var(--charcoal)' }}>
                Pilgrimage Grounded in Reverence & Service
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--charcoal)', lineHeight: '1.7', marginBottom: '18px' }}>
                Shlloka Yatra organizes sacred pilgrimage journeys to Mount Kailash, Lake Mansarovar, and the greater Himalayas with devotion, medical safety, and dedicated volunteer support.
              </p>
              <p style={{ color: 'var(--warm-grey)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
                We believe that a pilgrimage to the abode of Lord Shiva is a sacred calling. We ensure every yatri is physically prepared, nutritionally nourished with satvik vegetarian food, and supported throughout the circumambulation by experienced Sherpa teams.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ padding: '14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(41, 35, 30, 0.08)' }}>
                  <b style={{ color: 'var(--orange-primary)', fontSize: '1.3rem', display: 'block' }}>100%</b>
                  <span style={{ fontSize: '0.85rem', color: 'var(--warm-grey)' }}>Pure Vegetarian Satvik Kitchen Crew</span>
                </div>
                <div style={{ padding: '14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(41, 35, 30, 0.08)' }}>
                  <b style={{ color: 'var(--orange-primary)', fontSize: '1.3rem', display: 'block' }}>24 / 7</b>
                  <span style={{ fontSize: '0.85rem', color: 'var(--warm-grey)' }}>Emergency Oxygen & Oximetry Pacing</span>
                </div>
              </div>

              <Link to="/about" className="btn btn-ink">
                <span>Learn More About Our Team & Mission</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS ACCORDION
          ========================================================================= */}
      <section className="sec sec-white">
        <div className="wrap-sm">
          <div className="sec-head centered">
            <span className="eyebrow">Clarity & Transparency</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
            <p className="sec-desc">
              Clear, factual answers to the most common questions asked by prospective pilgrims.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #ECE4DA',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--charcoal)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      gap: '16px',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      color="var(--orange-primary)"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 28px 24px',
                        color: 'var(--warm-grey)',
                        fontSize: '0.96rem',
                        lineHeight: '1.7',
                        borderTop: '1px solid #ECE4DA',
                        paddingTop: '18px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/faqs" style={{ color: 'var(--orange-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
              View all 20+ Frequently Asked Questions →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: MEMBERSHIP CTA (Become a Member)
          ========================================================================= */}
      <section
        className="sec"
        style={{
          background: 'linear-gradient(135deg, #2B231E 0%, #1A1512 100%)',
          color: '#FFFDF9',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="wrap" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ color: 'var(--yellow-warm)' }}>
            Join Our Sacred Community
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFDF9', marginBottom: '16px' }}>
            Become a Shlloka Yatra Member
          </h2>
          <p style={{ color: '#D6CBC1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '36px' }}>
            Register as a community member to receive prioritized batch advisories, preparation check-lists, live Himalayan weather briefings, and dedicated volunteer support for Kailash Mansarovar 2027.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/membership/register"
              className="btn btn-go"
              style={{ padding: '16px 36px', fontSize: '1.02rem', textDecoration: 'none' }}
            >
              <UserCheck size={18} />
              <span>Become a Member Today</span>
            </Link>
            <Link
              to="/login"
              className="btn btn-out"
              style={{ padding: '16px 32px', fontSize: '1.02rem', textDecoration: 'none' }}
            >
              <span>Member Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: CONTACT AND ENQUIRY CTA
          ========================================================================= */}
      <section
        style={{
          textAlign: 'center',
          padding: '100px 0',
          color: '#FFFDF9',
          backgroundColor: '#201A16',
          borderTop: '1px solid rgba(245, 184, 46, 0.2)',
        }}
      >
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ color: 'var(--orange-primary)' }}>
            Speak with an Advisor
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '18px', fontWeight: 300, color: '#FFFDF9' }}>
            Begin Planning Your Pilgrimage
          </h2>
          <p style={{ color: '#D6CBC1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '36px' }}>
            Our volunteer coordination team is available to answer your questions regarding medical suitability, passport validity, batch availability, and booking timelines.
          </p>
          <div className="btns" style={{ justifyContent: 'center', gap: '18px' }}>
            <Link to="/contact" className="btn btn-go" style={{ padding: '16px 36px' }}>
              <span>Send An Enquiry</span>
              <ArrowRight size={17} />
            </Link>
            <a href="tel:+916366852888" className="btn btn-out" style={{ padding: '16px 32px' }}>
              <Phone size={17} />
              <span>+91 6366852888</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
