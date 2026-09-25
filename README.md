# Enterprise AI Spec-Driven Development (SDD v5.0 + OpenSpec) Starter Template

> **A production-hardened, polyglot-ready engineering template for building software with autonomous AI coding agents (Antigravity, Claude Code, Codex, Cursor).**
> Optimized first for **Next.js 16 + React 19 + TypeScript + Drizzle/SQL** while natively supporting **Python 3.12+ (`pytest`, `ruff`, FastAPI/Pydantic)**, **Go**, **Rust**, and **Mobile (Capacitor / Android)**.

---

## Architecture & Governance Landmarks

```
.
├── .agents/
│   ├── .test-hashes.json                   # Cryptographic SHA-256 test-locking snapshot
│   ├── agents/pr-reviewer/                 # Multi-PR triage & senior code review subagent
│   ├── rules/                              # Glob-scoped modular rules (alwaysApply: false)
│   │   ├── 000-core-invariants.mdc
│   │   ├── 001-code-craft-and-style.mdc
│   │   ├── 002-testing-and-triangulation.mdc
│   │   ├── 003-ui-ux-craftsmanship.mdc
│   │   ├── 004-security-and-data-isolation.mdc
│   │   ├── 005-api-and-contracts.mdc
│   │   ├── 006-admin-cms-pattern.mdc
│   │   ├── 007-browser-qa-verification.mdc
│   │   └── 008-database-and-persistence.mdc
│   └── skills/                             # 21 high-craft skills + OpenSpec commands
│       ├── spec-driven-development/        # SDD v5.0 + OpenSpec master skill
│       ├── deliberate/                     # Anti-slop UI design + runnable static checker
│       ├── next-best-practices/            # 19 Next.js 16 reference guides
│       ├── next-cache-components/          # PPR, use cache, cacheLife, cacheTag
│       ├── drizzle/                        # Drizzle ORM schema & query patterns
│       ├── accessibility/                  # WCAG 2.2 AA auditing & patterns
│       ├── animate/ & apple-design/        # Spring physics & fluid motion
│       └── openspec-*/                     # /opsx:explore, propose, apply, sync, archive
├── openspec/
│   ├── config.yaml                         # OpenSpec project schema & rules
│   └── specs/core/spec.md                  # Living domain specifications (EARS + BDD)
├── qa/
│   ├── catalog.ts                          # Incremental Agent QA scenario registry
│   ├── state-catalog.ts                    # Semantic state matrix (loading/empty/error/...)
│   └── cli.test.mjs                        # Automated QA catalog & state contract checks
├── scripts/
│   ├── verify-fast.mjs                     # <3s pre-flight (SHA-256 + TS/Python + Unit + OpenSpec)
│   ├── verify-test-hashes.mjs              # SHA-256 cryptographic test-locking engine
│   ├── test-locking-guard.mjs              # Zero-bypass guard (.skip / .only / pytest.skip)
│   ├── run-unit-tests.mjs                  # Node 22 native test runner + Python pytest runner
│   ├── qa.mjs                              # On-demand incremental Agent QA launcher
│   ├── scan-staged-secrets.mjs             # Pre-commit credential leak blocker
│   └── verify-commit-msg.mjs               # Spanish Conventional Commits validator
├── tests/
│   └── harness-integrity.test.mjs          # Sealed baseline verification test suite
├── AGENTS.md                               # Canonical AI Agent Governance Protocol (v5.0)
├── CLAUDE.md                               # @AGENTS.md pointer for Claude Code
├── DESIGN.md                               # Structured OKLCH design tokens & typography
├── GATES.md                                # Tree 3 Reliability, Concurrency & Data Integrity gates
├── PLAN.md                                 # Active work & structured handoff ledger
└── SPEC.md                                 # Executive pre-code functional contract
```

---

## Quickstart

```bash
pnpm install
pnpm run verify:fast
pnpm run qa:check
pnpm qa --list --json
```

---

## Verification Pipeline & Git Hooks (`simple-git-hooks`)

| Command                      | Gate Description                                                                                               |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `pnpm run format`            | Formats the repository with Prettier (mandatory before staging/committing).                                    |
| `pnpm run verify:fast`       | Runs SHA-256 test-locking guard, TypeScript/Python checks, unit tests, and `openspec validate --specs`.        |
| `pnpm run verify:invariants` | Verifies zero `.skip()`/`.only()` bypasses and SHA-256 test integrity.                                         |
| `pnpm run qa:check`          | Validates that every feature in `qa/catalog.ts` has complete semantic state coverage in `qa/state-catalog.ts`. |
| `pnpm qa`                    | Executes registered Web/API/CLI/Python QA scenarios and writes `qa-results/<run>/index.html`.                  |
