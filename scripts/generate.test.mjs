import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const cli = new URL('./create.mjs', import.meta.url).pathname;

test('generates a standalone project with the request, chosen guides, and required dependencies', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'crack-stack-generate-'));
  try {
    const target = join(temporary, 'notes');
    execFileSync(process.execPath, [cli, target, '--choices', 'monorepo,confect', '--description', 'A shared notes application', '--package-manager', 'pnpm']);
    const selection = JSON.parse(await readFile(join(target, 'stack.json'), 'utf8'));
    assert.deepEqual(selection, {
      name: 'notes', packageManager: 'pnpm', description: 'A shared notes application',
      choices: ['monorepo', 'confect', 'effect', 'convex'],
    });
    const brief = await readFile(join(target, 'GENERATE.md'), 'utf8');
    assert.ok(brief.includes('A shared notes application'));
    assert.ok(brief.includes('Monorepo with Turborepo'));
    assert.ok(brief.includes('skills/stack-libraries/references/confect.md'));
    assert.ok(!brief.includes('PostgreSQL'));
    const manifest = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
    const lock = JSON.parse(await readFile(join(target, 'package-lock.json'), 'utf8'));
    assert.equal(manifest.name, 'notes');
    assert.equal(lock.packages[''].name, 'notes');
    const check = execFileSync(process.execPath, ['scripts/check.mjs'], { cwd: target, encoding: 'utf8' });
    assert.equal(check, 'Local links, catalog guides, and stack selections are valid.\n');
    const repeated = spawnSync(process.execPath, [cli, target, '--recipe', 'react-convex', '--description', 'Changed request'], { encoding: 'utf8' });
    assert.equal(repeated.status, 1);
    assert.ok(repeated.stderr.includes('Directory already exists'));
    assert.equal(await readFile(join(target, 'GENERATE.md'), 'utf8'), brief);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test('creates a preset project and rejects incomplete or conflicting requests before writing', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'crack-stack-generate-'));
  try {
    const target = join(temporary, 'react-notes');
    execFileSync(process.execPath, [cli, target, '--recipe', 'react-convex', '--description', 'Shared notes']);
    const selection = JSON.parse(await readFile(join(target, 'stack.json'), 'utf8'));
    assert.deepEqual(selection.choices, ['polyrepo', 'functional-core', 'react', 'convex', 'effect', 'confect']);
    for (const args of [
      ['--choices', 'react,nextjs', '--description', 'Conflicting frontends'],
      ['--choices', 'react'],
      ['--choices', 'unknown', '--description', 'Unknown technology'],
      ['--recipe', 'missing', '--description', 'Unknown preset'],
    ]) {
      const invalidTarget = join(temporary, 'invalid');
      const result = spawnSync(process.execPath, [cli, invalidTarget, ...args], { encoding: 'utf8' });
      assert.equal(result.status, 1);
      assert.equal(result.stdout, '');
      await assert.rejects(access(invalidTarget), { code: 'ENOENT' });
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test('a noninteractive invocation explains how to create a project without hanging', () => {
  const result = spawnSync(process.execPath, [new URL('./stack.mjs', import.meta.url).pathname], { encoding: 'utf8', timeout: 3000 });
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes('Interactive setup needs a terminal'));
  assert.ok(result.stderr.includes('--recipe react-convex --description'));
});
