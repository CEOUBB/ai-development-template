# Contributing Guide

1. **Spec-First Workflow:** Propose non-trivial features via `openspec/changes/` or `SPEC.md` using EARS syntax and BDD Gherkin scenarios before writing implementation code.
2. **Incremental Agent QA:** Register every new or modified UI view, API route, or CLI/Python service in `qa/catalog.ts` and `qa/state-catalog.ts`.
3. **Test-Locking:** Never weaken existing assertions in `tests/`. When adding new test files, seal their cryptographic hashes with `node scripts/verify-test-hashes.mjs --generate`.
4. **Formatting & Commits:** Run `pnpm run format` before committing. All commit messages and Pull Request titles MUST be written in Spanish following Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
