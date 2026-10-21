# Set up a monorepo with Turborepo

Read the official [installation guide](https://turborepo.dev/docs/getting-started/installation), [repository structure](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository), and [task configuration](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks).

## Create the workspace

For a new workspace, run `npx create-turbo@latest` in a temporary directory with the selected package manager. Inspect the result and keep the applications and packages the project needs.

For an existing workspace, add `turbo` as a root development dependency. Use `npm install --save-dev turbo` or the selected package manager's equivalent.

Put deployable applications in `apps/` and shared packages in `packages/`. Declare those locations in the package manager's workspace configuration. Keep one root lockfile and set the root `packageManager` field to the chosen manager and version.

Each workspace owns its dependencies and scripts. Declare internal dependencies in package manifests using the package manager's supported syntax. Import shared code through package entrypoints.

## Configure applications and tasks

Put the frontend in an application workspace such as `apps/web/`. Keep common selections in the root `stack.json`. If applications need different frontends, give each its own selection and validate it separately.

Configure root `turbo.json` with the following task rules:

- Make builds depend on dependency builds with `dependsOn: ["^build"]`.
- Set cached build outputs to the selected framework's output paths.
- Mark development servers as persistent and disable their caching.
- Declare environment variables that affect task results. Keep secrets out of cached artifacts.

## Verify

Run a clean root install, then the locally installed `turbo run build` and the configured check tasks. Inspect a dry run for dependency order. Repeat the build to check cache reuse. If a shared package exists, change it and confirm the consuming application rebuilds, then undo the verification edit.
