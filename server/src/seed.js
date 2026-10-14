import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Shlloka Yatra database...');

  // Clean existing data in reverse order of relations
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.traveller.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.route.deleteMany();
  await prisma.departure.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash('ShllokaAdmin@2027', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@shlloka.com',
      passwordHash,
      name: 'Shlloka Yatra Administration',
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // 2. Seed 2027 Departures (8 Batches approved in Brochure)
  const departuresData = [
    {
      batchNumber: 1,
      name: 'May Batch',
      slug: 'may-batch-2027',
      arrivalDate: new Date('2027-05-09T00:00:00Z'),
      departureDate: new Date('2027-05-23T00:00:00Z'),
      totalDays: 15,
      isFullMoon: true,
      totalCapacity: 25,
      bookedSeats: 18,
      status: 'FAST_FILLING',
      description: 'First departure of the 2027 season aligned with the auspicious Vaishakh Full Moon at Mount Kailash.',
    },
    {
      batchNumber: 2,
      name: 'June I Batch',
      slug: 'june-1-batch-2027',
      arrivalDate: new Date('2027-05-31T00:00:00Z'),
      departureDate: new Date('2027-06-15T00:00:00Z'),
      totalDays: 16,
      isFullMoon: false,
      totalCapacity: 25,
      bookedSeats: 8,
      status: 'AVAILABLE',
      description: 'Early summer yatra with crisp visibility across the Tibetan plateau and comfortable trekking temperatures.',
    },
    {
      batchNumber: 3,
      name: 'June II Batch',
      slug: 'june-2-batch-2027',
      arrivalDate: new Date('2027-06-06T00:00:00Z'),
      departureDate: new Date('2027-06-21T00:00:00Z'),
      totalDays: 16,
      isFullMoon: true,
      totalCapacity: 25,
      bookedSeats: 21,
      status: 'FAST_FILLING',
      description: 'Saga Dawa / Jyeshtha Full Moon yatra. One of the highest-demand spiritual dates of the entire calendar.',
    },
    {
      batchNumber: 4,
      name: 'June III Batch',
      slug: 'june-3-batch-2027',
      arrivalDate: new Date('2027-06-14T00:00:00Z'),
      departureDate: new Date('2027-06-29T00:00:00Z'),
      totalDays: 16,
      isFullMoon: false,
      totalCapacity: 25,
      bookedSeats: 12,
      status: 'AVAILABLE',
      description: 'Midsummer departure with extended daylight hours and balanced group size.',
    },
    {
      batchNumber: 5,
      name: 'July I Batch',
      slug: 'july-1-batch-2027',
      arrivalDate: new Date('2027-07-05T00:00:00Z'),
      departureDate: new Date('2027-07-20T00:00:00Z'),
      totalDays: 16,
      isFullMoon: false,
      totalCapacity: 25,
      bookedSeats: 10,
      status: 'AVAILABLE',
      description: 'Peak monsoon in lower valleys, clearing into the dry rain-shadow Tibetan plateau beyond the Himalayan crest.',
    },
    {
      batchNumber: 6,
      name: 'July II Batch',
      slug: 'july-2-batch-2027',
      arrivalDate: new Date('2027-07-11T00:00:00Z'),
      departureDate: new Date('2027-07-26T00:00:00Z'),
      totalDays: 16,
      isFullMoon: true,
      totalCapacity: 25,
      bookedSeats: 22,
      status: 'FAST_FILLING',
      description: 'Guru Purnima Full Moon Batch. Sacred rituals on the holy shores of Lake Manasarovar under the illuminated sky.',
    },
    {
      batchNumber: 7,
      name: 'Aug I Batch',
      slug: 'aug-1-batch-2027',
      arrivalDate: new Date('2027-08-02T00:00:00Z'),
      departureDate: new Date('2027-08-17T00:00:00Z'),
      totalDays: 16,
      isFullMoon: false,
      totalCapacity: 25,
      bookedSeats: 9,
      status: 'AVAILABLE',
      description: 'Late summer journey with vibrant Tibetan plateau scenery, lush meadows and crystal clear water flows.',
    },
    {
      batchNumber: 8,
      name: 'Aug II Batch',
      slug: 'aug-2-batch-2027',
      arrivalDate: new Date('2027-08-10T00:00:00Z'),
      departureDate: new Date('2027-08-25T00:00:00Z'),
      totalDays: 16,
      isFullMoon: true,
      totalCapacity: 25,
      bookedSeats: 17,
      status: 'AVAILABLE',
      description: 'Shravana Purnima Full Moon Batch. Deep spiritual resonance marking the grand conclusion of the pilgrimage season.',
    },
  ];

  for (const dep of departuresData) {
    await prisma.departure.create({ data: dep });
  }
  console.log(`Seeded ${departuresData.length} departures`);

  // 3. Seed 3 Travel Routes (Options 1, 2, 3)
  const route1Itinerary = [
    { day: 1, title: 'Arrival in Kathmandu', desc: 'Airport assistance, transfer to luxury hotel, yatra orientation, packing guidance and sacred yatra kit distribution.' },
    { day: 2, title: 'Kathmandu Temple Darshan & Dhulikhel', desc: 'Rudra Homam at sacred Pashupatinath Temple, Guhyeshwari Mata darshan, Doleshwor Mahadev and Patan Durbar Square. Transfer to Dhulikhel for peaceful rest.' },
    { day: 3, title: 'Drive to Kodari Border & Cross to Nyalam', desc: 'Scenic mountain drive to Nepal-Tibet border (Kodari), immigration and customs clearance, transfer to Tibetan vehicle and ascend to Nyalam (3,750 m).' },
    { day: 4, title: 'Acclimatisation Day at Nyalam', desc: 'Crucial rest and acclimatisation. Short guided acclimatisation hike, vitals and SpO2 monitoring, briefing by medical and expedition team.' },
    { day: 5, title: 'Nyalam to Saga across Tibetan Plateau', desc: 'Drive across Lalung La Pass (5,050 m) with breathtaking vistas of Mount Shishapangma and sacred turquoise Lake Pigutsho to Saga (4,450 m).' },
    { day: 6, title: 'Saga to Sacred Lake Manasarovar', desc: 'First divine darshan of holy Mount Kailash across Mayum La Pass (5,216 m). Vehicle parikrama of Lake Manasarovar, evening sacred Aarti and collection of holy Jal.' },
    { day: 7, title: 'Manasarovar Rituals to Darchen', desc: 'Morning holy bath / sprinkling of sacred waters, Vedic puja and Hawan. Drive to Darchen base camp (4,670 m). Permitted viewing of Nandi & Ashtapad.' },
    { day: 8, title: 'Parikrama Day 1: Yamdwar to Diraphuk', desc: 'Drive to Yamdwar (Tarboche). Begin sacred circumambulation (14 km, ~4-5 hours) to Diraphuk (5,080 m) facing the awe-inspiring North Face of Kailash.' },
    { day: 9, title: 'Parikrama Day 2: Diraphuk over Dolma La to Zutulphuk', desc: 'The most demanding spiritual day. Trek across highest point Dolma La Pass (5,650 m), view sacred Gauri Kund, descend to Zutulphuk (4,790 m) (22 km, ~8 hours).' },
    { day: 10, title: 'Parikrama Day 3: Zutulphuk to Darchen & Saga', desc: 'Gentle morning trek (6 km) to completion point at Chongdo. Rejoin vehicles at Darchen and drive back to Saga.' },
    { day: 11, title: 'Saga to Nyalam', desc: 'Scenic return drive across the Tibetan high plateau back to Nyalam.' },
    { day: 12, title: 'Nyalam to Kathmandu', desc: 'Border formalities at Kodari and return drive to Kathmandu. Celebration dinner and resting at hotel.' },
    { day: 13, title: 'Contingency / Sacred Sightseeing Buffer', desc: 'Buffer day for unforeseen mountain weather, permit delays, or relaxed shopping and exploration in Kathmandu.' },
    { day: 14, title: 'Final Departure', desc: 'Final blessings, certificate of Yatra completion distribution, and transfer to Tribhuvan International Airport for flight home.' },
  ];

  const route2Itinerary = [
    { day: 1, title: 'Arrival in Kathmandu', desc: 'Airport welcome, transfer to hotel, document verification for Tibet visa processing, Yatra orientation.' },
    { day: 2, title: 'Pashupatinath Darshan & Kathmandu Heritage', desc: 'Special morning Rudra Abhishek at Pashupatinath, Guhyeshwari Shaktipeeth, Boudhanath Stupa and comprehensive briefing.' },
    { day: 3, title: 'Flight Kathmandu to Lhasa (3,650 m)', desc: 'Spectacular trans-Himalayan flight over Everest and Kanchenjunga to Gonggar Airport. Transfer to Lhasa, check-in and acclimatise gently.' },
    { day: 4, title: 'Lhasa Cultural Heritage: Potala Palace & Jokhang', desc: 'Guided tour of the grand Potala Palace (winter residence of Dalai Lamas), ancient Jokhang Temple and walk around vibrant Barkhor Street.' },
    { day: 5, title: 'Sera Monastery & Acclimatisation', desc: 'Visit historic Sera Monastery to witness philosophical monastic debates. Medical check, hydration and leisure walk.' },
    { day: 6, title: 'Drive Lhasa to Shigatse (3,840 m)', desc: 'Drive through Tibetan highlands along the Yarlung Tsangpo River via Gyantse to Shigatse, home of the famed Tashilhunpo Monastery.' },
    { day: 7, title: 'Shigatse to Saga (4,450 m)', desc: 'Scenic overland traverse through vast nomadic pastures and dramatic high-altitude peaks to Saga.' },
    { day: 8, title: 'Saga to Lake Manasarovar (4,590 m)', desc: 'Cross Mayum La pass into the holy Kailash mandala. First awe-inspiring view of Mount Kailash and Lake Manasarovar. Evening Aarti.' },
    { day: 9, title: 'Manasarovar Puja to Darchen', desc: 'Sacred ceremonies on the lake shore, collection of holy water, proceed to Darchen base camp at the foot of Kailash.' },
    { day: 10, title: 'Parikrama Day 1: Yamdwar to Diraphuk (14 km)', desc: 'Pass through the Gate of Salvation (Yamdwar), trek along Lha Chu river with direct views of Mount Kailash North Face.' },
    { day: 11, title: 'Parikrama Day 2: Across Dolma La Pass to Zutulphuk (22 km)', desc: 'Ascend to the highest pass Dolma La (5,650 m), darshan of turquoise Gauri Kund, descend into the grassy valley of Zutulphuk Cave Monastery.' },
    { day: 12, title: 'Parikrama Day 3: Zutulphuk to Darchen & Saga', desc: 'Complete the circumambulation circle, reunite with vehicles and drive to Saga.' },
    { day: 13, title: 'Saga to Kyirong / Nyalam', desc: 'Overland return journey towards the Nepal-China border.' },
    { day: 14, title: 'Border Crossing to Kathmandu', desc: 'Cross border into Nepal and drive to Kathmandu hotel.' },
    { day: 15, title: 'Contingency / Kathmandu Buffer', desc: 'Safety buffer day for high altitude flight/road contingencies.' },
    { day: 16, title: 'Homeward Departure', desc: 'Transfer to Kathmandu International Airport with blessed memories.' },
  ];

  const route3Itinerary = [
    { day: 1, title: 'Arrival in Kathmandu', desc: 'Airport assistance, hotel check-in, visa biometric formalities, evening briefing.' },
    { day: 2, title: 'Pashupatinath & Heritage Darshan', desc: 'Special Rudrabhishek Puja at Pashupatinath, Guhyeshwari Mata temple, packing and air travel guidelines.' },
    { day: 3, title: 'Flight Kathmandu to Lhasa (3,650 m)', desc: 'Himalayan mountain flight landing at Lhasa Gonggar Airport. Hotel transfer and mandatory low-energy acclimatisation rest.' },
    { day: 4, title: 'Lhasa: Potala Palace & Jokhang Temple', desc: 'Spiritual visits to Potala Palace and Jokhang Temple with entry fees included. Barkhor pilgrimage circuit walk.' },
    { day: 5, title: 'Sera Monastery & Acclimatisation Rest', desc: 'Acclimatisation excursion to Sera Monastery, resting and physiological adaptation for the upcoming flight to Ali.' },
    { day: 6, title: 'Flight Lhasa to Ali (Gunsa Airport) & Drive to Mansarovar', desc: 'Scenic flight directly over Western Tibet to Ali (Gunsa Airport) or Pulan. Drastically cuts road travel days. Drive to sacred Lake Manasarovar.' },
    { day: 7, title: 'Mansarovar Rituals to Darchen Base Camp', desc: 'Holy bath / jal collection, Vedic prayers and havan. Drive to Darchen with close views of Mount Kailash.' },
    { day: 8, title: 'Kailash Parikrama Day 1: Yamdwar to Diraphuk', desc: 'Drive to Yamdwar. Gradual 14 km walk or pony ride to Diraphuk facing the sacred North Face.' },
    { day: 9, title: 'Kailash Parikrama Day 2: Dolma La Pass to Zutulphuk', desc: '22 km spiritual journey traversing Dolma La (5,650 m), sight of Gauri Kund, reach Zutulphuk.' },
    { day: 10, title: 'Parikrama Day 3 Completion & Drive to Saga', desc: 'Conclude the sacred 52 km circumambulation circle, vehicle pickup to Saga.' },
    { day: 11, title: 'Saga to Nyalam / Kyirong', desc: 'Comfortable road journey across the southern Tibetan plateau.' },
    { day: 12, title: 'Drive Nyalam to Kathmandu', desc: 'Cross back into Nepal and transfer to Kathmandu hotel.' },
    { day: 13, title: 'Departure for Onward Journey', desc: 'Airport transfer for your return flight with transformed spirit.' },
  ];

  const routes = [
    {
      routeNumber: 1,
      name: 'Option 1 — Classic Overland (By Bus Both Ways)',
      code: 'bus-both-ways',
      approachType: 'BUS_BOTH_WAYS',
      titleTag: 'The Classic Overland Pilgrimage',
      durationDays: 15,
      description: 'The time-tested, sacred overland pilgrimage from Kathmandu through the lush green valleys of Nepal into the mystical high-altitude Tibetan plateau. Ideal for pilgrims seeking the complete traditional journey.',
      startingFromInr: 350000,
      image: '/images/img_3.jpg',
      highlights: JSON.stringify([
        'Full scenic overland pilgrimage experience',
        'Gradual altitude gain through Nyalam and Saga',
        'Special Rudra Homam at Pashupatinath and Guhyeshwari Mata darshan',
        'Full vehicle Parikrama of holy Lake Manasarovar with holy dip rituals',
        'The complete 3-day sacred Kailash Parikrama (on foot or pony)',
        'Comprehensive medical support, oxygen cylinders and pure vegetarian crew',
      ]),
      itinerary: JSON.stringify(route1Itinerary),
      pricing: [
        {
          passportType: 'INDIAN',
          basePrice: 350000,
          currency: 'INR',
          gstPercentage: 5.0,
          foreignAirfareSupplement: 0,
          depositRequired: 25000,
          termsNotes: 'Price per person on twin/triple sharing. 5% GST extra. Deposit INR 25,000 non-refundable.',
        },
        {
          passportType: 'FOREIGN',
          basePrice: 425000,
          currency: 'INR',
          gstPercentage: 0.0,
          foreignAirfareSupplement: 0,
          depositRequired: 25000,
          termsNotes: 'Applicable for foreign & NRI passport holders. Subject to Chinese visa & permit regulations.',
        },
      ],
    },
    {
      routeNumber: 2,
      name: 'Option 2 — Fly Kathmandu to Lhasa, Then Continue by Road',
      code: 'flight-to-lhasa',
      approachType: 'FLIGHT_LHASA',
      titleTag: 'A More Comfortable Start',
      durationDays: 16,
      description: 'Avoid initial arduous border drives by taking a trans-Himalayan flight directly from Kathmandu to Lhasa. Spend days acclimatising in the spiritual heart of Tibet, exploring Potala Palace and Jokhang Temple before journeying westward to Kailash.',
      startingFromInr: 437000,
      image: '/images/img_4.jpg',
      highlights: JSON.stringify([
        'Includes trans-Himalayan flight Kathmandu to Lhasa',
        '2 nights in historic Lhasa with Potala Palace and Jokhang Temple entry fees',
        'Gentler acclimatisation profile at Lhasa (3,650 m) before high altitude passes',
        'Traverse the stunning Tibetan plateau via Shigatse and Saga',
        'Full rituals and Jal collection at Lake Manasarovar',
        'Complete 3-day sacred Kailash Parikrama with dedicated guides',
      ]),
      itinerary: JSON.stringify(route2Itinerary),
      pricing: [
        {
          passportType: 'INDIAN',
          basePrice: 437000,
          currency: 'INR',
          gstPercentage: 5.0,
          foreignAirfareSupplement: 0,
          depositRequired: 25000,
          termsNotes: 'Includes Kathmandu-Lhasa flight. 5% GST extra. Early booking required for flight tickets.',
        },
        {
          passportType: 'FOREIGN',
          basePrice: 425000,
          currency: 'INR',
          gstPercentage: 0.0,
          foreignAirfareSupplement: 600, // +$600 USD
          depositRequired: 25000,
          termsNotes: 'Foreign passport holders: INR 4,25,000 + US$ 600 flight sector supplement.',
        },
      ],
    },
    {
      routeNumber: 3,
      name: 'Option 3 — Fly to Lhasa & Fly to Ali/Pulan',
      code: 'lhasa-ali-pulan',
      approachType: 'FLIGHT_LHASA_ALI_PULAN',
      titleTag: 'The Fastest & Most Convenient Option',
      durationDays: 13,
      description: 'The premier luxury approach with dual domestic flight sectors (Kathmandu to Lhasa, and Lhasa to Ali Gunsa / Pulan Airport). Minimises grueling multi-day road journeys and allows yatris to arrive fresh and focused on the sacred Parikrama.',
      startingFromInr: 494000,
      image: '/images/img_5.jpg',
      highlights: JSON.stringify([
        'Shortest travel duration with minimum road fatigue',
        'Two flight sectors: Kathmandu-Lhasa & Lhasa-Ali/Pulan',
        'Sightseeing at Potala Palace, Jokhang Temple and Sera Monastery',
        'Ideal for seniors, corporate leaders and yatris seeking maximum comfort',
        'Direct proximity to Lake Manasarovar and Mount Kailash upon landing in Ali',
        'Full 3-day Kailash Parikrama with top-tier pony/porter coordination',
      ]),
      itinerary: JSON.stringify(route3Itinerary),
      pricing: [
        {
          passportType: 'INDIAN',
          basePrice: 494000,
          currency: 'INR',
          gstPercentage: 5.0,
          foreignAirfareSupplement: 0,
          depositRequired: 25000,
          termsNotes: 'Includes both flight sectors. 5% GST extra. Strictly limited seats due to domestic Tibet flights.',
        },
        {
          passportType: 'FOREIGN',
          basePrice: 425000,
          currency: 'INR',
          gstPercentage: 0.0,
          foreignAirfareSupplement: 1200, // +$1200 USD
          depositRequired: 25000,
          termsNotes: 'Foreign passport holders: INR 4,25,000 + US$ 1,200 dual flight sectors supplement.',
        },
      ],
    },
  ];

  for (const r of routes) {
    const { pricing, ...routeFields } = r;
    const createdRoute = await prisma.route.create({ data: routeFields });
    for (const p of pricing) {
      await prisma.pricingTier.create({
        data: {
          ...p,
          routeId: createdRoute.id,
        },
      });
    }
  }
  console.log(`Seeded ${routes.length} routes with pricing tiers`);

  // 4. Seed FAQs from Brochure
  const faqsData = [
    {
      category: 'GENERAL',
      question: 'Who is eligible to undertake the Kailash Mansarovar Yatra?',
      answer: 'The Yatra is open to both Indian and Foreign passport holders generally between the ages of 18 and 70 in good cardiovascular health. Yatris must pass physical fitness checks and obtain medical clearance.',
      displayOrder: 1,
    },
    {
      category: 'ITINERARY',
      question: 'What is the physical difficulty of the 3-day Kailash Parikrama?',
      answer: 'The Parikrama is approximately 52 km in total. Day 1 is 14 km (approx. 4 hours), Day 2 is 22 km across Dolma La Pass at 5,650 m (approx. 7-8 hours, the most challenging section), and Day 3 is a short 6 km completion walk. Yatris may also hire a pony/horse with horseman for personal assistance.',
      displayOrder: 2,
    },
    {
      category: 'PRICING',
      question: 'What are the payment terms and registration deposit?',
      answer: 'Registration requires an initial non-refundable deposit of INR 25,000 (or USD 250). A 50% payment confirms your Yatra seat, and the balance 50% is due 30 days after the initial confirmation payment.',
      displayOrder: 3,
    },
    {
      category: 'PRICING',
      question: 'What is the GST and currency structure for Foreign passport holders?',
      answer: 'Indian passport prices are quoted in INR with 5% GST applicable. Foreign passport holders have a base price of INR 4,25,000 plus US$ 600 supplement for Option 2 or US$ 1,200 supplement for Option 3.',
      displayOrder: 4,
    },
    {
      category: 'HEALTH',
      question: 'How do you handle high altitude sickness (AMS)?',
      answer: 'Safety is our paramount priority. We provide dedicated acclimatisation days at Nyalam or Lhasa, carry certified medical oxygen cylinders, pulse oximeters, and have experienced Nepali sherpa leaders trained in wilderness medical protocols.',
      displayOrder: 5,
    },
    {
      category: 'TRAVEL_PERMITS',
      question: 'Do I need a separate Chinese visa or does Shlloka arrange it?',
      answer: 'Shlloka Yatra manages the entire group Tibet Travel Permit and China group visa processing in coordination with authorities. You only need to supply valid passport copies and photos adhering to our briefing guidelines.',
      displayOrder: 6,
    },
    {
      category: 'GENERAL',
      question: 'What kind of food is served during the Yatra?',
      answer: 'Nutritious, pure vegetarian food (including Jain options on request) freshly prepared by our accompanying kitchen and support crew, catering to balanced nourishment for high-altitude endurance.',
      displayOrder: 7,
    },
  ];

  for (const faq of faqsData) {
    await prisma.faq.create({ data: faq });
  }
  console.log(`Seeded ${faqsData.length} FAQs`);

  // 5. Seed a Sample Confirmed Booking & Audit Log
  const dep1 = await prisma.departure.findUnique({ where: { batchNumber: 1 } });
  const route1 = await prisma.route.findUnique({ where: { routeNumber: 1 } });

  const sampleBooking = await prisma.booking.create({
    data: {
      bookingReference: 'SKY-2027-1001',
      departureId: dep1.id,
      routeId: route1.id,
      passportType: 'INDIAN',
      contactName: 'Rajesh Sharma',
      contactEmail: 'rajesh.sharma@example.com',
      contactPhone: '+91 9876543210',
      totalTravellers: 2,
      baseAmount: 700000,
      gstAmount: 35000,
      supplementAmount: 0,
      totalAmount: 735000,
      currency: 'INR',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      notes: 'Special request: Jain meal preference and lower bunk preference in Diraphuk.',
      travellers: {
        create: [
          {
            fullName: 'Rajesh Sharma',
            passportNumber: 'Z1234567',
            nationality: 'Indian',
            age: 52,
            gender: 'MALE',
            dietaryPreference: 'JAIN',
            emergencyContactName: 'Sunita Sharma',
            emergencyContactPhone: '+91 9876543211',
            isPrimary: true,
          },
          {
            fullName: 'Sunita Sharma',
            passportNumber: 'Z1234568',
            nationality: 'Indian',
            age: 49,
            gender: 'FEMALE',
            dietaryPreference: 'JAIN',
            emergencyContactName: 'Ankit Sharma',
            emergencyContactPhone: '+91 9876543212',
            isPrimary: false,
          },
        ],
      },
      payments: {
        create: {
          transactionId: 'TXN-SHLLOKA-001',
          paymentMethod: 'ONLINE_NET_BANKING',
          amount: 735000,
          currency: 'INR',
          status: 'SUCCESS',
          gatewayResponse: JSON.stringify({ mode: 'sandbox', verifiedAt: new Date() }),
        },
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      userEmail: admin.email,
      action: 'SYSTEM_INITIALIZATION',
      entity: 'DATABASE',
      details: JSON.stringify({ event: 'Initial brochure seed for 2027 season completed' }),
    },
  });

  console.log(`Database seeded successfully with sample booking ${sampleBooking.bookingReference}!`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
