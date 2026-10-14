import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma.js';

const router = Router();

const travellerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  passportNumber: z.string().min(5, 'Valid passport or ID number is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  age: z.number().int().min(12).max(85, 'Yatris must be between 12 and 85 years of age'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  medicalConditions: z.string().optional().nullable(),
  dietaryPreference: z.string().default('PURE_VEGETARIAN'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(8, 'Emergency contact phone is required'),
  isPrimary: z.boolean().default(false),
});

const createBookingSchema = z.object({
  departureId: z.string().min(1, 'Departure batch is required'),
  routeId: z.string().min(1, 'Route is required'),
  passportType: z.enum(['INDIAN', 'FOREIGN']),
  contactName: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email('Valid email address is required'),
  contactPhone: z.string().min(8, 'Valid phone number is required'),
  notes: z.string().optional().nullable(),
  travellers: z.array(travellerSchema).min(1, 'At least one traveller must be registered'),
});

// Helper to generate unique booking reference: e.g. SKY-2027-1084
function generateBookingReference() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `SKY-2027-${randomSuffix}`;
}

// POST create a new booking with transactional capacity check and price calculation
router.post('/', async (req, res, next) => {
  try {
    const data = createBookingSchema.parse(req.body);
    const travellersCount = data.travellers.length;

    // Execute in transaction to ensure seat capacity consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch departure and lock seat check
      const departure = await tx.departure.findUnique({
        where: { id: data.departureId },
      });

      if (!departure) {
        throw new Error('Departure batch not found');
      }

      const availableSeats = departure.totalCapacity - departure.bookedSeats;
      if (availableSeats < travellersCount) {
        throw new Error(`Insufficient seats available in this departure batch. Only ${availableSeats} seat(s) remaining.`);
      }

      // 2. Fetch authoritative pricing
      const pricingTier = await tx.pricingTier.findFirst({
        where: {
          routeId: data.routeId,
          passportType: data.passportType,
        },
      });

      if (!pricingTier) {
        throw new Error('Pricing not configured for this route and passport combination');
      }

      // Calculate authoritative amounts on server
      const baseAmount = pricingTier.basePrice * travellersCount;
      const gstRate = data.passportType === 'INDIAN' ? pricingTier.gstPercentage / 100 : 0;
      const gstAmount = Math.round(baseAmount * gstRate);
      const supplementAmount = pricingTier.foreignAirfareSupplement * travellersCount;
      const totalAmount = baseAmount + gstAmount;

      // 3. Generate unique booking reference
      let bookingReference = generateBookingReference();
      let exists = await tx.booking.findUnique({ where: { bookingReference } });
      while (exists) {
        bookingReference = generateBookingReference();
        exists = await tx.booking.findUnique({ where: { bookingReference } });
      }

      // 4. Create Booking record
      const booking = await tx.booking.create({
        data: {
          bookingReference,
          departureId: data.departureId,
          routeId: data.routeId,
          passportType: data.passportType,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          totalTravellers: travellersCount,
          baseAmount,
          gstAmount,
          supplementAmount,
          totalAmount,
          currency: pricingTier.currency,
          status: 'PENDING',
          paymentStatus: 'UNPAID',
          notes: data.notes || '',
          travellers: {
            create: data.travellers.map((t, idx) => ({
              fullName: t.fullName,
              passportNumber: t.passportNumber,
              nationality: t.nationality,
              age: t.age,
              gender: t.gender,
              medicalConditions: t.medicalConditions || 'None disclosed',
              dietaryPreference: t.dietaryPreference || 'PURE_VEGETARIAN',
              emergencyContactName: t.emergencyContactName,
              emergencyContactPhone: t.emergencyContactPhone,
              isPrimary: idx === 0,
            })),
          },
        },
        include: {
          departure: true,
          route: true,
          travellers: true,
        },
      });

      // 5. Reserve seats on departure
      const updatedBooked = departure.bookedSeats + travellersCount;
      let newStatus = departure.status;
      if (updatedBooked >= departure.totalCapacity) {
        newStatus = 'SOLD_OUT';
      } else if (departure.totalCapacity - updatedBooked <= 5) {
        newStatus = 'FAST_FILLING';
      }

      await tx.departure.update({
        where: { id: departure.id },
        data: {
          bookedSeats: updatedBooked,
          status: newStatus,
        },
      });

      // 6. Log audit event
      await tx.auditLog.create({
        data: {
          userEmail: data.contactEmail,
          action: 'BOOKING_CREATED',
          entity: 'BOOKING',
          entityId: booking.id,
          details: JSON.stringify({
            reference: bookingReference,
            departureBatch: departure.name,
            totalTravellers: travellersCount,
            totalAmount,
          }),
        },
      });

      return booking;
    });

    res.status(201).json({
      message: 'Booking successfully created',
      booking: result,
    });
  } catch (error) {
    next(error);
  }
});

// GET booking by reference (for confirmation voucher & traveller portal)
router.get('/reference/:ref', async (req, res, next) => {
  try {
    const { ref } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { bookingReference: ref },
      include: {
        departure: true,
        route: true,
        travellers: true,
        payments: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking reference not found' });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
});

export default router;
