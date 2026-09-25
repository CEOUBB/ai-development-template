import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import test from "node:test";
import { QA_CATALOG } from "./catalog.ts";
import { QA_STATE_CATALOG } from "./state-catalog.ts";

// Implements: REQ-CORE-02
test("QA_CATALOG scenarios declare valid source mappings, checkpoints, and semantic states", () => {
  assert.ok(QA_CATALOG.length > 0, "QA_CATALOG must contain at least one registered scenario");

  for (const scenario of QA_CATALOG) {
    assert.ok(
      scenario.id.includes("."),
      `Scenario ID '${scenario.id}' must follow 'area.feature' format`
    );
    assert.ok(
      scenario.sourceFiles.length > 0,
      `Scenario '${scenario.id}' must map at least one source file`
    );
    assert.ok(
      scenario.checkpoints.length > 0,
      `Scenario '${scenario.id}' must define at least one executable checkpoint`
    );

    for (const file of scenario.sourceFiles) {
      assert.ok(
        existsSync(file),
        `Mapped source file '${file}' in scenario '${scenario.id}' must exist`
      );
    }

    const matrix = QA_STATE_CATALOG.find((m) => m.scenarioId === scenario.id);
    assert.ok(
      matrix,
      `Scenario '${scenario.id}' must have a corresponding entry in QA_STATE_CATALOG`
    );

    for (const state of scenario.applicableStates) {
      assert.ok(
        matrix.verifiedStates[state],
        `Applicable state '${state}' for '${scenario.id}' must be documented in QA_STATE_CATALOG`
      );
    }
  }
});

test("scripts/qa.mjs --list --json outputs structured catalog discovery payload", () => {
  const output = execFileSync(
    process.execPath,
    ["--experimental-strip-types", "scripts/qa.mjs", "--list", "--json"],
    { encoding: "utf8" }
  );
  const parsed = JSON.parse(output);
  assert.equal(parsed.totalScenarios, QA_CATALOG.length);
  assert.ok(Array.isArray(parsed.scenarios));
});
