# State

Persistent memory: decisions, blockers, lessons, todos, deferred ideas.

## Decisions

- **2026-06-14 — Roadmap sequencing.** M1 = long-break cycle (first ship). M2 = session history *then* task list (history first, since tasks attach to recorded sessions). M3 (later) = full-screen focus screen. Source: user priorities.
- **2026-06-14 — Soundscapes is the flagship but stays in the drawer.** User is actively exploring it, not committing to build yet. Kept in Future Considerations rather than a dated milestone.
- **Audio: no AI/generative music — ever.** All tracks hand-produced by the author. Long-form (~40 min) progressive ambient that maps to a session. This is the product's identity, not just a constraint.
- **2026-06-14 — Long-break cycle gray areas (Specify).** Interval configurable, default 4. Skipping a work session *counts* toward the cycle (only work sessions count; breaks don't). Cycle progress is shown in the UI. Auto-start-next-session deferred to its own feature. Next-break decision uses `progress >= interval` (handles mid-cycle interval changes). Spec: `.specs/features/long-break-cycle/`.
- **2026-06-14 — Long-break cycle test policy.** Logic + component tests: unit-test `domain/cycle.ts` + `pomoStore` (plain node); component-test `PomoCycleProgress` + `PomoSettings` via `@vue/test-utils` with per-file `// @vitest-environment jsdom` docblock (no global vitest config change). Worker-injecting orchestration (`pomoRunner`, `HomePage`, `PomoSession`) verified by build + manual.
- **2026-06-14 — Cycle counter ≠ M2 history.** The long-break cycle counter is ephemeral cycle bookkeeping (skips count). M2's session history is a separate persisted activity log where skip semantics may differ. Don't conflate them.

## Deferred ideas

- Exportable history (CSV/JSON) — billable-focus angle for freelancers. Build on M2. Parked until demand.
- Selectable alarm sounds, desktop notifications, auto-start-next-session.
- Estimate-vs-actual pomodoros per task, tags/projects, productivity insights.

## Lessons / notes

- New infrastructure should enter as `secondary/` adapters behind `domain` interfaces (mirror `PomoCounter`/`PomoCounterInstance`).
- History capture hook point: `pomoRunner._onSessionEnd`.
- Tests currently cover only `date-utils` — expanding coverage is implied work for any new domain logic.

## Blockers

- None.
