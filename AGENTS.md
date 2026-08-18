# AGENTS.md — AI Agent Governance Protocol and System Directives

> **PROTOCOL STATUS:** MANDATORY AND BINDING.
> This document governs architectural invariants, security policies, negative constraints, and quality gates for all AI coding agents operating on this codebase.
> Direct instructions from the user in the prompt take precedence, except when they violate security invariants, single-source-of-truth policies, or negative constraints established herein.

---

## 1. System Mission & Institutional Boundaries

<!-- CONTEXTUAL CONFIGURATION (To be customized per project) -->
> **[AI AGENT INSTRUCTION: ADAPT THIS SECTION TO THE CURRENT PROJECT]**
> Summarize the core mission, target audience, operational scale, and hard business/institutional boundaries of the application.

- **Strategic Mission:** [Define the overarching purpose and scope of this application].
- **Scale-First Architecture:** Every data, architectural, and interface decision must be evaluated against full target production scale, not against a single-user prototype.
- **System Boundaries:** [Define external systems, third-party integrations, and boundary limits].
- **Commit & PR Language Policy:** All commit messages, Pull Request titles, and PR descriptions MUST follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). [Specify language if required, e.g., English or Spanish].

---

## 2. Non-Negotiable Architectural Invariants (SSOT)

### 2.1 Single Source of Truth (SSOT) & Role Derivation
<!-- CONTEXTUAL CONFIGURATION -->
> **[AI AGENT INSTRUCTION: DEFINE THE CORE ACCESS POLICY & SSOT MODULE]**
> Define where access policies, authorization roles, and business rules live as the canonical SSOT.

- **SSOT Location:** Centralize all domain business rules, role derivations, and calculations in dedicated domain modules (e.g., `lib/access-policy.ts`, `core/domain/`).
- **No Hardcoded Accounts / Secrets:** Never hardcode personal email addresses, test accounts, master passwords, or API keys in source code or configuration files.
- **Deterministic Role Derivation:** Roles and permissions must be strictly derived from authenticated identity claims, verified database state, or signed security tokens.

### 2.2 Data Partitioning, Persistence & Query Boundaries
- **System of Record (SoR):** All relational or transactional entities must belong to a strictly defined primary database.
- **Strict Query Bounding:** All database queries must include explicit pagination limits (`.limit(N)`) and indexed sorting keys. Unbounded table scans (`SELECT * FROM table` without limits) are strictly prohibited.
- **Domain Calculations:** Pure mathematical and business domain calculations must live in isolated, side-effect-free pure functions with dedicated unit test suites.

---

## 3. Modular Context Rules (`.agents/rules/*.mdc`)

To optimize semantic density and prevent context drift, the following modular rules apply automatically across the workspace:

- `.agents/rules/000-core-invariants.mdc`: Strict static typing, bounded queries, zero placeholders.
- `.agents/rules/001-code-craft-and-style.mdc`: Code style, documentation preservation, dead code elimination.
- `.agents/rules/002-testing-and-triangulation.mdc`: TDD triangulation, test-locking integrity, zero test weakening.
- `.agents/rules/003-ui-ux-craftsmanship.mdc`: Anti-slop UI tokens, optical typography, spring physics, WCAG 2.2 AA.
- `.agents/rules/004-security-and-data-isolation.mdc`: Input validation schemas, boundary isolation, parameterized queries.
- `.agents/rules/005-api-and-contracts.mdc`: Route handlers, contract-first API design, structured JSON error envelopes.

---

## 4. Strict Negative Constraints ("Do NOTs")

1. **NO PLACEHOLDERS OR TRUNCATED CODE:** Generating code blocks containing `// TODO`, `/* rest of code */`, `// ...`, or partial diffs is strictly prohibited. Every emitted block must be fully functional, complete, and compilable.
2. **NO TEST WEAKENING (TEST-LOCKING):** Agents are strictly forbidden from weakening assertions, deleting tests, adding `.skip()`, or widening numeric/timing thresholds in existing test suites to force builds to pass.
3. **NO ANY OR TYPE BYPASS:** Prohibited use of `any`, `@ts-ignore`, `@ts-nocheck`, or unsafe type assertions (`as unknown as T`) without a deterministic runtime schema validator (e.g., Zod, Valibot, Pydantic).
4. **NO UNBOUNDED QUERIES:** All queries, collections scans, and bulk retrievals must implement explicit pagination limits and bounded cursors.
5. **NO DEPENDENCY DRIFT:** Do not install new external libraries without explicit necessity and alignment with the project stack. Always prefer standard library and existing dependencies.
6. **NO FRONTEND AI SLOP (HIGH-CRAFT DESIGN GOVERNANCE):**
   - **Color & Surfaces:** Prohibited use of pure `#000000`, `bg-black`, `bg-zinc-950` with generic neon accents (`violet-*`, `indigo-*`). Use warm neutrals and calibrated luminance surfaces (`bg-surface-base`, `bg-surface-raised`).
   - **Glows & Text Gradients:** Prohibited use of saturated box-shadow glows (`blur-3xl`), glowing borders, and continuous gradient text (`bg-clip-text text-transparent`). Elevate via micro-borders and layered micro-shadows.
   - **Badges & Emojis:** Prohibited use of pulsating pill badges (`animate-ping`) and decorative emojis (✨, 🚀, ⚡) as functional icons.
   - **Motion & Physics:** Prohibited use of arbitrary `transition: all` or `transition-all duration-300 ease-in-out`. Specify exact properties (`transform`, `opacity`) with critically damped spring physics (`stiffness: 340, damping: 28`) or micro-durations ($\le 150\text{ms}$). Keyboard interactions must be instantaneous ($0\text{ms}$).
   - **Accessibility (WCAG 2.2 AA):** Mandatory wrapping of animated UI components in `useReducedMotion()`. Prohibited modal entrance scaling from `scale(0)` (start from `scale(0.96)` or subtle $y$ translation).
   - **Data & Numerals:** Mandatory application of `font-variant-numeric: tabular-nums lining-nums` (`.num`) on all tables, financial amounts, counters, and timestamps.
   - **Iconography:** Mandatory use of a single cohesive icon library (e.g., Phosphor Icons, Lucide Icons). Do not hand-roll raw inline SVG icons unless creating a brand asset.

---

## 5. Gold Standard References (GSR)

<!-- CONTEXTUAL CONFIGURATION -->
> **[AI AGENT INSTRUCTION: POPULATE GSR AS THE PROJECT GROWS]**
> Register canonical reference files that demonstrate exemplary code quality, architecture, and testing patterns.

When implementing or refactoring entities, follow the architectural patterns of these canonical files:
- **Domain Logic:** Pure business functions with 100% test coverage.
- **Secure Mutation / API Handler:** Strict schema validation, session enforcement, atomic transaction.
- **UI Component:** Semantic tokens consumption, accessibility attributes, reduced motion compliance.

---

## 6. Fast-Verification Harness & Definition of Done (DoD)

### 6.1 Verification Pipeline
```bash
npm run verify:fast         # 1. Typecheck + Unit Tests + Test-Locking Integrity (<3.0s)
npm run verify:invariants   # 2. Security Invariants + Boundary Rules Validation
npm test                    # 3. Full Integration & Pre-flight Suite
```

### 6.2 Contractual Definition of Done (DoD)
A task is considered complete ONLY when:
1. Every requirement `REQ-XX` from the specification carries its code-level traceability marker `// Implements: REQ-XX`.
2. Type checking and linting terminate with exit code `0` (zero errors, zero warnings).
3. All unit and integration tests pass with zero test assertions modified or weakened in test suites.
4. Security invariants, schema boundaries, and single-source-of-truth rules remain fully intact.
5. Database queries and API endpoints implement strict limits and bounded pagination.
6. `PLAN.md` is updated with active status and structured handoff notes.
