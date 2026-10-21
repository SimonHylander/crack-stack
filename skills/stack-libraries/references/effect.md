# Set up Effect

Read [Effect v4 onboarding](https://effect.website/docs/v4/onboarding) and the [upstream setup skill](https://github.com/Effect-TS/skills/blob/main/skills/effect-ts/SKILL.md). For new projects, target v4 and verify the current stable v4 release before installing `effect` in every runtime package that imports it. Keep an existing project's major version unless an upgrade is requested.

Install upstream agent guidance with `npx skills add Effect-TS/skills`. Add a project instruction to read the installed `node_modules/effect/AGENTS.md` fully before writing Effect code and consult `node_modules/effect/src` for API details. Resolve that path in the package that owns the dependency. In a monorepo, a root development dependency can make the source available, but runtime packages still declare their own dependency.

Use the installed package's guidance when web examples target another version. Check every Effect integration's peer range, especially Confect. Represent expected failures in the error channel, acquire resources with scoped lifecycles, and run programs at application entrypoints. Keep business decisions pure when Functional core is selected.

Complete when type checking passes and a real program exercises both success and an expected failure. Verify resource cleanup for adapters that acquire connections or clients.
