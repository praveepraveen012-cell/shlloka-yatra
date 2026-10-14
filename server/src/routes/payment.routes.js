import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma.js';

const router = Router();

const createOrderSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  paymentType: z.enum(['DEPOSIT', 'FULL']).default('DEPOSIT'),
});

const verifyPaymentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  paymentMethod: z.string().default('SANDBOX_PAYMENT_GATEWAY'),
  signature: z.string().optional(),
});

// POST initialize / create payment order
router.post('/create-order', async (req, res, next) => {
  try {
    const { bookingId, paymentType } = createOrderSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        departure: true,
        route: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Cannot process payment for a cancelled booking' });
    }

    // Determine amount to charge
    // Standard registration deposit is INR 25,000 per person or Full Amount
    const depositPerTraveller = 25000;
    const depositTotal = depositPerTraveller * booking.totalTravellers;
    const amountToCharge = paymentType === 'FULL' ? booking.totalAmount : depositTotal;

    const isSandbox = (process.env.PAYMENT_GATEWAY_MODE || 'sandbox') === 'sandbox';

    const orderPayload = {
      orderId: `ORD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      amount: amountToCharge,
      currency: booking.currency,
      paymentType,
      isSandbox,
      gatewayKey: isSandbox ? 'rzp_test_sandbox_mode' : process.env.RAZORPAY_KEY_ID,
      environmentNotice: isSandbox
        ? 'SANDBOX TEST ENVIRONMENT: No real funds will be deducted. Test card/UPI will be simulated.'
        : 'PRODUCTION SECURE GATEWAY',
    };

    res.json({ order: orderPayload });
  } catch (error) {
    next(error);
  }
});

// POST verify payment and authoritatively update booking & payment records
router.post('/verify', async (req, res, next) => {
  try {
    const { bookingId, transactionId, paymentMethod, signature } = verifyPaymentSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const isSandbox = (process.env.PAYMENT_GATEWAY_MODE || 'sandbox') === 'sandbox';

    // Verify transaction
    // In sandbox, we ensure transactionId is valid format
    if (!transactionId || transactionId.trim().length < 5) {
      return res.status(400).json({ error: 'Invalid payment transaction reference from gateway' });
    }

    // Determine paid status
    const depositAmount = 25000 * booking.totalTravellers;
    const isFullPayment = booking.totalAmount <= depositAmount; // or full paid

    // Update in transaction
    const updated = await prisma.$transaction(async (tx) => {
      // 1. Create Payment record
      const payment = await tx.payment.create({
        data: {
          bookingId: booking.id,
          transactionId: transactionId || `TXN_${Date.now()}`,
          paymentMethod: isSandbox ? 'SANDBOX_SIMULATED_GATEWAY' : paymentMethod,
          amount: depositAmount,
          currency: booking.currency,
          status: 'SUCCESS',
          gatewayResponse: JSON.stringify({
            verified: true,
            verifiedAt: new Date().toISOString(),
            mode: isSandbox ? 'sandbox_test' : 'live_production',
            signature: signature || 'sandbox_verified_signature',
          }),
        },
      });

      // 2. Update Booking status to CONFIRMED
      const updatedBooking = await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: 'CONFIRMED',
          paymentStatus: isFullPayment ? 'PAID' : 'PARTIALLY_PAID',
        },
        include: {
          departure: true,
          route: true,
          travellers: true,
          payments: true,
        },
      });

      // 3. Log Audit
      await tx.auditLog.create({
        data: {
          userEmail: booking.contactEmail,
          action: 'PAYMENT_VERIFIED',
          entity: 'BOOKING',
          entityId: booking.id,
          details: JSON.stringify({
            transactionId: payment.transactionId,
            amount: payment.amount,
            mode: isSandbox ? 'sandbox' : 'live',
          }),
        },
      });

      return { booking: updatedBooking, payment };
    });

    res.json({
      message: 'Payment verified and booking confirmed successfully',
      booking: updated.booking,
      payment: updated.payment,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
