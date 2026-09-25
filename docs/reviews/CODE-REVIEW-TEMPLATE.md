# Multi-Perspective Automated Code Review Template

> **STATUS:** STANDARD REVIEW HARNESS
> Use this checklist when performing automated or peer code reviews against pull requests and feature implementations.

---

## 1. Traceability & Scope Compliance

- [ ] Every modified or added functionality traces back to an explicit requirement (`// Implements: REQ-XX`).
- [ ] No unrequested features, speculative abstractions, or out-of-scope refactorings introduced.
- [ ] `PLAN.md` was kept updated throughout execution.

---

## 2. Invariant & Security Verification

- [ ] **No `any` or bypasses:** All types are strictly declared and external inputs parsed via runtime schemas.
- [ ] **No Unbounded Queries:** Every database fetch or collection scan has an explicit `.limit(N)` parameter.
- [ ] **Zero Hardcoded Secrets:** No personal identifiers, API keys, or development bypasses in code.
- [ ] **Single Source of Truth (SSOT):** Business rules and role checks reside exclusively in designated domain modules.

---

## 3. Testing & Integrity (Test-Locking)

- [ ] **Zero Weakened Tests:** Existing assertions in `tests/` were NOT removed, bypassed, or widened.
- [ ] **TDD Coverage:** Unit tests exist for both happy paths and boundary/error edge cases.
- [ ] Fast verification harness (`npm run verify:fast`) executed with 0 errors.

---

## 4. Frontend & Design Governance (Anti-Slop)

- [ ] **Surfaces & Colors:** Uses design tokens (`var(--surface-*)`) rather than raw flat `#000000` or neon accents.
- [ ] **Motion & Transitions:** Specific transitions used (`transform`, `opacity`) with spring physics; no generic `transition: all`.
- [ ] **Accessibility (WCAG 2.2 AA):** All interactive elements have accessible names, keyboard focus rings, and reduced motion fallbacks.
- [ ] **Tabular Numerals:** All numeric data, tables, and timestamps utilize `.tabular-nums` / `.num`.
