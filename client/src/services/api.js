const API_BASE = '/api';

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
  // Public Data
  getDepartures: () => request('/departures'),
  getDeparture: (idOrSlug) => request(`/departures/${idOrSlug}`),
  getRoutes: () => request('/routes'),
  getRoute: (code) => request(`/routes/${code}`),
  getPricing: () => request('/pricing'),
  calculatePrice: (payload) => request('/pricing/calculate', { method: 'POST', body: JSON.stringify(payload) }),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  getBookingByReference: (reference) => request(`/bookings/reference/${reference}`),
  createPaymentOrder: (payload) => request('/payments/create-order', { method: 'POST', body: JSON.stringify(payload) }),
  verifyPayment: (payload) => request('/payments/verify', { method: 'POST', body: JSON.stringify(payload) }),
  submitEnquiry: (payload) => request('/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
  getFaqs: () => request('/faqs'),

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
