---
name: stack-auth
description: Set up Clerk or WorkOS AuthKit for a selected application stack. Use when adding authentication, protecting server entrypoints, or integrating identity with Convex.
---

# Set up authentication

Read the provider selected in `stack.json`. With no auth provider selected, leave authentication unconfigured.

- For `clerk`, read [Clerk setup](references/clerk.md).
- For `workos`, read [WorkOS AuthKit setup](references/workos.md).

Use the provider's SDK for the selected framework and runtime. Keep private keys on the server and document variable names in `.env.example`. Configure development and production callbacks for their respective environments.

Verify identity at server entrypoints before calling protected use cases. Derive the acting user's identity from the verified session or token. Enforce data ownership and organization access where the feature requires them.

Verify sign-in, sign-out, and a protected operation through the real application. Confirm anonymous requests cannot access the protected operation. If records belong to individual users or organizations, verify that one identity cannot access another's records.
