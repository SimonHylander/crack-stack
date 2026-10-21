# Set up Svelte

## Choose the application type

For a full-stack application, read [SvelteKit's project setup](https://svelte.dev/docs/kit/creating-a-project). Run `npx sv create my-app` and select TypeScript.

For a standalone UI, read [Vite's setup guide](https://vite.dev/guide/). Run `npm create vite@latest my-app -- --template svelte-ts`.

Record the chosen variant in the project instructions.

## Integrate the application

For SvelteKit, keep pages and endpoints in `src/routes/` and server-only adapters in `src/lib/server/`. Call use cases from server loads, actions, or endpoints. Choose a deployment adapter for the host.

For a standalone UI, keep private storage access in a backend. For selected libraries, use their Svelte adapters. If Confect is selected, follow [its client integration instructions](../../stack-libraries/references/confect.md#integrate-the-client).

## Verify

Render a page and run the production build. For SvelteKit, build with the selected deployment adapter. If a backend feature is implemented, exercise it through the UI.
