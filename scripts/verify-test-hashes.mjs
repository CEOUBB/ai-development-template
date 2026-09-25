import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

// Implements: REQ-CORE-01
const TESTS_DIR = join(process.cwd(), "tests");
const SNAPSHOT_FILE = join(process.cwd(), ".agents", ".test-hashes.json");

function isSupportedTestFile(fileName) {
  return (
    fileName.endsWith(".test.ts") ||
    fileName.endsWith(".test.mjs") ||
    fileName.endsWith(".test.js") ||
    fileName.endsWith("_test.py") ||
    (fileName.startsWith("test_") && fileName.endsWith(".py")) ||
    fileName.endsWith("_test.go")
  );
}

async function getTestFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const res = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__pycache__" || entry.name === ".pytest_cache") {
        continue;
      }
      files.push(...(await getTestFiles(res)));
    } else if (isSupportedTestFile(entry.name)) {
      files.push(res);
    }
  }

  return files.sort();
}

async function calculateHashes() {
  const files = await getTestFiles(TESTS_DIR);
  const hashes = {};

  for (const file of files) {
    const relativePath = relative(process.cwd(), file).replaceAll("\\", "/");
    const content = await readFile(file, "utf8");
    const normalizedContent = content.replace(/\r\n/g, "\n");
    const hash = createHash("sha256").update(normalizedContent).digest("hex");
    hashes[relativePath] = hash;
  }

  return hashes;
}

async function main() {
  const isGenerate = process.argv.includes("--generate");
  const isCheck = process.argv.includes("--check") || !isGenerate;

  const currentHashes = await calculateHashes();

  if (isCheck) {
    if (!existsSync(SNAPSHOT_FILE)) {
      console.error(
        "[Test-Locking] ERROR: Snapshot .agents/.test-hashes.json is missing. Run with --generate after authorizing test changes."
      );
      process.exit(1);
    }

    const snapshotContent = await readFile(SNAPSHOT_FILE, "utf8");
    const expectedHashes = JSON.parse(snapshotContent);

    const modified = [];
    const missing = [];
    const untracked = [];

    for (const [file, hash] of Object.entries(expectedHashes)) {
      if (!currentHashes[file]) {
        missing.push(file);
      } else if (currentHashes[file] !== hash) {
        modified.push(file);
      }
    }

    for (const file of Object.keys(currentHashes)) {
      if (!expectedHashes[file]) {
        untracked.push(file);
      }
    }

    if (modified.length > 0 || missing.length > 0 || untracked.length > 0) {
      console.error("\n[Test-Locking] SEALED TEST INTEGRITY FAILURE:");
      if (modified.length) console.error(" - Modified without sealing:", modified);
      if (missing.length) console.error(" - Deleted:", missing);
      if (untracked.length) console.error(" - New untracked test files:", untracked);
      console.error("\nViolation of AGENTS.md Rule 2 (NO TEST WEAKENING). Aborting.");
      process.exit(1);
    }

    console.log(
      `[Test-Locking] Integrity check passed (${Object.keys(currentHashes).length} test files validated with SHA-256).`
    );
    return;
  }

  if (isGenerate) {
    await writeFile(SNAPSHOT_FILE, JSON.stringify(currentHashes, null, 2) + "\n", "utf8");
    console.log(
      `[Test-Locking] SHA-256 snapshot generated for ${Object.keys(currentHashes).length} files in .agents/.test-hashes.json`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
