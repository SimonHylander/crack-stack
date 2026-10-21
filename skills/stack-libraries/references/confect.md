# Set up Confect

Read the [introduction](https://confect.dev/getting-started/introduction) and [quickstart](https://confect.dev/getting-started/quickstart). Use the [documentation index](https://confect.dev/llms.txt) to find topic-specific guidance.

## Set up the backend

Select `effect` and `convex` alongside `confect`. Follow [Effect setup](effect.md) and the quickstart's runtime and peer dependency requirements.

Use the quickstart's package list for the installed Confect release. Keep strict TypeScript enabled. Follow its generation order: initialize Convex development, define tables, generate table bindings, then add function specs and implementations.

Keep source in the directories required by the Confect CLI. Preserve Convex deployment entrypoints and let code generation own generated schemas and bindings.

## Integrate the client

For React, use the quickstart's `@confect/react` integration. For Svelte, verify the backend-only integration and supported Convex client transport before implementing the client. Confect's React hooks are specific to React.

Use the frontend's environment conventions for the deployment URL. Copy Vite variable names only into a Vite application.

## Verify

Run Confect and Convex code generation and type checking. Submit a mutation and confirm a real client query decodes the saved value. Submit an invalid payload and confirm the function boundary rejects it.
