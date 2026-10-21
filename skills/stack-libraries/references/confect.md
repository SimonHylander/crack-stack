# Set up Confect

Read the [introduction](https://confect.dev/getting-started/introduction), [quickstart](https://confect.dev/getting-started/quickstart), and [documentation index](https://confect.dev/llms.txt). Select both `effect` and `convex`. Verify the current Node.js minimum and all package peer dependencies before installation.

Follow the quickstart's current package list and generation order. For a React client, its setup includes `effect`, `convex`, `@confect/core`, `@confect/server`, `@confect/cli`, and `@confect/react`. Keep strict TypeScript enabled. Initialize Convex development, define tables, generate table bindings, then add function specs and implementations using the current generated conventions.

Keep Confect source under the directories required by its CLI and preserve Convex's deployment entrypoints. Generated files belong to code generation. Consult the quickstart for how source, generated schemas, functions, and references connect, because these conventions can change across major versions.

Use `@confect/react` only in React applications. For Svelte, verify the backend-only path and supported client transport before claiming an integrated setup. Use the framework's environment conventions instead of copying Vite variable names into Next.js or SvelteKit.

Complete when Confect and Convex code generation pass, a mutation persists a value, and a real client query decodes and displays it. Verify an invalid payload is rejected at the function boundary.
