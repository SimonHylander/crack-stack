# Set up Convex

Read the [official React quickstart](https://docs.convex.dev/quickstart/react), or find the selected framework's quickstart in the same docs.

If Confect is selected, follow [Confect setup](../../stack-libraries/references/confect.md) before writing schemas or generated bindings.

## Configure the deployment and functions

Install `convex` in the application package. Choose a local or cloud development deployment. Run `npx convex dev --once` to configure it and generate bindings.

Keep schema and functions under `convex/`. Use generated APIs and validators. Implement reads as queries, writes as mutations, and external I/O as actions. Pass the current function context to adapters that need database access.

Configure the public deployment URL using the frontend's environment conventions. Keep deploy keys private.

## Verify

Run code generation and type checking. Submit a mutation through the real client and confirm the value appears in a reactive query result.
