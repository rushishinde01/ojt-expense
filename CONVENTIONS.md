# Team Conventions

This document defines the standards followed across all OJT capstone
repositories. Every team member is expected to read and follow these
conventions before making their first commit.

---

## Branch Naming

Format: `type/short-description`

| Type | When to use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `style` | CSS or layout changes only |
| `chore` | Setup, config, documentation |
| `refactor` | Restructuring code without adding features |

Examples:
```
feat/quiz-state-logic
feat/expense-crud-operations
fix/github-rate-limit-handler
style/portfolio-dark-mode
chore/add-storage-helpers
refactor/extract-render-module
```

Rules:
- All lowercase, no spaces — use hyphens only
- Be specific enough that the branch name explains the work
- One feature or fix per branch — never bundle unrelated changes

---

## Commit Messages

Format: `type: short description in sentence case`

Examples:
```
feat: add running score tracker to quiz state
fix: prevent duplicate expense entries on rapid click
style: implement dark mode toggle via localStorage
chore: add JSON serialization helpers to storage.js
refactor: extract DOM rendering out of main.js into render.js
feat: handle GitHub API 403 rate limit with user-friendly message
```

Rules:
- Present tense — "add" not "added"
- No capital letter after the colon
- No period at the end
- Under 72 characters on the first line
- Commit small and often — one logical change per commit
- Never commit directly to `main`

---

## Pull Requests

Every change to `main` must go through a pull request. No exceptions,
including the team lead.

When opening a PR:
- Use the PR template — it auto-fills when you open a new PR
- Write a clear description of what the PR does and why
- Link to any related issue or task on the Kanban board
- Test your own changes before requesting review

When reviewing a PR:
- Review within 24 hours of being assigned
- Leave specific, constructive comments — not just "looks good"
- Approve only when you have actually read the code
- Request changes if anything is unclear, broken, or inconsistent
  with these conventions
- Resolve all conversations before merging

Merge rules:
- At least 1 approving review required before merging
- The PR author merges after approval — not the reviewer
- Use "Squash and merge" for small focused PRs
- Use "Merge commit" for larger feature PRs
- Delete the branch after merging

---

## JavaScript Module Structure

Every project follows this module pattern:

| File | Responsibility |
|---|---|
| `main.js` | Entry point — imports all modules, binds events |
| `state.js` | Single source of truth — all app state lives here |
| `render.js` | DOM updates only — reads state, writes to DOM |
| `api.js` | All fetch and async calls — used in News and GitHub Explorer |
| `storage.js` | localStorage helpers — used in Expense, Kanban, Portfolio |
| `dragdrop.js` | Drag and Drop API handlers — Kanban only |

Rules:
- No module should import from `main.js`
- `render.js` never fetches data
- `api.js` never touches the DOM
- `state.js` never imports from other modules
- All state changes go through `setState()` in `state.js`

---

## Code Style

- Use `const` by default, `let` only when reassignment is needed,
  never `var`
- Use `async/await` over raw `.then()` chains
- Always wrap `fetch` calls in `try/catch`
- Use template literals over string concatenation
- Use arrow functions for callbacks
- Name functions clearly — `renderQuestionCard()` not `render1()`
- No commented-out code in PRs — delete it or keep it, not both

---

## Responsiveness

Every project must work at these three breakpoints:

| Breakpoint | Width |
|---|---|
| Mobile | 320px |
| Tablet | 768px |
| Desktop | 1280px |

Test all three before opening a PR. Use browser DevTools device
emulation — do not guess.

---

## General Rules

- No one works exclusively on HTML/CSS — every member must own
  and be able to explain JavaScript logic
- Push your branch at the end of every working session even if
  the feature is incomplete — this is your backup
- If you are blocked for more than 2 hours, raise it in the team
  group chat immediately — do not silently fall behind
- The team lead reviews and merges PRs to `ojt-portfolio` only —
  all other repos are reviewed by any other team member
