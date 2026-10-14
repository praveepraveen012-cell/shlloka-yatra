# Shlloka Yatra — Setup, Testing & Deployment Guide

This document contains setup instructions, database migrations, testing steps, and deployment procedures for the **Shlloka Yatra Dynamic Pilgrimage Portal**.

---

## 1. Architecture Overview

- **Frontend:** React 18 + Vite + React Router v6 + Lucide React + React Hook Form + Zod
- **Backend:** Node.js (v20+) + Express.js
- **Database:** PostgreSQL (Production) / SQLite (Zero-friction local development)
- **ORM:** Prisma Client
- **Authentication:** JWT with bcrypt password hashing and role-based access control
- **Payments:** Authoritative multi-tier payment gateway with sandbox mode
- **Directory Layout:**
  - `client/` — Vite + React frontend application
  - `server/` — Express backend API and routes
  - `prisma/` — Database schemas (`schema.prisma` for SQLite, `schema.postgresql.prisma` for PostgreSQL) and database migrations
  - `docs/` — Comprehensive documentation and discrepancy reports

---

## 2. Prerequisites

- **Node.js:** v18.0.0 or higher (v24 tested)
- **npm:** v9.0.0 or higher
- **PostgreSQL:** Optional for local development (SQLite works out of the box), required for production deployment.

---

## 3. Environment Variables Configuration

Copy `.env.example` to `server/.env`:

```bash
cp .env.example server/.env
```

### Key Configuration Variables:

```env
# Application
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database Connection
# Local Development (SQLite):
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL e.g., AWS RDS, Supabase, Neon, Railway):
# DATABASE_URL="postgresql://username:password@hostname:5432/shlloka_yatra?schema=public"

# Authentication & Security
JWT_SECRET=super_secure_random_key_min_32_characters
JWT_EXPIRES_IN=7d
ADMIN_DEFAULT_EMAIL=admin@shlloka.com
ADMIN_DEFAULT_PASSWORD=ShllokaAdmin@2027

# Payment Gateway
PAYMENT_GATEWAY_MODE=sandbox
RAZORPAY_KEY_ID=rzp_test_placeholder_key_id
RAZORPAY_KEY_SECRET=rzp_test_placeholder_key_secret

# Transactional Email (Optional)
EMAIL_SERVICE_ENABLED=false
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=placeholder
SMTP_PASS=placeholder
EMAIL_FROM="Shlloka Yatra <volunteers@shlloka.com>"
```

---

## 4. Quick Start: Local Development

### Step 1: Install Dependencies
From the root workspace directory:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

cd ..
```

*(On Windows PowerShell, use `npm.cmd install` if script execution policy is restricted).*

### Step 2: Initialize Database and Seed Brochure Data

```bash
cd server
# Push schema and generate Prisma client
npx prisma db push --schema=../prisma/schema.prisma

# Seed 8 departures, 3 routes, itineraries, pricing tiers, and admin account
node src/seed.js

cd ..
```

Default administrator credentials:
- **Email:** `admin@shlloka.com`
- **Password:** `ShllokaAdmin@2027`

### Step 3: Run the Development Servers

In terminal 1 (Backend API):
```bash
cd server
npm run dev
```
*API runs at `http://localhost:5000` (Health check: `http://localhost:5000/api/health`).*

In terminal 2 (Vite Frontend):
```bash
cd client
npm run dev
```
*Frontend runs at `http://localhost:5173` with proxy to backend.*

---

## 5. Running Automated Tests

To run the automated backend test suite (testing departure capacity, authoritative pricing, 5% GST calculations, booking creation, and admin authorization):

```bash
cd server
npm test
```

---

## 6. Building for Production

### Step 1: Build the React Application
```bash
cd client
npm run build
```
This generates the optimized bundle in `client/dist`.

### Step 2: Verify Single-Process Production Serving
The Express server (`server/src/index.js`) is configured with an SPA fallback that serves `client/dist` directly. When deployed, direct URL access and browser refreshes work seamlessly for all React routes (e.g., `/kailash-mansarovar-yatra-2027`, `/routes/bus-both-ways`, `/admin/dashboard`).

Start the production server:
```bash
cd server
npm start
```

---

## 7. PostgreSQL Production Deployment

When deploying to a managed PostgreSQL instance (Neon, Supabase, AWS RDS, Railway):

1. Set `DATABASE_URL` in your production environment to your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/shlloka_yatra?sslmode=require"
   ```
2. Replace `prisma/schema.prisma` with `prisma/schema.postgresql.prisma` or change the `provider = "postgresql"` in `prisma/schema.prisma`.
3. Run database migrations:
   ```bash
   npx prisma db push
   # Or for migration tracking:
   npx prisma migrate deploy
   ```
4. Seed production data:
   ```bash
   node src/seed.js
   ```
