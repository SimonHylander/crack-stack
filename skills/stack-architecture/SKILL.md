---
name: stack-architecture
description: Structure application modules using Hexagonal, Clean, Event-driven, Domain-driven design, or Functional core with an imperative shell. Use for crack-stack architecture selection and implementation.
---

# Structure the selected architecture

Read the selected patterns in `stack.json`. Combine them in one layout, and create directories only when they contain working code. The [runnable task example](../../examples/architecture/README.md) demonstrates the shared structure. In an installed skills bundle, fetch the example from the [source repository](https://github.com/SimonHylander/crack-stack/tree/main/examples/architecture) if it is absent.

For each business module, use the following ownership:

```text
src/modules/<business-capability>/
  domain/          Values, states, decisions, domain events
  application/     Use cases and ports required by those use cases
  adapters/        Persistence, network clients, transport mapping
```

The framework entrypoint or a dedicated composition module wires concrete adapters to use cases. `domain` imports no application, framework, database, or infrastructure modules. `application` imports the domain and declares the interfaces it needs. Adapters depend on those interfaces. Start with files in a single module and introduce packages only when a real boundary needs them.

## Hexagonal architecture

Declare ports around required capabilities, such as `TaskStore.createWithEvents`. Implement persistence and external APIs as adapters. HTTP handlers, CLI commands, and queue consumers call the same use case. Pass dependencies as function arguments. When Effect is selected, services and layers can implement this wiring.

Verify the use case through an in-memory adapter without starting a framework or database. Separately verify each real adapter against its service.

Source: [Alistair Cockburn's original article](https://alistair.cockburn.us/hexagonal-architecture).

## Clean architecture

Keep dependency direction toward domain policy. Use cases own orchestration and port definitions. Convert framework request data into application inputs at the entrypoint, and map application results to transport responses there. Keep ORM rows and framework request objects in adapters.

Verify domain and use-case tests without framework initialization. Inspect imports to confirm the domain and application cannot reach concrete adapters.

Source: [Robert C. Martin's dependency rule](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Event-driven architecture

Represent completed business facts as immutable event values. Distinguish local domain events, integration events, and event sourcing before implementing delivery. A domain event alone does not require a broker.

For durable external delivery, commit state and pending events in the same database transaction. Deliver from an outbox with retry and a stable event ID. Make consumers idempotent at their persistence boundary. Define ordering per entity only when required, and version contracts consumed outside the module. Never claim exactly-once delivery from an ordinary publish call.

The example records an atomic in-memory outbox. A deployed system needs a durable store, a dispatcher, and consumer deduplication. These are application work, not included infrastructure.

Verify that failed commits produce neither state nor events. For a real dispatcher, retry delivery and confirm the consumer applies the effect once.

Source: [Martin Fowler on event-driven patterns](https://martinfowler.com/articles/201701-event-driven.html).

## Domain-driven design

Name modules after business capabilities. Define domain terms with the people who use the product. Keep aggregate invariants in domain functions and commit changes within one aggregate transaction. Model states with discriminated unions and derive persistence shapes at the adapter boundary.

Use value objects when validation or identity needs them. Introduce bounded contexts when the same term has different meanings or responsibilities. Keep context contracts explicit. A CRUD feature can remain a small module without aggregates, repositories, or a shared domain package.

Verify business rules with literal inputs and expected outcomes. Keep one context's internal entities out of another context's public contract.

Source: [Eric Evans' DDD reference](https://www.domainlanguage.com/ddd/reference/).

## Functional core, imperative shell

Make business decisions in pure functions that accept data and return results or events. Pass time, IDs, and prior state as inputs. Keep database access, environment reads, logging, and network effects in the surrounding application and adapters.

When Effect is selected, use Effect for shell orchestration and keep deterministic decisions pure where useful. Run the Effect runtime at an entrypoint rather than inside domain functions.

Verify decisions without mocks. Verify observable persistence and error behavior through the shell.

Source: [Gary Bernhardt's functional core, imperative shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell).
