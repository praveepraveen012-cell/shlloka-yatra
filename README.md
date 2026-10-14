# Shlloka Yatra — Premium Kailash Mansarovar Pilgrimage Web Application

> **Production-grade, modern React.js + Node.js/Express + Prisma ORM application built from scratch for the Kailash Mansarovar Yatra 2027 season.**
> Completely independent of any legacy HTML template. Designed with an editorial saffron-orange and golden-yellow palette, full-width edge-to-edge layout, cinematic video hero, multi-step member registration system, distinct yatra booking engine, and a secure administrative dashboard.

---

## 1. Architectural Highlights

- **Visual Inspiration**: Editorial sacred-walks aesthetic featuring edge-to-edge photography, cinematic video banner, elegant typography, and zero clutter.
- **Brand Palette (Strictly Orange & Yellow Only)**:
  - Primary Saffron Orange: `#E87518`
  - Deep Burnt Orange: `#B94A16`
  - Warm Golden Yellow: `#F5B82E`
  - Soft Amber: `#FFD166`
  - Ivory Background: `#FFF9F0`
  - Pure White: `#FFFFFF`
  - Dark Charcoal Headings & Text: `#29231E`
  - Muted Warm Grey: `#766B60`
  - *Zero green colors* anywhere in buttons, badges, links, borders, or accents.
- **Full-Width Edge-to-Edge Layout**: Fluid `100%` viewport width layout across header, hero, all body sections, forms, and footer.
- **Header**:
  - Brand logo with `ॐ SHLLOKA YATRA`
  - Navigation links to all key pilgrimage sections
  - Outlined orange **Login** button (`/login`)
  - Solid saffron orange **Become a Member** button (`/membership/register`)
  - Transparent dark overlay over hero video transitioning into a solid ivory sticky bar on scroll.
- **Membership Registration Engine** (`/membership/register`):
  - 4-step wizard: (1) Personal Details, (2) Yatra Interest & Preferences, (3) Account Security & Password, (4) Review & Submit.
  - Generates unique reference `SHL-MEM-2027-XXXX`.
  - Strictly separate from Yatra booking (`/book`).
- **Footer**: Full-width deep charcoal background with 4 columns (Brand, Explore, Member Area, Support) and prominently styled **Powered by Grexotix** linking safely to `https://grexotix.com/`.

---

## 2. Route Directory & Pages

| Route | Description |
|---|---|
| `/` | Full-width cinematic video hero, spiritual significance, scenic feature, 3 package tiers, 2027 departures, Parikrama stages, prep & safety, inclusions, verified about Shlloka Yatra, FAQs, and membership CTA. |
| `/packages` | Detailed presentation of Option 1 (₹3,50,000), Option 2 (₹4,37,000), and Option 3 (₹4,94,000), nationality toggle (Indian vs Foreign), and booking actions. |
| `/departures` | Confirmed brochure batches (May–August 2027), 4 Full Moon indicators, arrival & departure dates, and seat capacity counters. |
| `/itinerary` | Day-by-day itineraries for all 3 travel routes and the 3 demanding stages of the 52-km Mount Kailash Parikrama (Yamdwar → Diraphuk → Dolma La / Zutulphuk → Darchen). |
| `/login` | Member authentication with email or mobile number, password show/hide, remember me, and forgot password flow. |
| `/forgot-password` | Password recovery request with helpline assistance (`+91 6366852888`, `volunteers@shlloka.com`). |
| `/membership/register` | 4-step membership registration wizard with real-time validation and database persistence. |
| `/membership/success` | Registration confirmation voucher with unique reference `SHL-MEM-2027-XXXX`. |
| `/account` | Protected member portal with profile summary, active status, and separate booking CTA. |
| `/book` | Dedicated 5-step Yatra booking wizard for reserving specific 2027 departure batches. |
| `/booking-success` | Booking voucher with unique reference `SKY-2027-XXXX` and bank payment instructions. |
| `/inclusions-exclusions` | Full transparency: what is covered under the yatra fee vs. exclusions. |
| `/preparation-safety` | 12-week aerobic roadmap, Acute Mountain Sickness protocols, packing list, and evacuation insurance advisory. |
| `/about` | Verified brand story and pilgrimage mission without invented claims. |
| `/contact` | Official phone (`+91 6366852888`), email (`volunteers@shlloka.com`), and lead enquiry form. |
| `/cancellation-policy` | Official cancellation tiers, refund schedule, and administrative review terms. |
| `/admin/login` | Secure administrative authentication. |
| `/admin/dashboard` | Key metrics: bookings, travellers roster, seat occupancy, and revenue. |
| `/admin/members` | Member registrations roster, search, status management (Active / Suspended), and **Export to CSV**. |
| `/admin/departures` | Manage departure capacities, seat allocations, and sold out flags. |
| `/admin/bookings` | Manage yatri bookings, traveller manifests, and CSV export. |
| `/admin/pricing` | Database-managed route pricing and supplements. |
| `/admin/audit-logs` | Tamper-evident administrative action log. |

---

## 3. Local Quickstart

### Prerequisites
- Node.js 18+ (tested on Node v20/v22/v24)
- npm 9+

### Step 1: Install Dependencies
```bash
# Root and backend dependencies
npm install

# Client dependencies
cd client && npm install && cd ..
```

### Step 2: Database Setup & Prisma Generation
```bash
npx prisma db push
npx prisma generate
node server/src/seed.js
```

### Step 3: Run Locally
```bash
# Unified server (serves Express API and built React client on port 5000)
node server/src/index.js

# Or run Vite dev server in parallel for HMR:
# Terminal 1: node server/src/index.js
# Terminal 2: cd client && npm run dev
```

Visit the application at: `http://localhost:5000`.

---

## 4. Administrative Credentials

- **Admin Login Route**: `/admin/login`
- **Email**: `admin@shlloka.com`
- **Password**: `ShllokaAdmin@2027`

---

## 5. Official Verified Contact Information

- **Organization**: Shlloka Yatra Private Limited
- **Phone Helpline**: `+91 6366852888`
- **Official Email**: `volunteers@shlloka.com`
- **Bank Account**: IndusInd Bank, Current Account `201037169009`, IFSC `INDB0000672`
- **Official Partner**: Powered by [Grexotix](https://grexotix.com/)
