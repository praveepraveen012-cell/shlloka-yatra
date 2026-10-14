import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Phone, ArrowRight } from 'lucide-react';
import FaqAccordion from '../components/FaqAccordion';
import api from '../services/api';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getFaqs()
      .then((res) => setFaqs(res.faqs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--snow)' }}>
      {/* Header */}
      <section style={{ background: 'var(--night)', color: '#ffffff', padding: '160px 0 90px' }}>
        <div className="wrap">
          <span className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
            Frequently Asked Questions
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            Yatri Knowledge Base
          </h1>
          <p className="lead" style={{ color: '#c5d5d8', maxWidth: '64ch' }}>
            Find answers to commonly asked questions on eligibility, high-altitude preparation, visa processing, food, routes, and payment terms.
          </p>
        </div>
        <div className="flags" style={{ marginTop: '70px' }} />
      </section>

      {/* FAQs Section */}
      <section className="sec dark" style={{ background: '#09151b' }}>
        <div className="wrap">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--glacier)' }}>
              <p>Loading questions...</p>
            </div>
          ) : (
            <FaqAccordion faqs={faqs} />
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#0e1d24', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.2rem', marginBottom: '14px' }}>Have a question not listed here?</h2>
          <p style={{ color: '#a2b9be', maxWidth: '52ch', margin: '0 auto 28px' }}>
            Our experienced Yatra advisors are on call to assist you with personalized medical, logistical, and spiritual guidance.
          </p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-go">
              <span>Contact an Advisor</span>
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+916366852888" className="btn btn-out">
              <Phone size={15} />
              <span>Call +91 6366852888</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
