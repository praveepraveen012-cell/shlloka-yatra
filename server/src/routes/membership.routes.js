import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../prisma.js';

const router = Router();

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().min(8, 'Please enter a valid mobile number with country code'),
  whatsapp: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  nationality: z.string().min(2, 'Nationality is required'),
  country: z.string().min(2, 'Country of residence is required'),
  state: z.string().min(2, 'State / Province is required'),
  city: z.string().min(2, 'City is required'),
  membershipType: z.string().default('STANDARD'),
  yatraInterest: z.string().optional().nullable(),
  preferredBatch: z.string().optional().nullable(),
  preferredPackage: z.string().optional().nullable(),
  travellersCount: z.number().int().min(1).default(1).optional().nullable(),
  sourceDiscovery: z.string().optional().nullable(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password must match'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms and Conditions' }),
  }),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Privacy Policy' }),
  }),
  marketingConsent: z.boolean().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter your email or registered mobile number'),
  password: z.string().min(6, 'Please enter your password'),
  rememberMe: z.boolean().optional(),
});

// Helper to generate unique membership reference
async function generateUniqueMembershipRef() {
  for (let i = 0; i < 10; i++) {
    const num = Math.floor(1000 + Math.random() * 9000);
    const ref = `SHL-MEM-2027-${num}`;
    const exists = await prisma.member.findUnique({
      where: { membershipReference: ref },
    });
    if (!exists) return ref;
  }
  return `SHL-MEM-2027-${Date.now().toString().slice(-4)}`;
}

// POST /api/membership/register
router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const normalizedEmail = data.email.toLowerCase().trim();
    const normalizedMobile = data.mobile.trim();

    // Check if email already exists
    const existingEmail = await prisma.member.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingEmail) {
      return res.status(409).json({
        error: 'An account with this email address already exists. Please login instead.',
      });
    }

    // Check if mobile already exists
    const existingMobile = await prisma.member.findUnique({
      where: { mobile: normalizedMobile },
    });
    if (existingMobile) {
      return res.status(409).json({
        error: 'An account with this mobile number already exists. Please login instead.',
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);
    const membershipReference = await generateUniqueMembershipRef();

    const member = await prisma.member.create({
      data: {
        membershipReference,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: normalizedEmail,
        mobile: normalizedMobile,
        whatsapp: data.whatsapp ? data.whatsapp.trim() : normalizedMobile,
        dateOfBirth: data.dateOfBirth || null,
        nationality: data.nationality.trim(),
        country: data.country.trim(),
        state: data.state.trim(),
        city: data.city.trim(),
        passwordHash,
        membershipType: data.membershipType || 'STANDARD',
        yatraInterest: data.yatraInterest || null,
        preferredBatch: data.preferredBatch || null,
        preferredPackage: data.preferredPackage || null,
        travellersCount: data.travellersCount || 1,
        sourceDiscovery: data.sourceDiscovery || null,
        marketingConsent: Boolean(data.marketingConsent),
        status: 'ACTIVE',
      },
    });

    const token = jwt.sign(
      {
        memberId: member.id,
        reference: member.membershipReference,
        email: member.email,
        role: 'MEMBER',
      },
      process.env.JWT_SECRET || 'shlloka_yatra_jwt_secret_dev_key_2027_secure_key',
      { expiresIn: '7d' }
    );

    // Audit log
    await prisma.auditLog.create({
      data: {
        userEmail: member.email,
        action: 'MEMBER_REGISTERED',
        entity: 'MEMBER',
        entityId: member.id,
        details: JSON.stringify({ reference: member.membershipReference, country: member.country }),
      },
    });

    res.status(201).json({
      message: 'Membership registration successful',
      membershipReference: member.membershipReference,
      token,
      member: {
        id: member.id,
        membershipReference: member.membershipReference,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        mobile: member.mobile,
        whatsapp: member.whatsapp,
        country: member.country,
        city: member.city,
        membershipType: member.membershipType,
        status: member.status,
        createdAt: member.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/membership/login
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password, rememberMe } = loginSchema.parse(req.body);
    const cleanId = identifier.trim();

    // Check by email or mobile
    const member = await prisma.member.findFirst({
      where: {
        OR: [
          { email: cleanId.toLowerCase() },
          { mobile: cleanId },
          { membershipReference: cleanId.toUpperCase() },
        ],
      },
    });

    if (!member) {
      return res.status(401).json({
        error: 'No member account found with this email, mobile, or membership ID. Please verify your details or register.',
      });
    }

    if (member.status === 'SUSPENDED') {
      return res.status(403).json({
        error: 'Your membership account is currently suspended. Please contact volunteers@shlloka.com.',
      });
    }

    const isValid = await bcrypt.compare(password, member.passwordHash);
    if (!isValid) {
      return res.status(401).json({
        error: 'Incorrect password. Please verify and try again.',
      });
    }

    const expiresIn = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      {
        memberId: member.id,
        reference: member.membershipReference,
        email: member.email,
        role: 'MEMBER',
      },
      process.env.JWT_SECRET || 'shlloka_yatra_jwt_secret_dev_key_2027_secure_key',
      { expiresIn }
    );

    // Audit log
    await prisma.auditLog.create({
      data: {
        userEmail: member.email,
        action: 'MEMBER_LOGIN',
        entity: 'MEMBER',
        entityId: member.id,
        details: JSON.stringify({ ip: req.ip, userAgent: req.headers['user-agent'] }),
      },
    });

    res.json({
      message: 'Login successful',
      token,
      member: {
        id: member.id,
        membershipReference: member.membershipReference,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        mobile: member.mobile,
        whatsapp: member.whatsapp,
        nationality: member.nationality,
        country: member.country,
        state: member.state,
        city: member.city,
        membershipType: member.membershipType,
        yatraInterest: member.yatraInterest,
        preferredBatch: member.preferredBatch,
        preferredPackage: member.preferredPackage,
        status: member.status,
        createdAt: member.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Middleware for member authentication
const authenticateMemberToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Please sign in to access your member account.' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'shlloka_yatra_jwt_secret_dev_key_2027_secure_key'
    );
    const member = await prisma.member.findUnique({
      where: { id: decoded.memberId },
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
        status: true,
        createdAt: true,
      },
    });

    if (!member) {
      return res.status(401).json({ error: 'Member session expired. Please sign in again.' });
    }

    req.member = member;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }
};

// GET /api/membership/me
router.get('/me', authenticateMemberToken, async (req, res) => {
  res.json({ member: req.member });
});

// POST /api/membership/forgot-password
router.post('/forgot-password', async (req, res, next) => {
  try {
    const schema = z.object({
      identifier: z.string().min(3, 'Please enter your registered email or mobile number'),
    });
    const { identifier } = schema.parse(req.body);
    const clean = identifier.trim();

    const member = await prisma.member.findFirst({
      where: {
        OR: [
          { email: clean.toLowerCase() },
          { mobile: clean },
        ],
      },
    });

    // To prevent user enumeration while providing helpful feedback, return a standard success response
    if (member) {
      await prisma.auditLog.create({
        data: {
          userEmail: member.email,
          action: 'MEMBER_PASSWORD_RESET_REQUESTED',
          entity: 'MEMBER',
          entityId: member.id,
          details: JSON.stringify({ ip: req.ip }),
        },
      });
    }

    res.json({
      message: 'If a registered account matches the details provided, a password reset link has been dispatched to your email / mobile. For immediate assistance, contact volunteers@shlloka.com or +91 6366852888.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
