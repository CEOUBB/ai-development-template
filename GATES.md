# GATES.md: Acceptance Gates & Quality Invariants Protocol (Tree 3 Software Reliability, Concurrency & Data Integrity Audit)

> **DISCIPLINE:** `/improve` (Read-only audit plans) & `/unlazy tree 3` (Exhaustive completion verification)
> **PURPOSE:** Living reliability checklist across numeric bounds, async concurrency, error boundaries, persistence synchronization, SSOT compliance, and client/mobile resilience.

---

## 1. Branch 1: Logical Edge Cases & Numeric Integrity

### 1.1 `leaf-numeric-bounds`

- **CHECK:** Audit arithmetic operations (division, weighting, rounding), `NaN`/`Infinity` propagation, empty collections, and invalid string coercion.
- **ORACLE:** Zero `NaN` or `Infinity` values emitted by domain calculators; division by zero guarded before execution.

### 1.2 `leaf-null-coalescing`

- **CHECK:** Audit unsafe optional chaining, forced non-null assertions (`!`), and date/timestamp parsing boundaries.
- **ORACLE:** Deterministic ISO-8601 timestamp handling and defensive fallback on malformed inputs.

---

## 2. Branch 2: Async Concurrency, Promises & Timing

### 2.1 `leaf-floating-promises`

- **CHECK:** Audit async handlers (`onClick`, `onSubmit`, background jobs) for reentrancy locks and disabled states during in-flight mutations.
- **ORACLE:** Atomic reentrancy guards (`if (saving) return;`) prevent duplicate writes on double-click or network retry.

### 2.2 `leaf-stale-closures`

- **CHECK:** Audit `useEffect` cleanup, `AbortController` cancellation on route/filter changes, and modal state reset when switching entities.
- **ORACLE:** Zero stale entity flashes when switching active items in dialogs or paginated tables.

---

## 3. Branch 3: Error Handling & Resilience Boundaries

### 3.1 `leaf-swallowed-errors`

- **CHECK:** Identify empty `catch` blocks and missing Error Boundaries around complex dynamic views.
- **ORACLE:** Every dynamic view is wrapped in a scoped Error Boundary with recovery actions and structured telemetry.

### 3.2 `leaf-partial-failures`

- **CHECK:** Audit multi-store mutations (e.g. SQL database + secondary projection/cache/storage) for retry and reconciliation on partial failure.
- **ORACLE:** Exponential backoff or compensating reconciliation prevents orphaned records.

---

## 4. Branch 4: Persistence & Schema Parity

### 4.1 `leaf-schema-drifts`

- **CHECK:** Verify 1:1 parity between ORM schema definitions (Drizzle / SQLAlchemy) and deployed database tables/indexes.
- **ORACLE:** All foreign keys and sort columns have composite B-Tree indexes; every list query enforces `.limit(N)`.

### 4.2 `leaf-ssot-violations`

- **CHECK:** Verify that role derivation, access control, and domain formulas reside in a single canonical module.
- **ORACLE:** Zero duplicated permission regexes or domain calculations in UI components or route handlers.
