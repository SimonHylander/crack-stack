# Set up Clerk

Read the [Clerk quickstarts](https://clerk.com/docs/getting-started/quickstart/overview) and choose the SDK for the selected framework.

## Configure the integration

For Next.js, follow the [App Router quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart). For TanStack Start, follow the [TanStack React Start quickstart](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart). For standalone React, follow the [React quickstart](https://clerk.com/docs/react/getting-started/quickstart).

Install the current SDK and configure its provider, server integration, and environment variables. Use the framework's public variable convention for the publishable key. Keep the secret key on the server.

Configure sign-in and sign-out destinations for the application's development origin. Use the installed SDK's server session verification for protected operations.

For Svelte, check the current SDK support in Clerk's docs before choosing an integration. React components and hooks apply only to React applications.

## Connect Convex when selected

Follow [Convex's Clerk integration](https://docs.convex.dev/auth/clerk). Configure the issuer and client provider for the chosen framework. Verify that the authenticated identity reaches Convex queries and mutations. Apply the same identity checks in Confect-backed functions when Confect is selected.

## Verify

Complete the checks in [the authentication skill](../SKILL.md). For Convex, call a protected function with a signed-in user, then confirm the same operation fails after sign-out.
