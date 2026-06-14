# Long-Break Cycle Tasks

**Design**: `.specs/features/long-break-cycle/design.md`
**Spec**: `.specs/features/long-break-cycle/spec.md`
**Status**: Draft

**Test policy** (user decision, 2026-06-14): *Logic + component tests.*
- Pure logic (`domain/cycle.ts`) and store logic (`pomoStore`) → **unit** tests, plain-node vitest.
- Leaf Vue components (`PomoCycleProgress`, `PomoSettings`) → **component** tests via `@vue/test-utils`, opting into jsdom with a per-file `// @vitest-environment jsdom` docblock (no global vitest config change).
- Orchestration that injects the worker (`pomoRunner`) and page/view wiring (`HomePage`, `PomoSession`) → **none** (the logic they call is unit-tested upstream; they are template/delegation wiring and inject `POMO_COUNTER`, making isolated tests impractical). Verified by type-check/build + manual run.

**Tooling**: No project MCPs or Skills apply. Standard file edits + vitest. Gate commands:
- **quick**: `npx vitest run <specific test file>`
- **full**: `npm run test`
- **build**: `npm run build` (vue-tsc type-check + tests + vite build); `npm run type-check` for a faster type-only gate.

---

## Execution Plan

### Phase 1: Foundation (Sequential)

```
T1 → T2 → T3
```

### Phase 2: Core (Parallel)

```
        ┌→ T4 [P]   (pomoRunner.ts)
T3 ─────┤
        ├→ T5 [P]   (PomoSettings.vue)   ← depends only on T1
        └→ T7 [P]   (PomoCycleProgress.vue) ← independent
```

### Phase 3: Wiring (Parallel)

```
T3,T5 → T6 [P]   (HomePage.vue)
T3,T7 → T8 [P]   (PomoSession.vue)
```

---

## Task Breakdown

### T1: Extend domain types for LONG_BREAK + long-break settings

**What**: Add `LONG_BREAK = 'Long break'` to `PomoSessionType` and `longBreakSessionLength` + `longBreakInterval` to `PomoSettings`.
**Where**: `src/domain/Pomodore.ts`
**Depends on**: None
**Reuses**: existing enum/interface
**Requirement**: LBC-04, LBC-06

**Done when**:
- [ ] `PomoSessionType.LONG_BREAK` exists with value `'Long break'`
- [ ] `PomoSettings` has `longBreakSessionLength: number` and `longBreakInterval: number`
- [ ] Gate check passes: `npm run type-check`

**Tests**: none (type-only declaration)
**Gate**: build (type-check)
**Commit**: `feat(domain): add LONG_BREAK type and long-break settings`

---

### T2: Pure cycle-transition function + unit tests

**What**: Implement `nextSessionType(current, cycleProgress, longBreakInterval)` returning `{ next, cycleProgress }` per the design rule, with full unit coverage.
**Where**: `src/domain/cycle.ts` (new), `tests/cycle/cycle.test.ts` (new)
**Depends on**: T1
**Reuses**: `PomoSessionType` (T1)
**Requirement**: LBC-01, LBC-02, LBC-03, LBC-09 (guard), LBC-13, LBC-14

**Done when**:
- [ ] WORK below interval → `{ next: BREAK, cycleProgress: progress+1 }`
- [ ] WORK reaching interval → `{ next: LONG_BREAK, cycleProgress: progress+1 }`
- [ ] LONG_BREAK → `{ next: WORK, cycleProgress: 0 }`
- [ ] BREAK → `{ next: WORK, cycleProgress unchanged }`
- [ ] `progress >= interval` triggers long break when interval lowered mid-cycle (LBC-14)
- [ ] `interval < 1` is guarded via `max(1, interval)` (LBC-09)
- [ ] Gate check passes: `npx vitest run tests/cycle/cycle.test.ts`
- [ ] Test count: ≥7 tests pass (one per branch/edge above)

**Verify**: `npx vitest run tests/cycle/cycle.test.ts` → all green.
**Tests**: unit
**Gate**: quick
**Commit**: `feat(domain): add nextSessionType cycle rule with tests`

---

### T3: Store cycle support (state, defaults, getters, advanceSession) + unit tests

**What**: Add `cycleProgress` state + `config` defaults (`longBreakSessionLength: 15`, `longBreakInterval: 4`); extend `currentSessionLength` to three-way; repoint the (currently unused) `nextSession` getter to `nextSessionType(...).next`; add `advanceSession()` action delegating to `nextSessionType`.
**Where**: `src/primary/infrastructure/store/pomoStore.ts`, `tests/store/pomoStore.test.ts` (new)
**Depends on**: T1, T2
**Reuses**: `nextSessionType` (T2), existing store shape, `persist: true`
**Requirement**: LBC-01, LBC-02, LBC-03, LBC-04, LBC-07, LBC-14, LBC-15 (state)

**Done when**:
- [ ] `cycleProgress: 0` in state; `config` has both new defaults
- [ ] `currentSessionLength` returns long-break length when `current === LONG_BREAK`
- [ ] `advanceSession()` mutates `session.current` and `cycleProgress` to match `nextSessionType`
- [ ] `nextSession` getter returns `nextSessionType(...).next` (non-mutating)
- [ ] Unit tests use `setActivePinia(createPinia())` in plain node (no jsdom needed)
- [ ] Gate check passes: `npx vitest run tests/store/pomoStore.test.ts`
- [ ] Test count: ≥5 tests pass (length getter ×3 branches, advanceSession transition, cycle reset)

**Verify**: `npx vitest run tests/store/pomoStore.test.ts` → all green.
**Tests**: unit
**Gate**: quick
**Commit**: `feat(store): add cycle progress, long-break getters and advanceSession`

---

### T4: Route pomoRunner transition through advanceSession + long-break title [P]

**What**: Replace the WORK/BREAK ternary in `_skipSession` with `pomoStore.advanceSession()`; extend `_updateMetaTitle` with a session-type→label map so `LONG_BREAK` shows "Long break session".
**Where**: `src/primary/infrastructure/composables/pomoRunner.ts`
**Depends on**: T3
**Reuses**: `advanceSession` (T3), existing `_skipSession`/`_startSessionCountdown` flow, unchanged `_onSessionEnd` alarm (LBC-05)
**Requirement**: LBC-01, LBC-02, LBC-03, LBC-05, LBC-13

**Done when**:
- [ ] `_skipSession` calls `pomoStore.advanceSession()` instead of toggling `current` manually, then rebuilds the session from `currentSessionLength`
- [ ] Skip and natural-end both advance the cycle (both route through `_skipSession`) — LBC-13
- [ ] `_updateMetaTitle` renders "Long break session" for `LONG_BREAK`
- [ ] No change to alarm behavior (`_onSessionEnd` untouched)
- [ ] Gate check passes: `npm run type-check`

**Verify**: manual — start session, skip work N times, confirm Nth break is a long break; tab title reads "Long break session".
**Tests**: none (delegates to T3's unit-tested `advanceSession`; composable injects `POMO_COUNTER` worker — isolated test impractical, no new logic introduced)
**Gate**: build (type-check)
**Commit**: `feat(runner): drive session transitions via cycle-aware advanceSession`

---

### T5: Add long-break inputs to PomoSettings + component test [P]

**What**: Add two `PomoSessionInput`s — "Long break" (`hint="min"`, `:min="0"`) and "Long break after" (`hint="pomos"`, `:min="1"`) — with `longBreakSessionLength` / `longBreakInterval` props and `update:` emits, mirroring the work/break pair.
**Where**: `src/primary/components/organisms/PomoSettings.vue`, `tests/components/PomoSettings.test.ts` (new, `// @vitest-environment jsdom`)
**Depends on**: T1
**Reuses**: `PomoSessionInput` (as-is), existing work/break `computed` v-model pattern
**Requirement**: LBC-06, LBC-09

**Done when**:
- [ ] Four inputs render (work, break, long-break length, long-break interval)
- [ ] Interval input passes `:min="1"`; long-break length passes `:min="0"`
- [ ] Updating each new input emits the matching `update:` event with the number
- [ ] Component test mounts via `@vue/test-utils` and asserts inputs render + emit
- [ ] Gate check passes: `npm run test`
- [ ] Test count: ≥2 component tests pass

**Verify**: `npm run test` → component test green.
**Tests**: component
**Gate**: full
**Commit**: `feat(settings): add long-break length and interval inputs`

---

### T6: Wire long-break settings + cycle reset in HomePage [P]

**What**: Extend HomePage's `settings` reactive (seed from `pomoStore` getters) with the two new fields, add the two `v-model:` bindings to `<PomoSettings>`, and reset `cycleProgress = 0` inside `onButtonClick` (fresh start → fresh cycle).
**Where**: `src/primary/pages/HomePage.vue`
**Depends on**: T3, T5
**Reuses**: existing `settings` reactive + `updateSettings` flow
**Requirement**: LBC-07, LBC-08, plus the "Start/Apply resets cycle" design decision

**Done when**:
- [ ] `settings` reactive includes `longBreakSessionLength` and `longBreakInterval`, seeded from store
- [ ] `<PomoSettings>` receives `v-model:long-break-session-length` and `v-model:long-break-interval`
- [ ] `onButtonClick` sets `pomoStore.cycleProgress = 0` alongside the existing `current = WORK` reset
- [ ] Persisted across reload (rides existing `persist: true`) — LBC-08/LBC-15
- [ ] Gate check passes: `npm run build`

**Verify**: manual — change interval/length, reload, confirm persisted; press Start and confirm progress resets to 0.
**Tests**: none (template wiring; HomePage injects the worker via `usePomoRunner` — isolated mount impractical; logic lives in T3/T5)
**Gate**: build
**Commit**: `feat(settings): persist long-break settings and reset cycle on start`

---

### T7: Create PomoCycleProgress molecule + component test [P]

**What**: New presentational molecule showing cycle progress — `total` markers with `progress` filled (and a `progress / total` readout).
**Where**: `src/primary/components/molecules/PomoCycleProgress.vue` (new), `tests/components/PomoCycleProgress.test.ts` (new, `// @vitest-environment jsdom`)
**Depends on**: None
**Reuses**: Tailwind + existing molecule styling conventions
**Requirement**: LBC-10, LBC-11, LBC-12

**Done when**:
- [ ] Props `progress: number`, `total: number`; renders `total` markers with `progress` filled
- [ ] Reacts to prop changes (advance + reset reflected) — LBC-11/LBC-12
- [ ] Component test asserts marker count = `total` and filled count = `progress` across a couple of prop sets
- [ ] Gate check passes: `npm run test`
- [ ] Test count: ≥2 component tests pass

**Verify**: `npm run test` → component test green.
**Tests**: component
**Gate**: full
**Commit**: `feat(ui): add PomoCycleProgress indicator`

---

### T8: Render cycle progress in PomoSession [P]

**What**: Mount `PomoCycleProgress` in the full session view, passing `pomoStore.cycleProgress` and `pomoStore.settings.longBreakInterval`.
**Where**: `src/primary/components/organisms/PomoSession.vue`
**Depends on**: T3, T7
**Reuses**: `PomoCycleProgress` (T7), `pomoStore`
**Requirement**: LBC-10

**Done when**:
- [ ] `PomoCycleProgress` rendered in `PomoSession.vue` with `:progress` and `:total` bound to the store
- [ ] Indicator shows in the full view (compact/PIP intentionally out of scope per design)
- [ ] Gate check passes: `npm run build`

**Verify**: manual — run a session, confirm the indicator shows current progress and updates each completed/skipped work session, resetting after the long break.
**Tests**: none (template wiring; `PomoSession` injects the worker — isolated mount impractical; component covered in T7)
**Gate**: build
**Commit**: `feat(ui): show cycle progress in the session view`

---

## Parallel Execution Map

```
Phase 1 (Sequential):
  T1 ──→ T2 ──→ T3

Phase 2 (Parallel):
  T3 done → T4 [P]   (pomoRunner.ts)
  T1 done → T5 [P]   (PomoSettings.vue)
  (none)  → T7 [P]   (PomoCycleProgress.vue)

Phase 3 (Parallel):
  T3,T5 done → T6 [P]   (HomePage.vue)
  T3,T7 done → T8 [P]   (PomoSession.vue)
```

Different files, no shared mutable state, component tests isolated per file → `[P]` safe in each phase.

---

## Pre-Approval Validation

### Check 1 — Task Granularity

| Task | Scope | Status |
| ---- | ----- | ------ |
| T1: domain types | 1 file, enum + interface | ✅ Granular |
| T2: cycle fn + tests | 1 function + its test | ✅ Granular |
| T3: store support | 1 file (pomoStore), cohesive cycle additions | ✅ OK (cohesive, same file) |
| T4: runner transition | 1 file, delegate + label | ✅ Granular |
| T5: settings inputs | 1 component + test | ✅ Granular |
| T6: HomePage wiring | 1 file | ✅ Granular |
| T7: progress component | 1 component + test | ✅ Granular |
| T8: session view wiring | 1 file | ✅ Granular |

### Check 2 — Diagram ↔ Definition Cross-Check

| Task | Depends On (body) | Diagram Shows | Status |
| ---- | ----------------- | ------------- | ------ |
| T1 | None | (root) | ✅ Match |
| T2 | T1 | T1→T2 | ✅ Match |
| T3 | T1, T2 | T2→T3 (T1 via T2) | ✅ Match |
| T4 | T3 | T3→T4 | ✅ Match |
| T5 | T1 | T1→T5 | ✅ Match |
| T6 | T3, T5 | T3→T6, T5→T6 | ✅ Match |
| T7 | None | independent | ✅ Match |
| T8 | T3, T7 | T3→T8, T7→T8 | ✅ Match |

No `[P]` task depends on another task in the same phase. ✅

### Check 3 — Test Co-location Validation

| Task | Code Layer | Policy Requires | Task Says | Status |
| ---- | ---------- | --------------- | --------- | ------ |
| T1 | domain types (no behavior) | none | none | ✅ OK |
| T2 | pure domain logic | unit | unit | ✅ OK |
| T3 | store logic | unit | unit | ✅ OK |
| T4 | composable/orchestration (worker DI, no new logic) | none | none | ✅ OK |
| T5 | leaf Vue component | component | component | ✅ OK |
| T6 | page wiring (worker DI) | none | none | ✅ OK |
| T7 | leaf Vue component | component | component | ✅ OK |
| T8 | view wiring (worker DI) | none | none | ✅ OK |

`Tests: none` entries are template/orchestration wiring whose logic is unit-tested upstream (T2/T3) or covered as a leaf component (T7) — not deferred logic. ✅

---

## Requirement Traceability

| Req | Task(s) |
| --- | ------- |
| LBC-01 | T2, T3, T4 |
| LBC-02 | T2, T3, T4 |
| LBC-03 | T2, T3, T4 |
| LBC-04 | T1, T3 |
| LBC-05 | T4 (no-change verification) |
| LBC-06 | T1, T5 |
| LBC-07 | T3, T6 |
| LBC-08 | T6 |
| LBC-09 | T2 (guard), T5 (input min) |
| LBC-10 | T7, T8 |
| LBC-11 | T7 |
| LBC-12 | T7 |
| LBC-13 | T2, T4 |
| LBC-14 | T2, T3 |
| LBC-15 | T3, T6 |

**Coverage**: 15/15 requirements mapped to tasks. ✅
