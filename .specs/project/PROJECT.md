# Pomodore

**Vision:** A focus timer that becomes a place to work *inside* — not just a countdown, but a tracker of what you got done and (eventually) an environment of original, hand-produced ambient music.

## What it is today

A Vue 3 + TypeScript Pomodoro SPA. Worker-driven countdown (drift-corrected, background-tab safe), Document Picture-in-Picture floating timer, persisted work/break settings and alarm volume. Clean hexagonal layering (`domain` / `primary` / `secondary`) with provide/inject DI. See `CLAUDE.md` for architecture details.

## Goals

1. **Be a real Pomodoro** — add the missing long-break cycle so the app delivers on its name.
2. **Track focus, not just time** — capture session history and let users attach tasks, turning a timer into a focus tracker.
3. **Own the environment** — original, handmade long-form ambient soundscapes that map to a session (the flagship "big bet", still in exploration).

## Principles

- Keep the hexagonal split: new infrastructure (history persistence, audio) enters as `secondary/` adapters behind `domain` interfaces, mirroring `PomoCounter` / `PomoCounterInstance`.
- Personal-first. Opinionated and tight over broad and configurable.
- The timer's existing tick flow (`pomoRunner._onSessionEnd`) is the hook point for history.

## Non-goals

- AI / generative music. All audio is hand-produced by the author.
- Becoming a generic productivity suite.
