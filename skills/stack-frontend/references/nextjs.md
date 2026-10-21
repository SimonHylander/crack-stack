# Set up Next.js

Read the [official installation guide](https://nextjs.org/docs/app/getting-started/installation).

## Set up the application

Run `npx create-next-app@latest my-app`. Select TypeScript and the App Router. Enable other options when the project requests them.

Keep framework files in `app/` or `src/app/`. Parse Server Action and Route Handler inputs before calling use cases. Mark database modules as server-only. Use client components where interaction or browser APIs require them.

Keep Next.js routing. Add TanStack Query when the feature needs client-side server-state management.

## Verify

Render a page and run the production build. If a server entrypoint is implemented, exercise it through the application. Check that private credentials and database modules stay out of the client bundle.
