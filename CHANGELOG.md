# crack-stack

## 0.1.0

### Minor Changes

- a336557: Generated projects include a `.agents/` workspace following the [.agents protocol](https://dotagentsprotocol.com): `skills/`, `agents/`, `tasks/`, `knowledge/`, `mcp.json`, and `agents.md` linked to the root `AGENTS.md`. `.claude` and `.codex` link to `.agents`, and `CLAUDE.md` links to `AGENTS.md`.
- db09421: Generated projects include `docs/` and `research/` directories, each with a README that defines its purpose.
- cbb3e0a: Add Vercel as an infrastructure choice with a setup recipe. The infrastructure skill defaults to Vercel when no tool is selected.

## 0.0.1

### Patch Changes

- 8e73bb9: Publish the crack-stack CLI, setup skills, and architecture example to npm.
