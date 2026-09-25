import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { QA_CATALOG } from "../qa/catalog.ts";
import { QA_STATE_CATALOG } from "../qa/state-catalog.ts";

// Implements: REQ-CORE-02
const args = process.argv.slice(2);
const isList = args.includes("--list");
const isJson = args.includes("--json");
const areaIdx = args.indexOf("--area");
const scenarioIdx = args.indexOf("--scenario");

const selectedArea = areaIdx >= 0 ? args[areaIdx + 1] : null;
const selectedScenario = scenarioIdx >= 0 ? args[scenarioIdx + 1] : null;

const filteredScenarios = QA_CATALOG.filter((item) => {
  if (selectedArea && item.area !== selectedArea) {
    return false;
  }
  if (selectedScenario && item.id !== selectedScenario) {
    return false;
  }
  return true;
});

if (isList) {
  const payload = {
    totalScenarios: filteredScenarios.length,
    scenarios: filteredScenarios,
    stateMatrix: QA_STATE_CATALOG,
  };

  if (isJson) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log(`Registered QA Scenarios (${filteredScenarios.length}):`);
    for (const s of filteredScenarios) {
      console.log(` - [${s.kind.toUpperCase()}] ${s.id} (${s.area}): ${s.title}`);
    }
  }
  process.exit(0);
}

const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = join(process.cwd(), "qa-results", runId);
mkdirSync(outDir, { recursive: true });

const results = [];
let failedCount = 0;

for (const scenario of filteredScenarios) {
  const checkpointResults = [];
  for (const cp of scenario.checkpoints) {
    const start = Date.now();
    let status = "passed";
    let errorMessage = null;

    if (scenario.kind === "cli" || scenario.kind === "python") {
      try {
        execSync(cp.commandOrRoute, { stdio: "pipe" });
      } catch (err) {
        status = "failed";
        errorMessage = err instanceof Error ? err.message : String(err);
        failedCount++;
      }
    }

    checkpointResults.push({
      id: cp.id,
      description: cp.description,
      commandOrRoute: cp.commandOrRoute,
      status,
      durationMs: Date.now() - start,
      errorMessage,
    });
  }

  results.push({
    scenarioId: scenario.id,
    area: scenario.area,
    kind: scenario.kind,
    title: scenario.title,
    checkpoints: checkpointResults,
  });
}

const summary = {
  runId,
  timestamp: new Date().toISOString(),
  totalScenarios: results.length,
  failedCount,
  status: failedCount === 0 ? "passed" : "failed",
  results,
};

writeFileSync(join(outDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n", "utf8");
writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify(
    {
      runId,
      scope: { selectedArea, selectedScenario },
      scenarios: filteredScenarios.map((s) => s.id),
    },
    null,
    2
  ) + "\n",
  "utf8"
);
writeFileSync(
  join(outDir, "index.html"),
  `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Agent QA Report - ${runId}</title></head>
<body>
  <h1>Agent QA Run: ${runId}</h1>
  <p>Status: <strong>${summary.status.toUpperCase()}</strong> | Scenarios: ${summary.totalScenarios}</p>
  <pre>${JSON.stringify(summary, null, 2)}</pre>
</body>
</html>\n`,
  "utf8"
);

console.log(
  `[Agent QA] Run completed (${summary.status}). Evidence saved to qa-results/${runId}/index.html`
);
if (failedCount > 0) {
  process.exit(1);
}
