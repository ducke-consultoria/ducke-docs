#!/usr/bin/env node
// SessionStart: one or two lines of orientation (branch, uncommitted files, active OpenSpec changes)
// so Claude does not spend tool calls discovering them.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const run = (cmd, args) => {
  try {
    return execFileSync(cmd, args, { cwd: root, stdio: ["ignore", "pipe", "ignore"], timeout: 10_000 }).toString().trim();
  } catch {
    return null;
  }
};

const lines = [];
const branch = run("git", ["branch", "--show-current"]);
if (branch !== null) {
  const dirty = (run("git", ["status", "--porcelain"]) || "").split("\n").filter(Boolean).length;
  lines.push(`${path.basename(root)} on branch ${branch || "(detached)"}, ${dirty} uncommitted file(s).`);
}

if (existsSync(path.join(root, "openspec"))) {
  const raw = run("openspec", ["list", "--json"]);
  try {
    const active = (JSON.parse(raw).changes || []).filter((c) => c.status !== "complete");
    lines.push(
      active.length
        ? `Active OpenSpec changes: ${active.map((c) => `${c.name} (${c.completedTasks}/${c.totalTasks})`).join(", ")}.`
        : "No active OpenSpec changes."
    );
  } catch {
    // openspec CLI missing or output changed: stay quiet.
  }
}

if (lines.length) process.stdout.write(`${lines.join("\n")}\n`);
