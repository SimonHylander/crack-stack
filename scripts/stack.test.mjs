import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const cli = new URL('./stack.mjs', import.meta.url);

test('prints only the chosen setup guides', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'crack-stack-'));
  try {
    const path = join(directory, 'stack.json');
    await writeFile(path, JSON.stringify({ name: 'notes', packageManager: 'pnpm', choices: ['react', 'convex', 'effect', 'confect'] }));
    const output = execFileSync(process.execPath, [cli.pathname, path], { encoding: 'utf8' });
    assert.equal(output, `# notes

Package manager: pnpm

- React [frontend]: skills/stack-frontend/references/react.md
- Convex [database]: skills/stack-databases/references/convex.md
- Effect [library]: skills/stack-libraries/references/effect.md
- Confect [library]: skills/stack-libraries/references/confect.md

Read each selected guide and its official sources before installation.
`);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('rejects invalid selections without producing setup instructions', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'crack-stack-'));
  const cases = [
    { choices: ['monorepo', 'polyrepo'], message: 'Choose at most one repository: monorepo, polyrepo.' },
    { choices: ['confect'], message: 'confect requires: effect, convex.' },
    { choices: ['drizzle'], message: 'drizzle requires: postgres.' },
    { choices: ['nextjs', 'react'], message: 'Choose at most one frontend: nextjs, react.' },
    { choices: ['terraform', 'pulumi'], message: 'Choose at most one infrastructure: terraform, pulumi.' },
    { choices: ['react', 'react'], message: 'choices must not contain duplicate IDs.' },
    { choices: ['unknown'], message: 'choices must be an array of catalog IDs.' },
    { choices: ['__proto__'], message: 'choices must be an array of catalog IDs.' },
    { choices: [], packageManager: 'unknown', message: 'packageManager must be npm, pnpm, yarn, or bun.' },
  ];
  try {
    for (const { message, ...fields } of cases) {
      const path = join(directory, 'stack.json');
      await writeFile(path, JSON.stringify({ name: 'app', packageManager: 'npm', ...fields }));
      const result = spawnSync(process.execPath, [cli.pathname, path], { encoding: 'utf8' });
      assert.equal(result.status, 1);
      assert.equal(result.stdout, '');
      assert.ok(result.stderr.includes(message), result.stderr);
    }
  } finally {
    await rm(directory, { recursive: true });
  }
});
