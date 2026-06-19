---
name: report-bug
description: Report a bug in this app. Interviews the user for reproduction details, runs a codebase root-cause analysis, then files a Linear ticket labeled "Bug". Use when the user says "report a bug", "found a bug", "file a bug", or describes broken behavior they want tracked.
---

# Report a Bug

Turn a rough bug report into a well-investigated Linear ticket. Run the four phases below
in order. Do **not** start fixing the bug — this skill ends after the ticket is filed.

```
┌───────────┐   ┌──────────────────┐   ┌──────────────┐   ┌───────────────┐
│ INTERVIEW │ → │ ROOT-CAUSE (code) │ → │ FILE TICKET  │ → │ REPORT & STOP │
└───────────┘   └──────────────────┘   └──────────────┘   └───────────────┘
```

## Phase 1 — Interview

Gather the minimum needed to reproduce or locate the bug. Ask in the user's own terms;
use `AskUserQuestion` for crisp multiple-choice points and plain questions for free text.
**Don't over-interrogate** — stop as soon as you have enough signal to investigate.

Cover, as needed:
- **Expected vs. actual** — what did you expect to happen, and what actually happened?
- **Reproduction** — exact steps, and how reliably it repeats (always / sometimes / once).
- **Where** — which view or component (session, settings, Picture-in-Picture), and whether
  it involves the timer/worker countdown, the alarm, or persisted state.
- **Environment** — browser, normal tab vs. background/PIP window, dev (`npm run dev`) vs.
  built (`npm run build`).
- **Console errors** — any errors or warnings in the devtools console.

If the user already gave most of this up front, skip straight to the gaps.

## Phase 2 — Root-cause analysis (read the code)

Investigate the actual source to find the likely cause. Use Grep/Glob/Read, and the
`Explore` agent for wider sweeps. Anchor on the architecture documented in `CLAUDE.md`:

- **Countdown runs in a Web Worker** — `src/secondary/counter-worker/`
  (`counter-worker.ts` posts `tick` messages; `PomoCounterInstance` wraps it).
- **Central orchestrator** — `usePomoRunner`
  (`src/primary/infrastructure/composables/pomoRunner.ts`): start/stop/pause/resume/skip,
  per-tick state mutations, and alarm trigger on session end.
- **State** — Pinia stores `pomoStore` (session + settings + view) and `preferencesStore`
  (`alarmVolume`), both persisted via `pinia-plugin-persistedstate`.
- **Picture-in-Picture** — `usePictureInPicture` / `usePomoMiniature` mount
  `PomoSessionPip.vue`; PIP re-uses the same DI context, worker, and stores.
- **DI wiring** — `dependency-symbols.ts` / `dependency-injection.ts`.

Produce a **concrete hypothesis** with specific `file:line` references and a short
explanation of why that code causes the observed symptom. If the cause is genuinely
unclear, say so and list the top 2–3 suspects rather than guessing.

## Phase 3 — File the Linear ticket

1. **Verify the label first.** Call `mcp__claude_ai_Linear__list_issue_labels` (name
   filter `bug`) to get the existing **Bug** label (capital "B"). Reuse it — never create a
   new lowercase duplicate.
2. **Confirm the team** with `mcp__claude_ai_Linear__list_teams` if the workspace may have
   changed; otherwise the team is **Vini**.
3. **Create the issue** with `mcp__claude_ai_Linear__save_issue`:
   - `team`: `Vini`
   - `title`: concise one-line summary of the bug
   - `labels`: include the **Bug** label
   - `description`: markdown with these sections —
     - **Summary**
     - **Steps to reproduce**
     - **Expected**
     - **Actual**
     - **Environment**
     - **Root-cause analysis** — the hypothesis with `file:line` references
     - **Suggested fix** — only if known

   Use **real newlines** in the description, not literal `\n`.

## Phase 4 — Report and stop

Print the created ticket's identifier and URL. Do not begin implementing a fix — that's a
separate, deliberate action the user can take next.
