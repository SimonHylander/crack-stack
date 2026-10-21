import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog, validateSelection } from './stack.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

async function checkLink(source, link) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(link)) return;
  const [relativePath, anchor] = link.split('#');
  const target = relativePath ? resolve(dirname(source), decodeURIComponent(relativePath)) : source;
  await access(target);
  if (anchor && target.endsWith('.md')) {
    const content = await readFile(target, 'utf8');
    const headings = [...content.matchAll(/^#{1,6} (.+)$/gm)].map(match => match[1]
      .toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu, '').replace(/ /g, '-'));
    if (!headings.includes(anchor)) throw new Error(`Missing heading ${link} in ${source}`);
  }
}

for (const file of await markdownFiles(root)) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    await checkLink(file, match[1]);
  }
}
for (const entry of Object.values(catalog)) await checkLink(resolve(root, 'README.md'), entry.guide);
for (const file of ['stack.json', ...(await readdir(resolve(root, 'examples/stacks'))).map(name => `examples/stacks/${name}`)]) {
  validateSelection(JSON.parse(await readFile(resolve(root, file), 'utf8')));
}
process.stdout.write('Local links, catalog guides, and stack selections are valid.\n');
