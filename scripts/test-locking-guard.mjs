#!/usr/bin/env node

/**
 * test-locking-guard.mjs
 * 
 * Verifies that test assertions in `tests/` have not been weakened, commented out,
 * or deleted to artificially force test suites to pass.
 */

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function findTestFiles(dir) {
  let results = [];
  try {
    const list = readdirSync(dir);
    for (const file of list) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(findTestFiles(fullPath));
      } else if (file.endsWith('.test.ts') || file.endsWith('.test.js') || file.endsWith('.spec.ts') || file.endsWith('.spec.js')) {
        results.push(fullPath);
      }
    }
  } catch {
    // Directory might not exist yet
  }
  return results;
}

function checkBypasses(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    if (/\.skip\s*\(/.test(line)) {
      violations.push(`Line ${index + 1}: Found '.skip()' in test suite.`);
    }
    if (/\.only\s*\(/.test(line)) {
      violations.push(`Line ${index + 1}: Found '.only()' in test suite.`);
    }
  });

  return violations;
}

console.log('🔒 Running Test-Locking Integrity Guard...');

const testFiles = findTestFiles('tests');
let hasViolations = false;

if (testFiles.length === 0) {
  console.log('ℹ️  No test files found in tests/ yet. Guard passed.');
  process.exit(0);
}

for (const file of testFiles) {
  const violations = checkBypasses(file);
  if (violations.length > 0) {
    console.error(`❌ Test integrity violation in: ${file}`);
    violations.forEach((v) => console.error(`   - ${v}`));
    hasViolations = true;
  }
}

if (hasViolations) {
  console.error('\n💥 Test-Locking Guard failed! Remove .skip() or .only() to proceed.');
  process.exit(1);
} else {
  console.log('✅ Test-Locking Guard passed: No test bypasses detected.');
  process.exit(0);
}
