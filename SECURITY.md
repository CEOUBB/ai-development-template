# Security Policy

## Architectural Security Invariants

1. **Zero Hardcoded Secrets or Personal Accounts:** Roles and permissions are derived deterministically from the System of Record database and centralized policy modules.
2. **Pre-Commit Secret Scanning:** `scripts/scan-staged-secrets.mjs` blocks commits containing API keys, PATs, JWTs, or PEM private keys.
3. **Bounded Queries & Payloads:** All database queries enforce explicit `.limit(N)` clauses, and mutating API routes enforce payload size limits and CSRF origin validation.
