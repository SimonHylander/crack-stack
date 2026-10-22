import { cp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog, renderSelection, validateSelection } from './selection.mjs';

const templateRoot = fileURLToPath(new URL('..', import.meta.url));

// Directories every generated project starts with, keyed to the README that defines each one.
const projectDirectories = {
  docs: '# Docs\n\nDocumentation for this project: architecture, decisions, specs, and guides. Keep it current with the code it describes.\n',
  research: '# Research\n\nFindings from investigations, one Markdown file per question. Cite the primary source for each claim and date the file.\n',
};

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
    for (const entry of ['skills', 'scripts', 'examples', 'catalog.json', 'tsconfig.json']) {
      await cp(resolve(templateRoot, entry), resolve(target, entry), { recursive: true });
    }
    const manifest = JSON.parse(await readFile(resolve(templateRoot, 'package.json'), 'utf8'));
    manifest.name = completed.name;
    manifest.version = '0.0.0';
    manifest.private = true;
    delete manifest.bin;
    delete manifest.files;
    delete manifest.repository;
    delete manifest.publishConfig;
    delete manifest.scripts.prepack;
    delete manifest.scripts.changeset;
    delete manifest.scripts['version-packages'];
    delete manifest.scripts.release;
    await writeFile(resolve(target, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
    const packaged = !existsSync(resolve(templateRoot, 'pnpm-lock.yaml'));
    await cp(resolve(templateRoot, packaged ? '.npm-template/gitignore' : '.gitignore'), resolve(target, '.gitignore'));
    if (completed.packageManager === 'pnpm') {
      await cp(resolve(templateRoot, packaged ? '.npm-template/pnpm-lock' : 'pnpm-lock.yaml'), resolve(target, 'pnpm-lock.yaml'));
    }
    await writeFile(resolve(target, 'stack.json'), JSON.stringify(completed, null, 2) + '\n');
    await writeFile(resolve(target, 'GENERATE.md'), `# Generate ${completed.name}\n\n${completed.description.trim()}\n\n## Selected stack\n\n${renderSelection(completed).split('\n').slice(2).join('\n')}\n## Implementation\n\nFollow [the composition skill](skills/crack-stack/SKILL.md). Treat the selection above as the agreed stack. Build the requested application in this directory and exercise a working feature through its real entrypoint.\n\nRead only the selected recipes and their official sources. Resolve runtime and peer dependency compatibility before installation. Replace template tooling with the application's tooling where needed. Preserve this brief, stack.json, and the setup skills.\n\nRun the application's build, type checker, and applicable integration checks. Report what was verified and any integration blocked by credentials or unavailable services.\n`);
    for (const [directory, readme] of Object.entries(projectDirectories)) {
      await mkdir(resolve(target, directory));
      await writeFile(resolve(target, directory, 'README.md'), readme);
    }
    await writeFile(resolve(target, 'AGENTS.md'), '# Build this project\n\nRead [GENERATE.md](GENERATE.md) for the application requirements and selected stack. Follow [the composition skill](skills/crack-stack/SKILL.md) to implement it.\n\nKeep stack.json current. Preserve explicit choices and read only the recipes needed for them.\n\nWrite project documentation to [docs/](docs/README.md) and investigation findings to [research/](research/README.md).\n');
    // .agents holds agent definitions and skills. Claude Code and Codex read them through their own directory names.
    for (const directory of ['agents', 'skills']) {
      await mkdir(resolve(target, '.agents', directory), { recursive: true });
      await writeFile(resolve(target, '.agents', directory, '.gitkeep'), '');
    }
    for (const link of ['.claude', '.codex']) await symlink('.agents', resolve(target, link));
    await symlink('AGENTS.md', resolve(target, 'CLAUDE.md'));
    await writeFile(resolve(target, 'README.md'), `# ${completed.name}\n\n${completed.description.trim()}\n\nOpen this directory with your coding agent and ask it to build from [GENERATE.md](GENERATE.md). The brief contains the selected stack and links to its setup instructions.\n`);
    return { directory: target, selection: completed };
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    throw error;
  }
}
