# Technical Design Documents (`docs/design/`)

This directory houses all Technical Architecture and Design Documents (TDD / ADR) accompanying feature specifications.

---

## 1. Role in the SDD Lifecycle

Before implementing non-trivial architecture, database migrations, or security changes, an agent must author or update the corresponding `DESIGN-DOC-XXX.md`.

## 2. Key Sections in a Design Document
- **Component Topology & Sequence Flows:** Visualized with Mermaid diagrams.
- **Data Models & Schemas:** Type definitions, table migrations, and indexing strategies.
- **Security & Threat Model (STRIDE):** Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.
- **Failure Modes & Fallback Strategies:** What happens when downstream services timeout or fail.
