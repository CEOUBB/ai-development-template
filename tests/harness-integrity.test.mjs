import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";

// Implements: REQ-CORE-01
test("Core governance documents and OpenSpec configuration exist", () => {
  const requiredPaths = [
    "AGENTS.md",
    "CLAUDE.md",
    "CONSTITUTION.md",
    "DESIGN.md",
    "GATES.md",
    "PLAN.md",
    "SPEC.md",
    "openspec/config.yaml",
    "openspec/specs/core/spec.md",
    "scripts/verify-test-hashes.mjs",
    "scripts/qa.mjs",
  ];

  for (const relPath of requiredPaths) {
    assert.ok(existsSync(relPath), `Required governance file '${relPath}' is missing`);
  }
});

test("All modular rules in .agents/rules/*.mdc declare globs and alwaysApply: false", () => {
  const ruleFiles = readdirSync(".agents/rules").filter((name) => name.endsWith(".mdc"));
  assert.ok(ruleFiles.length >= 8, "Expected at least 8 modular rule files in .agents/rules/");

  for (const file of ruleFiles) {
    const content = readFileSync(`.agents/rules/${file}`, "utf8");
    assert.match(content, /^---\n[\s\S]*?globs:\s*".+?"[\s\S]*?alwaysApply:\s*false[\s\S]*?---/);
  }
});
