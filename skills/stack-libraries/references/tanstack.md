# Set up TanStack libraries

Choose the individual libraries needed by the feature from [TanStack](https://tanstack.com/). Record the subset in the project instructions. Check each library's version and framework adapter independently.

## Choose the integration

For remote server state, read [Query for React](https://tanstack.com/query/latest/docs/framework/react/installation) or [Query for Svelte](https://tanstack.com/query/latest/docs/framework/svelte/installation). Install `@tanstack/react-query` or `@tanstack/svelte-query`. Define resource query keys and mutation invalidation. Scope server-side caches per request.

For routing in standalone React, follow [Router's documentation](https://tanstack.com/router/latest/docs/framework/react/overview). Keep the framework's existing router in TanStack Start, Next.js, and SvelteKit.

For forms, read [Form installation](https://tanstack.com/form/latest/docs/installation). For tables, read [Table installation](https://tanstack.com/table/latest/docs/installation). Install the adapter supported by the chosen framework and library major.

With Convex, use native reactive subscriptions unless the feature needs Query integration. If it does, follow Convex's maintained integration.

## Verify

Run the application build and exercise each selected library through a requested feature. If a Query-backed feature includes a mutation, confirm the visible data updates without a manual reload.
