# Set up Effect

Read [Effect v4 onboarding](https://effect.website/docs/v4/onboarding) and the [upstream setup skill](https://github.com/Effect-TS/skills/blob/main/skills/effect-ts/SKILL.md).

## Install the library and agent guidance

For new projects, choose the current stable v4 release. Preserve an existing application's major version unless an upgrade is requested. Check peer dependencies for each integration, especially Confect.

Install `effect` in every runtime package that imports it. In a monorepo, a root development dependency can expose source for agent lookup. Runtime packages still declare their own dependency.

Install the upstream skill with `npx skills add Effect-TS/skills`. Add project instructions to read the installed `node_modules/effect/AGENTS.md` fully before writing Effect code. Direct agents to `node_modules/effect/src` for APIs the guide does not cover. Resolve these paths from the package that owns the dependency.

## Integrate effects

Follow the installed package's guidance when web examples target a different version. Model expected failures in the error channel. Use scoped resource lifecycles and run programs at application entrypoints. For Functional core, keep deterministic decisions pure.

## Verify

Run type checking. Exercise success and an expected failure through a real program. If an adapter acquires resources, verify cleanup.
