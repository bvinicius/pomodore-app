# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # type-check + test + build
npm run build-only   # vite build only
npm run test         # run tests (no watch)
npm run coverage     # test coverage
npm run lint         # eslint with auto-fix
npm run format       # prettier format src/
npm run type-check   # vue-tsc type checking
```

Run a single test file:
```bash
npx vitest run tests/date-utils/date-utils.test.ts
```

## Architecture

This is a Vue 3 + TypeScript Pomodoro timer SPA using Pinia for state and Tailwind for styling.

### Layer structure

```
src/
  domain/          # pure interfaces/types (no Vue dependencies)
  primary/         # Vue app — UI + stores + composables
  secondary/       # infrastructure implementations (worker)
```

### Timer mechanics

The countdown runs in a **Web Worker** (`src/secondary/counter-worker/counter-worker.ts`) to avoid throttling in background tabs. The worker posts `tick` messages every second.

The `PomoCounter` interface (`src/domain/PomoCounter.ts`) abstracts this: `PomoCounterInstance` (`src/secondary/counter-worker/`) wraps the worker and implements the interface. It is injected app-wide via Vue's provide/inject using a symbol from `dependency-symbols.ts` and wired in `dependency-injection.ts`.

The `usePomoRunner` composable (`src/primary/infrastructure/composables/pomoRunner.ts`) is the central orchestrator — it owns start/stop/pause/resume/skip logic, drives `pomoStore` state mutations on each tick, and triggers the alarm on session end.

### State

Two persisted Pinia stores (via `pinia-plugin-persistedstate`):
- `pomoStore` — session state (`timeLeft`, `isOver`, `started`, `paused`, `current`) + settings (work/break lengths) + current view (`session` | `settings`)
- `preferencesStore` — `alarmVolume`

### Picture-in-Picture

`usePictureInPicture` uses the Document Picture-in-Picture API to mount `PomoSessionPip.vue` into a floating window. When PIP opens, it re-uses the same DI context (calls `provide(app)` again) so the PIP component shares the same worker and stores. `usePomoMiniature` is a thin wrapper over `usePictureInPicture` that hard-codes the PIP component.

### Component hierarchy

- **atoms** — `PomoButton`, `PomoIcon`, `PomoInput`, `PomoArrowButton`
- **molecules** — `PomoCard`, `PomoCountdownSpinner`, `PomoPipCounter`, `PomoSessionCountdown`, `PomoSessionInput`, `DelayWrapper`
- **organisms** — `PomoSession` (full view), `PomoSessionCompact`, `PomoSessionPip` (PIP window), `PomoSettings`

### Path aliases

`@` maps to `src/`, `@tests` maps to `tests/` (configured in both `vite.config.ts` and `vitest.config.ts`).

### HTTPS in dev

`vite.config.ts` checks for `/Users/viniciusbazanella/tmp/server.crt` and enables HTTPS automatically if present (required for the Document PIP API in some browsers).

### Tests

Tests live in `tests/**/*.test.ts`. The test environment does not use jsdom by default — tests are plain Vitest unit tests. Current coverage is limited to `date-utils`.
