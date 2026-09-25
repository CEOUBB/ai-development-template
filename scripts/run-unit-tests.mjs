import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

function collectFiles(dir, predicate) {
  if (!existsSync(dir)) {
    return [];
  }

  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__pycache__" || entry.name === "node_modules") {
        continue;
      }
      results.push(...collectFiles(full, predicate));
    } else if (predicate(entry.name)) {
      results.push(full);
    }
  }
  return results.sort();
}

const nodeTests = collectFiles(
  "tests",
  (name) => name.endsWith(".test.ts") || name.endsWith(".test.mjs") || name.endsWith(".test.js")
);

const pythonTests = collectFiles(
  "tests",
  (name) => name.endsWith("_test.py") || (name.startsWith("test_") && name.endsWith(".py"))
);

if (nodeTests.length > 0) {
  console.log(`[Unit Tests] Running ${nodeTests.length} Node/TypeScript test suite(s)...`);
  execFileSync(process.execPath, ["--experimental-strip-types", "--test", ...nodeTests], {
    stdio: "inherit",
  });
}

if (pythonTests.length > 0) {
  console.log(`[Unit Tests] Running ${pythonTests.length} Python test suite(s) via pytest...`);
  execFileSync("pytest", ["tests"], { stdio: "inherit" });
}

if (nodeTests.length === 0 && pythonTests.length === 0) {
  console.log("[Unit Tests] No unit test files found in tests/.");
}
