import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Printer, Download, Calendar, Users, Phone, ArrowRight, ShieldCheck, Mail, Building, Info } from 'lucide-react';
import api from '../services/api';

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (reference) {
      api.getBookingByReference(reference)
        .then((res) => setBooking(res.booking))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError('No booking reference provided in request URL');
    }
  }, [reference]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--snow)' }}>
        <p style={{ color: 'var(--muted)' }}>Retrieving your booking voucher record...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--snow)', padding: '40px' }}>
        <div style={{ background: '#ffffff', padding: '40px', borderRadius: '20px', textAlign: 'center', maxWidth: '500px', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ color: 'var(--ink)', marginBottom: '12px' }}>Voucher Record Not Found</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>{error || 'Unable to locate reference details.'}</p>
          <Link to="/" className="btn btn-ink">Return to Homepage</Link>
        </div>
      </div>
    );
  }

  const depositRequired = (booking.travellers?.length || 1) * 25000;

  return (
    <div style={{ backgroundColor: 'var(--snow)', padding: '140px 0 80px' }}>
      <div className="wrap-sm">
        {/* Printable Voucher Card */}
        <div
          id="printable-voucher"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #d8e5e8',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
          }}
        >
          {/* Top Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #10242d 0%, #0a171d 100%)',
              color: '#ffffff',
              padding: '40px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(233, 162, 59, 0.2)',
                border: '2px solid var(--saffron)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle size={36} color="var(--saffron)" />
            </div>

            <span className="badge-pill badge-gold" style={{ marginBottom: '10px' }}>
              Registration Request Logged
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '8px' }}>
              Om Namah Shivaya!
            </h1>
            <p style={{ color: '#b9c8cc', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
              Your Yatra registration request for Kailash Mansarovar 2027 has been recorded in our reservation database.
            </p>

            {/* Reference Badge */}
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(233, 162, 59, 0.18)',
                border: '1px dashed var(--saffron)',
                borderRadius: '12px',
                padding: '12px 28px',
                marginTop: '20px',
              }}
            >
              <small style={{ color: 'var(--glacier)', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block' }}>
                Official Booking Reference
              </small>
              <b style={{ fontSize: '1.7rem', color: 'var(--saffron)', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                {booking.bookingReference}
              </b>
            </div>
          </div>

          {/* Details Body */}
          <div style={{ padding: '40px' }}>
            {/* Grid of Key Info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                paddingBottom: '30px',
                borderBottom: '1px solid #e5ecee',
                marginBottom: '30px',
              }}
            >
              <div>
                <small style={{ color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Departure Batch</small>
                <b style={{ display: 'block', fontSize: '1.05rem', color: 'var(--ink)', marginTop: '2px' }}>
                  {booking.departure?.name}
                </b>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Arrival: {new Date(booking.departure?.arrivalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              <div>
                <small style={{ color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Travel Option</small>
                <b style={{ display: 'block', fontSize: '1.05rem', color: 'var(--ink)', marginTop: '2px' }}>
                  {booking.route?.name}
                </b>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  {booking.route?.durationDays} Days Duration
                </span>
              </div>

              <div>
                <small style={{ color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Booking Status</small>
                <div style={{ marginTop: '4px' }}>
                  <span className="badge-pill badge-status-filling" style={{ fontSize: '0.75rem' }}>
                    Request Recorded • Deposit Pending
                  </span>
                </div>
              </div>
            </div>

            {/* Travellers Roster */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '16px' }}>
                Registered Travellers ({booking.travellers?.length || 0})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {booking.travellers?.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    style={{
                      background: '#f8fafb',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '1px solid #e1e9ec',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <b style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>{t.fullName}</b>
                      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', marginLeft: '10px' }}>
                        ({t.nationality} • {t.age} yrs • {t.gender})
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      ID / Passport: <b>{t.passportNumber}</b>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Payment Terms & Bank Transfer Instructions */}
            <div
              style={{
                background: '#f0f5f7',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #c9d8dd',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <Building size={22} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--ink)', margin: 0 }}>
                    Official Bank Transfer Instructions for Registration Deposit
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>
                    As specified in the brochure, your slot is secured upon receipt of the non-refundable registration amount of <b>INR 25,000</b> (or USD 250) per person. The remaining 50% is due upon confirmation, and the balance 50% is due 30 days later.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '18px 24px',
                  border: '1px solid #d8e4e7',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  fontSize: '0.88rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Beneficiary Name</span>
                  <b style={{ color: 'var(--ink)' }}>Shlloka Yatra Private Limited</b>
                </div>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Bank Name</span>
                  <b style={{ color: 'var(--ink)' }}>IndusInd Bank</b>
                </div>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Account Type</span>
                  <b style={{ color: 'var(--ink)' }}>Current Account</b>
                </div>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Account Number</span>
                  <b style={{ color: 'var(--ink)', fontFamily: 'monospace', fontSize: '1rem' }}>201037169009</b>
                </div>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>IFSC Code</span>
                  <b style={{ color: 'var(--ink)', fontFamily: 'monospace' }}>INDB0000672</b>
                </div>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Amount to Transfer</span>
                  <b style={{ color: 'var(--saffron)', fontSize: '1.05rem' }}>INR {depositRequired.toLocaleString('en-IN')}</b>
                </div>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                <b>Next Steps:</b> After initiating the NEFT/RTGS/IMPS wire transfer, please email your transaction UTR / bank reference number along with your booking reference <b>{booking.bookingReference}</b> to <a href="mailto:volunteers@shlloka.com" style={{ color: 'var(--ink)', fontWeight: 600 }}>volunteers@shlloka.com</a> or WhatsApp/call our coordination desk at <a href="tel:+916366852888" style={{ color: 'var(--ink)', fontWeight: 600 }}>+91 6366852888</a>.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handlePrint}
                className="btn btn-ink"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Printer size={16} />
                <span>Print Registration Voucher</span>
              </button>
              <Link to="/departures" className="btn btn-out" style={{ color: 'var(--ink)', borderColor: '#c7d5d8' }}>
                <span>Back to 2027 Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
