# SPEC-000: [Feature / Module Name]

> **SPECIFICATION STATUS:** DRAFT | APPROVED | IMPLEMENTED | DEPRECATED
> **Author(s):** [Author Name / AI Agent]
> **Date:** [YYYY-MM-DD]
> **Target Release / Milestone:** [Sprint / Version]

---

## 1. Executive Summary & Problem Statement

- **Problem Statement:** [Describe the problem, user pain point, or technical debt being addressed].
- **Proposed Solution:** [High-level summary of what this specification introduces].
- **Success Metrics:** [Measurable KPIs or criteria defining success].

---

## 2. Invariants & Scope Boundaries

- **In Scope:**
  - [Explicit item 1]
  - [Explicit item 2]
- **Out of Scope:**
  - [Explicit non-goal 1]
  - [Explicit non-goal 2]
- **Architectural Invariants:**
  - Must comply with `AGENTS.md` and `CONSTITUTION.md`.
  - Zero hardcoded accounts or secrets.

---

## 3. Formal Requirements (EARS Syntax)

### `REQ-01`: [Requirement Title]

- **Statement (EARS):** When [Trigger], the system shall [Action].
- **Acceptance Criteria (BDD / Given-When-Then):**
  - **Scenario 1 (Happy Path):**
    - **Given** [Initial system state]
    - **When** [User or system performs action]
    - **Then** [Expected outcome and state update]
  - **Scenario 2 (Boundary / Edge Case):**
    - **Given** [Edge case state]
    - **When** [Action occurs]
    - **Then** [Expected deterministic outcome]

---

### `REQ-02`: [Requirement Title — Error Handling]

- **Statement (EARS):** If [Invalid input or unauthorized access occurs], then the system shall [Reject with structured error].
- **Acceptance Criteria (BDD):**
  - **Scenario 1 (Validation Failure):**
    - **Given** an invalid payload missing required fields
    - **When** the endpoint processes the payload
    - **Then** return HTTP 422 with structured validation error details.

---

## 4. Security, Authorization & Privacy Invariants

- **Authentication Requirement:** [Public / Authenticated / Role-restricted].
- **Data Protection:** [PII handling, hashing, encryption at rest/in-transit].
- **Rate Limiting / Abuse Prevention:** [Limits per minute/user/IP].

---

## 5. Traceability Matrix

| Requirement ID | Specification Section | Unit Test File | Implementation Target |
| :------------- | :-------------------- | :------------- | :-------------------- |
| `REQ-01`       | Section 3 (`REQ-01`)  | `tests/...`    | `lib/...`             |
| `REQ-02`       | Section 3 (`REQ-02`)  | `tests/...`    | `app/...`             |
