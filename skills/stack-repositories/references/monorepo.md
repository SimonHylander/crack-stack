# Set up a monorepo with Turborepo

Select `monorepo` in `stack.json`. Use Turborepo to run tasks across package-manager workspaces. Read the official [installation guide](https://turborepo.dev/docs/getting-started/installation), [repository structure](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository), and [task configuration](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks).

For a new workspace, run `npx create-turbo@latest` in a temporary directory using the selected package manager. Inspect the generated configuration and keep only applications and packages required by the project. For an existing workspace, install `turbo` as a root development dependency with the selected package manager, such as `npm install --save-dev turbo` or `pnpm add --save-dev --workspace-root turbo`.

Put deployable applications in `apps/` and shared packages in `packages/`. Configure those locations through the package manager's workspace settings. Keep one root lockfile and a root `packageManager` field with the chosen version. Each workspace owns its dependencies and scripts. Declare internal dependencies in package manifests using the package manager's supported syntax, and expose package entrypoints instead of importing sibling source paths.

Configure tasks in root `turbo.json` using the current `tasks` format. Make builds depend on dependency builds with `dependsOn: ["^build"]`. Set build outputs for the actual framework. Mark development servers as persistent with caching disabled. Include environment variables that affect cached task results, and keep secrets out of cached artifacts.

Place the selected frontend in an application workspace such as `apps/web/`. Keep the root selection for common choices. If applications need different frameworks, give each application its own `stack.json` and validate each separately. Apply one frontend recipe per application.

Complete when a clean root install resolves workspace dependencies and the locally installed `turbo run build` and relevant check tasks pass. Inspect a dry run to confirm dependency order. Repeat a build to verify cache reuse, then change a shared dependency and confirm the consuming app rebuilds.
