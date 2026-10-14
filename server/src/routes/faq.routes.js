import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET all FAQs grouped by category
router.get('/', async (req, res, next) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    res.json({ faqs });
  } catch (error) {
    next(error);
  }
});

export default router;
