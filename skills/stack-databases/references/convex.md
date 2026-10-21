# Set up Convex

Read the [official React quickstart](https://docs.convex.dev/quickstart/react), or the selected framework's quickstart from the same docs. Install `convex` in the application package. Run the local CLI with `npx convex dev --once` to configure a development deployment and generate bindings. Choose local development or a cloud development deployment explicitly.

Keep Convex schema and functions under `convex/`. Use generated APIs and validators. Keep writes in mutations, external I/O in actions, and reads in queries. Put reusable deterministic rules outside transport handlers where the Convex bundler supports them. Convex functions own their database execution context, so application ports must use the current context.

If Confect is selected, follow [the Confect recipe](../../stack-libraries/references/confect.md) before writing schema or generated bindings. Use its code generation conventions rather than a parallel handwritten schema.

Configure the public deployment URL using the framework's environment conventions. Keep deploy keys private. Complete when code generation and type checking pass, and a real client mutation appears in a reactive query result.
