import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma.js';

const router = Router();

const calculateSchema = z.object({
  routeId: z.string().min(1, 'Route ID is required'),
  passportType: z.enum(['INDIAN', 'FOREIGN']),
  travellersCount: z.number().int().min(1).max(20).default(1),
});

// GET all pricing tiers
router.get('/', async (req, res, next) => {
  try {
    const tiers = await prisma.pricingTier.findMany({
      include: {
        route: {
          select: {
            id: true,
            routeNumber: true,
            name: true,
            code: true,
            approachType: true,
          },
        },
      },
      orderBy: [{ routeId: 'asc' }, { passportType: 'asc' }],
    });

    res.json({
      pricingTiers: tiers,
      policy: {
        gstRate: 0.05,
        depositPerPersonInr: 25000,
        depositPerPersonUsd: 250,
        paymentTerms: [
          'Non-refundable registration deposit of INR 25,000 / USD 250',
          '50% payment to confirm the Yatra',
          'Balance 50% payable 30 days after first payment',
        ],
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST authoritative server-side price calculation
router.post('/calculate', async (req, res, next) => {
  try {
    const { routeId, passportType, travellersCount } = calculateSchema.parse(req.body);

    const pricingTier = await prisma.pricingTier.findFirst({
      where: {
        routeId,
        passportType,
      },
      include: {
        route: true,
      },
    });

    if (!pricingTier) {
      return res.status(404).json({ error: 'Pricing structure not found for selected route and passport type.' });
    }

    const basePerPerson = pricingTier.basePrice;
    const baseAmount = basePerPerson * travellersCount;

    // GST: 5% on Indian passport bookings
    const gstRate = passportType === 'INDIAN' ? pricingTier.gstPercentage / 100 : 0;
    const gstAmount = Math.round(baseAmount * gstRate);

    // Foreign airfare supplement (in USD)
    const foreignAirfareSupplementUsd = pricingTier.foreignAirfareSupplement * travellersCount;

    const totalAmount = baseAmount + gstAmount;
    const depositAmount = pricingTier.depositRequired * travellersCount;

    res.json({
      calculation: {
        routeId: pricingTier.routeId,
        routeName: pricingTier.route.name,
        passportType,
        travellersCount,
        basePricePerPerson: basePerPerson,
        baseAmount,
        gstRatePercent: pricingTier.gstPercentage,
        gstAmount,
        foreignAirfareSupplementUsd,
        totalAmount,
        depositAmount,
        currency: pricingTier.currency,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
