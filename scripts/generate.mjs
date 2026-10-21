import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog, renderSelection, validateSelection } from './selection.mjs';

const templateRoot = fileURLToPath(new URL('..', import.meta.url));

export function resolveSelection(selection) {
  if (!Array.isArray(selection?.choices)) return validateSelection(selection);
  const choices = new Set(selection.choices);
  for (const id of choices) {
    for (const required of catalog[id]?.requires ?? []) choices.add(required);
  }
  return validateSelection({ ...selection, choices: [...choices] });
}

export async function generateProject({ directory, selection }) {
  const target = resolve(directory);
  const completed = resolveSelection(selection);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(completed.name)) throw new Error('Use lowercase letters, numbers, and hyphens for the project directory name.');
  if (!completed.choices.length) throw new Error('Choose at least one technology.');
  if (!completed.description?.trim()) throw new Error('Describe the application to generate.');
  try {
    await mkdir(target);
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error(`Directory already exists: ${target}. Choose a new directory.`);
    throw error;
  }
  try {
    for (const entry of ['skills', 'scripts', 'examples', 'catalog.json', 'tsconfig.json', '.gitignore']) {
      await cp(resolve(templateRoot, entry), resolve(target, entry), { recursive: true });
    }
    const manifest = JSON.parse(await readFile(resolve(templateRoot, 'package.json'), 'utf8'));
    manifest.name = completed.name;
    await writeFile(resolve(target, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
    if (completed.packageManager === 'pnpm') {
      await cp(resolve(templateRoot, 'pnpm-lock.yaml'), resolve(target, 'pnpm-lock.yaml'));
    }
    await writeFile(resolve(target, 'stack.json'), JSON.stringify(completed, null, 2) + '\n');
    await writeFile(resolve(target, 'GENERATE.md'), `# Generate ${completed.name}\n\n${completed.description.trim()}\n\n## Selected stack\n\n${renderSelection(completed).split('\n').slice(2).join('\n')}\n## Implementation\n\nFollow [the composition skill](skills/crack-stack/SKILL.md). Treat the selection above as the agreed stack. Build the requested application in this directory and exercise a working feature through its real entrypoint.\n\nRead only the selected recipes and their official sources. Resolve runtime and peer dependency compatibility before installation. Replace template tooling with the application's tooling where needed. Preserve this brief, stack.json, and the setup skills.\n\nRun the application's build, type checker, and applicable integration checks. Report what was verified and any integration blocked by credentials or unavailable services.\n`);
    await writeFile(resolve(target, 'AGENTS.md'), '# Build this project\n\nRead [GENERATE.md](GENERATE.md) for the application requirements and selected stack. Follow [the composition skill](skills/crack-stack/SKILL.md) to implement it.\n\nKeep stack.json current. Preserve explicit choices and read only the recipes needed for them.\n');
    await writeFile(resolve(target, 'README.md'), `# ${completed.name}\n\n${completed.description.trim()}\n\nOpen this directory with your coding agent and ask it to build from [GENERATE.md](GENERATE.md). The brief contains the selected stack and links to its setup instructions.\n`);
    return { directory: target, selection: completed };
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    throw error;
  }
}
