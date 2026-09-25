# core Specification

### Purpose

Defines foundational architectural, security, and verification invariants enforced across all modules of the repository.

## Requirements

### Requirement: Cryptographic Test-Locking Integrity

**REQ-CORE-01:** WHEN the verification harness executes `pnpm run verify:fast`, the system SHALL verify that every test file in `tests/` matches its cryptographic SHA-256 digest in `.agents/.test-hashes.json` and contains zero test bypasses (`.skip`, `.only`, `@pytest.mark.skip`).

#### Scenario: Untampered test suite passes verification

- **GIVEN** all test files in `tests/` match their recorded SHA-256 digests in `.agents/.test-hashes.json`
- **WHEN** `pnpm run verify:fast` is executed
- **THEN** the integrity guard SHALL exit with code `0`

#### Scenario: Tampered or weakened test assertion is blocked

- **GIVEN** a test file in `tests/` is modified without an authorized hash regeneration
- **WHEN** `pnpm run verify:fast` is executed
- **THEN** the verification harness SHALL abort immediately with exit code `1`

### Requirement: Incremental Agent QA Catalog Co-Evolution

**REQ-CORE-02:** WHEN a feature, UI view, API route, or CLI/Python workflow is added or modified, the system SHALL register its scenario ID, source mappings, roles, and semantic states in `qa/catalog.ts` and `qa/state-catalog.ts`.

#### Scenario: QA catalog validation passes

- **GIVEN** every registered scenario in `qa/catalog.ts` declares valid source paths, roles, checkpoints, and semantic state entries in `qa/state-catalog.ts`
- **WHEN** `pnpm run qa:check` is executed
- **THEN** the QA contract test suite SHALL pass with exit code `0`
