# CONSTITUTION.md — Immutable System Laws & Core Boundaries

> **PURPOSE:** This document establishes the non-negotiable foundational laws and boundaries of the project.
> No feature implementation, refactor, optimization, or AI suggestion may violate the principles outlined here.

---

## Article I: Primacy of User Data & Privacy

1. **Zero Secret Leakage:** Production credentials, API tokens, user data, and private cryptographic keys must never be logged to console output, included in client bundles, or committed to version control.
2. **Explicit Data Boundaries:** Tenant, user, and session data must be strictly isolated. Access to protected resources requires unambiguous authorization checks at the data layer.

---

## Article II: Single Source of Truth (SSOT)

1. **Zero Domain Duplication:** Business logic, access rules, validation schemas, and numeric calculations must exist in exactly one canonical location in the codebase.
2. **Deterministic Derivation:** Downstream projections, view models, and cached states must be deterministically derived from the canonical System of Record.

---

## Article III: Type Safety & Runtime Verification

1. **Strict Static Typing:** The codebase enforces strict type safety. Dynamic escape hatches (`any`, `@ts-ignore`, unchecked casts) are constitutionally barred.
2. **Boundary Validation:** Every external input (HTTP request bodies, query parameters, webhooks, third-party API responses, environment variables) must be parsed through a runtime schema validator before reaching domain logic.

---

## Article IV: Software Craftsmanship & Anti-Slop

1. **No Placeholders:** All committed and generated code must be complete, functional, tested, and ready for production.
2. **High-Craft Visuals:** User interfaces must respect human visual ergonomics, optical typography, calibrated contrast (WCAG 2.2 AA), and physical motion without decorative clutter.

---

## Article V: Verifiable Integrity

1. **Test-Locking Invariant:** Tests are executable contracts. AI agents may add new tests but are strictly forbidden from modifying or weakening existing assertions to force passing builds.
2. **Continuous Verification:** Every task must pass through the automated verification harness prior to completion.
