import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma.js';

const router = Router();

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(8, 'Phone number is required'),
  preferredBatch: z.string().optional().nullable(),
  preferredRoute: z.string().optional().nullable(),
  travellersCount: z.number().int().min(1).max(30).optional().default(1),
  message: z.string().min(5, 'Please provide details or questions regarding your pilgrimage'),
});

// POST submit a pilgrimage enquiry
router.post('/', async (req, res, next) => {
  try {
    const data = enquirySchema.parse(req.body);

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredBatch: data.preferredBatch || null,
        preferredRoute: data.preferredRoute || null,
        travellersCount: data.travellersCount || 1,
        message: data.message,
        status: 'NEW',
      },
    });

    res.status(201).json({
      message: 'Enquiry received. A Shlloka Yatra advisor will connect with you within 24 hours.',
      enquiryId: enquiry.id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
