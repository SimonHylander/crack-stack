# Set up React

Read [React's standalone app guide](https://react.dev/learn/build-a-react-app-from-scratch) and [Vite's setup guide](https://vite.dev/guide/).

## Set up the application

Run `npm create vite@latest my-app -- --template react-ts` for a standalone React and TypeScript client. For a selected TanStack Start or Next.js application, use that framework's recipe instead.

Keep database drivers and private SDKs in a backend, or in Convex functions when Convex is selected. Treat browser environment variables as public.

## Verify

Render the client and run its production build. If a backend is selected, exercise a requested feature through the real client request path.
