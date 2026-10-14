import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import app from '../src/index.js';
import prisma from '../src/prisma.js';

let server;
let baseUrl;
let adminToken;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await prisma.$disconnect();
});

describe('Shlloka Yatra Backend API Test Suite', () => {
  test('GET /api/health should return status ok', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.service, 'Shlloka Yatra Backend API');
  });

  test('GET /api/departures should return 8 departure batches', async () => {
    const res = await fetch(`${baseUrl}/api/departures`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.departures));
    assert.strictEqual(body.departures.length, 8);
    assert.strictEqual(body.departures[0].name, 'May Batch');
    assert.strictEqual(body.departures[0].isFullMoon, true);
    assert.ok(typeof body.departures[0].remainingSeats === 'number');
  });

  test('GET /api/routes should return all 3 pilgrimage travel routes', async () => {
    const res = await fetch(`${baseUrl}/api/routes`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.routes));
    assert.strictEqual(body.routes.length, 3);
    assert.strictEqual(body.routes[0].code, 'bus-both-ways');
    assert.strictEqual(body.routes[1].code, 'flight-to-lhasa');
    assert.strictEqual(body.routes[2].code, 'lhasa-ali-pulan');
    assert.ok(Array.isArray(body.routes[0].highlights));
    assert.ok(Array.isArray(body.routes[0].itinerary));
  });

  test('POST /api/pricing/calculate should accurately compute price and 5% GST for Indian passport', async () => {
    const routesRes = await fetch(`${baseUrl}/api/routes`);
    const routesData = await routesRes.json();
    const route1 = routesData.routes.find((r) => r.code === 'bus-both-ways');

    const res = await fetch(`${baseUrl}/api/pricing/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        routeId: route1.id,
        passportType: 'INDIAN',
        travellersCount: 2,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    // 350,000 * 2 = 700,000 base
    assert.strictEqual(body.calculation.baseAmount, 700000);
    // 5% GST = 35,000
    assert.strictEqual(body.calculation.gstAmount, 35000);
    // Total = 735,000
    assert.strictEqual(body.calculation.totalAmount, 735000);
    // Deposit = 25,000 * 2 = 50,000
    assert.strictEqual(body.calculation.depositAmount, 50000);
  });

  test('POST /api/auth/login should authenticate admin and issue JWT token', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@shlloka.com',
        password: 'ShllokaAdmin@2027',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(body.token);
    assert.strictEqual(body.user.role, 'ADMIN');
    adminToken = body.token;
  });

  test('POST /api/bookings should create booking and generate reference SKY-2027-XXXX', async () => {
    const departuresRes = await fetch(`${baseUrl}/api/departures`);
    const departuresData = await departuresRes.json();
    const dep2 = departuresData.departures.find((d) => d.batchNumber === 2);

    const routesRes = await fetch(`${baseUrl}/api/routes`);
    const routesData = await routesRes.json();
    const route1 = routesData.routes.find((r) => r.code === 'bus-both-ways');

    const initialBookedSeats = dep2.bookedSeats;

    const res = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        departureId: dep2.id,
        routeId: route1.id,
        passportType: 'INDIAN',
        contactName: 'Amitabh Sen',
        contactEmail: 'amitabh.sen@example.com',
        contactPhone: '+91 9988776655',
        notes: 'Vegetarian meals',
        travellers: [
          {
            fullName: 'Amitabh Sen',
            passportNumber: 'P9876543',
            nationality: 'Indian',
            age: 48,
            gender: 'MALE',
            dietaryPreference: 'PURE_VEGETARIAN',
            emergencyContactName: 'Maya Sen',
            emergencyContactPhone: '+91 9988776656',
            isPrimary: true,
          },
        ],
      }),
    });

    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.ok(body.booking.bookingReference.startsWith('SKY-2027-'));
    assert.strictEqual(body.booking.totalTravellers, 1);
    assert.strictEqual(body.booking.status, 'PENDING');

    // Verify seat capacity updated on departure
    const updatedDepRes = await fetch(`${baseUrl}/api/departures/${dep2.id}`);
    const updatedDepData = await updatedDepRes.json();
    assert.strictEqual(updatedDepData.departure.bookedSeats, initialBookedSeats + 1);
  });

  test('GET /api/admin/dashboard-stats should require authorization and return accurate stats', async () => {
    // 1. Unauthorized check
    const unauthRes = await fetch(`${baseUrl}/api/admin/dashboard-stats`);
    assert.strictEqual(unauthRes.status, 401);

    // 2. Authorized check
    const authRes = await fetch(`${baseUrl}/api/admin/dashboard-stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert.strictEqual(authRes.status, 200);
    const body = await authRes.json();
    assert.ok(body.stats.totalBookings >= 2);
    assert.ok(body.stats.totalCapacity > 0);
  });
});
