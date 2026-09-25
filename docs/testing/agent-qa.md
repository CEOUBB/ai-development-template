# Incremental On-Demand Agent QA (`pnpm qa`)

Use `pnpm qa` after adding or changing application behavior. The Agent QA harness is designed to **co-evolve incrementally** as the agent writes code across Web/Next.js views, API endpoints, CLI scripts, or Python services.

## 1. Setup and Commands

```bash
pnpm install
pnpm run qa:check
pnpm qa --list --json
pnpm qa
```

| Command                   | Purpose                                                                                                                |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `pnpm qa`                 | Execute registered checkpoints across all active scenarios and generate `qa-results/<run>/index.html`.                 |
| `pnpm qa --list --json`   | Discover registered scenario IDs, roles, semantic states, checkpoints, and source file mappings.                       |
| `pnpm qa --area <area>`   | Verify a specific domain area (e.g. `pnpm qa --area auth`).                                                            |
| `pnpm qa --scenario <id>` | Execute a single scenario during iterative development (e.g. `pnpm qa --scenario core.harness`).                       |
| `pnpm run qa:check`       | Validate that every scenario in `qa/catalog.ts` has valid source mappings and state coverage in `qa/state-catalog.ts`. |

## 2. How the Agent Updates the QA Harness Incrementally

Whenever an agent implements a new feature, screen, API route, or Python/CLI workflow, it MUST update two files before completing the task:

1. **`qa/catalog.ts`**: Append or update a `QaScenarioDefinition` entry:
   - `id`: Stable identifier in `<area>.<feature>` format.
   - `kind`: `"web"` (Playwright + `axe-core` across `320px`, `390px`, `768px`, `1440px`), `"api"` (HTTP contract check), `"cli"`, or `"python"` (`pytest` / CLI command).
   - `sourceFiles`: Array of relative paths implemented or touched by the feature.
   - `applicableStates`: Subset of `["loading", "empty", "populated", "error", "forbidden", "readonly"]`.
   - `checkpoints`: Executable commands or routes verified by `pnpm qa`.
2. **`qa/state-catalog.ts`**: Append or update the matching `QaSurfaceStateMatrix` entry documenting how each applicable state is verified and which states are non-applicable.

## 3. Evidence Inspection

Every `pnpm qa` invocation writes `qa-results/<run>/index.html`, `summary.json`, and `manifest.json`. Functional failures, missing state coverage in `pnpm run qa:check`, or WCAG 2.2 AA accessibility violations block task completion.
