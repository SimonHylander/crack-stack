# Set up WorkOS AuthKit

Read [WorkOS AuthKit setup](https://workos.com/docs/authkit) and select the integration for the application's framework and runtime.

## Configure the integration

For Next.js, follow the [Next.js guide](https://workos.com/docs/authkit/nextjs). For a standalone React client, follow the [React guide](https://workos.com/docs/authkit/react). For other frameworks, use the current supported SDK or server integration from the AuthKit docs.

Install the chosen SDK. Configure the client ID, redirect URI, and any server API key or session-encryption secret required by that integration. Keep private values on the server. Register the callback URI for the actual development origin.

Implement sign-in, callback handling, session verification, and sign-out through the SDK's documented flow. Use its cookie and token configuration for the selected runtime. For TanStack Start or SvelteKit, confirm the supported integration before adapting an example from another framework.

## Connect Convex when selected

Follow [Convex's WorkOS AuthKit integration](https://docs.convex.dev/auth/authkit). Choose an existing WorkOS account or a Convex-managed environment according to the project requirements. Configure token validation and the authenticated client using that guide. Verify identity in Convex functions, including Confect-backed functions when selected.

## Verify

Complete the checks in [the authentication skill](../SKILL.md). Confirm a fresh browser session can finish the callback flow and access a protected operation. For Convex, verify the signed-in identity reaches a protected query or mutation.
