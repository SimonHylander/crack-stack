---
name: stack-repositories
description: Set up a Turborepo monorepo or a polyrepo with independent component repositories. Use when selecting or changing the repository layout in crack-stack.
---

# Set up the repository layout

Read the repository choice in `stack.json`. Choose at most one layout. If neither is selected, preserve the current layout.

- Read [the monorepo recipe](references/monorepo.md) for one repository with Turborepo and package-manager workspaces.
- Read [the polyrepo recipe](references/polyrepo.md) for independently versioned component repositories.

Apply the layout before scaffolding frameworks. Keep the selected architecture inside each business module. Repository boundaries and business module boundaries can differ. Create applications and shared packages only when the requested feature needs them.
