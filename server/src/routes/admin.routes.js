import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Apply auth to all admin endpoints
router.use(authenticateToken);
router.use(requireAdmin);

// 1. GET Dashboard Metrics Overview
router.get('/dashboard-stats', async (req, res, next) => {
  try {
    const totalBookings = await prisma.booking.count();
    const confirmedBookings = await prisma.booking.count({ where: { status: 'CONFIRMED' } });
    const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });
    const totalTravellers = await prisma.traveller.count();

    const departures = await prisma.departure.findMany();
    const totalCapacity = departures.reduce((sum, d) => sum + d.totalCapacity, 0);
    const totalBookedSeats = departures.reduce((sum, d) => sum + d.bookedSeats, 0);

    const payments = await prisma.payment.findMany({ where: { status: 'SUCCESS' } });
    const totalRevenueInr = payments.reduce((sum, p) => sum + p.amount, 0);

    const totalEnquiries = await prisma.enquiry.count();
    const newEnquiries = await prisma.enquiry.count({ where: { status: 'NEW' } });

    res.json({
      stats: {
        totalBookings,
        confirmedBookings,
        pendingBookings,
        totalTravellers,
        totalCapacity,
        totalBookedSeats,
        occupancyRate: Math.round((totalBookedSeats / (totalCapacity || 1)) * 100),
        totalRevenueInr,
        totalEnquiries,
        newEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 2. Departures Management
router.get('/departures', async (req, res, next) => {
  try {
    const departures = await prisma.departure.findMany({
      orderBy: { batchNumber: 'asc' },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    res.json({ departures });
  } catch (error) {
    next(error);
  }
});

const updateDepartureSchema = z.object({
  name: z.string().optional(),
  totalCapacity: z.number().int().min(1).optional(),
  bookedSeats: z.number().int().min(0).optional(),
  status: z.enum(['AVAILABLE', 'FAST_FILLING', 'SOLD_OUT']).optional(),
  isFullMoon: z.boolean().optional(),
  description: z.string().optional().nullable(),
});

router.put('/departures/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = updateDepartureSchema.parse(req.body);

    const updated = await prisma.departure.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        userEmail: req.user.email,
        action: 'DEPARTURE_UPDATED',
        entity: 'DEPARTURE',
        entityId: id,
        details: JSON.stringify(data),
      },
    });

    res.json({ message: 'Departure updated successfully', departure: updated });
  } catch (error) {
    next(error);
  }
});

// 3. Bookings Management
router.get('/bookings', async (req, res, next) => {
  try {
    const { status, departureId } = req.query;

    const where = {};
    if (status) where.status = String(status);
    if (departureId) where.departureId = String(departureId);

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        departure: true,
        route: true,
        travellers: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
});

const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
  paymentStatus: z.enum(['UNPAID', 'PARTIALLY_PAID', 'PAID', 'REFUNDED']).optional(),
  notes: z.string().optional(),
});

router.put('/bookings/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, notes } = updateBookingStatusSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        ...(paymentStatus && { paymentStatus }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        departure: true,
        route: true,
        travellers: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        userEmail: req.user.email,
        action: 'BOOKING_STATUS_CHANGED',
        entity: 'BOOKING',
        entityId: id,
        details: JSON.stringify({ oldStatus: booking.status, newStatus: status, paymentStatus }),
      },
    });

    res.json({ message: 'Booking status updated successfully', booking: updated });
  } catch (error) {
    next(error);
  }
});

// 4. Enquiries Management
router.get('/enquiries', async (req, res, next) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ enquiries });
  } catch (error) {
    next(error);
  }
});

router.put('/enquiries/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = z.object({ status: z.enum(['NEW', 'CONTACTED', 'RESOLVED']) }).parse(req.body);

    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    res.json({ message: 'Enquiry updated successfully', enquiry: updated });
  } catch (error) {
    next(error);
  }
});

// 5. Pricing Tiers Management
router.get('/pricing', async (req, res, next) => {
  try {
    const tiers = await prisma.pricingTier.findMany({
      include: { route: true },
      orderBy: [{ routeId: 'asc' }, { passportType: 'asc' }],
    });
    res.json({ pricingTiers: tiers });
  } catch (error) {
    next(error);
  }
});

const updatePricingSchema = z.object({
  basePrice: z.number().int().min(10000).optional(),
  gstPercentage: z.number().min(0).max(30).optional(),
  foreignAirfareSupplement: z.number().int().min(0).optional(),
  depositRequired: z.number().int().min(1000).optional(),
});

router.put('/pricing/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = updatePricingSchema.parse(req.body);

    const updated = await prisma.pricingTier.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        userEmail: req.user.email,
        action: 'PRICING_UPDATED',
        entity: 'PRICING_TIER',
        entityId: id,
        details: JSON.stringify(data),
      },
    });

    res.json({ message: 'Pricing tier updated successfully', pricingTier: updated });
  } catch (error) {
    next(error);
  }
});

// 6. Audit Logs
router.get('/audit-logs', async (req, res, next) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ logs });
  } catch (error) {
    next(error);
  }
});

// 7. Member Management
router.get('/members', async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const where = {};
    if (status && status !== 'ALL') {
      where.status = String(status);
    }
    if (search) {
      const q = String(search).trim();
      where.OR = [
        { firstName: { contains: q } },
        { lastName: { contains: q } },
        { email: { contains: q.toLowerCase() } },
        { mobile: { contains: q } },
        { membershipReference: { contains: q.toUpperCase() } },
      ];
    }

    const members = await prisma.member.findMany({
      where,
      select: {
        id: true,
        membershipReference: true,
        firstName: true,
        lastName: true,
        email: true,
        mobile: true,
        whatsapp: true,
        dateOfBirth: true,
        nationality: true,
        country: true,
        state: true,
        city: true,
        membershipType: true,
        yatraInterest: true,
        preferredBatch: true,
        preferredPackage: true,
        travellersCount: true,
        sourceDiscovery: true,
        marketingConsent: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ members, count: members.length });
  } catch (error) {
    next(error);
  }
});

router.put('/members/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = z.object({
      status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING']),
    }).parse(req.body);

    const updated = await prisma.member.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        membershipReference: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        userEmail: req.user.email,
        action: 'MEMBER_STATUS_CHANGED',
        entity: 'MEMBER',
        entityId: id,
        details: JSON.stringify({ newStatus: status }),
      },
    });

    res.json({ message: 'Member status updated successfully', member: updated });
  } catch (error) {
    next(error);
  }
});

router.get('/members/export/csv', async (req, res, next) => {
  try {
    const members = await prisma.member.findMany({
      select: {
        membershipReference: true,
        firstName: true,
        lastName: true,
        email: true,
        mobile: true,
        whatsapp: true,
        nationality: true,
        country: true,
        city: true,
        membershipType: true,
        yatraInterest: true,
        preferredBatch: true,
        preferredPackage: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'Membership Ref',
      'First Name',
      'Last Name',
      'Email',
      'Mobile',
      'WhatsApp',
      'Nationality',
      'Country',
      'City',
      'Type',
      'Yatra Interest',
      'Batch',
      'Package',
      'Status',
      'Registration Date',
    ];

    const rows = members.map((m) => [
      `"${m.membershipReference}"`,
      `"${m.firstName.replace(/"/g, '""')}"`,
      `"${m.lastName.replace(/"/g, '""')}"`,
      `"${m.email}"`,
      `"${m.mobile}"`,
      `"${m.whatsapp || ''}"`,
      `"${m.nationality}"`,
      `"${m.country}"`,
      `"${m.city}"`,
      `"${m.membershipType}"`,
      `"${m.yatraInterest || ''}"`,
      `"${m.preferredBatch || ''}"`,
      `"${m.preferredPackage || ''}"`,
      `"${m.status}"`,
      `"${new Date(m.createdAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="shlloka-members-${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
});

export default router;
