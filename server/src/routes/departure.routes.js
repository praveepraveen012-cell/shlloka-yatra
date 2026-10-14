import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET all 2027 departures with real-time capacity and availability
router.get('/', async (req, res, next) => {
  try {
    const departures = await prisma.departure.findMany({
      orderBy: { batchNumber: 'asc' },
    });

    const enriched = departures.map((d) => {
      const remainingSeats = Math.max(0, d.totalCapacity - d.bookedSeats);
      let calculatedStatus = d.status;
      if (remainingSeats === 0) {
        calculatedStatus = 'SOLD_OUT';
      } else if (remainingSeats <= 5) {
        calculatedStatus = 'FAST_FILLING';
      }

      return {
        ...d,
        remainingSeats,
        status: calculatedStatus,
      };
    });

    res.json({ departures: enriched });
  } catch (error) {
    next(error);
  }
});

// GET departure by id or slug
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const departure = await prisma.departure.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!departure) {
      return res.status(404).json({ error: 'Departure batch not found' });
    }

    const remainingSeats = Math.max(0, departure.totalCapacity - departure.bookedSeats);
    res.json({
      departure: {
        ...departure,
        remainingSeats,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
