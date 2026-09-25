import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

// Implements: REQ-CORE-01
function runStep(label, command) {
  console.log(`▶ ${label}...`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch {
    console.error(`✖ ${label} failed.`);
    process.exit(1);
  }
}

runStep(
  "1/4 Test-Locking Guard & SHA-256 Integrity",
  "node scripts/test-locking-guard.mjs && node scripts/verify-test-hashes.mjs --check"
);

if (existsSync("tsconfig.json")) {
  runStep("2/4 TypeScript Typecheck", "pnpm exec tsc --noEmit");
}

if (existsSync("pyproject.toml") || existsSync("requirements.txt")) {
  try {
    execSync("ruff --version", { stdio: "ignore" });
    runStep("2b/4 Python Ruff Check", "ruff check .");
  } catch {
    // ruff optional if not installed in environment
  }
}

runStep("3/4 Unit Test Suites", "node scripts/run-unit-tests.mjs");

if (existsSync("openspec/specs")) {
  runStep("4/4 OpenSpec Living Specifications Validation", "pnpm exec openspec validate --specs");
}

console.log("✔ Fast verification completed cleanly.");
