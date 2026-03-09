// All task/phase data — single source of truth
// Structure: Phase → Category (with goal) → Tasks (with detail)
// Edit this file to modify tasks. Do not touch UI code for task changes.

export const DEADLINE = '2026-03-31'
export const START_DATE = '2026-03-09'

export const phases = [
  {
    id: 'phase-0',
    name: 'FOUNDATION',
    label: 'Pre-loaded as completed',
    date: null,
    endDate: null,
    categories: [
      {
        id: 'p0-cat',
        name: 'Foundation',
        goal: 'Core business, brand, and outreach engine built from scratch',
        tasks: [
          { id: 'p0-1', label: 'Business model, ICP, offers, and positioning locked', weight: 2, preCompleted: true },
          { id: 'p0-2', label: 'Brand guide v2.0 finalized', weight: 1, preCompleted: true },
          { id: 'p0-3', label: 'Copy kit v1.0 finalized', weight: 1, preCompleted: true },
          { id: 'p0-4', label: 'Outreach engine fully coded', detail: '14 scripts, 9 directives, 0 TODOs', weight: 3, preCompleted: true },
          { id: 'p0-5', label: 'Modal account set up', weight: 1, preCompleted: true },
          { id: 'p0-6', label: 'Instantly confirmed as email tool', weight: 1, preCompleted: true },
          { id: 'p0-7', label: 'VA job posting live on OnlineJobs.ph', weight: 1, preCompleted: true },
          { id: 'p0-8', label: 'Website hero section built', weight: 1, preCompleted: true },
          { id: 'p0-9', label: 'Website VSL section built (placeholder)', detail: 'No video yet — placeholder embed', weight: 1, preCompleted: true },
          { id: 'p0-10', label: 'LinkedIn posting automation built in Antigravity', weight: 1, preCompleted: true },
        ],
      },
    ],
  },
  {
    id: 'day-1',
    name: 'DAY 1',
    label: 'March 9',
    date: '2026-03-09',
    endDate: '2026-03-09',
    categories: [
      {
        id: 'd1-cat1',
        name: 'Outreach Engine Deployment',
        goal: 'Get the outreach engine live and firing from Telegram',
        tasks: [
          { id: 'd1-1', label: 'Gather all 9 required .env variables', detail: 'TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, APIFY_API_TOKEN, OPENROUTER_API_KEY, GOOGLE_SHEETS_CREDS_JSON, GOOGLE_SHEET_ID, CLICKUP_API_TOKEN, CLICKUP_LIST_ID, INSTANTLY_API_KEY, INSTANTLY_CAMPAIGN_ID', weight: 2 },
          { id: 'd1-2', label: 'Load all 6 Modal secret groups', detail: 'telegram-secrets, apify-secrets, anthropic-secrets, google-sheets-secrets, clickup-secrets, instantly-secrets', weight: 2 },
          { id: 'd1-3', label: 'Run locally to generate token.json for Google Sheets OAuth', detail: 'Must do locally — expires in 7 days, push to Modal immediately after', weight: 1 },
          { id: 'd1-4', label: 'Deploy outreach engine to Modal', detail: 'modal deploy execution/modal_app.py — generates live webhook URL', weight: 1 },
          { id: 'd1-5', label: 'Point Telegram bot to live Modal webhook URL', detail: 'Use Telegram setWebhook API', weight: 1 },
        ],
      },
      {
        id: 'd1-cat2',
        name: 'ClickUp Configuration',
        goal: 'ClickUp workspace ready to receive and manage leads',
        tasks: [
          { id: 'd1-6', label: 'Create 6 custom fields in ClickUp UI', detail: 'Email, Website, LinkedIn, Loom URL, Niche, Location — API cannot create these, must be done in UI', weight: 1 },
          { id: 'd1-7', label: 'Run ClickUp setup script', detail: 'python -m execution.clickup_setup — configures statuses: to review → loom recorded → in outreach → sent → replied → paused → closed', weight: 1 },
        ],
      },
      {
        id: 'd1-cat3',
        name: 'Email Infrastructure',
        goal: 'Outreach domain live, accounts warming, campaign created',
        tasks: [
          { id: 'd1-8', label: 'Purchase 1 outreach domain', detail: 'Not wellbuiltai.com — e.g. getwellbuilt.com', weight: 1 },
          { id: 'd1-9', label: 'Create 3 sending accounts on outreach domain', detail: 'niko@, hello@, team@', weight: 1 },
          { id: 'd1-10', label: 'Configure SPF, DKIM, DMARC records', weight: 1 },
          { id: 'd1-11', label: 'Add all 3 accounts to Instantly in warm-up mode', detail: 'Start at 5 emails/day each, ramp +5/day every 2 days. Target: 30/day per account by Day 10', weight: 1 },
          { id: 'd1-12', label: 'Add main email to Instantly — 25/day limit', weight: 1 },
          { id: 'd1-13', label: 'Create Instantly campaign', detail: '"WellBuilt — SMMA Home Services Outreach"', weight: 1 },
        ],
      },
      {
        id: 'd1-cat4',
        name: 'Smoke Test',
        goal: 'Full pipeline works end-to-end — Telegram to Instantly',
        tasks: [
          { id: 'd1-14', label: 'Run full end-to-end smoke test', detail: 'Telegram command "find me 5 leads" → Apify scrapes → Google Sheets → Telegram approval → Claude enriches → ClickUp tasks with email draft + Loom talking points', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'day-2',
    name: 'DAY 2',
    label: 'March 10',
    date: '2026-03-10',
    endDate: '2026-03-10',
    categories: [
      {
        id: 'd2-cat1',
        name: 'Cold Email Sequences',
        goal: '3-email sequence loaded into Instantly with personalization',
        tasks: [
          { id: 'd2-1', label: 'Write Email 1 (Day 0 — send immediately)', detail: '3 curiosity-based subject variants. Open with "Your offer has a ceiling. Ours removes it." → 2-3 sentences on outcome → CTA: "See if you qualify →". Tone: peer-level, never pitchy', weight: 2 },
          { id: 'd2-2', label: 'Write Email 2 (Day 3 follow-up)', detail: 'Lead with one stat as a weapon → 2 sentences → same CTA', weight: 1 },
          { id: 'd2-3', label: 'Write Email 3 (Day 7 breakup)', detail: '1 sentence. Direct. Leave door open. No desperation.', weight: 1 },
          { id: 'd2-4', label: 'Write 3 subject line variants per email (9 total)', weight: 1 },
          { id: 'd2-5', label: 'Load sequence into Instantly with tokens', detail: '{{firstName}} {{agencyName}} {{niche}} {{loomLink}}', weight: 1 },
        ],
      },
      {
        id: 'd2-cat2',
        name: 'Website — Content Sections',
        goal: 'Stats, Cost of Inaction, and How It Works sections live on site',
        tasks: [
          { id: 'd2-6', label: 'Build stat cards section — 5 cards', detail: '21x higher conversion under 5 min / 78% go with first responder / 391% lift under 1 min / 42hr avg business response time / 63% of leads never contacted. Style: short height, large text, gold accent on numbers', weight: 2 },
          { id: 'd2-7', label: 'Build "Cost of Inaction" section', detail: 'Header: "IMPLEMENT THE SYSTEM AND" → subheader: "watch your agency become irreplaceable." (golden italic) → body with stats as weapons', weight: 2 },
          { id: 'd2-8', label: 'Build "How It Works" / Architecture section', detail: '4-step flow: Lead comes in → Voice + text fires under 60 sec → Lead booked before competitors → Agency gets paid. Numbered steps, clean, minimal', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'day-3',
    name: 'DAY 3',
    label: 'March 11',
    date: '2026-03-11',
    endDate: '2026-03-11',
    categories: [
      {
        id: 'd3-cat1',
        name: 'Website — Completion',
        goal: 'Website fully QA\'d on desktop and mobile',
        tasks: [
          { id: 'd3-1', label: 'Build booking/close section', detail: 'Headline: "DEPLOY THE SYSTEM". CTA: "See if you qualify →". Embed: cal.com/wellbuiltai/discovery. Left side: qualifying criteria checklist', weight: 2 },
          { id: 'd3-2', label: 'Fix VSL embed — replace with YouTube/Vimeo', detail: 'Confirm custom play button triggers cleanly, no double-click', weight: 2 },
          { id: 'd3-3', label: 'Build full mobile view', detail: 'Mirror all desktop sections, remove fixed heights, standardize padding', weight: 2 },
          { id: 'd3-4', label: 'Refactor App.jsx into component sections', detail: 'Move AnimatedHero, VslSection, StatCards, CostOfInaction, HowItWorks, CloseSection into src/components/sections/', weight: 1 },
          { id: 'd3-5', label: 'Delete dead BookingSection component', detail: 'Lines 308-352 in App.jsx', weight: 1 },
          { id: 'd3-6', label: 'Full QA: desktop + mobile', detail: 'All CTAs fire, booking embed loads, stats render, no broken layouts', weight: 1 },
        ],
      },
      {
        id: 'd3-cat2',
        name: 'VSL Script',
        goal: 'VSL script written and ready to record',
        tasks: [
          { id: 'd3-7', label: 'Write VSL script (6-8 min)', detail: 'Pain: 42hr response time, 63% never contacted, 78% first responder wins. Mechanism: voice + text under 60 sec, plugs into GHL. Proof: stats + outcomes. Offer: $10K + 40% rev share vs $25K handoff. CTA: "See if you qualify"', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'day-4',
    name: 'DAY 4',
    label: 'March 12',
    date: '2026-03-12',
    endDate: '2026-03-12',
    categories: [
      {
        id: 'd4-cat1',
        name: 'VSL Production',
        goal: 'VSL recorded, uploaded, and embedded on website',
        tasks: [
          { id: 'd4-1', label: 'Record VSL', detail: 'Phone or camera, clean background, direct to lens, authentic delivery', weight: 1 },
          { id: 'd4-2', label: 'Upload to Vimeo or YouTube (unlisted)', weight: 1 },
          { id: 'd4-3', label: 'Embed live VSL into website', detail: 'Confirm thumbnail + play works cleanly', weight: 1 },
        ],
      },
      {
        id: 'd4-cat2',
        name: 'LinkedIn Build',
        goal: 'LinkedIn profile optimized and automation running',
        tasks: [
          { id: 'd4-4', label: 'Update LinkedIn profile', detail: 'Photo: professional. Banner: black + gold. Headline: "Founder @ WellBuilt AI | Revenue systems for home services agencies". About: open with "Your offer has a ceiling." + 3 sentences + CTA', weight: 1 },
          { id: 'd4-5', label: 'Add LinkedIn connection request automation to Antigravity', detail: 'Target: SMMA owners, home services (HVAC, roofing, plumbing, electrical, GC), US. 25 requests/day, no note', weight: 2 },
          { id: 'd4-6', label: 'Write LinkedIn DM sequence', detail: 'Msg 1 (24hrs after accept): peer-level, reference niche, end with question. Msg 2 (Day 3): one stat + soft CTA', weight: 1 },
          { id: 'd4-7', label: 'Add DM sequence to Antigravity automation', weight: 1 },
        ],
      },
      {
        id: 'd4-cat3',
        name: 'Outreach Engine — Telegram Expansions',
        goal: 'Reply notifications, daily summaries, and debrief agent live',
        tasks: [
          { id: 'd4-8', label: 'Add reply notification to outreach engine', detail: 'Instantly webhook → Telegram: "Reply from [Name] @ [Agency]. Score: X/10. Loom talking points: [3 bullets]". ClickUp: move to "replied — loom needed"', weight: 2 },
          { id: 'd4-9', label: 'Add daily 6pm reply summary to Telegram', detail: 'Daily Summary — Sent: X | Opened: X% | Replied: X% | New replies: [list] | Looms needed: X', weight: 2 },
          { id: 'd4-10', label: 'Add 8pm strategy debrief agent', detail: 'Pulls metrics + sentiment. Generates 3-5 tactical recommendations. Daily Debrief — What\'s working / What\'s not / Do this tomorrow', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'day-5',
    name: 'DAY 5',
    label: 'March 13',
    date: '2026-03-13',
    endDate: '2026-03-13',
    categories: [
      {
        id: 'd5-cat1',
        name: 'Outreach Engine — Lead Quality Upgrade',
        goal: 'ICP scoring live — only 7+ leads enter pipeline',
        tasks: [
          { id: 'd5-1', label: 'Strengthen ICP qualification in claude_enricher.py', detail: 'Score 1-10: paid ads for home services, US-based, 5-15 employees, $30K+/mo revenue, active on FB/Google Ads. Only 7+ queued. Below 7: logged to Sheets only', weight: 2 },
          { id: 'd5-2', label: 'Add ICP score to Google Sheets output', detail: 'New column: "ICP Score"', weight: 1 },
          { id: 'd5-3', label: 'Add ICP score as ClickUp custom field', weight: 1 },
          { id: 'd5-4', label: 'Test enrichment on 10 sample leads', detail: 'Confirm scoring accuracy, verify sub-7 leads are filtered', weight: 1 },
        ],
      },
      {
        id: 'd5-cat2',
        name: 'First Live Lead Batch',
        goal: 'First 30 leads sent to Instantly — outreach is live',
        tasks: [
          { id: 'd5-5', label: 'Send Telegram command for 30 SMMA leads', detail: '"Find me 30 SMMA agencies running paid ads for home services in the US"', weight: 1 },
          { id: 'd5-6', label: 'Review enriched leads in ClickUp', detail: 'Confirm scores, email drafts, and Loom talking points', weight: 1 },
          { id: 'd5-7', label: 'Push approved leads to Instantly', detail: 'Main email begins sending today — 25 emails/day', weight: 1 },
        ],
      },
      {
        id: 'd5-cat3',
        name: 'PandaDoc Setup',
        goal: 'Both offer tiers built, e-signature and invoicing ready',
        tasks: [
          { id: 'd5-8', label: 'Build Offer 1 in PandaDoc', detail: '$10,000 + 40% of client install fee. System build + sales training. WellBuilt handles implementation per client sold', weight: 1 },
          { id: 'd5-9', label: 'Build Offer 2 in PandaDoc', detail: '$25,000 + possible maintenance fee. Full handoff, agency team trained', weight: 1 },
          { id: 'd5-10', label: 'Set up e-signature flow', weight: 1 },
          { id: 'd5-11', label: 'Set up invoice template per tier', weight: 1 },
          { id: 'd5-12', label: 'Test full flow: send → sign → invoice', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'day-6',
    name: 'DAY 6',
    label: 'March 14',
    date: '2026-03-14',
    endDate: '2026-03-14',
    categories: [
      {
        id: 'd6-cat1',
        name: 'GHL Pipeline Setup',
        goal: 'GHL pipeline synced with ClickUp via n8n',
        tasks: [
          { id: 'd6-1', label: 'Create prospect pipeline in GHL', detail: 'Stages: Contacted → Opened → Replied → Loom Sent → Call Booked → Proposal Sent → Closed', weight: 1 },
          { id: 'd6-2', label: 'Connect GHL calendar to booking link', weight: 1 },
          { id: 'd6-3', label: 'Add GHL pipeline sync via n8n', detail: 'ClickUp status change → mirror stage in GHL (e.g. "replied — loom needed" = "Replied")', weight: 1 },
        ],
      },
      {
        id: 'd6-cat2',
        name: 'Sales Prep',
        goal: 'Discovery call framework, objection responses, and follow-up template ready',
        tasks: [
          { id: 'd6-4', label: 'Write discovery call framework', detail: '5 qualifying questions → present offer (lead with outcome) → handle objections → close to proposal', weight: 1 },
          { id: 'd6-5', label: 'Write objection responses (5 scenarios)', detail: '"No budget" / "Already have a solution" / "Send me more info" / "What\'s your track record" / "I need to think about it"', weight: 1 },
          { id: 'd6-6', label: 'Write post-call follow-up email template', detail: 'Sent within 1 hour — recap pain, confirm tier, attach PandaDoc link', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'days-7-15',
    name: 'DAYS 7–15',
    label: 'March 15–23',
    date: '2026-03-15',
    endDate: '2026-03-23',
    categories: [
      {
        id: 'streak-cat',
        name: 'Daily Outreach Operations',
        goal: 'Hit quota every day — emails, Looms, LinkedIn DMs, replies',
        tasks: [
          { id: 'streak-1', label: 'Daily outreach quota — Day 7 (Mar 15)', detail: 'Morning: new lead batch if queue < 50. Check ClickUp for "replied — loom needed". Record Loom same day. Respond to replies within 2hr. LinkedIn requests + DMs', weight: 0.5, isStreak: true },
          { id: 'streak-2', label: 'Daily outreach quota — Day 8 (Mar 16)', weight: 0.5, isStreak: true },
          { id: 'streak-3', label: 'Daily outreach quota — Day 9 (Mar 17)', weight: 0.5, isStreak: true },
          { id: 'streak-4', label: 'Daily outreach quota — Day 10 (Mar 18)', weight: 0.5, isStreak: true },
          { id: 'streak-5', label: 'Daily outreach quota — Day 11 (Mar 19)', weight: 0.5, isStreak: true },
          { id: 'streak-6', label: 'Daily outreach quota — Day 12 (Mar 20)', weight: 0.5, isStreak: true },
          { id: 'streak-7', label: 'Daily outreach quota — Day 13 (Mar 21)', weight: 0.5, isStreak: true },
          { id: 'streak-8', label: 'Daily outreach quota — Day 14 (Mar 22)', weight: 0.5, isStreak: true },
          { id: 'streak-9', label: 'Daily outreach quota — Day 15 (Mar 23)', weight: 0.5, isStreak: true },
        ],
      },
      {
        id: 'review-cat',
        name: 'Review & Adjust',
        goal: 'Day 10 data reviewed — adjustments made if needed',
        tasks: [
          { id: 'd10-review', label: 'Day 10 checkpoint: review debrief data', detail: 'Open rate < 30%? Rewrite subjects. Reply rate < 3%? Rewrite Email 1. Replies but no calls? Tighten CTA or booking page', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'days-15-22',
    name: 'DAYS 15–22',
    label: 'March 23–31',
    date: '2026-03-23',
    endDate: '2026-03-31',
    categories: [
      {
        id: 'close-cat1',
        name: 'Discovery Calls',
        goal: 'Calls booked, run, and proposals sent',
        tasks: [
          { id: 'close-1', label: 'Book first discovery call', detail: 'Target: minimum 3 calls booked in this window', weight: 2 },
          { id: 'close-2', label: 'Run discovery calls using Day 6 framework', detail: 'Qualify pain → present offer → handle objections → close to proposal', weight: 2 },
          { id: 'close-3', label: 'Send PandaDoc proposal within 24 hours of each call', weight: 1 },
          { id: 'close-4', label: 'Follow up on open proposals every 48 hours', detail: 'Use daily summary to track who\'s gone cold', weight: 1 },
          { id: 'close-5', label: 'Handle post-proposal objections and negotiation', weight: 1 },
          { id: 'close-6', label: 'Collect signed contract via PandaDoc', weight: 2 },
          { id: 'close-7', label: 'Collect deposit / first payment', weight: 2 },
        ],
      },
      {
        id: 'close-cat2',
        name: 'Client Closed',
        goal: 'Payment received, onboarding triggered, win documented',
        tasks: [
          { id: 'close-8', label: 'Confirm payment received', weight: 1 },
          { id: 'close-9', label: 'Send onboarding welcome message', weight: 1 },
          { id: 'close-10', label: 'Schedule kickoff Zoom call', weight: 1 },
          { id: 'close-11', label: 'Trigger client onboarding automation', detail: 'PandaDoc signed → n8n → GHL sub-account → ClickUp project → welcome email sequence', weight: 1 },
          { id: 'close-12', label: 'Document the win', detail: 'What worked, what didn\'t, what to replicate', weight: 1 },
        ],
      },
    ],
  },
]

// Background track — not part of 100% calculation
export const backgroundTasks = [
  { id: 'bg-1', label: 'Duplicate GHL sub-account from master template' },
  { id: 'bg-2', label: 'Duplicate Retell voice agent — customize to client', detail: 'Name, services, booking flow, objection handling' },
  { id: 'bg-3', label: 'Connect GHL + Retell + n8n for client sub-account' },
  { id: 'bg-4', label: 'Run full quality test', detail: 'Submit test lead → confirm voice agent fires → lead booked correctly in GHL' },
  { id: 'bg-5', label: 'Build internal AI agent to automate 90% of delivery', detail: 'Lower priority — build after first V2 client closed' },
]

// Helper: get all tasks flat
export function getAllTasks() {
  return phases.flatMap(phase =>
    phase.categories.flatMap(cat => cat.tasks)
  )
}

// Helper: get all tasks for a specific phase
export function getPhaseTasks(phase) {
  return phase.categories.flatMap(cat => cat.tasks)
}

// Helper: total possible weight
export function getTotalWeight() {
  return getAllTasks().reduce((sum, task) => sum + task.weight, 0)
}

// Helper: get navigable days (phases excluding Phase 0)
export function getDays() {
  return phases.filter(p => p.date !== null)
}

// Helper: find which day index matches a given date
export function getDayIndexForDate(dateStr) {
  const days = getDays()
  const target = new Date(dateStr + 'T00:00:00')

  for (let i = days.length - 1; i >= 0; i--) {
    const start = new Date(days[i].date + 'T00:00:00')
    const end = days[i].endDate ? new Date(days[i].endDate + 'T23:59:59') : start
    if (target >= start && target <= end) return i
  }

  if (target < new Date(days[0].date + 'T00:00:00')) return 0
  return days.length - 1
}

// Helper: get today's day index
export function getTodayDayIndex() {
  const today = new Date().toISOString().split('T')[0]
  return getDayIndexForDate(today)
}
