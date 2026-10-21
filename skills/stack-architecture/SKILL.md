---
name: stack-architecture
description: Structure business modules using Hexagonal, Clean, Event-driven, Domain-driven design, or Functional core with an imperative shell. Use when applying these patterns to application code.
---

# Structure business modules

Read the patterns selected in `stack.json` and apply only their sections below. Combine selected patterns in one module structure. Create directories when they contain working code.

For Hexagonal or Clean architecture, use this layout inside each business capability:

```text
src/modules/<business-capability>/
	domain/       Values, states, decisions, domain events
	application/  Use cases and the ports they require
	adapters/     Persistence, network clients, transport mapping
```

The framework entrypoint wires adapters to use cases. Keep domain decisions independent of frameworks and persistence. Start with files in one module, and introduce packages when a boundary needs them.

For a concrete implementation, read the [runnable task example](../../examples/architecture/README.md). If it is absent from an installed skill bundle, get `examples/architecture/` from a checkout of this template.

## Hexagonal architecture

Declare ports for capabilities the use case needs, such as `TaskStore.createWithEvents`. Implement them in adapters. Call the same use case from HTTP handlers, CLI commands, or queue consumers. Pass dependencies as arguments, or use services and layers when Effect is selected.

Verify the use case with an in-memory adapter. Verify each real adapter against its service.

Source: [Alistair Cockburn's original article](https://alistair.cockburn.us/hexagonal-architecture).

## Clean architecture

Keep imports directed toward domain policy. The application imports the domain and owns use cases and ports. Adapters import those ports. Parse transport input at the entrypoint and map application results to transport responses there. Keep ORM rows and framework request objects in adapters.

Verify that domain and use-case tests run without framework initialization. Inspect their imports for dependencies on concrete adapters.

Source: [Robert C. Martin's dependency rule](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Event-driven architecture

Represent completed business facts as immutable event values. Choose local domain events, integration events, or event sourcing according to the requirement. Add a broker only when delivery needs one.

For durable external delivery, commit state and pending events in the same transaction. Dispatch the outbox with retries and stable event IDs. Deduplicate consumed events at the consumer's persistence boundary. Define entity ordering when required, and version contracts consumed outside the module.

The runnable example records an in-memory outbox. For durable delivery, implement persistent storage, dispatch, and consumer deduplication.

Verify that a failed commit leaves both state and events unchanged. If dispatch is implemented, retry delivery and confirm the consumer applies the change once.

Source: [Martin Fowler on event-driven patterns](https://martinfowler.com/articles/201701-event-driven.html).

## Domain-driven design

Name modules after business capabilities. Define terms with the people who use the product. Keep aggregate invariants in domain functions, and commit each aggregate change in one transaction. Model distinct states with discriminated unions.

Use value objects where validation or identity needs them. Define bounded contexts when a term has different meanings or responsibilities. Expose explicit contracts between contexts. Keep a CRUD feature small when it needs no richer domain model.

Verify business rules with literal inputs and expected outcomes. Check that context contracts expose no internal entity types.

Source: [Eric Evans' DDD reference](https://www.domainlanguage.com/ddd/reference/).

## Functional core, imperative shell

Put business decisions in pure functions that accept data and return results or events. Supply time, IDs, and prior state as inputs. Keep persistence, environment reads, logging, and network effects in the surrounding application and adapters.

When Effect is selected, use it to orchestrate effects around pure decisions. Run the Effect runtime at an application entrypoint.

Verify decisions without mocks. Verify persistence and error behavior through the application entrypoint.

Source: [Gary Bernhardt's functional core, imperative shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell).
