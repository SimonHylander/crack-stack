import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { catalog, renderSelection } from './selection.mjs';

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    if (!args.length || args[0] === 'create' || args[0] === '--help') {
      const { createCommand } = await import('./create.mjs');
      await createCommand(args[0] === 'create' ? args.slice(1) : args);
    } else if (args.length === 1 && args[0] === '--list') {
      process.stdout.write(Object.entries(catalog).map(([id, entry]) => `${id}\t${entry.category}\t${entry.name}`).join('\n') + '\n');
    } else if (args.length === 1) {
      const selection = JSON.parse(await readFile(args[0], 'utf8'));
      process.stdout.write(renderSelection(selection));
    } else {
      throw new Error('Usage: pnpm run create, or node scripts/stack.mjs [stack.json | --list]');
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
