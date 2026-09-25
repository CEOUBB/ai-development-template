import { execSync } from "node:child_process";

const SECRET_PATTERNS = [
  { name: "Google API Key", regex: /AIza[0-9A-Za-z\-_]{35}/ },
  {
    name: "GitHub Personal Access Token",
    regex: /(github_pat_[0-9A-Za-z_]{50,}|ghp_[0-9A-Za-z]{36,})/,
  },
  { name: "JWT / Bearer Token", regex: /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/ },
  { name: "OpenAI / Anthropic Key", regex: /sk-(proj-|ant-)?[A-Za-z0-9\-_]{32,}/ },
  { name: "Private Key PEM", regex: /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/ },
];

try {
  const stagedDiff = execSync("git diff --cached --unified=0", { encoding: "utf8" });
  if (!stagedDiff) {
    process.exit(0);
  }

  const addedLines = stagedDiff
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"));
  const found = [];

  for (const line of addedLines) {
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.regex.test(line)) {
        found.push(pattern.name);
      }
    }
  }

  if (found.length > 0) {
    console.error("\n[Pre-commit] SECURITY ALERT: Potential secrets detected in staged diff:");
    for (const name of new Set(found)) {
      console.error(` - ${name}`);
    }
    console.error("Commit aborted to prevent credential leakage.\n");
    process.exit(1);
  }
} catch {
  process.exit(0);
}
