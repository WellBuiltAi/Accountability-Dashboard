# Agent Instructions — WellBuilt Dashboard

You operate within a 3-layer DOE architecture that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business logic is deterministic. This system fixes that mismatch.

## The 3-Layer Architecture

**Layer 1: Directive (What to do)**
- SOPs in Markdown, live in `directives/`
- Define goals, inputs, tools/scripts, outputs, and edge cases

**Layer 2: Orchestration (Decision making)**
- This is you. Read directives, call execution tools in the right order, handle errors, update directives with learnings.

**Layer 3: Execution (Doing the work)**
- Deterministic scripts in `execution/` (if needed)
- Environment variables in `.env`

**Why this works:** 90% accuracy per step = 59% success over 5 steps. Push complexity into deterministic code.

## Operating Principles

**1. Check for tools first**
Before writing a script, check `execution/` per your directive. Only create new scripts if none exist.

**2. Self-anneal when things break**
- Read error message and stack trace
- Fix the script and test again (unless it uses paid tokens — check w user first)
- Update the directive with what you learned

**3. Update directives as you learn**
Directives are living documents. When you discover constraints, better approaches, or common errors — update the directive. Don't create or overwrite directives without asking.

## Self-Annealing Loop

1. Fix it
2. Update the tool
3. Test, make sure it works
4. Update directive
5. System is now stronger

## Project Structure

```
Accountability Dashboard/
├── CLAUDE.md              # These instructions
├── setupGuide.md          # Spec (v2)
├── directives/            # SOPs
├── src/
│   ├── data/tasks.js      # All task data (single source of truth)
│   │                      # Structure: Phase → Category (with goal) → Tasks (with detail)
│   ├── hooks/useTaskState.js  # localStorage persistence
│   ├── components/
│   │   ├── Header.jsx         # Pinned top bar: logo + progress bar + stats
│   │   ├── DayView.jsx        # Main view: today's tasks with ← → navigation
│   │   ├── CategoryBlock.jsx  # Subcategory with goal, mini progress, tasks
│   │   ├── TaskItem.jsx       # Task with expandable detail on click
│   │   ├── PhaseBlock.jsx     # Bottom phase overview (collapsed rows)
│   │   ├── BackgroundTrack.jsx
│   │   └── Confetti.jsx
│   └── utils/calculations.js
├── index.html
├── vite.config.js
└── package.json
```

## Layout: Three Zones

1. **TOP BAR** (pinned): Logo left, progress bar center, days remaining + tasks today right
2. **MAIN VIEW**: Shows only current day's tasks with ← Yesterday / Tomorrow → navigation
3. **BOTTOM**: Phase overview collapsed by default, expand to see all phases

## Key Rules

- All task data lives in `src/data/tasks.js` — never hardcode tasks in components
- Tasks: Phase → Category (with `goal`) → Tasks (with `detail` for expanded view)
- Brand: #000000 bg, #B2851B gold, #4A360D olive, Bebas Neue + DM Sans fonts
- No purple, no gradients on white, no Inter/Roboto/Arial
- localStorage for all state persistence
- Default view shows TODAY only — never the full 22-day list
- Phase 0 always shows "FOUNDATION COMPLETE ✓" (collapsed)

## Skills (cloned to ~/.claude/skills/)

- `vercel-labs/` — React best practices, composition patterns, web design guidelines, Vercel deploy
- `anthropic-skills/` — Frontend design (bold aesthetic direction, anti-AI-slop)
- `obra-superpowers/` — TDD, brainstorming, writing plans, code review, debugging

Be pragmatic. Be reliable. Self-anneal.
