#!/usr/bin/env node

/**
 * verify-fast.mjs
 * 
 * Executes fast (<3.0s) pre-flight verification:
 * 1. Test-locking integrity guard
 * 2. Type checking (if tsconfig exists)
 * 3. Unit tests
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

console.log('⚡ Starting Fast Pre-Flight Verification...\n');

function runStep(name, command) {
  console.log(`▶ [1/3] Running ${name}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✔ ${name} passed.\n`);
  } catch (err) {
    console.error(`✖ ${name} failed!\n`);
    process.exit(1);
  }
}

// 1. Guard check
runStep('Test-Locking Integrity', 'node scripts/test-locking-guard.mjs');

// 2. Typecheck (if tsconfig.json exists)
if (existsSync('tsconfig.json')) {
  runStep('Typecheck', 'npx tsc --noEmit');
}

// 3. Fast Tests (if configured in package.json)
try {
  const pkg = JSON.parse(existsSync('package.json') ? readFileSync('package.json', 'utf8') : '{}');
  if (pkg.scripts && pkg.scripts['test:unit']) {
    runStep('Unit Tests', 'npm run test:unit');
  }
} catch {
  // Pass if not configured
}

console.log('🎉 Fast Verification completed successfully!');
process.exit(0);
