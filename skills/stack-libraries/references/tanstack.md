# Set up TanStack libraries

Start at [TanStack](https://tanstack.com/) and select individual libraries based on the feature. Record that subset in the project's instructions. Check the framework adapter and version before installation. Packages use independent release versions.

For remote server state, read [Query for React](https://tanstack.com/query/latest/docs/framework/react/installation) or [Query for Svelte](https://tanstack.com/query/latest/docs/framework/svelte/installation). Install the corresponding `@tanstack/react-query` or `@tanstack/svelte-query`. Scope server-side caches per request, and implement query keys and mutation invalidation around real application resources.

For client routing in a standalone React app, read [Router's docs](https://tanstack.com/router/latest/docs/framework/react/overview) and follow the current installation guide linked there. TanStack Start already owns Router configuration. Keep Next.js and SvelteKit routing when those frameworks are selected.

For forms, read [Form installation](https://tanstack.com/form/latest/docs/installation) and choose the framework adapter. For headless tables, read [Table installation](https://tanstack.com/table/latest/docs/installation) and confirm the selected major supports the target framework. Use that major's API and adapters.

For Convex, use its native reactive subscriptions unless the feature needs Query integration. If it does, follow Convex's maintained integration rather than duplicating the cache by hand.

Complete when every selected library is used by a real feature, the app builds, and its behavior works through the UI. For Query, verify that a mutation updates the visible data without a manual reload.
