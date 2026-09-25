import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Implements: REQ-CORE-01
function findTestFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  let results = [];
  const list = readdirSync(dir);

  for (const file of list) {
    if (file === "__pycache__" || file === "node_modules") {
      continue;
    }

    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findTestFiles(fullPath));
    } else if (
      file.endsWith(".test.ts") ||
      file.endsWith(".test.mjs") ||
      file.endsWith(".test.js") ||
      file.endsWith(".spec.ts") ||
      file.endsWith("_test.py") ||
      (file.startsWith("test_") && file.endsWith(".py"))
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function checkBypasses(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const violations = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
      return;
    }

    if (/\.(skip|only)\s*\(/.test(line)) {
      violations.push(`Line ${index + 1}: Found '.skip()' or '.only()' bypass.`);
    }
    if (/(@pytest\.mark\.skip|unittest\.skip)/.test(line)) {
      violations.push(`Line ${index + 1}: Found Python test skip decorator.`);
    }
  });

  return violations;
}

const testFiles = [...findTestFiles("tests"), ...findTestFiles("qa")];
let hasViolations = false;

for (const file of testFiles) {
  const violations = checkBypasses(file);
  if (violations.length > 0) {
    console.error(`[Test-Locking Guard] Violation in ${file}:`);
    for (const v of violations) {
      console.error(`  - ${v}`);
    }
    hasViolations = true;
  }
}

if (hasViolations) {
  console.error("[Test-Locking Guard] Failed: Remove test skips or .only() filters.");
  process.exit(1);
}

console.log(`[Test-Locking Guard] Passed (${testFiles.length} test files scanned, 0 bypasses).`);
