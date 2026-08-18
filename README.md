# AI Spec-Driven Development (SDD) Enterprise Starter Template

> **A battle-tested, high-craft boilerplate for engineering software with AI coding agents (Antigravity, Claude Code, Cursor, Codex, Gemini).**

This repository provides a standardized architecture for **Spec-Driven Development (SDD)**, strict multi-agent governance, visual anti-slop guidelines, canonical Admin CMS patterns, autonomous browser QA verification, and persistent cross-session memory.

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
│   │   ├── 005-api-and-contracts.mdc       # Structured API error envelopes, HTTP status rules
│   │   ├── 006-admin-cms-pattern.mdc       # Standard self-management CMS architecture & schemas
│   │   └── 007-browser-qa-verification.mdc # Autonomous browser QA (Mobile 375px & Desktop 1440px)
│   └── skills/                             # Agent capability packs
│       ├── spec-driven-development/        # 5-Phase SDD lifecycle skill
│       ├── frontend-craftsmanship/         # High-craft visual and motion guidelines
│       ├── test-driven-development/        # TDD Triangulation & test integrity
│       └── accessibility-wcag/             # WCAG 2.2 Level AA auditing
├── docs/
│   ├── ARCHITECTURE.md                     # System architecture, tech stack & data topology
│   ├── CLIENT_REQUIREMENTS.md              # Client brief, proposal deliverables & scope boundaries
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
├── .github/
│   ├── workflows/ci.yml                    # Automated GitHub Actions CI verification
│   ├── PULL_REQUEST_TEMPLATE.md            # Pull request template with DoD checklist
│   └── ISSUE_TEMPLATE/                     # Formal feature & bug issue templates
├── AGENTS.md                               # Canonical AI governance protocol & system directives
├── CONSTITUTION.md                         # Non-negotiable foundational system laws & boundaries
├── DESIGN.md                               # OKLCH design tokens, spring physics & UI anti-slop rules
├── PLAN.md                                 # Active session memory, dependency DAG & handoff ledger
├── SPEC.md                                 # Executive pre-code functional contract (3-minute approval)
└── package.json                            # Pre-configured verification scripts
```

---

## 🚀 How to Use in a New or Existing Project

### Option A: Initialize via GitHub Template (Recommended)
1. Go to [`https://github.com/CEOUBB/ai-development-template`](https://github.com/CEOUBB/ai-development-template).
2. Click **"Use this template"** $\rightarrow$ **"Create a new repository"**.
3. Clone your new repo locally and start building.

### Option B: Terminal Creation via GitHub CLI
```bash
gh repo create my-new-project --template CEOUBB/ai-development-template --private
cd my-new-project
```

---

## 🤖 Prompting AI Agents: The 3-Step Initialization

When starting a project with an AI agent, follow this 3-step sequence:

### Step 1: Ingest Client Requirements & Architecture
> *"Read `docs/CLIENT_REQUIREMENTS.md` and `docs/ARCHITECTURE.md`. Fill out the client brief, deliverables, and technical stack for our new project."*

### Step 2: Generate the Pre-Code Contract (`SPEC.md`)
> *"Based on `docs/CLIENT_REQUIREMENTS.md`, generate `SPEC.md` with all data schemas (Zod), API contracts, and admin CMS field mappings. Do NOT write application code yet."*

### Step 3: Review, Approve, and Implement
> *(You review `SPEC.md` in 3 minutes, approve it, then prompt:)*
> *"I have approved `SPEC.md`. Initialize `PLAN.md` with the dependency DAG and begin implementation following the 5-phase SDD pipeline."*

---

## 🛡️ Non-Negotiable Invariants Built-In
- **Zero Placeholders:** No `// TODO` or partial diffs.
- **Test-Locking Invariant:** Agents cannot weaken or delete existing assertions to pass tests.
- **Anti-Slop Design:** No flat black (`#000000`) with neon accents, no continuous gradient text fills, no generic pulsing badges.
- **Traceability:** Every requirement has a corresponding `// Implements: REQ-XX` in code and tests.
- **Browser QA Enforcement:** Mandatory verification on Mobile ($375\text{px}$) and Desktop ($1440\text{px}$) with 0 red console errors.
