# Set up Svelte

For a full-stack application, read [SvelteKit's project setup](https://svelte.dev/docs/kit/creating-a-project) and run `npx sv create my-app`. Select TypeScript. For a standalone UI, use [Vite](https://vite.dev/guide/) with `npm create vite@latest my-app -- --template svelte-ts`. Record which variant the project uses.

For SvelteKit, keep pages and endpoints in `src/routes/`, and server-only adapters in `src/lib/server/`. Call use cases from server loads, actions, or endpoints. Choose a deployment adapter that supports the selected host. For a standalone UI, keep storage access in a separate backend.

Use Svelte adapters for selected TanStack libraries. Confect's React hooks do not apply to Svelte. If Confect is selected for the backend, verify the current server integration and use the supported Convex client APIs for Svelte.

Complete when a page renders, a server or backend call executes a use case, and the production build succeeds with the chosen deployment adapter.
