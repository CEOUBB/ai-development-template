// Implements: REQ-CORE-02
export type QaScenarioKind = "web" | "api" | "cli" | "python";

export type QaSemanticState =
  "loading" | "empty" | "populated" | "error" | "forbidden" | "readonly";

export interface QaCheckpoint {
  id: string;
  description: string;
  commandOrRoute: string;
}

export interface QaScenarioDefinition {
  id: string;
  area: string;
  title: string;
  kind: QaScenarioKind;
  roles: string[];
  sourceFiles: string[];
  applicableStates: QaSemanticState[];
  checkpoints: QaCheckpoint[];
}

/**
 * Living Agent QA Scenario Catalog.
 *
 * MANDATORY AGENT DIRECTIVE (AGENTS.md §8.3):
 * Every time you add or modify a UI view, API route, CLI command, or Python service,
 * you MUST register or update its corresponding scenario entry in this catalog
 * and its state matrix entry in qa/state-catalog.ts.
 */
export const QA_CATALOG: QaScenarioDefinition[] = [
  {
    id: "core.harness",
    area: "core",
    title: "Enterprise SDD Harness, SHA-256 Test-Locking & OpenSpec Validation",
    kind: "cli",
    roles: ["system", "developer"],
    sourceFiles: [
      "AGENTS.md",
      "openspec/specs/core/spec.md",
      "scripts/verify-fast.mjs",
      "scripts/verify-test-hashes.mjs",
    ],
    applicableStates: ["populated", "error", "readonly"],
    checkpoints: [
      {
        id: "core.harness.sha256",
        description: "Cryptographic SHA-256 test-locking snapshot matches all files in tests/",
        commandOrRoute: "node scripts/verify-test-hashes.mjs --check",
      },
      {
        id: "core.harness.openspec",
        description: "OpenSpec living specifications pass strict schema validation",
        commandOrRoute: "pnpm run specs:validate",
      },
    ],
  },
];
