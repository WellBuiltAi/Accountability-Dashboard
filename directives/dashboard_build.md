# Dashboard Build Directive

## Goal
Build and maintain the WellBuilt AI progress dashboard — a gamified single-page React app tracking the 22-day sprint to first client (March 9–31, 2026).

## Inputs
- Task data: `src/data/tasks.js` (single source of truth — Phase → Category (with goal) → Tasks (with detail))
- Brand spec: `setupGuide.md` (v2 — colors, fonts, aesthetic, UI/UX requirements)

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- Framer Motion (animations)
- localStorage (persistence)

## Layout: Three Zones
1. **TOP BAR** (pinned): Logo left, progress bar center, days remaining + tasks today right
2. **MAIN VIEW**: Shows only current day's tasks with ← Yesterday / Tomorrow → navigation
3. **BOTTOM**: Phase overview collapsed by default

## Data Structure
- Phase → Category (with `name` + `goal`) → Tasks (with `label` + `detail`)
- `detail` field: expanded content shown on click (commands, file names, specifics)
- Phase 0: Foundation (pre-completed, always collapsed)
- Days 1–6: Specific daily tasks grouped by category
- Days 7–15: Daily outreach streak (0.5%/day × 9) + review checkpoint
- Days 15–22: Sales close window

## Key Rules
1. All task modifications go through `src/data/tasks.js` — never hardcode in components
2. Phase 0 pre-seeded as completed on first load
3. Default view shows TODAY only — never the full list
4. Background track (LasikGrowth) separate from 100%
5. Top bar pinned with progress bar — always visible
6. Tasks clickable to expand detail (hidden by default)
7. Category shows goal statement + mini completion count

## Deployment
- GitHub repo: wellbuilt-dashboard
- Deploy: Vercel connected to GitHub, auto-deploy on push to main

## Edge Cases Learned
(Update this section as issues arise)
