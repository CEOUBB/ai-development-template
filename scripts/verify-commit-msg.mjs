import { readFileSync } from "node:fs";

const msgFile = process.argv[2];
if (!msgFile) {
  process.exit(0);
}

const rawMsg = readFileSync(msgFile, "utf8");
const cleanLines = rawMsg
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.length > 0 && !l.startsWith("#"));

if (cleanLines.length === 0) {
  process.exit(0);
}

const firstLine = cleanLines[0];

if (firstLine.startsWith("Merge ") || firstLine.startsWith("Revert ")) {
  process.exit(0);
}

const CONVENTIONAL_REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\([a-z0-9-_./]+\))?!?: .+/;

if (!CONVENTIONAL_REGEX.test(firstLine)) {
  console.error("\n[Commit-Msg] ERROR: Commit message must follow Conventional Commits:");
  console.error("  Example: feat: implementar validacion de contratos en el arnes QA");
  console.error(`  Received: "${firstLine}"\n`);
  process.exit(1);
}
