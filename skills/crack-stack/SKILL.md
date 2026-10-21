---
name: crack-stack
description: Compose a new project or change a stack using Simon's preferred technologies and architecture recipes. Use when selecting a crack-stack combination or bootstrapping from this template.
---

# Compose a stack

When working outside a template clone, use the [source repository](https://github.com/SimonHylander/crack-stack) for `catalog.json`, `stack.json`, and `scripts/stack.mjs`. Installed skill directories may omit these root files. Read category skills from this installed bundle or from that repository.

1. Read the application's requirements and the project's `stack.json`. For IDs, run `node scripts/stack.mjs --list`. Record explicit technology choices in `stack.json`. If a choice changes product behavior and the request leaves it open, ask the user. Leave unused categories empty.
2. Run `node scripts/stack.mjs stack.json`. Resolve invalid combinations before installing. Read only the selected guides and the category skill that contains each guide. The printed paths are relative to the template root.
3. Read the official setup pages linked by those guides. Check release channels, runtime constraints, and peer dependencies. For a new project, use `packageManager` from `stack.json` and replace the template's tooling lockfile if needed. For an existing application, preserve its lockfile's package manager and update the selection to match.
4. Scaffold the chosen frontend into a temporary directory using its official CLI. Inspect the generated files, then merge them into the destination without overwriting its instructions, selection, or unrelated work. Place runtime dependencies in the package that imports them. Commit the lockfile.
5. Apply only selected architecture patterns. Use [stack-architecture](../stack-architecture/SKILL.md) for their shared module layout. Keep framework entrypoints where the framework expects them.
6. Integrate selected storage and libraries, then infrastructure if selected. For multiple stores, record which data each owns and how projections update. For TanStack, record which individual libraries are needed in the project's instructions.
7. Prove one feature works through its real entrypoint and selected persistence. Run the framework build, type checker, focused behavior tests, and each guide's completion check. Report missing credentials or unavailable services as unverified work.

Keep `stack.json` current when choices change. Replace template development configuration with the application's configuration where needed, and preserve the setup guidance for future agents. Record installed versions and actual verification commands in the application's README.
