# Long-Break Cycle Specification

**Milestone:** M1 — Real Pomodoro
**Status:** Specified

## Problem Statement

The app is named "Pomodore" but only alternates a single WORK ↔ BREAK pair forever. The classic Pomodoro Technique groups focus sessions into cycles: after every N work sessions you take a *longer* break to recover. Without this, the app doesn't actually deliver the technique it's named after. This is the first shippable increment (M1).

## Goals

- [ ] Introduce a third session type (`LONG_BREAK`) so the timer cycles WORK → BREAK ×(N−1) → WORK → LONG_BREAK → repeat.
- [ ] Make the long-break interval (N) and long-break length user-configurable, defaulting to the classic 4 / longer-than-a-short-break values.
- [ ] Track progress through the current cycle and surface it in the UI so the user knows when the long break is coming.
- [ ] Persist cycle progress across reloads (it lives in the already-persisted `pomoStore`).

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Auto-start-next-session toggle | Deferred to its own feature (already a noted idea in STATE.md); keeps this spec focused on the cycle itself. |
| Session history / counting pomodoros per task | M2 work — the cycle counter here is ephemeral cycle state, not a persisted activity log. |
| Selectable alarm sounds / distinct long-break alarm | Out of scope; long break reuses the existing alarm. |
| Pre-long-break notification or messaging beyond the progress indicator | Not needed for MVP. |

---

## User Stories

### P1: Long break after N work sessions ⭐ MVP

**User Story**: As a focused user, I want a longer break after every N work sessions so the app follows the real Pomodoro technique and lets me recover properly.

**Why P1**: This is the core of M1 — without it the app doesn't deliver on its name.

**Acceptance Criteria**:

1. WHEN a WORK session ends (reaches 0:00) and it is the Nth completed work session of the current cycle THEN the system SHALL make the next session a LONG_BREAK instead of a regular BREAK.
2. WHEN a WORK session ends and it is *not* the Nth of the cycle THEN the system SHALL make the next session a regular BREAK.
3. WHEN a LONG_BREAK session ends THEN the system SHALL make the next session a WORK session and reset the cycle progress to zero.
4. WHEN a LONG_BREAK is the active session THEN the countdown SHALL use the configured long-break length.
5. WHEN a LONG_BREAK session ends THEN the system SHALL trigger the existing alarm exactly as it does for a regular break.

**Independent Test**: With N=2 and short session lengths, run two work sessions to completion and confirm the second break is a long break of the configured length, then confirm the cycle restarts at work afterward.

---

### P1: Configure long-break interval and length ⭐ MVP

**User Story**: As a user, I want to set how many work sessions precede a long break and how long that break is, so the cycle fits how I work.

**Why P1**: A long-break cycle with no way to tune it is incomplete; the interval and length are the two new knobs the feature introduces.

**Acceptance Criteria**:

1. WHEN the user opens settings THEN the system SHALL display a "long break length" input and a "long break after N pomodoros" input alongside the existing work/break length inputs.
2. WHEN the app first runs (no persisted settings) THEN the long-break interval SHALL default to 4 and the long-break length SHALL default to a value longer than the regular break.
3. WHEN the user changes the long-break interval or length THEN the system SHALL persist it and apply it to subsequent session-type decisions and countdowns.
4. WHEN the interval input receives a value below 1 THEN the system SHALL reject/clamp it so the interval is always at least 1.

**Independent Test**: Change the interval to 3 and the long-break length to 15, reload the app, and confirm both values persist and the long break now triggers on the 3rd work session at 15 minutes.

---

### P2: See cycle progress in the UI

**User Story**: As a user, I want to see how far I am through the current cycle so I know when the long break is coming.

**Why P2**: Valuable orientation, but the cycle works correctly without it; it can ship immediately after the core logic.

**Acceptance Criteria**:

1. WHEN a session is active THEN the system SHALL display a progress indicator showing completed work sessions out of the configured interval for the current cycle (e.g. "2 / 4" or equivalent dots).
2. WHEN a WORK session completes (naturally or via skip) THEN the progress indicator SHALL advance by one.
3. WHEN a LONG_BREAK completes THEN the progress indicator SHALL reset to zero.
4. WHEN the user changes the interval setting THEN the progress indicator SHALL reflect the new total.

**Independent Test**: Complete one work session and confirm the indicator reads 1 of N; complete the cycle and confirm it resets to 0.

---

## Edge Cases

- WHEN the user **skips** a WORK session (via skip/next) THEN the system SHALL advance the cycle progress just as if the session had completed (per decision: any work session counts).
- WHEN the user skips a BREAK or LONG_BREAK THEN the system SHALL move to the next session **without** advancing the work-session progress (only work sessions count).
- WHEN the user lowers the interval to a value at or below the current progress (e.g. progress is 3, interval set to 2) THEN the next break SHALL be a LONG_BREAK (decision uses "progress ≥ interval", not strict equality).
- WHEN the user clears/resets the current session THEN the cycle progress SHALL be preserved (reset affects only the active session, not cycle state).
- WHEN the app reloads mid-cycle THEN the persisted cycle progress SHALL be restored so the long break still arrives on schedule.
- WHEN the long-break length input is empty or below 1 THEN the system SHALL apply the same validation as the existing work/break length inputs.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| LBC-01 | P1: Long break after N | Design | Pending |
| LBC-02 | P1: Long break after N | Design | Pending |
| LBC-03 | P1: Long break after N | Design | Pending |
| LBC-04 | P1: Long break after N | Design | Pending |
| LBC-05 | P1: Long break after N | Design | Pending |
| LBC-06 | P1: Configure interval/length | Design | Pending |
| LBC-07 | P1: Configure interval/length | Design | Pending |
| LBC-08 | P1: Configure interval/length | Design | Pending |
| LBC-09 | P1: Configure interval/length | Design | Pending |
| LBC-10 | P2: Cycle progress UI | Design | Pending |
| LBC-11 | P2: Cycle progress UI | Design | Pending |
| LBC-12 | P2: Cycle progress UI | Design | Pending |
| LBC-13 | Edge: skip counts toward cycle | Design | Pending |
| LBC-14 | Edge: interval change mid-cycle | Design | Pending |
| LBC-15 | Edge: progress persists across reset/reload | Design | Pending |

**ID format:** `LBC-[NUMBER]`

**Status values:** Pending → In Design → In Tasks → Implementing → Verified

**Coverage:** 15 total, 15 mapped to tasks (T1–T8), 0 unmapped ✅ — see `tasks.md` traceability.

---

## Success Criteria

- [ ] With default settings, the 4th break in a session is a long break and the cycle restarts afterward.
- [ ] Long-break interval and length are configurable, validated, and persist across reloads.
- [ ] The UI shows current cycle progress and it advances on every completed/skipped work session, resetting after the long break.
- [ ] No regression to existing WORK ↔ BREAK behavior, pause/resume, skip, PIP, and the worker-driven countdown.
- [ ] New domain/cycle logic is covered by unit tests (extends current `date-utils`-only coverage).
