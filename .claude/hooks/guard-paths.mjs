#!/usr/bin/env node
// PreToolUse (Edit|Write|MultiEdit): refuse edits to files that must never be edited by hand.
// Exit 2 blocks the tool call and shows stderr to Claude.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd;
if (!file || !root) process.exit(0);

const rel = path.relative(root, path.resolve(root, file)).split(path.sep).join("/");
if (rel.startsWith("..")) process.exit(0);

const rules = [
  [/(^|\/)(node_modules|\.next|\.vinext|dist)\//, "build output or dependencies"],
  [/(^|\/)generated\//, "generated code; change the source (e.g. prisma/schema.prisma) and regenerate"],
  [/(^|\/)\.env(\.local|\.test)?$/, "holds secrets and is edited by people; change .env.example and tell the user which variable to set"],
  [/(^|\/)package-lock\.json$/, "change dependencies with npm install, not by editing the lockfile"],
  [/^openspec\/changes\/archive\//, "archived OpenSpec changes are history; edit openspec/specs or an active change"],
];

for (const [pattern, reason] of rules) {
  if (pattern.test(rel)) {
    process.stderr.write(`Blocked edit to ${rel}: ${reason}.\n`);
    process.exit(2);
  }
}

if (/^prisma\/migrations\/[^/]+\/migration\.sql$/.test(rel) && existsSync(path.resolve(root, rel))) {
  process.stderr.write(
    `Blocked edit to ${rel}: applied migrations are immutable. Create a new one with npx prisma migrate dev --create-only --name <name>.\n`
  );
  process.exit(2);
}
