import type { QaSemanticState } from "./catalog.ts";

// Implements: REQ-CORE-02
export interface QaSurfaceStateMatrix {
  scenarioId: string;
  surface: string;
  verifiedStates: Partial<Record<QaSemanticState, string>>;
  nonApplicableStates: QaSemanticState[];
}

/**
 * Living Semantic State Coverage Matrix.
 *
 * Every scenario in QA_CATALOG must have a matching entry here documenting how each
 * applicable state (loading, empty, populated, error, forbidden, readonly) is verified.
 */
export const QA_STATE_CATALOG: QaSurfaceStateMatrix[] = [
  {
    scenarioId: "core.harness",
    surface: "CLI Verification & Test-Locking Engine",
    verifiedStates: {
      populated: "Validates tracked test files against .agents/.test-hashes.json",
      error: "Rejects tampered, missing, or untracked test files with exit code 1",
      readonly: "Treats tests/ directory as immutable during GREEN implementation phase",
    },
    nonApplicableStates: ["loading", "empty", "forbidden"],
  },
];
