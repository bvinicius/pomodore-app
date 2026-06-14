# Long-Break Cycle — Context (gray-area decisions)

Decisions captured during Specify (2026-06-14). These resolve the ambiguous areas the agent flagged.

## 1. Cycle trigger: every Nth work session, configurable (default 4)

The long break fires after N work sessions. N defaults to the classic **4** but is a user setting alongside work/break lengths. Chosen over a hard-coded value to give users control while keeping a sensible default.

## 2. Skipping a work session counts toward the cycle

A work session that is **skipped early still advances** the cycle progress, treated the same as a naturally completed one. Skipping a break / long break does **not** advance progress (only work sessions count). Rationale: simpler mental model — "starting a work session counts as a pomodoro for cycle purposes."

> Note: this is a deliberate divergence from M2's "focus tracking" intent, where skipped sessions may *not* count as real focus time. The cycle counter here is ephemeral cycle bookkeeping, not the persisted history that M2 will build. Keep the two notions separate.

## 3. Show cycle progress in the UI

The UI surfaces progress through the current cycle (e.g. "2 / 4" or dots) so the user can anticipate the long break. Minimal, but visible.

## 4. Auto-start-next-session toggle: deferred

Not part of this feature. It stays a separate deferred idea (already in STATE.md). This spec covers only the long-break cycle.

## Derived design implications (for the Design phase)

- New session type `LONG_BREAK` added to `PomoSessionType` (`src/domain/Pomodore.ts`).
- `PomoSettings` gains `longBreakSessionLength` and `longBreakInterval`.
- A persisted cycle-progress counter in `pomoStore` (e.g. `cycleProgress`), reset after a long break.
- `currentSessionLength` and `nextSession` getters in `pomoStore` extended from a binary toggle to three-way logic; next-break decision uses **progress ≥ interval**.
- `_skipSession` / `_onSessionEnd` in `pomoRunner.ts` updated to advance progress on work-session end (natural or skip) and to choose BREAK vs LONG_BREAK.
- `_updateMetaTitle` extended to label the long-break session.
- Progress indicator component in the session views (atoms/molecules).
