import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  Sparkles,
  Plane,
  Bus,
  Building,
  Check,
} from 'lucide-react';
import api from '../services/api';

const travellerSchema = z.object({
  fullName: z.string().min(2, 'Full name as per passport is required'),
  passportNumber: z.string().min(4, 'Valid passport or national ID number is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  age: z.coerce.number().int().min(12, 'Min age is 12').max(85, 'Max age is 85'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dietaryPreference: z.string().default('PURE_VEGETARIAN'),
  medicalConditions: z.string().optional(),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(8, 'Emergency contact phone is required'),
});

const bookingFormSchema = z.object({
  routeId: z.string().min(1, 'Please select a package option'),
  departureId: z.string().min(1, 'Please select a departure batch'),
  passportType: z.enum(['INDIAN', 'FOREIGN']),
  contactName: z.string().min(2, 'Primary contact name is required'),
  contactEmail: z.string().email('Valid email address is required'),
  contactPhone: z.string().min(8, 'Valid phone number with country code is required'),
  notes: z.string().optional(),
  policyAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the cancellation policy and payment schedule',
  }),
  travellers: z.array(travellerSchema).min(1, 'At least one traveller must be registered'),
});

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [departures, setDepartures] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [calculation, setCalculation] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      passportType: 'INDIAN',
      departureId: '',
      routeId: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      notes: '',
      policyAccepted: false,
      travellers: [
        {
          fullName: '',
          passportNumber: '',
          nationality: 'Indian',
          age: 45,
          gender: 'MALE',
          dietaryPreference: 'PURE_VEGETARIAN',
          medicalConditions: 'None',
          emergencyContactName: '',
          emergencyContactPhone: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'travellers',
  });

  const watchedRouteId = watch('routeId');
  const watchedDepartureId = watch('departureId');
  const watchedPassportType = watch('passportType');
  const watchedTravellers = watch('travellers');

  // Load initial departures and routes
  useEffect(() => {
    window.scrollTo(0, 0);

    async function init() {
      try {
        const [depRes, routeRes] = await Promise.all([api.getDepartures(), api.getRoutes()]);
        const deps = depRes.departures || [];
        const rts = routeRes.routes || [];
        setDepartures(deps);
        setRoutes(rts);

        // Preselect from URL query parameters if present
        const pkgParam = searchParams.get('package');
        const routeCodeParam = searchParams.get('routeCode');
        const depIdParam = searchParams.get('departureId');

        if (depIdParam && deps.some((d) => d.id === depIdParam)) {
          setValue('departureId', depIdParam);
        } else if (deps.length > 0) {
          setValue('departureId', deps[0].id);
        }

        if (routeCodeParam) {
          const match = rts.find((r) => r.code === routeCodeParam);
          if (match) setValue('routeId', match.id);
        } else if (pkgParam) {
          const num = pkgParam.includes('1') ? 1 : pkgParam.includes('2') ? 2 : 3;
          const match = rts.find((r) => r.routeNumber === num);
          if (match) setValue('routeId', match.id);
        } else if (rts.length > 0) {
          setValue('routeId', rts[0].id);
        }
      } catch (err) {
        setServerError('Unable to load departure batches and routes from backend.');
      }
    }

    init();
  }, [searchParams, setValue]);

  // Recalculate authoritative price when route, passport type or travellers change
  useEffect(() => {
    if (!watchedRouteId || !watchedPassportType || !watchedTravellers || watchedTravellers.length === 0) {
      return;
    }

    let isMounted = true;
    async function calc() {
      setCalculating(true);
      try {
        const res = await api.calculatePrice({
          routeId: watchedRouteId,
          passportType: watchedPassportType,
          travellersCount: watchedTravellers.length,
        });
        if (isMounted) setCalculation(res.calculation);
      } catch (err) {
        // Handled silently
      } finally {
        if (isMounted) setCalculating(false);
      }
    }

    calc();
    return () => {
      isMounted = false;
    };
  }, [watchedRouteId, watchedPassportType, watchedTravellers.length]);

  const handleNextFromStep1 = async () => {
    const valid = await trigger(['routeId']);
    if (valid) setActiveStep(2);
  };

  const handleNextFromStep2 = async () => {
    const valid = await trigger(['departureId']);
    if (valid) setActiveStep(3);
  };

  const handleNextFromStep3 = async () => {
    const valid = await trigger(['contactName', 'contactEmail', 'contactPhone', 'travellers']);
    if (valid) setActiveStep(4);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setServerError(null);

    try {
      // Create authoritative booking record in backend database
      const bookingRes = await api.createBooking(data);
      const createdBooking = bookingRes.booking;

      // Navigate to confirmed registration voucher page with verified reference
      navigate(`/booking-success?ref=${createdBooking.bookingReference}`);
    } catch (err) {
      setServerError(err.message || 'Booking submission failed. Please try again or contact support.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDeparture = departures.find((d) => d.id === watchedDepartureId);
  const selectedRoute = routes.find((r) => r.id === watchedRouteId);

  return (
    <div style={{ backgroundColor: 'var(--snow)', minHeight: '100vh' }}>
      {/* Editorial Header */}
      <section className="page-hero-dark" style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 70px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '14px' }}>
            Multi-Step Yatra Registration
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 300, marginBottom: '16px', color: '#FFFFFF' }}>
            Book Your Kailash Yatra 2027
          </h1>
          <p className="lead" style={{ color: '#F0E6DF', maxWidth: '64ch' }}>
            Complete your registration in 5 straightforward steps. Real-time seat inventory check, transparent pricing from the brochure, and official bank transfer coordination.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '50px' }} />
      </section>

      {/* Main Form Body */}
      <section className="sec" style={{ paddingTop: '50px' }}>
        <div className="wrap">
          {/* Step Progress Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { step: 1, label: '1. Package' },
                { step: 2, label: '2. Departure' },
                { step: 3, label: '3. Travellers' },
                { step: 4, label: '4. Review & Terms' },
                { step: 5, label: '5. Confirmation' },
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => s.step < activeStep && setActiveStep(s.step)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: 'none',
                    background:
                      activeStep === s.step
                        ? 'var(--saffron)'
                        : activeStep > s.step
                        ? '#0e1c22'
                        : '#e2ebed',
                    color:
                      activeStep === s.step
                        ? '#1a1205'
                        : activeStep > s.step
                        ? '#ffffff'
                        : '#738a90',
                    fontWeight: activeStep === s.step ? 700 : 500,
                    fontSize: '0.84rem',
                    cursor: s.step < activeStep ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {activeStep > s.step ? <Check size={14} /> : null}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div
                style={{
                  background: 'rgba(255, 117, 107, 0.15)',
                  border: '1px solid #ff756b',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '28px',
                  color: '#ffb3ae',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <AlertCircle size={20} color="#ff756b" />
                <span style={{ fontSize: '0.92rem' }}>{serverError}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr min(380px, 100%)', gap: '40px', alignItems: 'flex-start' }}>
              {/* Form Steps Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '40px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid #dce5e8',
                }}
              >
                {/* STEP 1: CHOOSE PACKAGE */}
                {activeStep === 1 && (
                  <div className="animate-fade">
                    <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--saffron)', fontWeight: 700 }}>
                      Step 1 of 4
                    </span>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--ink)', margin: '6px 0 10px' }}>
                      Choose Your Travel Package
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
                      Select one of the three travel options described in the 2027 Kailash Mansarovar brochure.
                    </p>

                    {/* Nationality Selector */}
                    <div style={{ marginBottom: '24px' }}>
                      <label className="form-label light">Your Passport Category</label>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <label
                          style={{
                            flex: 1,
                            padding: '12px 18px',
                            borderRadius: '12px',
                            border: watchedPassportType === 'INDIAN' ? '2px solid var(--saffron)' : '1px solid #c7d5d8',
                            background: watchedPassportType === 'INDIAN' ? '#fcf8f0' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input
                            type="radio"
                            value="INDIAN"
                            {...register('passportType')}
                            style={{ accentColor: 'var(--saffron)' }}
                          />
                          <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>🇮🇳 Indian Passport</span>
                        </label>

                        <label
                          style={{
                            flex: 1,
                            padding: '12px 18px',
                            borderRadius: '12px',
                            border: watchedPassportType === 'FOREIGN' ? '2px solid var(--saffron)' : '1px solid #c7d5d8',
                            background: watchedPassportType === 'FOREIGN' ? '#fcf8f0' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <input
                            type="radio"
                            value="FOREIGN"
                            {...register('passportType')}
                            style={{ accentColor: 'var(--saffron)' }}
                          />
                          <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>🌍 Foreign / NRI Passport</span>
                        </label>
                      </div>
                    </div>

                    {/* Package Options Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                      {routes.map((r) => {
                        const isSelected = watchedRouteId === r.id;
                        const isOverland = r.code === 'bus-both-ways';
                        return (
                          <div
                            key={r.id}
                            onClick={() => setValue('routeId', r.id)}
                            style={{
                              padding: '24px',
                              borderRadius: '16px',
                              border: isSelected ? '2px solid var(--saffron)' : '1px solid #dce4e7',
                              background: isSelected ? '#fbf8f2' : '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '16px',
                              transition: 'all 0.2s',
                              boxShadow: isSelected ? '0 8px 24px rgba(233, 162, 59, 0.15)' : 'none',
                            }}
                          >
                            <input
                              type="radio"
                              value={r.id}
                              checked={isSelected}
                              onChange={() => setValue('routeId', r.id)}
                              style={{ accentColor: 'var(--saffron)', marginTop: '4px' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {isOverland ? <Bus size={18} color="var(--saffron)" /> : <Plane size={18} color="var(--saffron)" />}
                                  <b style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
                                    Option {r.routeNumber}: {r.name.split('—')[1] || r.name}
                                  </b>
                                </div>
                                <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '1.1rem' }}>
                                  {watchedPassportType === 'INDIAN'
                                    ? `₹${(r.pricingTiers?.find((p) => p.passportType === 'INDIAN')?.basePrice || 350000).toLocaleString('en-IN')}`
                                    : `₹${(r.pricingTiers?.find((p) => p.passportType === 'FOREIGN')?.basePrice || 425000).toLocaleString('en-IN')}`}
                                </span>
                              </div>
                              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '6px', lineHeight: '1.5' }}>
                                {r.description}
                              </p>
                              <small style={{ color: '#0f4c5c', fontWeight: 600, display: 'block', marginTop: '6px' }}>
                                Duration: {r.durationDays} Days • Mode: {r.travelMode}
                              </small>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextFromStep1}
                      className="btn btn-go"
                      style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
                    >
                      <span>Proceed to Choose Departure Batch</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>
                )}

                {/* STEP 2: CHOOSE DEPARTURE BATCH */}
                {activeStep === 2 && (
                  <div className="animate-fade">
                    <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--saffron)', fontWeight: 700 }}>
                      Step 2 of 4
                    </span>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--ink)', margin: '6px 0 10px' }}>
                      Choose Departure Batch
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                      Select one of the eight approved brochure batches for 2027. Four batches coincide with Full Moon at Lake Mansarovar.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                      {departures.map((batch) => {
                        const isSelected = watchedDepartureId === batch.id;
                        const available = batch.totalCapacity - batch.bookedSeats;
                        return (
                          <div
                            key={batch.id}
                            onClick={() => setValue('departureId', batch.id)}
                            style={{
                              padding: '18px 20px',
                              borderRadius: '14px',
                              border: isSelected ? '2px solid var(--saffron)' : '1px solid #dce4e7',
                              background: isSelected ? '#fbf8f2' : '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '12px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <input
                                type="radio"
                                value={batch.id}
                                checked={isSelected}
                                onChange={() => setValue('departureId', batch.id)}
                                style={{ accentColor: 'var(--saffron)' }}
                              />
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <b style={{ color: 'var(--ink)', fontSize: '1rem' }}>{batch.name}</b>
                                  {batch.isFullMoon && (
                                    <span className="badge-pill badge-moon" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                                      Full Moon
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                                  Arrival: {new Date(batch.arrivalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • Final Departure: {new Date(batch.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '0.78rem', color: '#0f4c5c', fontWeight: 600, display: 'block' }}>
                                {batch.totalDays} Days
                              </span>
                              <small style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                                {available} seats remaining
                              </small>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="btn btn-out"
                        style={{ color: 'var(--ink)', borderColor: '#c7d5d8' }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextFromStep2}
                        className="btn btn-go"
                        style={{ flex: 1, padding: '16px' }}
                      >
                        <span>Proceed to Traveller Details</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: TRAVELLER DETAILS */}
                {activeStep === 3 && (
                  <div className="animate-fade">
                    <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--saffron)', fontWeight: 700 }}>
                      Step 3 of 4
                    </span>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--ink)', margin: '6px 0 10px' }}>
                      Primary Contact & Traveller Details
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                      Please provide the lead traveller contact details and registered yatri details as they appear on official identification documents.
                    </p>

                    {/* Primary Contact Block */}
                    <div style={{ background: '#f8fafb', padding: '24px', borderRadius: '16px', border: '1px solid #dbe6e9', marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '16px' }}>
                        Lead Contact Information
                      </h3>
                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label light">Primary Contact Full Name *</label>
                          <input
                            type="text"
                            {...register('contactName')}
                            placeholder="e.g. Rajesh Sharma"
                            className="form-input light"
                          />
                          {errors.contactName && <p className="form-error">{errors.contactName.message}</p>}
                        </div>

                        <div className="form-group">
                          <label className="form-label light">Email Address (for vouchers) *</label>
                          <input
                            type="email"
                            {...register('contactEmail')}
                            placeholder="rajesh@example.com"
                            className="form-input light"
                          />
                          {errors.contactEmail && <p className="form-error">{errors.contactEmail.message}</p>}
                        </div>
                      </div>

                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label light">Phone Number with Country Code *</label>
                          <input
                            type="tel"
                            {...register('contactPhone')}
                            placeholder="+91 9876543210"
                            className="form-input light"
                          />
                          {errors.contactPhone && <p className="form-error">{errors.contactPhone.message}</p>}
                        </div>

                        <div className="form-group">
                          <label className="form-label light">Special Travel or Accessibility Notes</label>
                          <input
                            type="text"
                            {...register('notes')}
                            placeholder="e.g. Require horse hire at Yamdwar, dietary notes..."
                            className="form-input light"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Travellers Roster */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--ink)', margin: 0 }}>
                        Traveller Roster ({fields.length})
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          append({
                            fullName: '',
                            passportNumber: '',
                            nationality: watchedPassportType === 'INDIAN' ? 'Indian' : '',
                            age: 45,
                            gender: 'MALE',
                            dietaryPreference: 'PURE_VEGETARIAN',
                            medicalConditions: 'None',
                            emergencyContactName: '',
                            emergencyContactPhone: '',
                          })
                        }
                        className="btn btn-out btn-sm"
                        style={{ color: 'var(--ink)', borderColor: 'var(--saffron)' }}
                      >
                        <Plus size={16} />
                        <span>Add Another Yatri</span>
                      </button>
                    </div>

                    {fields.map((field, idx) => (
                      <div
                        key={field.id}
                        style={{
                          background: '#f8fafb',
                          borderRadius: '16px',
                          padding: '24px',
                          border: '1px solid #dbe6e9',
                          marginBottom: '20px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <b style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
                            Yatri {idx + 1} {idx === 0 ? '(Lead Yatri)' : ''}
                          </b>
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              style={{ background: 'none', border: 'none', color: '#c2392f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
                            >
                              <Trash2 size={16} />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label light">Full Name as per Passport *</label>
                            <input
                              type="text"
                              {...register(`travellers.${idx}.fullName`)}
                              placeholder="Full Name"
                              className="form-input light"
                            />
                            {errors.travellers?.[idx]?.fullName && <p className="form-error">{errors.travellers[idx].fullName.message}</p>}
                          </div>

                          <div className="form-group">
                            <label className="form-label light">Passport / National ID Number *</label>
                            <input
                              type="text"
                              {...register(`travellers.${idx}.passportNumber`)}
                              placeholder="e.g. Z1234567"
                              className="form-input light"
                            />
                            {errors.travellers?.[idx]?.passportNumber && <p className="form-error">{errors.travellers[idx].passportNumber.message}</p>}
                          </div>
                        </div>

                        <div className="grid-3">
                          <div className="form-group">
                            <label className="form-label light">Nationality *</label>
                            <input
                              type="text"
                              {...register(`travellers.${idx}.nationality`)}
                              className="form-input light"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label light">Age (12 to 85) *</label>
                            <input
                              type="number"
                              min="12"
                              max="85"
                              {...register(`travellers.${idx}.age`)}
                              className="form-input light"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label light">Gender</label>
                            <select {...register(`travellers.${idx}.gender`)} className="form-select light">
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label light">Emergency Contact Name *</label>
                            <input
                              type="text"
                              {...register(`travellers.${idx}.emergencyContactName`)}
                              placeholder="Family / Relative Name"
                              className="form-input light"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label light">Emergency Contact Phone *</label>
                            <input
                              type="tel"
                              {...register(`travellers.${idx}.emergencyContactPhone`)}
                              placeholder="+91 Emergency Phone"
                              className="form-input light"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="btn btn-out"
                        style={{ color: 'var(--ink)', borderColor: '#c7d5d8' }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextFromStep3}
                        className="btn btn-go"
                        style={{ flex: 1, padding: '16px' }}
                      >
                        <span>Review & Policy Acknowledgement</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & CANCELLATION POLICY ACKNOWLEDGEMENT */}
                {activeStep === 4 && (
                  <div className="animate-fade">
                    <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--saffron)', fontWeight: 700 }}>
                      Step 4 of 4
                    </span>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--ink)', margin: '6px 0 10px' }}>
                      Review & Payment Terms
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                      Please review your pilgrimage itinerary summary, payment schedule terms, and confirm your cancellation policy acknowledgement.
                    </p>

                    {/* Summary Overview */}
                    <div style={{ background: '#f8fafb', borderRadius: '16px', padding: '24px', border: '1px solid #dbe6e9', marginBottom: '24px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <small style={{ color: 'var(--muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>Package Option</small>
                          <b style={{ display: 'block', fontSize: '1rem', color: 'var(--ink)' }}>{selectedRoute?.name}</b>
                        </div>
                        <div>
                          <small style={{ color: 'var(--muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>Departure Batch</small>
                          <b style={{ display: 'block', fontSize: '1rem', color: 'var(--ink)' }}>{selectedDeparture?.name}</b>
                        </div>
                        <div>
                          <small style={{ color: 'var(--muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>Total Travellers</small>
                          <b style={{ display: 'block', fontSize: '1rem', color: 'var(--ink)' }}>{watchedTravellers.length} Person(s)</b>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid #e1e9ec', paddingTop: '12px', fontSize: '0.86rem', color: 'var(--muted)' }}>
                        Primary Contact: <b>{watch('contactName')}</b> ({watch('contactEmail')} • {watch('contactPhone')})
                      </div>
                    </div>

                    {/* Staged Payment Terms from Brochure */}
                    <div
                      style={{
                        background: '#f0f5f7',
                        border: '1px solid #c9d8dd',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '28px',
                      }}
                    >
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '12px' }}>
                        Official Booking Payment Terms (from Brochure)
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--muted)' }}>
                        <li style={{ display: 'flex', gap: '10px' }}>
                          <CheckCircle2 size={16} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span><b>Registration Amount:</b> ₹25,000 (or USD 250) per person, non-refundable deposit. This deposit forms part of your initial booking payment.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px' }}>
                          <CheckCircle2 size={16} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span><b>50% Payment:</b> Due upon confirmation to trigger Tibet group permit and visa applications.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px' }}>
                          <CheckCircle2 size={16} color="var(--saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span><b>Remaining 50%:</b> Payable 30 days after the first payment to finalize flights, logistics, and hotel bookings.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Cancellation Policy Checkbox */}
                    <div style={{ marginBottom: '28px' }}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          cursor: 'pointer',
                          padding: '16px',
                          borderRadius: '12px',
                          background: errors.policyAccepted ? '#fff5f5' : '#f8fafb',
                          border: errors.policyAccepted ? '1px solid #ff756b' : '1px solid #dce4e7',
                        }}
                      >
                        <input
                          type="checkbox"
                          {...register('policyAccepted')}
                          style={{ accentColor: 'var(--saffron)', marginTop: '4px', width: '18px', height: '18px' }}
                        />
                        <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: '1.5' }}>
                          I have read and agree to the <b>Kailash Mansarovar Yatra 2027 booking terms</b>, the non-refundable registration amount, the payment schedule, and the official <Link to="/cancellation-policy" target="_blank" style={{ color: 'var(--saffron)', textDecoration: 'underline' }}>Cancellation Policy</Link> (25% refund before 75 days, 50% refund before 50 days, no refund before 30 days or for no-shows).
                        </span>
                      </label>
                      {errors.policyAccepted && <p className="form-error">{errors.policyAccepted.message}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="btn btn-out"
                        style={{ color: 'var(--ink)', borderColor: '#c7d5d8' }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-go"
                        style={{ flex: 1, padding: '16px' }}
                      >
                        <span>{submitting ? 'Generating Booking Reference...' : 'Submit Yatra Registration'}</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Live Breakdown */}
              <div
                style={{
                  background: '#0d1a21',
                  borderRadius: '24px',
                  padding: '36px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Sparkles size={16} color="var(--saffron)" />
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--glacier)' }}>
                    Live Price Breakdown
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#ffffff' }}>
                  Estimated Investment
                </h3>

                {calculating ? (
                  <p style={{ color: 'var(--glacier)', fontSize: '0.88rem' }}>Updating calculation with server...</p>
                ) : calculation ? (
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', paddingBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8fa4a9' }}>Base Amount ({calculation.travellersCount} × INR {calculation.basePricePerPerson.toLocaleString('en-IN')})</span>
                        <b style={{ color: '#ffffff' }}>INR {calculation.baseAmount.toLocaleString('en-IN')}</b>
                      </div>

                      {calculation.gstAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#8fa4a9' }}>GST (5% Government Tax)</span>
                          <b style={{ color: 'var(--saffron)' }}>+ INR {calculation.gstAmount.toLocaleString('en-IN')}</b>
                        </div>
                      )}

                      {calculation.foreignAirfareSupplementUsd > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#8fa4a9' }}>Airfare Sector Supplement</span>
                          <b style={{ color: 'var(--saffron)' }}>+ US$ {calculation.foreignAirfareSupplementUsd.toLocaleString('en-US')}</b>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0' }}>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>Total Package Cost:</span>
                      <div style={{ textAlign: 'right' }}>
                        <b style={{ fontSize: '1.55rem', color: '#ffffff', fontFamily: 'var(--sans)' }}>
                          INR {calculation.totalAmount.toLocaleString('en-IN')}
                        </b>
                        {calculation.foreignAirfareSupplementUsd > 0 && (
                          <small style={{ display: 'block', color: 'var(--saffron)', fontSize: '0.82rem' }}>
                            + US$ {calculation.foreignAirfareSupplementUsd.toLocaleString('en-US')}
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Deposit Due Today */}
                    <div style={{ background: '#12252e', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(233, 162, 59, 0.3)', marginBottom: '20px' }}>
                      <small style={{ color: 'var(--glacier)', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block' }}>
                        Initial Registration Deposit
                      </small>
                      <b style={{ fontSize: '1.35rem', color: 'var(--saffron)' }}>
                        INR {calculation.depositAmount.toLocaleString('en-IN')}
                      </b>
                      <small style={{ color: '#889da3', fontSize: '0.74rem', display: 'block', marginTop: '2px' }}>
                        (INR 25,000 / US$ 250 per traveller)
                      </small>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--glacier)', fontSize: '0.88rem' }}>Select package to view calculation.</p>
                )}

                <div style={{ fontSize: '0.8rem', color: '#7e969d', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <ShieldCheck size={16} color="var(--saffron)" />
                    <span>Real-time backend capacity lock</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle2 size={16} color="var(--saffron)" />
                    <span>Instant booking reference generation</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
