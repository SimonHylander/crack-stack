# Set up a polyrepo

Use one repository for each independently owned application, service, or published package. Each repository owns its selection, dependencies, lockfile, checks, and releases.

## Set up the requested component

Apply this template to the current component. Record its responsibility, related repository URLs, and integration contracts in its project instructions. Create additional remote repositories only when requested.

Keep frontend choices in the repositories that render them. Leave frontend unselected for a backend-only service.

## Connect repositories

Integrate through versioned APIs, event contracts, or published packages. Pin consumed package versions and define how consumers receive contract updates. Import code from the current repository or installed dependencies.

Keep builds and checks independent. Assign each infrastructure resource to one repository. Add release ordering when a contract change requires coordinated releases.

## Verify

Install and build the component from a clean checkout without sibling source directories. Exercise its integration with the related component or a development endpoint.

For a shared package, verify the consumer against the packed or published artifact. For a change spanning repositories, use separate development checkouts and verify each affected component.
