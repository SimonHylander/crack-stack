import * as prompts from '@clack/prompts';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { catalog } from './selection.mjs';
import { generateProject, resolveSelection } from './generate.mjs';

const recipes = [
  { value: 'tanstack-postgres', label: 'TanStack Start + PostgreSQL + Effect', hint: 'Turborepo, Drizzle, SST' },
  { value: 'react-convex', label: 'React + Convex + Confect', hint: 'Polyrepo, Effect' },
  { value: 'svelte-postgres', label: 'Svelte + PostgreSQL', hint: 'Drizzle, TanStack, Pulumi' },
];
const managers = ['npm', 'pnpm', 'yarn', 'bun'];
const help = `Usage:
  npm run create                         Choose a stack interactively
  npm run create -- my-app               Choose a stack for my-app
  npm run create -- my-app --recipe react-convex --description "A shared notes app"

Options:
  --recipe <name>          tanstack-postgres, react-convex, svelte-postgres
  --choices <ids>          Comma-separated technology IDs instead of a recipe
  --description <text>    What the application should do
  --package-manager <id>  npm, pnpm, yarn, bun (default: npm)
  --help                  Show this help
`;

async function answer(promise) {
  const value = await promise;
  if (prompts.isCancel(value)) throw new Error('Creation cancelled. No project was written.');
  return value;
}

async function loadRecipe(name) {
  if (!recipes.some(recipe => recipe.value === name)) throw new Error(`Unknown recipe: ${name}.`);
  return JSON.parse(await readFile(new URL(`../examples/stacks/${name}.json`, import.meta.url), 'utf8'));
}

function directoryError(value) {
  if (!value?.trim()) return 'Enter a project directory.';
  if (!/^[a-z0-9][a-z0-9-]*$/.test(basename(resolve(value)))) return 'Use lowercase letters, numbers, and hyphens for the directory name.';
  if (existsSync(resolve(value))) return 'Directory already exists. Choose a new directory.';
}

function selectionError(choices) {
  try {
    resolveSelection({ name: 'my-app', packageManager: 'npm', choices });
  } catch (error) {
    return error.message;
  }
}

async function chooseTechnologies() {
  const options = {};
  for (const [value, entry] of Object.entries(catalog)) {
    (options[entry.category] ??= []).push({ value, label: entry.name });
  }
  let initialValues = [];
  while (true) {
    const choices = await answer(prompts.groupMultiselect({
      message: 'Choose technologies', options, initialValues,
      required: true, selectableGroups: false, maxItems: 14,
    }));
    const error = selectionError(choices);
    if (!error) return choices;
    prompts.log.warn(error);
    initialValues = choices;
  }
}

async function wizard(directory) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error(`Interactive setup needs a terminal.\n${help}`);
  prompts.intro('Create a crack-stack project');
  const destination = directory ?? await answer(prompts.text({
    message: 'Project directory', placeholder: 'my-app', defaultValue: 'my-app',
    validate: directoryError,
  }));
  const invalidDirectory = directoryError(destination);
  if (invalidDirectory) throw new Error(invalidDirectory);
  const description = await answer(prompts.text({
    message: 'What should the application do?',
    validate: value => value?.trim() ? undefined : 'Describe what to generate.',
  }));
  const recipe = await answer(prompts.select({
    message: 'Choose your stack', options: [...recipes, { value: 'custom', label: 'Pick my own technologies' }],
  }));
  const choices = recipe === 'custom'
    ? await chooseTechnologies()
    : (await loadRecipe(recipe)).choices;
  const packageManager = await answer(prompts.select({
    message: 'Package manager', options: managers.map(value => ({ value, label: value })),
  }));
  const selection = resolveSelection({ name: basename(resolve(destination)), packageManager, description, choices });
  prompts.note(selection.choices.map(id => catalog[id].name).join('\n'), 'Your stack');
  const confirmed = await answer(prompts.confirm({ message: `Create ${destination}?` }));
  if (!confirmed) throw new Error('Creation cancelled. No project was written.');
  const result = await generateProject({ directory: destination, selection });
  prompts.outro(`Created ${result.directory}\nOpen it with your agent and say: Build from GENERATE.md`);
}

export async function createCommand(args = []) {
  const { values, positionals } = parseArgs({
    args, allowPositionals: true,
    options: {
      recipe: { type: 'string' }, choices: { type: 'string' }, description: { type: 'string' },
      'package-manager': { type: 'string' }, help: { type: 'boolean' },
    },
  });
  if (values.help) return process.stdout.write(help);
  if (positionals.length > 1) throw new Error(help);
  if (!values.recipe && !values.choices) {
    if (Object.keys(values).length) throw new Error('Supply --recipe or --choices when using options.');
    return wizard(positionals[0]);
  }
  if (values.recipe && values.choices) throw new Error('Choose --recipe or --choices, not both.');
  if (!positionals[0]) throw new Error('Supply a new project directory.');
  const choices = values.choices ? values.choices.split(',').map(id => id.trim()) : (await loadRecipe(values.recipe)).choices;
  const result = await generateProject({
    directory: positionals[0],
    selection: {
      name: basename(resolve(positionals[0])), packageManager: values['package-manager'] ?? 'npm',
      description: values.description ?? '', choices,
    },
  });
  process.stdout.write(`Created ${result.directory}\nOpen it with your agent and say: Build from GENERATE.md\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await createCommand(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
