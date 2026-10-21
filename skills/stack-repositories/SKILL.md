---
name: stack-repositories
description: Set up a Turborepo monorepo or independent component repositories. Use when choosing or changing the repository layout.
---

# Set up the repository layout

Read the repository choice in `stack.json`. With neither layout selected, preserve the current structure.

Choose the matching recipe:

- For `monorepo`, read [Turborepo workspace setup](references/monorepo.md).
- For `polyrepo`, read [independent repository setup](references/polyrepo.md).

Apply the layout before scaffolding frameworks. Create applications and shared packages only when the requested feature needs them. Keep business modules inside the application or package that owns them.
