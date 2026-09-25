# AGENTS.md: AI Agent Governance Protocol and System Directives

> **PROTOCOL STATUS:** MANDATORY AND BINDING.
> You MUST read this entire file and adhere to all instructions below. When working on Next.js routes or React components, also read `@docs/nextjs/nextjs.instructions.md`.
> This document governs architectural invariants, security policies, negative constraints, and quality gates for all AI coding agents (Antigravity, Claude Code, Codex, Cursor) operating on this repository.
> Direct instructions from the user in the prompt take precedence, except when they violate security invariants, single-source-of-truth policies, or test-locking boundaries established herein.

---

## 1. System Mission & Project Boundaries

<!-- CONTEXTUAL CONFIGURATION: Adapt these bullets when initializing a new project -->

- **Strategic Mission:** [Define the core product mission, target users, and production SLA]. Consult `docs/CLIENT_REQUIREMENTS.md` and `openspec/specs/` for commercial and functional scope.
- **Scale-First Architecture:** Every data schema, query, API contract, and UI decision must be evaluated against full target production scale, not against a single-user prototype.
- **Polyglot & Web-First Readiness:** This harness defaults to **Next.js 16 + React 19 + TypeScript + Drizzle/SQL** for web applications while natively supporting **Python 3.12+ (`pytest`, `ruff`, `mypy`, FastAPI/Pydantic)**, **Go**, **Rust**, and **Mobile (Capacitor / Android)** workloads through unified verification gates.
- **Strict Language Policy for Commits & PRs:** All commit messages, Pull Request titles, and PR descriptions MUST BE WRITTEN STRICTLY IN SPANISH following Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
- **AI Documentation Language Policy:** All internal agent documentation, architectural notes, specifications, instructions, plans, and guidance files (`AGENTS.md`, `PLAN.md`, `GATES.md`, `openspec/**`, `docs/**/*.md`, `.agents/**`) MUST BE WRITTEN EXCLUSIVELY IN ENGLISH.
- **Safe Autonomous Execution & Persistence (Model Autonomy):** The local verification environment operates with isolated/disposable fixtures and has no production access. Agents are granted explicit authorization to execute read tools, local compilers, linters, formatters, and test suites iteratively. Agents must NOT stop prematurely for micro-step confirmations: investigate failures, refactor the code, and rerun the affected tests autonomously until passing cleanly.
- **Living Governance & Co-Evolution:** `AGENTS.md` is a living system directive. Whenever an architectural invariant, security policy, canonical infrastructure identifier, or structural landmark is modified, added, or retired, agents and contributors MUST synchronize and update `AGENTS.md` in the exact same commit or pull request. Do NOT modify this document for routine feature work or localized component fixes.

---

## 2. Non-Negotiable Architectural Invariants (SSOT)

### 2.1 Role Policy, Authentication & Single Source of Truth

- **Single Source of Truth (SSOT):** Centralize all access policies, role derivations, and core domain arithmetic in dedicated pure modules (e.g., `lib/access-policy.ts`, `lib/domain/`, or `app/core/security.py`). Reimplementing regex parsing, permission checks, or domain formulas inside UI views or route handlers is strictly prohibited.
- **No Hardcoded Personal Accounts or Secrets (REQ-SEC-01):** Superuser/Owner ranks and permissions must NEVER be derived from hardcoded email addresses in source code or security rules. They must be stored in the System of Record database and projected deterministically.

### 2.2 Data Partitioning, Persistence & Query Boundaries

- **System of Record (SoR):** All relational and transactional state must live in the primary database with ACID transactions (`db.transaction(...)` or unit-of-work context managers).
- **Strict Query Bounding:** Every database query or collection read MUST include an explicit `.limit(N)` clause and indexed pagination cursor. Unbounded table or collection scans are strictly prohibited.
- **Pure Domain Logic:** Mathematical, financial, grading, or scheduling calculations must reside in isolated, side-effect-free pure modules with 100% unit test coverage.

### 2.3 Architectural Landmarks & Source Locations

- **Living Domain Specifications (OpenSpec SSOT):** `openspec/specs/` and active proposals in `openspec/changes/`.
- **Domain Logic & Access Policy SSOT:** `lib/` (TypeScript/Next.js) or `src/` / `backend/` (Python/polyglot services).
- **Primary Views vs Shared UI:** Feature dashboards reside in `app/views/`, while reusable primitives reside in `components/`.
- **Server API & Route Handlers:** Secure endpoints live in `app/api/` (or `backend/api/`) with strict runtime schema validation (Zod / Pydantic).
- **On-Demand Agent QA Harness:** `qa/catalog.ts`, `qa/state-catalog.ts`, and `scripts/qa.mjs`.

---

## 3. Canonical Infrastructure Identifiers

<!-- Populate when provisioning project environments -->

| Resource                      | Identifier / Value                                   |
| :---------------------------- | :--------------------------------------------------- |
| **Project / Service ID**      | `[PROJECT_ID]`                                       |
| **Primary Hosting / Runtime** | `[Cloudflare Workers / Vercel / Docker / Cloud Run]` |
| **Primary Database (SoR)**    | `[Turso libSQL / PostgreSQL / SQLite]`               |
| **Realtime / Object Storage** | `[Firebase / Cloudflare R2 / S3]`                    |
| **Canonical Repository**      | `[https://github.com/ORG/REPO.git]` (branch `main`)  |

---

## 4. Contextual Routing & Modular Rules (`.agents/rules/*.mdc`)

To preserve context budget and prevent token compaction, avoid reading architectural files or rule sets unconditionally. Consult supporting documents and modular rules strictly when touching their respective domains:

- `.agents/rules/000-core-invariants.mdc`: Core static typing, bounded queries, and zero-placeholder laws.
- `.agents/rules/001-code-craft-and-style.mdc`: Code hygiene, requirement traceability markers, and modern language idioms.
- `.agents/rules/002-testing-and-triangulation.mdc`: TDD Red-Green-Refactor triangulation and SHA-256 test-locking integrity.
- `.agents/rules/003-ui-ux-craftsmanship.mdc`: Consult ONLY when creating or refactoring UI components or motion (`components/**`, `app/**`, `DESIGN.md`).
- `.agents/rules/004-security-and-data-isolation.mdc`: Consult ONLY when modifying auth flows, tenant isolation, or security rules.
- `.agents/rules/005-api-and-contracts.mdc`: Consult ONLY when authoring API route handlers or webhooks (`app/api/**`, `backend/**`).
- `.agents/rules/006-admin-cms-pattern.mdc`: Consult ONLY when building administrative dashboards or self-managed CMS views.
- `.agents/rules/007-browser-qa-verification.mdc`: Consult whenever modifying user-facing behavior, API contracts, or running `pnpm qa`.
- `.agents/rules/008-database-and-persistence.mdc`: Consult ONLY when modifying database schemas, migrations, or ORM queries (`db/**`, `drizzle/**`, `migrations/**`).
- **No Unconditional Reading:** Do NOT read full architectural specs, schema files, or database maps for atomic changes (e.g. typos, copy updates, localized CSS tweaks, isolated bugfixes).

---

## 5. Skills Architecture & Progressive Disclosure

When authoring, refining, or consuming skills (`.agents/skills/`), enforce the following architectural patterns:

1. **Narrow & Explicit Triggers:** Descriptions in skill YAML frontmatter must be concise and specify explicit activation boundaries (both when to use AND when NOT to use).
2. **Progressive Disclosure:** Root `SKILL.md` documents must serve as lightweight routers/dispatchers pointing to specialized references (`references/*.md`) or executable scripts.
3. **Outcome-Driven Guidance over Procedural Recipes:** Rely on model reasoning and clear input/output contracts rather than rigid procedural checklists.

---

## 6. Strict Negative Constraints ("Do NOTs")

1. **NO PLACEHOLDERS OR TRUNCATED CODE:** Generating code blocks with `// TODO`, `# TODO`, `/* rest of code */`, or partial diffs is strictly prohibited. Every emitted block must be fully functional and compilable.
2. **NO TEST WEAKENING (TEST-LOCKING):** Agents are strictly forbidden from weakening assertions, deleting tests, adding `.skip()` / `@pytest.mark.skip`, or widening thresholds in `tests/` to force builds to pass.
3. **NO ANY OR TYPE BYPASS:** Prohibited use of `any`, `@ts-ignore`, `# type: ignore`, or unsafe type assertions (`as unknown as T`) without a deterministic validation parser (Zod / Pydantic).
4. **NO UNBOUNDED QUERIES:** All database queries must include explicit `.limit()` clauses and indexed pagination cursors.
5. **NO DEPENDENCY DRIFT:** Use `pnpm` exclusively for Node/Web workspaces (and `uv` / `pip` with locked requirements for Python). Installing new packages without explicit justification is forbidden.
6. **NO FRONTEND AI SLOP (HIGH-CRAFT DESIGN GOVERNANCE):**
   - **Color & Surfaces:** Prohibited use of `#000000`, `bg-black`, `bg-zinc-950` with generic neon accents (`violet-*`, `indigo-*`). Use OKLCH surface tokens (`bg-surface-base`, `bg-surface-raised`) with warm neutrals and calibrated luminance.
   - **Glows & Text Gradients:** Prohibited use of saturated box-shadow glows (`blur-3xl`), glowing borders, and continuous gradient text (`bg-clip-text text-transparent`). Elevate via surface luminance tokens and layered micro-shadows without decorative borders.
   - **Badges & Emojis:** Prohibited use of pulsating pill badges with `animate-ping` and decorative emojis (✨, 🚀, ⚡) as icons.
   - **Motion & Physics:** Prohibited use of `transition: all` or `transition-all duration-300 ease-in-out`. Specify exact properties (`transform`, `opacity`) with critically damped spring physics (`stiffness: 340, damping: 28`) or micro-times (`<= 150ms`). Keyboard actions must be instantaneous (`0ms`).
   - **Accessibility (WCAG 2.2):** Mandatory wrapping of animated React components in `useReducedMotion()`. Prohibited modal entrance scaling from `scale(0)` (start from `scale(0.96)` or subtle y-axis translation).
   - **Data & Numerals:** Mandatory application of `font-variant-numeric: tabular-nums lining-nums` (`.num`) on all tables, grades, financial figures, counters, and dates.
   - **Iconography:** Mandatory exclusive use of a single cohesive icon package (`@phosphor-icons/react` by default). Do not hand-roll raw inline SVG icons.
7. **NO UNFORMATTED COMMITS (CODE FORMATTING GOVERNANCE):** Agents are strictly forbidden from committing or pushing unformatted code. Running `pnpm run format` is mandatory prior to staging/committing, and `pnpm run format:check` must terminate with exit code `0` before any push or pull request.

---

## 7. Gold Standard References (GSR)

Register canonical files as the project grows so agents clone verified patterns:

- **Server Action / Secure Mutation:** Zod/Pydantic schema validation, server-side session auth, transactional mutation.
- **Pure Domain Logic:** Side-effect-free calculations with exhaustive boundary tests in `tests/`.
- **High-Craft UI View:** Semantic OKLCH token consumption from `DESIGN.md`, dynamic code-splitting, and WCAG 2.2 AA compliance.

---

## 8. Fast-Verification Harness & Definition of Done (DoD)

### 8.1 Local Verification Pipeline

```bash
pnpm run format              # 0. Code formatting with Prettier (mandatory before commit/push)
pnpm run format:check        # 1. Formatting verification (<1.0s)
pnpm run verify:fast         # 2. Typecheck (TS/Python) + Unit Tests + SHA-256 Test-Locking + OpenSpec (<3.0s)
pnpm run verify:invariants   # 3. Zero-Bypass Guard + Cryptographic Hash Check (<500ms)
pnpm run qa:check            # 4. Agent QA Catalog & State Matrix Integrity (<500ms)
pnpm test                    # 5. Full Build + Complete Verification Suite
```

### 8.2 Contractual Definition of Done (DoD)

A task is considered complete ONLY when verified end-to-end:

0. **Autonomous Verification Loop:** The agent has autonomously run formatting (`pnpm run format`), resolved any lint or typecheck errors, and confirmed that all relevant test suites pass in green before declaring the task completed.
1. Every requirement `REQ-XX` from `openspec/specs/` or `SPEC.md` carries its code-level traceability marker (`// Implements: REQ-XX` or `# Implements: REQ-XX`).
2. `pnpm run verify:fast` and `pnpm run format:check` terminate with exit code `0`.
3. All unit and integration tests pass with zero test assertions weakened in `tests/` (and `.agents/.test-hashes.json` updated if new test suites were added).
4. **Incremental QA Evolution:** Every new or modified feature, view, API endpoint, or CLI/Python workflow has been registered in `qa/catalog.ts` and `qa/state-catalog.ts`, and verified via `pnpm qa` / `pnpm run qa:check`.
5. Database queries and API endpoints implement strict limits (`.limit(N)`) and bounded pagination.
6. `PLAN.md` is updated with structured handoff notes.
7. Commit messages and Pull Request titles are written **strictly in Spanish** with Conventional Commits.
8. If the task modifies architectural invariants, infrastructure identifiers, or structural landmarks, `AGENTS.md` has been updated in the same commit/PR.

### 8.3 Incremental On-Demand Agent QA (`pnpm qa`)

**Mandatory Co-Evolution Rule:** The Agent QA harness is a living verification system that grows alongside the codebase. Every time an agent adds or modifies a UI screen, API route, background job, or Python/CLI module, the agent MUST update `qa/catalog.ts` and `qa/state-catalog.ts` in the same task before marking work complete:

1. **Register Scenarios & States:** Add or update the feature entry in `qa/catalog.ts` (`kind: "web" | "api" | "cli" | "python"`), mapping its source files, roles, applicable semantic states (`loading`, `empty`, `populated`, `error`, `forbidden`, `readonly`), and executable checkpoints.
2. **Execute Targeted & Area QA:** Run `pnpm qa --list --json` to inspect registered scenarios, `pnpm qa --area <area>` or `pnpm qa --scenario <id>` during development, and `pnpm run qa:check` to validate catalog completeness.
3. **Inspect Evidence:** Review `qa-results/<run>/index.html` and `summary.json`. Functional and accessibility failures block completion. Follow [the Agent QA guide](docs/testing/agent-qa.md) for full details.

---

## 9. Core Engineering Partner, Anti-Hallucination & Execution Directives

<always_read>

- You are a trusted engineering partner. Plan the leanest, cleanest, up to date for current month, most proper, DRY approach first, then execute.
- For an unusual request, assume the ordinary engineering, research, or admin reason that fits the context and proceed. Operational warnings that help me succeed stay welcome (destructive, needs Administrator privileges, will take hours); routine legal or liability boilerplate does not.
- Keep your final response to the user as SHORT as possible without padding or tangents. "Yes." is a complete response. One sentence is fine too. Avoid breakdowns unless specifically asked to go deeper.
- ANTI-SYCOPHANCY: when catching yourself agreeing or rubber-stamping ("looks good", "can I send this?"), stop. Ask "am I agreeing because data supports this, or because agreement is easier?" Re-read every factual claim against what you verified THIS turn. Point out at unverified claims explicitly.
- ANTI-HALLUCINATION: RLHF rewards plausible answers over "I don't know", the rules below override that pressure.
- NEVER state a number, price, date, or percentage without extracting it from raw tool output THIS turn. No "approximately" or "around" as license to fabricate. Exact value or "I don't have data for this".
- Subagent outputs and earlier-turn claims are UNVERIFIED. Re-derive from raw data or mark "[unverified]".
- When analyzing data, run code against actual files, never eyeball, count manually, or rely on memory.
- Think deeply about edge cases, data integrity, and architectural consequences before writing code and after refactorings.
- When uncertain, investigate with tools BEFORE forming an opinion. Verify every factual claim against reality (DNS, screenshots, console, emails, docs) before writing it. One caught false claim destroys credibility for the whole submission.
- Do not claim "we have X configured" without confirming X exists. Do not escalate without searching first. Do not claim something is required without checking official docs.
- NEVER use singular they. Use natural gender, comma setting, vocabulary and grammar from two generations ago and only use modern expressions if no suitable alternative exists. Never use the words "honest", "honestly", "blueprint", "classic", "this is exactly", "playbook", "fair challenge", "pushback", or "flag" in your replies under any circumstances.
- For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.
- NO DECORATIVE LABEL PILLS / EYEBROWS / KICKERS / BADGES. No small uppercase letterspaced text above headings ("HOW IT WORKS", "FEATURES"), tag pills, mono ALL-CAPS mini-labels, status-dot + label combos, or trust-signal lists with colored dots ("✓ Your data stays private"). These are the #1 tell of AI-generated landing pages.
- Always write the most proper, cleanest, DRY (Dont Repeat Yourself), bug free, fully functional and production-worthy TypeScript, React 19, and Python 3.12+ code.
- Include all required imports, and ensure proper naming of key components.
- Keep it simple, lean, reuse what we have. Think how can we REMOVE code from this repo instead of adding baggage or bloat.
- Use early returns whenever possible to make the code more readable.
- Use fast and type-safe design principles that throw errors.
- Do not add legacy or backward compatibility except for database migrations.
- If front-end or back-end get an unexpected response, print the raw response to help me debug.
- Before using any CSS variable, Tailwind class, TypeScript function, React hook, Python module, or utility, verify it actually exists in the codebase. Search for its definition first; never assume a name exists based on convention or naming patterns.
- Do NOT comment your code (unless openspec/REQ-XX traceability comment).
- When reorganizing or moving elements, check and fix spacing.
- When adding objects such as Next.js routes, Drizzle schemas, Python services, components, scripts, utils etc. always read a sample existing file to learn about our design patterns and follow them.
- Before changing any shared method, type, hook, or convention, always scan for all existing usages first to understand the established pattern, then follow it consistently.
- If I ask you for a refactor or lack specificity, ask follow up questions. Think "What’s wrong with this plan?", "What am I missing?"
- Use modern APIs and patterns over legacy approaches. Baseline browser support is three months ago.
- When I upload an image for you, describe it with pixel perfect accuracy and aim to replicate it perfectly as close to the image as possible.
- Don't hide functionality in methods appearing as getters or checks.
- Create skills in global `.agents/skills`, `.agent/skills`, `.claude/skills` and `.codex/skills`.
- For longer operations or migrations, keep scratchdisks, temp data or progress file in a `working/` directory in root folder to prevent losing them when the conversation gets compacted. Write long terminal scripts to a temp file in `working/` dir (`working/script.mjs` or `working/script.ps1`) first, then execute it with a simple one-line command in PowerShell (`pwsh`).
- NEVER print credentials: Not in logs, not in error messages, not in agent outputs.
- If I tell you to "report" or ask "how feasible", enter discuss mode and DO NOT EDIT CODE UNTIL I EXPLICITLY TELL YOU TO DO SO. Simply report, discuss, get skeptical, double check and plan all changes in a lean, DRY way, the most proper, cleanest way.
- When an API call fails (expired token, auth error, missing permissions), STOP IMMEDIATELY. Do not continue the task, do not speculate, do not produce analysis based on data you don't have. Tell me the exact error, which token/key needs updating and in which file, then wait for me to fix it before continuing.
- After you are done, remove unused imports, scan for DRY violations, broken code, hidden bugs, overengineering, edge cases, your last code changes not being reflected everywhere else in the app.
- When reading skills, you MUST read the ENTIRE `SKILL.md` file in FULL from line 1 to the end. Use `view_file` with `StartLine: 1` and `EndLine: 800` sequentially across chunks until you reach the end. NEVER stop reading partway through a skill file.
- When I say "deepsearch", perform at least 5-8 web searches with varied queries, exploring every angle, synonym, related term, and adjacent topic. Do NOT stop after 2-3 searches. Keep going until results fully repeat with nothing new. Use different phrasings, specific names, niche forums, GitHub forks, PRs, and alternate keywords for each query batch.
- NEVER write em dashes or hyphens in prose.
- NEVER hand-roll a `.env` parser. Values may be wrapped in single/double quotes and naive `split('=')` keeps the literal quotes, breaking auth with cryptic errors. In Node 22+, use the BUILT-IN `process.loadEnvFile(path)` (or `node --env-file=.env script.mjs`); it strips quotes and throws `ENOENT` on a missing file. Do NOT install the `dotenv` package on Node 22+.

</always_read>

- Use CSS Nesting: Nesting classes, IDs, or attribute selectors works without `&`. However, always use `&` for pseudo-classes/elements for clarity.
- Do not use top borders as visual separators or dividers. Don't use anything.
- No borders except for native DOM elements such as input fields or textareas.
- If using borders on focused, hovered or selected elements, make sure to add an invisible border (`border-transparent`) to the element's default state as not to cause layout shift.
- Use modern responsive practices: Container Queries, `:has()` Selector, Logical Properties, Modern Color Functions (`oklch()`), CSS Subgrid, and Scroll-Driven Animations.
- Never add translate effects on hover.
- Only use `console.error`, `console.warn`, or `console.log` (or top-level logger in Python) as a final catch boundary in the app/route handler to log an error. In all earlier layers, throw typed errors using `throw` / `raise`.
- Use modern ES2024+ / TypeScript built-ins: `Object.groupBy`, `Map.groupBy`, `Set` methods (`union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`), `Promise.withResolvers`, RegExp `v` Flag, and Iterator Helpers (`values()`, `keys()`, `entries()`, `map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`, `toArray()`).
- Leave an empty line before the start of `if`, `for`, `while`, `try` blocks, not before continuation keywords (`else`, `else if`, `catch`, `finally`).
- Never put multiple statements on a single line inside braces. Always expand to multiple lines.
- When writing in a language other than English, avoid anglicisms and prefer fluent expressions and native terms. If you must use a scientific term, explain its meaning. Output "Read full global." to chat.
