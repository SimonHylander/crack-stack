---
name: crack-stack
description: Select or change a crack-stack combination and bootstrap its application. Use for project setup that spans repository layout, architecture, or multiple technologies.
---

# Compose a stack

If `GENERATE.md` exists, read it for the agreed application requirements and stack. Use `stack.json` as the project's selection. `catalog.json` defines the available IDs and dependencies.

If this skill was installed without the template tooling, use a template checkout for CLI commands. For validation, pass the absolute path to the application's `stack.json`. Resolve printed guide paths from the template root, or find the corresponding recipe in the installed skills.

## Confirm the selection

1. Read the requested application and `stack.json`. Use `node scripts/stack.mjs --list` to find available choices. The user-facing setup wizard is `npm run create`.
2. Record the requested choices. Leave unused categories empty. Ask about an unresolved choice only when it changes product behavior or deployment requirements.
3. Run `node scripts/stack.mjs stack.json`. Resolve every validation error before installing dependencies.

Continue when the selection matches the request and validation passes.

## Read the selected recipes

Use the CLI's guide paths to select the relevant skill. Read its entrypoint and only the recipes needed for this project.

- For `monorepo` or `polyrepo`, read [repository setup](../stack-repositories/SKILL.md).
- For architecture patterns, read [module structure](../stack-architecture/SKILL.md).
- For a frontend, read [frontend setup](../stack-frontend/SKILL.md).
- For storage or Drizzle, read [database setup](../stack-databases/SKILL.md).
- For Effect, Confect, or TanStack, read [library setup](../stack-libraries/SKILL.md).
- For infrastructure, read [infrastructure setup](../stack-infrastructure/SKILL.md).

Before installation, read each recipe's official setup source. Check runtime requirements, release channels, and peer dependencies against the versions you will install.

## Build the application

1. Choose the package manager. For a new project, use `packageManager` from `stack.json`. For an existing application, preserve its lockfile's manager and update the selection to match.
2. Apply the selected repository layout. For a new application, scaffold into a temporary directory, then inspect and merge the result. For an existing application, integrate into its current files. Preserve project instructions, selections, and unrelated work.
3. Apply the selected architecture inside the framework's file conventions. Install runtime dependencies in the packages that import them.
4. Integrate the selected libraries and stores. Add infrastructure only when selected. Follow each recipe's verification steps as its integration becomes runnable.

Replace template tooling with application tooling where needed, including the lockfile if the package manager changes. Keep the setup skills available for later work.

## Verify and hand over

Run the application's build, type checker, and focused behavior tests. Exercise one requested feature through its real entrypoint. If persistence is selected, include a write and read through the actual adapter.

Report each selected integration as verified or unverified, with the command or observed result. Identify any missing credentials or unavailable services. Keep `stack.json` current and record the application's verification commands in its README.
