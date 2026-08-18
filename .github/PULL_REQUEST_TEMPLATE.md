# Pull Request — Definition of Done (DoD) Verification

## 1. Traceability & Requirements
<!-- List all requirements from docs/specs/ fulfilled by this PR -->
- [ ] Requirements traceability markers added: `// Implements: REQ-XX`
- [ ] Associated Specification: `docs/specs/SPEC-XXX.md`
- [ ] Associated Design Doc: `docs/design/DESIGN-DOC-XXX.md`

## 2. Invariants & Negative Constraints
- [ ] **No Placeholders:** Zero `// TODO`, `/* rest of code */`, or truncated snippets.
- [ ] **Test-Locking Invariant:** Zero test assertions deleted, weakened, or skipped in `tests/`.
- [ ] **Type Safety:** No unvalidated `any`, `@ts-ignore`, or unchecked casts.
- [ ] **Bounded Queries:** All database/data queries include explicit `.limit(N)` bounds.
- [ ] **Single Source of Truth (SSOT):** Business rules reside in canonical domain modules.

## 3. High-Craft Visual Governance (If UI changes included)
- [ ] Uses OKLCH surface and border tokens (`DESIGN.md`).
- [ ] No flat `#000000` + neon glows or continuous gradient text.
- [ ] Includes `prefers-reduced-motion` fallbacks for all animations.
- [ ] Numeric data, dates, and tables use `font-variant-numeric: tabular-nums`.

## 4. Verification
- [ ] `npm run verify:fast` passes locally (exit code 0).
- [ ] `PLAN.md` updated with task status and handoff ledger.
