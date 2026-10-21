# Task creation example

This example creates a task and records a domain event. It combines the five architecture preferences in one business module. It has no runtime dependencies and uses Node.js 24's TypeScript support.

Run these commands from the repository root:

```sh
npm ci
npm run check
npm run example -- "Build my next app"
```

The example prints a successful task result and one `TaskCreated` event in the pending outbox. An empty title fails without writing either value.

## Files and responsibilities

- **F1** [domain/task.ts](src/domain/task.ts) trims and validates the title, then returns a task and an event. It reads no clock, environment, or persistence.
- **F2** [application/create-task.ts](src/application/create-task.ts) runs the decision and commits through its `TaskStore` port.
- **F3** [adapters/memory-task-store.ts](src/adapters/memory-task-store.ts) implements atomic in-memory creation of a task and its pending events. Duplicate IDs leave both unchanged.
- **F4** [bootstrap.ts](src/bootstrap.ts) supplies IDs, time, and the concrete store. It is the composition entrypoint.
- **F5** [task.test.ts](src/task.test.ts) verifies successful creation, rejected input, and duplicate writes through the use case and actual memory adapter.

The domain function supplies the functional core. The use case and adapter supply the imperative shell. The application port and dependency direction implement the Hexagonal and Clean boundaries. Task creation is the business operation and the task is the aggregate for this example. `TaskCreated` is a versioned domain event.

## Adapt the example

Copy the domain, application, and adapter files into a business module only when those layers fit the selected patterns. Call the use case from the framework's server entrypoint. For Effect, the promise-based port can become an Effect service without changing the pure decision.

Replace the memory adapter with the selected store. Preserve atomic state and event persistence with a transaction and an identity constraint. The memory adapter loses data on process exit and provides no delivery worker. For external event delivery, add durable outbox dispatch and consumer deduplication according to the application's requirements.

The transport entrypoint must parse unknown input before calling the typed application function. This CLI accepts a title string from Node.js and supplies its own IDs and timestamp. Production IDs, timestamps, and persistence data need the validation appropriate to their source.
