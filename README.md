# Crack stack

Preferred technologies, setup skills, and architecture boilerplate for coding agents. Pick a combination for each project. The template starts with no application dependencies selected.

## Create a project

Install the CLI dependencies once with `pnpm install --frozen-lockfile`. Then run:

```sh
pnpm run create
```

Choose a project directory, describe the application, and pick a preset or a custom stack. Choose Clerk, WorkOS AuthKit, or no auth. The CLI includes required technologies automatically and shows the final selection before creating the folder.

The generated project contains `stack.json`, the setup skills, and a `GENERATE.md` brief with your requirements and selected recipes. Open that folder with your coding agent and say:

```text
Build from GENERATE.md.
```

The agent uses the brief to scaffold the chosen frameworks and implement the application. The CLI prepares the template and instructions. It leaves package installation and cloud provisioning to the implementation step.

For a scripted setup, supply the same choices directly:

```sh
pnpm run create my-app --recipe react-convex --description "A shared notes app"
```

Run `pnpm run create --help` for the custom choice and package-manager options. `pnpm run stack` opens the same interactive flow. Existing selections can still be inspected with `node scripts/stack.mjs stack.json`.

## Available choices

- **R1 Repository:** Monorepo with Turborepo, or polyrepo with independent component repositories.
- **A1 Architecture:** Hexagonal, Clean, Event-driven, Domain-driven design, Functional core with an imperative shell.
- **D1 Data:** PostgreSQL, Convex, Neo4j, Pinecone, and Drizzle ORM for PostgreSQL.
- **AU1 Authentication:** Clerk or WorkOS AuthKit.
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

The skills cover composition, repository layout, architecture, frontend, data, libraries, authentication, and infrastructure. For an existing application, use a template checkout to run the selection CLI against the application's `stack.json`.

For Effect, also install the [upstream skill](https://github.com/Effect-TS/skills/blob/main/skills/effect-ts/SKILL.md):

```sh
npx skills add Effect-TS/skills
```

Its instructions remain upstream so they can follow the installed Effect package.

## Run the architecture example

[The task example](examples/architecture/README.md) has a pure domain function, an application port, an in-memory adapter, and an atomic in-memory outbox. It runs without application libraries or external services.

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run example "Build my next app"
```

`pnpm run check` validates local guide links, the example stack selections, TypeScript, and behavior tests. It does not provision or test hosted databases and infrastructure.

## Release a version

Run `pnpm changeset` for a releasable change. Select `crack-stack`, choose a patch, minor, or major bump, and describe the change. Commit the generated `.changeset/*.md` file with your changes.

On pushes to `main`, the release workflow checks the project and opens or updates a release PR with the version bump and `CHANGELOG.md`. Merge that PR to create a Git tag and GitHub release with the changelog entry. The package stays private and is not published to npm. The initial changeset releases version `0.1.0`.

The workflow uses the built-in GitHub token. In the repository's **Settings > Actions > General**, enable **Allow GitHub Actions to create and approve pull requests**. See the [Changesets automation guide](https://changesets.dev/guide/automating) for the action setup.
