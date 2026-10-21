# Set up TanStack Start

Read the [official getting started guide](https://tanstack.com/start/latest/docs/framework/react/getting-started) and use its current generator. Select the React variant and TypeScript. Verify the chosen hosting target's server runtime and deployment adapter before adding infrastructure.

Keep route files in `src/routes/`. Wire use cases into server functions or server routes. Keep server-only dependencies and credentials out of components. Start owns routing through TanStack Router. Add Query, Form, and Table only for selected features.

Complete when a route renders, a server function executes a use case, and the production build succeeds. If storage is selected, verify a write and read through that function.
