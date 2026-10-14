import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET all 3 pilgrimage routes with pricing tiers
router.get('/', async (req, res, next) => {
  try {
    const routes = await prisma.route.findMany({
      where: { isActive: true },
      include: {
        pricingTiers: true,
      },
      orderBy: { routeNumber: 'asc' },
    });

    const parsedRoutes = routes.map((r) => ({
      ...r,
      highlights: JSON.parse(r.highlights || '[]'),
      itinerary: JSON.parse(r.itinerary || '[]'),
    }));

    res.json({ routes: parsedRoutes });
  } catch (error) {
    next(error);
  }
});

// GET single route by code (e.g. "bus-both-ways", "flight-to-lhasa", "lhasa-ali-pulan")
router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const route = await prisma.route.findUnique({
      where: { code },
      include: {
        pricingTiers: true,
      },
    });

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.json({
      route: {
        ...route,
        highlights: JSON.parse(route.highlights || '[]'),
        itinerary: JSON.parse(route.itinerary || '[]'),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
