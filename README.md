# AI Spec-Driven Development (SDD) Enterprise Starter Template

> **A battle-tested, high-craft boilerplate for engineering software with AI coding agents (Antigravity, Claude Code, Cursor, Codex, Gemini).**

This repository provides a standardized architecture for **Spec-Driven Development (SDD)**, strict multi-agent governance, visual anti-slop guidelines, test-locking guardrails, and persistent cross-session memory.

---

## 🏗️ Repository Architecture

```
.
├── .agents/
│   ├── rules/                              # Modular rules triggered automatically by context
│   │   ├── 000-core-invariants.mdc         # Strict typing, bounded queries, zero placeholders
│   │   ├── 001-code-craft-and-style.mdc    # Code style, comment integrity, requirement tags
│   │   ├── 002-testing-and-triangulation.mdc# TDD triangulation, zero test weakening
│   │   ├── 003-ui-ux-craftsmanship.mdc     # Anti-slop UI tokens, spring physics, typography
│   │   ├── 004-security-and-data-isolation.mdc# Input validation (Zod), isolation boundaries
│   │   └── 005-api-and-contracts.mdc       # Structured API error envelopes, HTTP status rules
│   └── skills/                             # Agent capability packs
│       ├── spec-driven-development/        # 5-Phase SDD lifecycle skill
│       ├── frontend-craftsmanship/         # High-craft visual and motion guidelines
│       ├── test-driven-development/        # TDD Triangulation & test integrity
│       └── accessibility-wcag/             # WCAG 2.2 Level AA auditing
├── docs/
│   ├── specs/                              # Formal functional specifications (EARS + BDD)
│   │   ├── README.md                       # Specification authoring guide
│   │   └── SPEC-TEMPLATE.md                # Standard spec template with REQ-XX tags
│   ├── design/                             # Technical design documents (TDD / ADR)
│   │   ├── README.md                       # Design doc guidelines
│   │   └── DESIGN-DOC-TEMPLATE.md          # Architecture, Mermaid diagrams & threat modeling
│   └── reviews/
│       └── CODE-REVIEW-TEMPLATE.md         # Multi-perspective AI code review checklist
├── scripts/
│   ├── test-locking-guard.mjs              # Test assertion integrity checker (no .skip/.only)
│   └── verify-fast.mjs                     # Pre-flight fast verification runner
├── AGENTS.md                               # Canonical AI governance protocol & system directives
├── CONSTITUTION.md                         # Non-negotiable foundational system laws & boundaries
├── DESIGN.md                               # OKLCH design tokens, spring physics & UI anti-slop rules
├── PLAN.md                                 # Active session memory, dependency DAG & handoff ledger
└── package.json                            # Pre-configured verification scripts
```

---

## 🚀 How to Use in a New or Existing Project

### Option A: Initialize a New Project
1. Clone or copy this template folder into your new project repository root:
   ```bash
   git clone https://github.com/your-org/ai-sdd-template.git my-new-project
   cd my-new-project
   ```
2. Initialize your target technology stack (e.g. Next.js, FastAPI, Rust, Go, Flutter).

### Option B: Drop into an Existing Project
Copy the following files and folders directly into the root of your existing codebase:
- `.agents/`
- `docs/`
- `scripts/`
- `AGENTS.md`
- `CONSTITUTION.md`
- `DESIGN.md`
- `PLAN.md`

Add the verification scripts to your `package.json`:
```json
{
  "scripts": {
    "verify:fast": "node scripts/verify-fast.mjs",
    "verify:invariants": "node scripts/test-locking-guard.mjs"
  }
}
```

---

## 🤖 Prompting AI Agents to Adapt Context

When starting a project with an AI agent, prompt it with the following initialization command:

> *"Please read `AGENTS.md` and `CONSTITUTION.md`. Adapt Section 1 (Mission & Institutional Boundaries) and Section 2.1 (Access Policy & SSOT location) in `AGENTS.md` to match our project's domain, stack, and business model. Keep all core universal invariants and negative constraints intact."*

---

## 📜 The 5-Phase SDD Workflow

1. **Phase 1: Constitution (`CONSTITUTION.md` & `AGENTS.md`)**
   Verify all proposed architectural choices against system laws and boundaries.
2. **Phase 2: Specify (`docs/specs/SPEC-XXX.md`)**
   Draft formal requirements using **EARS syntax** and **Given-When-Then BDD acceptance criteria**.
3. **Phase 3: Design (`docs/design/DESIGN-DOC-XXX.md`)**
   Model components, Mermaid sequence flows, runtime schemas, and STRIDE security threats.
4. **Phase 4: Tasks DAG (`PLAN.md`)**
   Decompose work into a dependency graph with explicit `// Implements: REQ-XX` tags.
5. **Phase 5: Execute & Verify**
   Implement via TDD Triangulation (Red -> Green -> Refactor) and run `npm run verify:fast`.

---

## 🛡️ Non-Negotiable Invariants Built-In
- **Zero Placeholders:** No `// TODO` or partial diffs.
- **Test-Locking Invariant:** Agents cannot weaken or delete existing assertions to pass tests.
- **Anti-Slop Design:** No flat black (`#000000`) with neon accents, no continuous gradient text fills, no generic pulsing badges.
- **Traceability:** Every requirement has a corresponding `// Implements: REQ-XX` in code and tests.
