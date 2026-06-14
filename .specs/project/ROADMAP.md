# Roadmap

**Current Milestone:** M1 — Real Pomodoro
**Status:** Planning

---

## M1 — Real Pomodoro

**Goal:** The app delivers on its name. The classic long-break cycle works end to end.
**Target:** First shippable increment.

### Features

**Long-break cycle** - PLANNED

- Configurable "long break after N pomodoros" (e.g. every 4th break is a long break)
- Long-break length setting alongside existing work/break lengths
- Cycle counter that advances on completed work sessions and resets appropriately
- Session-type logic in `pomoRunner` / `pomoStore` extended from WORK/BREAK to include LONG_BREAK
- Optional: auto-start-next-session toggle (small companion quality-of-life win)

---

## M2 — Focus Tracking

**Goal:** The timer remembers what you did. Sessions become data; data becomes tasks.
**Target:** After M1.

### Features

**Session history** - PLANNED

- Persist completed sessions (type, duration, timestamp) via a new `secondary/` store, captured at `pomoRunner._onSessionEnd`
- Daily / weekly view: time focused, sessions completed, simple streaks
- Foundation that task-list, stats, and export all build on

**Task list** - PLANNED

- Lightweight tasks the user can create and select
- Attach the active task to a session; count pomodoros per task
- Built *after* history so sessions already record cleanly, then tasks layer on top

---

## M3 — Focus Environment (future)

**Goal:** Make the app a place to *be* while working, not just a clock to glance at.
**Target:** Later — not before M1/M2.

### Features

**Full-screen focus screen** - PLANNED

- Distraction-free fullscreen view of the timer
- Designed to also work well on a secondary screen / always-on display
- Reuses existing components (PIP/compact views are precedent)

---

## Future Considerations (drawer)

Captured, deliberately unscheduled — revisit as the product and exploration mature.

- **Ambient soundscapes (flagship "big bet").** Original, hand-produced long-form (~40 min) progressive ambient tracks that map 1:1 onto a work session — the recording's own arc resolves on the bell. No AI/generative music. A growing library the author adds to over time. Engine is a simple long-form player (load/play/fade/duck/crossfade) entering as a `secondary/` audio adapter. Personal-first; public release only if it feels right. Currently in open exploration, not committed to build. See memory `pomodoro-soundscapes-direction`.
- **Exportable history (CSV/JSON).** Could be valuable for freelancers tracking billable focus time. Builds directly on M2 session history. Parked until there's demand.
- **Smaller follow-ons noted during analysis:** selectable alarm sounds, desktop notifications, estimate-vs-actual pomodoros per task, tags/projects, "most productive hours" insights.
