## Resumen del Cambio (Conventional Commits en Español)

- **Especificación / Requerimientos:** `// Implements: REQ-XX`
- **Escenario QA actualizado (`qa/catalog.ts`):** `<area.feature>`

## Lista de Verificación (Definition of Done)

- [ ] `pnpm run format:check` termina con código `0`.
- [ ] `pnpm run verify:fast` pasa con código `0` (Typecheck + Unit Tests + SHA-256 Test-Locking + OpenSpec).
- [ ] `pnpm run qa:check` y `pnpm qa` verifican los estados semánticos registrados en `qa/state-catalog.ts`.
- [ ] `PLAN.md` ha sido actualizado con las notas de entrega (handoff).
