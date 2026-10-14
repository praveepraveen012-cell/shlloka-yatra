# Content Discrepancy & Administrative Approval Report

**Document Version:** 1.0.0  
**Date:** October 14, 2026  
**Audience:** Shlloka Yatra Private Limited Board of Directors, Legal & Operations Teams  

---

## Executive Summary

During the development and architectural implementation of the **Shlloka Yatra 2027 Pilgrimage Website**, our team performed an exhaustive audit comparing the uploaded Canva PDF brochure (`Kailash Mansarovar Parikrama Yatra 2027 Brochure - Shlloka Yatra (1).pdf`), the prototype HTML (`Shlloka_Yatra_Website_v2.html`), and standard Himalayan tour operations.

While the brochure provides an authoritative visual identity and clear core parameters, six specific discrepancies require formal management approval before public launch.

---

## Itemized Discrepancies Requiring Review

### 1. Cancellation Policy Refund Tiers (Inversion vs Deduction Typo)
* **Brochure Text (Page 5/7):**
  > "25% refund before 75 days from the start of the program"  
  > "50% refund before 60 days from the start of the program"  
  > "No refund before 30 days from the start of the program"
* **Identified Discrepancy:**
  Under standard contract law and travel industry practices, refund amounts decrease as the departure date nears (because non-refundable flight and permit costs increase). The brochure currently states that a yatri cancelling further out (75 days) receives **less** refund (25%) than one cancelling later (60 days, 50%).
* **Possible Intent:**
  The author may have intended **retention/deduction fees**:
  - *Option A (Deduction fee):* 25% cancellation charge before 75 days (i.e. 75% refund); 50% cancellation charge before 60 days (i.e. 50% refund).
  - *Option B (Actual refund):* 75% refund before 75 days, 50% refund before 60 days, 0% refund before 30 days.
* **Action Needed:**
  Management must confirm whether the figure represents **Refund Percentage** or **Cancellation Fee Deduction**.

---

### 2. Missing Option 2 Day-by-Day Page in Brochure Export
* **Brochure Text:**
  Page 3/8 outlines the route overview for Option 2 (*Fly Kathmandu to Lhasa, then continue by road*). Page 6/8 details Option 1 day-by-day, and Page 8/8 details Option 3 day-by-day. However, the dedicated day-by-day page for Option 2 was omitted from the 8-page Canva export.
* **Implemented Solution in React Application:**
  Our team synthesized the full 16-day Option 2 itinerary adhering to standard Kathmandu → Lhasa (Potala Palace & Jokhang) → Shigatse (Tashilhunpo) → Saga → Lake Manasarovar → Kailash Parikrama → return flow.
* **Action Needed:**
  Operations team should review and sign off on the 16-day Option 2 itinerary text implemented on `/routes/flight-to-lhasa` and `/itinerary`.

---

### 3. Batch Duration Variance (May Batch: 15 Days vs Batches 2–8: 16 Days)
* **Brochure Text (Page 1/8):**
  - May Batch: Sun 9 May 2027 to Sun 23 May 2027 = **15 Days**
  - June I to August II Batches: Mon to Tue = **16 Days**
* **Identified Discrepancy:**
  Option 1 lists 14 days of core travel. With 1 contingency buffer day, it yields 15 days (May Batch); with 2 buffer days, it yields 16 days (June–August Batches).
* **Action Needed:**
  Confirm whether May Batch has 1 buffer day in Kathmandu due to border gate constraints, while summer batches retain 2 buffer days.

---

### 4. Dual-Currency Structure for Foreign / NRI Passport Holders
* **Brochure Text (Page 6/8):**
  - Option 1: INR 4,25,000 (Fixed in INR)
  - Option 2: INR 4,25,000 + US$ 600 flight supplement
  - Option 3: INR 4,25,000 + US$ 1,200 flight supplement
* **Identified Discrepancy:**
  Billing an Indian legal entity in a hybrid mix of INR and USD requires clear conversion terms for tax and GST invoicing.
* **Action Needed:**
  Finance team should confirm:
  1. Will foreign yatris pay the USD supplement directly in USD via international payment link or in equivalent INR at the prevailing RBI spot rate on invoice date?
  2. Does the US$ 600 / US$ 1,200 supplement include Chinese domestic airport tax?

---

### 5. Nandi & Ashtapad Darshan Accessibility Disclaimers
* **Brochure Text (Page 5/7):**
  > "Nandi and Ashtapad Darshan are subject to government regulations and only from the government-specified viewing points; if permitted, the vehicle cost to reach the approved viewing point is included in the Yatra fee."
* **Operational Reality:**
  Tibetan and Chinese local authorities frequently suspend close vehicle or foot access to Ashtapad and the base of Nandi due to environmental protection and rockfall safety.
* **Action Needed:**
  The disclaimer implemented on the website clarifies that viewing is strictly from government-permitted vantage points to prevent pilgrim disputes on ground.

---

### 6. Buffer Days and Flight Variation Clause
* **Brochure Text (Page 1/8):**
  > "Air-route departures may vary by approximately one day depending on flight schedules, permit processing and sector availability."
* **Action Needed:**
  Operations must ensure the booking portal terms require yatris to book flexible international flight tickets into Kathmandu that accommodate potential 24-hour schedule shifts.
