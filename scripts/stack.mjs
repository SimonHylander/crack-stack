import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const catalog = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8'));

export function validateSelection(selection) {
  if (selection === null || typeof selection !== 'object' || Array.isArray(selection)) {
    throw new Error('The stack selection must be a JSON object.');
  }
  const unknown = Object.keys(selection).filter(key => !['name', 'packageManager', 'choices'].includes(key));
  if (unknown.length) throw new Error(`Unknown fields: ${unknown.join(', ')}.`);
  if (typeof selection.name !== 'string' || !selection.name.trim()) {
    throw new Error('name must be a nonempty string.');
  }
  if (!['npm', 'pnpm', 'yarn', 'bun'].includes(selection.packageManager)) {
    throw new Error('packageManager must be npm, pnpm, yarn, or bun.');
  }
  if (!Array.isArray(selection.choices) || !selection.choices.every(id => typeof id === 'string' && Object.hasOwn(catalog, id))) {
    throw new Error('choices must be an array of catalog IDs. Run with --list to see them.');
  }
  if (new Set(selection.choices).size !== selection.choices.length) {
    throw new Error('choices must not contain duplicate IDs.');
  }
  for (const category of ['frontend', 'infrastructure', 'orm']) {
    const selected = selection.choices.filter(id => catalog[id].category === category);
    if (selected.length > 1) throw new Error(`Choose at most one ${category}: ${selected.join(', ')}.`);
  }
  for (const id of selection.choices) {
    const missing = catalog[id].requires.filter(required => !selection.choices.includes(required));
    if (missing.length) throw new Error(`${id} requires: ${missing.join(', ')}.`);
  }
  return selection;
}

export function renderSelection(selection) {
  validateSelection(selection);
  const lines = [`# ${selection.name}`, '', `Package manager: ${selection.packageManager}`, ''];
  if (!selection.choices.length) {
    return [...lines, 'No technologies selected. Choose IDs from --list before scaffolding.', ''].join('\n');
  }
  for (const id of selection.choices) {
    const entry = catalog[id];
    lines.push(`- ${entry.name} [${entry.category}]: ${entry.guide}`);
  }
  lines.push('', 'Read each selected guide and its official sources before installation.', '');
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length > 1) throw new Error('Usage: node scripts/stack.mjs [stack.json | --list]');
    if (args[0] === '--list') {
      process.stdout.write(Object.entries(catalog).map(([id, entry]) => `${id}\t${entry.category}\t${entry.name}`).join('\n') + '\n');
    } else {
      const selection = JSON.parse(await readFile(args[0] ?? 'stack.json', 'utf8'));
      process.stdout.write(renderSelection(selection));
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
