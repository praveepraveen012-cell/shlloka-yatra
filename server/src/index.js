import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import departureRoutes from './routes/departure.routes.js';
import routeRoutes from './routes/route.routes.js';
import pricingRoutes from './routes/pricing.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import faqRoutes from './routes/faq.routes.js';
import adminRoutes from './routes/admin.routes.js';
import membershipRoutes from './routes/membership.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Shlloka Yatra Backend API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/departures', departureRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/admin', adminRoutes);

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../../client/dist');

// Serve static client assets and handle SPA client-side routes
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// SPA fallback for all valid client-side routes
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(clientDistPath, 'index.html'))) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  } else {
    res.status(404).send('Client build not found. Please run "npm run build" in client directory.');
  }
});

// Centralized error handler
app.use(errorHandler);

const isMain = process.argv[1] && process.argv[1].endsWith('index.js');
if (isMain || (process.env.NODE_ENV !== 'test' && !process.env.TEST_MODE)) {
  app.listen(PORT, () => {
    console.log(`Shlloka Yatra API Server listening on port ${PORT}`);
    console.log(`Health endpoint: http://localhost:${PORT}/api/health`);
  });
}

export default app;
