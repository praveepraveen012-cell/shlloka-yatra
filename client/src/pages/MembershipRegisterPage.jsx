import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Compass,
  Lock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  Info,
} from 'lucide-react';

export default function MembershipRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [sameAsMobile, setSameAsMobile] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    mobile: '+91 ',
    whatsapp: '',
    dateOfBirth: '',
    nationality: 'Indian',
    country: 'India',
    state: '',
    city: '',

    // Step 2: Membership Details
    membershipType: 'STANDARD',
    yatraInterest: 'YES_2027',
    preferredBatch: 'BATCH_1',
    preferredPackage: 'OPTION_1',
    travellersCount: 1,
    sourceDiscovery: 'WEBSITE',

    // Step 3: Account Security
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
    marketingConsent: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'mobile' && sameAsMobile) {
        next.whatsapp = value;
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSameAsMobileToggle = (checked) => {
    setSameAsMobile(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 8) {
      errs.mobile = 'Valid mobile number with country code is required';
    }
    if (!sameAsMobile && (!formData.whatsapp || formData.whatsapp.trim().length < 8)) {
      errs.whatsapp = 'Valid WhatsApp number is required';
    }
    if (!formData.nationality.trim()) errs.nationality = 'Nationality is required';
    if (!formData.country.trim()) errs.country = 'Country of residence is required';
    if (!formData.state.trim()) errs.state = 'State or province is required';
    if (!formData.city.trim()) errs.city = 'City is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    // Step 2 fields have defaults or are optional
    return true;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (!formData.password || formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.acceptTerms) {
      errs.acceptTerms = 'You must accept the Terms and Conditions';
    }
    if (!formData.acceptPrivacy) {
      errs.acceptPrivacy = 'You must accept the Privacy Policy';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    setServerError('');
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setServerError('');
    setLoading(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        mobile: formData.mobile.trim(),
        whatsapp: sameAsMobile ? formData.mobile.trim() : (formData.whatsapp || '').trim(),
        dateOfBirth: formData.dateOfBirth || null,
        nationality: formData.nationality.trim(),
        country: formData.country.trim(),
        state: formData.state.trim(),
        city: formData.city.trim(),
        membershipType: formData.membershipType,
        yatraInterest: formData.yatraInterest,
        preferredBatch: formData.preferredBatch,
        preferredPackage: formData.preferredPackage,
        travellersCount: Number(formData.travellersCount) || 1,
        sourceDiscovery: formData.sourceDiscovery,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: Boolean(formData.acceptTerms),
        acceptPrivacy: Boolean(formData.acceptPrivacy),
        marketingConsent: Boolean(formData.marketingConsent),
      };

      const res = await fetch('/api/membership/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please check the provided information.');
      }

      // Store member session for immediate access
      localStorage.setItem('shlloka_member_token', data.token);
      localStorage.setItem('shlloka_member_user', JSON.stringify(data.member));

      // Navigate to success confirmation with member data
      navigate('/membership/success', {
        state: {
          memberReference: data.membershipReference,
          member: data.member,
        },
      });
    } catch (err) {
      setServerError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Yatra Interest', icon: Compass },
    { number: 3, title: 'Security', icon: Lock },
    { number: 4, title: 'Review & Submit', icon: CheckCircle2 },
  ];

  return (
    <div style={{ backgroundColor: 'var(--ivory-bg)', minHeight: '90vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div className="wrap" style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="eyebrow">Shlloka Yatra Membership</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--charcoal)', marginBottom: '10px' }}>
            Become a Registered Member
          </h1>
          <p style={{ color: 'var(--warm-grey)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            Join our spiritual community to receive verified updates, early batch access, and personalized pilgrimage guidance for Kailash Mansarovar Yatra 2027.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            position: 'relative',
          }}
        >
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div
                key={s.number}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isCurrent
                      ? 'var(--orange-primary)'
                      : isCompleted
                      ? 'var(--orange-deep)'
                      : '#FFFFFF',
                    border: isCurrent
                      ? '2px solid var(--yellow-warm)'
                      : isCompleted
                      ? '2px solid var(--orange-deep)'
                      : '2px solid #D8CFC5',
                    color: isCurrent || isCompleted ? '#FFFFFF' : 'var(--warm-grey)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? '0 0 16px rgba(232, 117, 24, 0.4)' : 'none',
                  }}
                >
                  <Icon size={20} />
                </div>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? 'var(--orange-primary)' : 'var(--warm-grey)',
                    marginTop: '8px',
                    textAlign: 'center',
                  }}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(28px, 6vw, 48px)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(41, 35, 30, 0.08)',
          }}
        >
          {serverError && (
            <div
              style={{
                background: 'rgba(185, 74, 22, 0.1)',
                border: '1px solid rgba(185, 74, 22, 0.3)',
                color: 'var(--orange-deep)',
                padding: '16px 20px',
                borderRadius: '12px',
                marginBottom: '28px',
                fontSize: '0.94rem',
              }}
            >
              {serverError}
            </div>
          )}

          {/* ================= STEP 1: PERSONAL INFORMATION ================= */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(41, 35, 30, 0.08)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '4px' }}>
                  Step 1: Personal Details
                </h2>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem' }}>
                  Please provide your accurate legal contact information for membership records and communications.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* First Name */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. Ramesh"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                </div>

                {/* Last Name */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                </div>

                {/* Email Address */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input light"
                    placeholder="e.g. ramesh.sharma@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                {/* Mobile Number with Country Code */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="mobile">Mobile Number (with Country Code) *</label>
                  <input
                    id="mobile"
                    type="tel"
                    className="form-input light"
                    placeholder="+91 9876543210"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                  />
                  {errors.mobile && <div className="form-error">{errors.mobile}</div>}
                </div>

                {/* WhatsApp Number Option */}
                <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: sameAsMobile ? '0' : '10px' }}>
                    <input
                      id="sameAsMobile"
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--orange-primary)', cursor: 'pointer' }}
                    />
                    <label htmlFor="sameAsMobile" style={{ fontSize: '0.9rem', color: 'var(--charcoal)', cursor: 'pointer' }}>
                      My WhatsApp number is the same as my mobile number
                    </label>
                  </div>

                  {!sameAsMobile && (
                    <div>
                      <input
                        id="whatsapp"
                        type="tel"
                        className="form-input light"
                        placeholder="WhatsApp Number (with country code)"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                      />
                      {errors.whatsapp && <div className="form-error">{errors.whatsapp}</div>}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="dateOfBirth">Date of Birth (Optional)</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    className="form-input light"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  />
                </div>

                {/* Nationality */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="nationality">Nationality *</label>
                  <input
                    id="nationality"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. Indian"
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                  />
                  {errors.nationality && <div className="form-error">{errors.nationality}</div>}
                </div>

                {/* Country of Residence */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="country">Country of Residence *</label>
                  <input
                    id="country"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. India, United States, UK"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                  {errors.country && <div className="form-error">{errors.country}</div>}
                </div>

                {/* State / Province */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="state">State or Province *</label>
                  <input
                    id="state"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. Karnataka, Maharashtra, Delhi"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                  {errors.state && <div className="form-error">{errors.state}</div>}
                </div>

                {/* City */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    className="form-input light"
                    placeholder="e.g. Bengaluru, Mumbai, New Delhi"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                  {errors.city && <div className="form-error">{errors.city}</div>}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: MEMBERSHIP DETAILS ================= */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(41, 35, 30, 0.08)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '4px' }}>
                  Step 2: Membership & Pilgrimage Preferences
                </h2>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem' }}>
                  Help us tailor departure advisories and pilgrimage briefings to your schedule.
                </p>
              </div>

              {/* Informational Callout: Separate from booking */}
              <div
                style={{
                  background: 'rgba(232, 117, 24, 0.08)',
                  border: '1px solid rgba(232, 117, 24, 0.25)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '28px',
                }}
              >
                <Info size={20} color="var(--orange-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--charcoal)', lineHeight: '1.6' }}>
                  <b>Important Note:</b> Membership registration is completely separate from booking a Yatra. Becoming a member does not charge fees or automatically confirm a trip or seat. Trip reservations are completed separately through the booking portal.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
                {/* Membership Type */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="membershipType">Membership Tier</label>
                  <select
                    id="membershipType"
                    className="form-select light"
                    value={formData.membershipType}
                    onChange={(e) => handleChange('membershipType', e.target.value)}
                  >
                    <option value="STANDARD">Standard Yatri Membership (Default)</option>
                  </select>
                </div>

                {/* Interest in Kailash Mansarovar Yatra 2027 */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="yatraInterest">Interest in Kailash Yatra 2027</label>
                  <select
                    id="yatraInterest"
                    className="form-select light"
                    value={formData.yatraInterest}
                    onChange={(e) => handleChange('yatraInterest', e.target.value)}
                  >
                    <option value="YES_2027">Yes — Planning to participate in 2027</option>
                    <option value="EXPLORING">Exploring / Gathering Information</option>
                    <option value="FUTURE">Interested in Future Yatras (2028+)</option>
                  </select>
                </div>

                {/* Preferred Departure Batch */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="preferredBatch">Preferred 2027 Departure Batch</label>
                  <select
                    id="preferredBatch"
                    className="form-select light"
                    value={formData.preferredBatch}
                    onChange={(e) => handleChange('preferredBatch', e.target.value)}
                  >
                    <option value="BATCH_1">Batch 1: 09 May – 22 May (Full Moon)</option>
                    <option value="BATCH_2">Batch 2: 23 May – 05 Jun</option>
                    <option value="BATCH_3">Batch 3: 07 Jun – 20 Jun (Full Moon)</option>
                    <option value="BATCH_4">Batch 4: 21 Jun – 04 Jul</option>
                    <option value="BATCH_5">Batch 5: 06 Jul – 19 Jul (Full Moon)</option>
                    <option value="FLEXIBLE">Flexible / Undecided</option>
                  </select>
                </div>

                {/* Preferred Travel Package */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="preferredPackage">Preferred Travel Route</label>
                  <select
                    id="preferredPackage"
                    className="form-select light"
                    value={formData.preferredPackage}
                    onChange={(e) => handleChange('preferredPackage', e.target.value)}
                  >
                    <option value="OPTION_1">Option 1: Classic Overland via Kyirong (14 Days - ₹3,50,000)</option>
                    <option value="OPTION_2">Option 2: Fly to Lhasa & Scenic Road (14 Days - ₹4,37,000)</option>
                    <option value="OPTION_3">Option 3: Lhasa & Ali High-Altitude Flights (11 Days - ₹4,94,000)</option>
                    <option value="UNDECIDED">Need Volunteer Recommendation</option>
                  </select>
                </div>

                {/* Expected Travellers Count */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="travellersCount">Estimated Travellers in Your Group</label>
                  <input
                    id="travellersCount"
                    type="number"
                    min="1"
                    max="20"
                    className="form-input light"
                    value={formData.travellersCount}
                    onChange={(e) => handleChange('travellersCount', parseInt(e.target.value, 10) || 1)}
                  />
                </div>

                {/* Source Discovery */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="sourceDiscovery">How did you hear about Shlloka Yatra? (Optional)</label>
                  <select
                    id="sourceDiscovery"
                    className="form-select light"
                    value={formData.sourceDiscovery}
                    onChange={(e) => handleChange('sourceDiscovery', e.target.value)}
                  >
                    <option value="WEBSITE">Website & Direct Search</option>
                    <option value="WORD_OF_MOUTH">Word of Mouth / Past Yatri</option>
                    <option value="VOLUNTEER">Shlloka Volunteer Outreach</option>
                    <option value="SOCIAL_MEDIA">Social Media / Himalayan Video</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: ACCOUNT SECURITY ================= */}
          {currentStep === 3 && (
            <div>
              <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(41, 35, 30, 0.08)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '4px' }}>
                  Step 3: Account Security & Consents
                </h2>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem' }}>
                  Create a secure password to access your member dashboard and review privacy agreements.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* Create Password */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="password">Create Password (min. 8 characters) *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input light"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      style={{ paddingRight: '48px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--warm-grey)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <div className="form-error">{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label light" htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input light"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                  {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
                </div>
              </div>

              {/* Legal Consents */}
              <div
                style={{
                  background: 'var(--ivory-bg)',
                  border: '1px solid rgba(41, 35, 30, 0.08)',
                  padding: '22px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Terms and Conditions */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--orange-primary)', cursor: 'pointer', marginTop: '2px' }}
                    />
                    <label htmlFor="acceptTerms" style={{ fontSize: '0.9rem', color: 'var(--charcoal)', cursor: 'pointer' }}>
                      I accept the <Link to="/terms-and-conditions" target="_blank" style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>Terms and Conditions</Link> of Shlloka Yatra. *
                    </label>
                  </div>
                  {errors.acceptTerms && <div className="form-error" style={{ marginLeft: '30px' }}>{errors.acceptTerms}</div>}
                </div>

                {/* Privacy Policy */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <input
                      id="acceptPrivacy"
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => handleChange('acceptPrivacy', e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--orange-primary)', cursor: 'pointer', marginTop: '2px' }}
                    />
                    <label htmlFor="acceptPrivacy" style={{ fontSize: '0.9rem', color: 'var(--charcoal)', cursor: 'pointer' }}>
                      I agree to the <Link to="/privacy-policy" target="_blank" style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>Privacy Policy</Link> and data handling for pilgrimage coordination. *
                    </label>
                  </div>
                  {errors.acceptPrivacy && <div className="form-error" style={{ marginLeft: '30px' }}>{errors.acceptPrivacy}</div>}
                </div>

                {/* Marketing Consent (unchecked by default) */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    id="marketingConsent"
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => handleChange('marketingConsent', e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--orange-primary)', cursor: 'pointer', marginTop: '2px' }}
                  />
                  <label htmlFor="marketingConsent" style={{ fontSize: '0.88rem', color: 'var(--warm-grey)', cursor: 'pointer' }}>
                    I wish to receive occasional spiritual articles, preparation tips, and Himalayan weather updates from Shlloka Yatra (Optional).
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
          {currentStep === 4 && (
            <div>
              <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(41, 35, 30, 0.08)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--charcoal)', marginBottom: '4px' }}>
                  Step 4: Review Your Registration
                </h2>
                <p style={{ color: 'var(--warm-grey)', fontSize: '0.92rem' }}>
                  Please review your information below before submitting. Click edit on any section to make adjustments.
                </p>
              </div>

              {/* Review Card: Personal Info */}
              <div
                style={{
                  background: 'var(--ivory-bg)',
                  border: '1px solid rgba(41, 35, 30, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <b style={{ color: 'var(--charcoal)', fontSize: '1.05rem' }}>Personal Information</b>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--orange-primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                    }}
                  >
                    Edit Step 1
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Full Name</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.firstName} {formData.lastName}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Email Address</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.email}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Mobile Number</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.mobile}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>WhatsApp Number</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.whatsapp || formData.mobile}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Location</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.city}, {formData.state}, {formData.country}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Nationality</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.nationality}</b>
                  </div>
                </div>
              </div>

              {/* Review Card: Membership & Preferences */}
              <div
                style={{
                  background: 'var(--ivory-bg)',
                  border: '1px solid rgba(41, 35, 30, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <b style={{ color: 'var(--charcoal)', fontSize: '1.05rem' }}>Membership Preferences</b>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--orange-primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                    }}
                  >
                    Edit Step 2
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Membership Type</span>
                    <b style={{ color: 'var(--charcoal)' }}>Standard Membership (Free)</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>2027 Yatra Interest</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.yatraInterest}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Preferred Batch</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.preferredBatch}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Preferred Route</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.preferredPackage}</b>
                  </div>
                  <div>
                    <span style={{ color: 'var(--warm-grey)', display: 'block' }}>Travellers in Group</span>
                    <b style={{ color: 'var(--charcoal)' }}>{formData.travellersCount}</b>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(232, 117, 24, 0.08)',
                  border: '1px solid rgba(232, 117, 24, 0.25)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  color: 'var(--charcoal)',
                  marginBottom: '28px',
                }}
              >
                ✓ Your unique Membership Reference (e.g. <b>SHL-MEM-2027-XXXX</b>) will be generated upon server confirmation.
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(41, 35, 30, 0.08)',
              paddingTop: '28px',
              marginTop: '12px',
            }}
          >
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="btn btn-login-outline"
                style={{ padding: '12px 24px', fontSize: '0.92rem' }}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            ) : (
              <Link
                to="/login"
                style={{
                  color: 'var(--warm-grey)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Already a member? Sign in
              </Link>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-go"
                style={{ padding: '12px 28px', fontSize: '0.95rem' }}
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-go"
                style={{
                  padding: '14px 36px',
                  fontSize: '1.02rem',
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Registering with Server...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
