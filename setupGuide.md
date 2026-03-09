WELLBUILT AI — PROGRESS DASHBOARD
Claude Code Build Prompt
Hosting: Vercel + GitHub
================================================


OVERVIEW
--------
Build a visually striking, gamified progress dashboard for Niko Gangadean (founder of WellBuilt AI).
The dashboard tracks every task from zero to closing the first client in 22 days (March 9–31, 2026).
It is a single-page React app, deployed via GitHub + Vercel.

This is a personal daily operating tool — not a client-facing product.
It should feel motivating, premium, and fast. Think: war room meets game HUD.


TECH STACK
----------
- React 19 + Vite
- Tailwind CSS
- Framer Motion (animations)
- Recharts or similar (progress visualization)
- localStorage for persistent checkbox state (tasks stay checked on refresh)
- Deploy: GitHub repo → Vercel


BRAND
-----
- Background: #000000
- Primary accent: #B2851B (Golden Yellow — CTAs, progress fills, highlights)
- Supporting accent: #4A360D (Olive-Brown — secondary elements)
- Text: #FFFFFF primary, #999999 secondary
- Font: Use a distinctive, premium pairing — NOT Inter or Roboto.
  Suggested: "Bebas Neue" or "DM Serif Display" for headings + "DM Sans" or "Syne" for body.
- Aesthetic: Dark brutalism. Gold glow. Minimal but dense with data. No gradients on white. No purple.


CORE FUNCTIONALITY
------------------

1. OVERALL PROGRESS BAR
   - Fills from 0% to 100%
   - 100% = first client closed
   - Large, prominent, always visible at top
   - Animates smoothly as tasks are checked
   - Shows exact percentage (e.g., "47%")
   - Gold fill color (#B2851B) on black track

2. TASK LIST — PHASES
   Tasks are grouped into phases. Each phase has a name, total weight, and completion state.
   Phases are displayed in order. Each task has:
   - Checkbox (click to complete)
   - Task name
   - % weight contribution toward 100%
   - Visual indicator when complete (strikethrough + muted color)

   PHASE 0 — ALREADY DONE (pre-loaded as completed)
   These are already checked on first load. They count toward total %.

   [2%] Business model, ICP, offers, positioning — locked
   [1%] Brand guide v2.0 — finalized
   [1%] Copy kit v1.0 — finalized
   [3%] Outreach engine — fully coded
   [1%] Outreach engine builder handoff doc — delivered
   [1%] Modal account — set up
   [1%] Instantly — confirmed as email tool
   [1%] VA job posting — written and posted on OnlineJobs.ph
   [2%] Website hero + VSL section + stats + close section — built
   [1%] ClickUp connected to outreach engine

   PHASE 1 — DEPLOY & FINISH INFRASTRUCTURE (Days 1–2)
   [2%] Generate credentials.json and token.json for Google Sheets OAuth
   [2%] Load all secrets into Modal secrets manager (telegram, apify, anthropic, google-sheets, clickup, instantly)
   [1%] Point Telegram bot webhook to Modal app URL endpoint
   [3%] Run full end-to-end smoke test: Telegram → scrape → enrich → ClickUp → Instantly
   [1%] Create outreach campaign in Instantly
   [1%] Purchase outreach domain (separate from main domain)
   [1%] Set up outreach email account on outreach domain
   [2%] Configure SPF, DKIM, DMARC on outreach domain
   [1%] Begin domain warm-up in Instantly
   [1%] Set up ClickUp workspace structure: daily tasks, pipeline tracking, VA board
   [1%] Audit existing Telegram/ClickUp connection — clean up and streamline if messy

   PHASE 2 — WEBSITE & VSL (Days 1–3)
   [2%] Build "Cost of Inaction" section
   [2%] Build "Architecture Breakdown" section
   [2%] Fix VSL embed — replace Google Drive iframe with Wistia, Vimeo, or YouTube
   [2%] Build full mobile view
   [1%] Refactor App.jsx — move sections into src/components/sections/
   [1%] Delete or integrate dead BookingSection component
   [1%] QA full desktop flow end-to-end
   [2%] Write VSL script: pain → mechanism → proof → offer → CTA
   [1%] Record VSL
   [1%] Edit and upload VSL to Wistia/Vimeo
   [1%] Embed live VSL into website

   PHASE 3 — OUTREACH ASSETS (Days 2–4)
   [3%] Write cold email sequence: Email 1 (hook + offer), Email 2 (follow-up), Email 3 (breakup)
   [1%] Write 3–5 subject line variants per email
   [1%] Load sequence into Instantly campaign with personalization fields
   [2%] Clean up LinkedIn profile: headline, about, banner, photo
   [1%] Write LinkedIn DM script — short, direct, curiosity-driven
   [1%] Define Loom structure: 30 sec personalized intro + 60 sec templated body
   [2%] Record Loom template section (non-personalized portion)
   [1%] Test Loom tracking and confirm links work correctly
   [1%] Finalize VSL system name (top candidate: "The Offer Multiplier")
   [1%] Finalize logo subtext (top candidate: "Built to Convert.")
   [1%] Build offer document in PandaDoc: both tiers, pricing, inclusions, terms
   [1%] Set up e-signature and invoicing flow in PandaDoc

   PHASE 4 — ACTIVE OUTREACH (Days 4–22)
   [1%] Confirm domain warm-up is complete and deliverability is green
   [2%] Run first Telegram command: scrape initial batch of 20–30 home services SMMA leads
   [1%] Review and approve enriched leads + email drafts in ClickUp
   [2%] Record personalized Loom intros for first batch
   [1%] Push first batch to Instantly via Telegram command
   [1%] Begin LinkedIn DMs in parallel — 10–15/day
   [10%] Hit daily outreach quota every day: email batch + LinkedIn DMs + reply management (Days 4–22, 0.5%/day — rendered as a daily streak tracker)
   [1%] Respond to every reply within 2 hours
   [2%] Record personalized Loom for every prospect who warms up
   [1%] Follow up on every Loom sent within 48 hours
   [1%] Log every active prospect through GHL pipeline stages in real time
   [1%] Set up GHL pipeline: Contacted → Replied → Call Booked → Proposal Sent → Closed
   [1%] Connect GHL calendar to booking link
   [1%] Write responses to top 5 objections
   [1%] Write short FAQ reference doc for calls

   PHASE 5 — SALES CALLS & CLOSE (Days 7–22)
   [2%] Book first discovery call
   [2%] Run discovery call: qualify pain, present offer, handle objections
   [1%] Send PandaDoc proposal within 24 hours of call
   [1%] Follow up on proposal every 48 hours until decision
   [1%] Handle post-proposal negotiation or objections
   [1%] Collect signed contract
   [2%] Collect deposit / first payment

   PHASE 6 — CLIENT CLOSED
   [1%] Confirm payment received
   [1%] Send onboarding welcome + next steps
   [1%] Schedule kickoff call
   [1%] Trigger client onboarding automation (n8n + PandaDoc + GHL + ClickUp)
   [1%] Document the sale: what worked, what didn't, lessons learned

3. DAILY QUOTA TRACKER
   - Shows today's date and days remaining until March 31
   - Shows daily minimum task count to stay on pace
   - Streak counter: consecutive days where daily minimum was hit
   - Simple "Mark today complete" button that logs the day

4. PHASE PROGRESS RINGS OR BARS
   - Each phase shows its own mini completion % (e.g., "Phase 1 — 3/11 complete")
   - Collapsed/expanded toggle per phase to reduce visual noise
   - Completed phases collapse automatically or show a "DONE" badge

5. BACKGROUND TRACK — V1 CLIENT DELIVERY (LasikGrowth)
   - Separate section, visually distinct (not part of the 100% calculation)
   - Labeled: "V1 Client — LasikGrowth"
   - Tasks:
     * Duplicate GHL sub-account from template
     * Customize and duplicate Retell voice agent
     * Tailor agent to new client specifics
     * Connect GHL + Retell + n8n
     * Test full flow for quality assurance
     * Build internal AI agent to automate 90% of delivery (lower priority)
   - Simple checkboxes, no % weight


UI/UX DETAILS
-------------
- Single page. No routing needed.
- Header: "WELLBUILT AI" logo text + "ROAD TO FIRST CLIENT" subtext
- Countdown: "X DAYS REMAINING" — large, prominent, updates based on current date vs March 31
- Main progress bar directly below header — always visible
- Phases listed below in order, each collapsible
- Completed tasks visually muted (not removed — they stay visible as proof of progress)
- Phase 0 pre-checked and visually marked as "FOUNDATION COMPLETE"
- Confetti or gold particle burst animation when hitting 100%
- Subtle gold glow pulse on the progress bar as it fills
- Mobile responsive


STATE PERSISTENCE
-----------------
- All checkbox states saved to localStorage
- On refresh, state is restored exactly
- No backend needed — purely client-side


DEPLOYMENT
----------
- Initialize as a GitHub repo: wellbuilt-dashboard
- Deploy to Vercel connected to that GitHub repo
- Auto-deploy on push to main
- Provide the GitHub repo init commands and Vercel deploy instructions at the end


IMPORTANT NOTES FOR CLAUDE CODE
---------------------------------
- Do not use Inter, Roboto, or Arial. Import chosen fonts from Google Fonts.
- Do not use purple gradients or generic SaaS aesthetics.
- The dashboard should feel like a personal war room — dark, gold, focused.
- Keep the component structure clean — one file per section/component.
- All task data should live in a single data file (e.g., tasks.js or tasks.json) so it's easy to edit later without touching UI code.
- The daily quota tracker should calculate the minimum tasks/day dynamically based on remaining uncompleted tasks and days left until March 31.
- Phase 0 tasks should be pre-seeded as completed in the initial localStorage state on first load.
