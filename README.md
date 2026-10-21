# Crack stack

Preferred technologies, setup skills, and architecture boilerplate for coding agents. Pick a combination for each project. The template starts with no application dependencies selected.

## Start a project

1. Create a repository from this template, or clone it.
2. Edit `stack.json`. Use IDs from `node scripts/stack.mjs --list`, or copy a recipe from [examples/stacks](examples/stacks).
3. Run `node scripts/stack.mjs stack.json` with Node.js 24 or later. The command validates the selection and prints the relevant guide paths. It does not install packages or provision services.
4. Give your agent this instruction:

```text
Read AGENTS.md and skills/crack-stack/SKILL.md. Build the application described
below using stack.json. Read only the selected technology guides and their
official sources. Implement one working feature through the selected layers.

Application: <describe what you want to build>
```

The agent scaffolds the chosen framework in a temporary directory, merges its files into the project, and replaces this template's development scripts with application scripts as needed. It keeps the skills and stack selection available for later work.

## Available choices

- **R1 Repository:** Monorepo with Turborepo, or polyrepo with independent component repositories.
- **A1 Architecture:** Hexagonal, Clean, Event-driven, Domain-driven design, Functional core with an imperative shell.
- **D1 Data:** PostgreSQL, Convex, Neo4j, Pinecone, and Drizzle ORM for PostgreSQL.
- **I1 Infrastructure:** Terraform, Pulumi, or SST.
- **L1 Libraries:** [TanStack](https://tanstack.com/), [Effect v4](https://effect.website/docs/v4/onboarding), and [Confect](https://confect.dev/getting-started/introduction).
- **F1 Frontend:** TanStack Start, Next.js, React with Vite, or Svelte. The Svelte recipe offers SvelteKit for full-stack apps and Vite for a standalone UI.

Select at most one repository layout. Add `monorepo` or `polyrepo` to `choices`. With neither selected, keep the current layout. Use one frontend recipe per app. TanStack Start and Next.js already include React. Architecture patterns can be combined in one module layout. Multiple databases need explicit responsibilities. Drizzle targets PostgreSQL in this catalog. Confect requires both Effect and Convex. Use one infrastructure tool per resource owner.

The [recipes](examples/stacks) are example selections, not prebuilt integrations or a guarantee that every combination works on every deployment target. Each setup guide states its integration constraints and a completion check.

## Use the skills elsewhere

From an existing project, install the skills from a local template checkout with the [skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add /path/to/crack-stack
```

The seven skills cover composition, repository layout, architecture, frontend, data, libraries, and infrastructure. When using the composition skill outside a template clone, also copy `catalog.json`, `stack.json`, and `scripts/stack.mjs` from this repository. The installation alone provides the category setup skills.

For Effect, also install the [upstream skill](https://github.com/Effect-TS/skills/blob/main/skills/effect-ts/SKILL.md):

```sh
npx skills add Effect-TS/skills
```

Its instructions remain upstream so they can follow the installed Effect package.

## Run the architecture example

[The task example](examples/architecture/README.md) has a pure domain function, an application port, an in-memory adapter, and an atomic in-memory outbox. It runs without application libraries or external services.

```sh
npm ci
npm run check
npm run example -- "Build my next app"
```

`npm run check` validates local guide links, the example stack selections, TypeScript, and behavior tests. It does not provision or test hosted databases and infrastructure.
