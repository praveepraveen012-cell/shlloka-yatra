import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export default function FaqAccordion({ faqs = [] }) {
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'ALL', label: 'All FAQs' },
    { key: 'GENERAL', label: 'General & Yatra' },
    { key: 'ITINERARY', label: 'Parikrama & Trek' },
    { key: 'PRICING', label: 'Pricing & Terms' },
    { key: 'HEALTH', label: 'Health & Altitude' },
    { key: 'TRAVEL_PERMITS', label: 'Visas & Permits' },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Search & Category Filter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
        <div style={{ position: 'relative', width: 'min(480px, 100%)', margin: '0 auto' }}>
          <Search size={18} color="var(--glacier)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search questions on preparation, routes, pricing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '44px', borderRadius: '999px', background: 'rgba(11,21,25,0.85)' }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: activeCategory === cat.key ? '1px solid var(--saffron)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeCategory === cat.key ? 'rgba(233, 162, 59, 0.18)' : '#0f1d24',
                color: activeCategory === cat.key ? 'var(--saffron)' : '#c2d2d6',
                fontSize: '0.85rem',
                fontWeight: activeCategory === cat.key ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Items */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--glacier)' }}>
          <HelpCircle size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <p>No questions found matching your search. Please reach out to our Yatra advisors directly.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '860px', margin: '0 auto' }}>
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  background: isOpen ? '#142730' : '#0c181e',
                  border: isOpen ? '1px solid rgba(233, 162, 59, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  style={{
                    width: '100%',
                    padding: '22px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--serif)',
                    fontSize: '1.15rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 400 }}>{faq.question}</span>
                  <span style={{ color: isOpen ? 'var(--saffron)' : 'var(--glacier)', flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 28px 24px',
                      color: '#c2d2d6',
                      fontSize: '0.96rem',
                      lineHeight: '1.7',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
