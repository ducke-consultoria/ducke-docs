// Writes public/ai-index.json (every guide's path under app/ and its MDX) for the Ducke AI of the CRM API.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, 'app');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (entry.endsWith('.mdx')) files.push(full);
  }
  return files;
}

const pages = walk(app)
  .sort()
  .map((file) => ({ path: relative(app, file).replace(/\\/g, '/'), mdx: readFileSync(file, 'utf8') }));
if (pages.length === 0) throw new Error(`No .mdx pages under ${app}`);
writeFileSync(join(root, 'public/ai-index.json'), JSON.stringify({ pages }));
console.log(`ai-index.json: ${pages.length} pages`);
