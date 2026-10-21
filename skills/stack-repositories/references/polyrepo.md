# Set up a polyrepo

Select `polyrepo` in `stack.json`. Use a separate repository for each independently owned application, service, or published package. Each repository owns its stack selection, dependency manifest, lockfile, checks, and release process. Apply this template separately to each component that needs it.

Start with the requested component in the current repository. Record its responsibility, related repository URLs, and integration contracts in its project instructions. Create additional remote repositories only when requested. Keep the frontend choice specific to the component that renders it, and leave frontend unselected for a backend-only service.

Integrate components through versioned APIs, event contracts, or published packages. Pin consumed package versions and define how consumers receive contract updates. Keep source imports inside the current repository or its installed dependencies. Use a separate development checkout when a change needs verification across repositories.

Run builds and checks independently in each repository using its package manager. Keep infrastructure ownership explicit so two repositories cannot manage the same resource. Add coordinated release ordering only when a contract change requires it.

Complete when the component installs and builds from a clean checkout without sibling source directories. Verify its real integration with the related component or a development endpoint. For a published shared package, verify the consumer against the packed or published artifact rather than a local source alias.
