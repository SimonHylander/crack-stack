# Working with crack-stack

This repository holds selectable stack preferences. `stack.json` records the choices for a project. An empty `choices` array means no technologies have been selected.

For a new project, run `pnpm run create` to choose the stack and generate a project folder. The generated `GENERATE.md` records the application requirements and selected recipes.

For a stack change, read [the composition skill](skills/crack-stack/SKILL.md). Run `node scripts/stack.mjs stack.json` to validate the choices and find only their setup guides. `catalog.json` owns the available IDs and dependencies.

Before installing a selected technology, read its guide and linked official setup documentation. Verify the current package versions and peer dependencies. Preserve the project's package manager and framework conventions.

When changing the architecture, read [the architecture skill](skills/stack-architecture/SKILL.md). Copy only the parts of [the runnable example](examples/architecture/README.md) that the selected patterns need.

Keep implementation simple, use inferred TypeScript types, and model states with discriminated unions. Add dependencies only for selected technologies. Keep credentials in ignored environment files and document names in `.env.example`.

Run `pnpm install --frozen-lockfile` and `pnpm run check` to verify changes to this template. Technology guides include separate checks for generated applications.
