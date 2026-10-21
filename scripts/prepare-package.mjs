import { copyFile, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
// Store template files under names that npm includes in the tarball.
await mkdir(new URL('.npm-template/', root), { recursive: true });
await copyFile(new URL('.gitignore', root), new URL('.npm-template/gitignore', root));
await copyFile(new URL('pnpm-lock.yaml', root), new URL('.npm-template/pnpm-lock', root));
