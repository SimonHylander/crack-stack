# Set up Next.js

Read the [official installation guide](https://nextjs.org/docs/app/getting-started/installation). For a new app, start with `npx create-next-app@latest my-app` and select TypeScript and the App Router. Enable other generator options only when the project requests them.

Keep framework files in `app/` or `src/app/`. Server Actions and Route Handlers validate input and call application use cases. Mark database modules as server-only. Introduce client components only where browser APIs or interaction require them. Keep Next.js routing, and use TanStack Query for client server-state requirements rather than introducing a second router.

Complete when a page renders, a server entrypoint executes a use case, and the production build succeeds. Verify that no server secrets enter the client bundle.
