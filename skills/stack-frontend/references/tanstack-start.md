# Set up TanStack Start

Read the [official getting started guide](https://tanstack.com/start/latest/docs/framework/react/getting-started).

## Set up the application

Use the guide's current generator. Select React and TypeScript. Before adding infrastructure, confirm that the host supports the required runtime and deployment adapter.

Keep routes in `src/routes/`. Call application use cases from server functions or server routes. Keep private dependencies and credentials in server-only modules. Use Start's TanStack Router configuration. Add Query, Form, or Table when the selected feature needs them.

## Verify

Render a route and run the production build. If the feature uses a server function, invoke it through the application. If storage is selected, write and read through that entrypoint.
