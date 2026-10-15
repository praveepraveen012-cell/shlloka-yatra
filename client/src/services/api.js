import {
  OFFICIAL_DEPARTURES_2027,
  OFFICIAL_PACKAGES_2027,
  DAY_BY_DAY_ITINERARIES,
  OFFICIAL_FAQS_2027,
} from '../data/brochureData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('shlloka_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || (data.details ? data.details.map((d) => d.message).join(', ') : 'Request failed');
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Public Data with robust brochure fallbacks for static hosting
  getDepartures: async () => {
    try {
      const res = await request('/departures');
      if (res && res.departures && res.departures.length > 0) {
        return res;
      }
    } catch (err) {
      // Static hosting fallback to brochure source data
    }
    return { departures: OFFICIAL_DEPARTURES_2027 };
  },

  getDeparture: async (idOrSlug) => {
    try {
      const res = await request(`/departures/${idOrSlug}`);
      if (res && res.departure) return res;
    } catch (err) {
      // fallback
    }
    const found = OFFICIAL_DEPARTURES_2027.find(
      (d) => d.id === idOrSlug || d.slug === idOrSlug || String(d.batchNumber) === String(idOrSlug)
    );
    return { departure: found || OFFICIAL_DEPARTURES_2027[0] };
  },

  getRoutes: async () => {
    try {
      const res = await request('/routes');
      if (res && res.routes && res.routes.length > 0) return res;
    } catch (err) {
      // fallback
    }
    const formattedRoutes = OFFICIAL_PACKAGES_2027.map((pkg) => ({
      ...pkg,
      itinerary: DAY_BY_DAY_ITINERARIES[pkg.code] || [],
    }));
    return { routes: formattedRoutes };
  },

  getRoute: async (code) => {
    try {
      const res = await request(`/routes/${code}`);
      if (res && res.route) return res;
    } catch (err) {
      // fallback
    }
    const pkg = OFFICIAL_PACKAGES_2027.find((p) => p.code === code) || OFFICIAL_PACKAGES_2027[0];
    return {
      route: {
        ...pkg,
        itinerary: DAY_BY_DAY_ITINERARIES[pkg.code] || [],
      },
    };
  },

  getPricing: async () => {
    try {
      const res = await request('/pricing');
      if (res && res.tiers) return res;
    } catch (err) {
      // fallback
    }
    return { packages: OFFICIAL_PACKAGES_2027 };
  },

  calculatePrice: (payload) => request('/pricing/calculate', { method: 'POST', body: JSON.stringify(payload) }),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  getBookingByReference: (reference) => request(`/bookings/reference/${reference}`),
  createPaymentOrder: (payload) => request('/payments/create-order', { method: 'POST', body: JSON.stringify(payload) }),
  verifyPayment: (payload) => request('/payments/verify', { method: 'POST', body: JSON.stringify(payload) }),

  submitEnquiry: async (payload) => {
    try {
      return await request('/enquiries', { method: 'POST', body: JSON.stringify(payload) });
    } catch (err) {
      // Prompt requirement: If the backend is not configured, report that limitation clearly
      // rather than pretending the enquiry was saved.
      throw new Error(
        'Online submission server is not active on this static deployment. Please reach out directly to the Shlloka Yatra helpline at +91 6366852888 or email volunteers@shlloka.com with your enquiry details.'
      );
    }
  },

  getFaqs: async () => {
    try {
      const res = await request('/faqs');
      if (res && res.faqs && res.faqs.length > 0) return res;
    } catch (err) {
      // fallback
    }
    return {
      faqs: OFFICIAL_FAQS_2027.map((f, i) => ({
        id: `faq-${i + 1}`,
        question: f.q,
        answer: f.a,
        category: 'GENERAL',
      })),
    };
  },

  // Admin Data
  adminLogin: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getAdminProfile: () => request('/auth/me'),
  getAdminDashboardStats: () => request('/admin/dashboard-stats'),
  getAdminDepartures: () => request('/admin/departures'),
  updateAdminDeparture: (id, payload) => request(`/admin/departures/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminBookings: (query = '') => request(`/admin/bookings${query ? `?${query}` : ''}`),
  updateAdminBookingStatus: (id, payload) => request(`/admin/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminEnquiries: () => request('/admin/enquiries'),
  updateAdminEnquiryStatus: (id, payload) => request(`/admin/enquiries/${id}/status`, { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminPricing: () => request('/admin/pricing'),
  updateAdminPricingTier: (id, payload) => request(`/admin/pricing/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminAuditLogs: () => request('/admin/audit-logs'),
};

export default api;
