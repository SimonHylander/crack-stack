# Set up Drizzle with PostgreSQL

Read [Drizzle's PostgreSQL setup](https://orm.drizzle.team/docs/get-started/postgresql-new). This catalog's Drizzle recipe targets PostgreSQL.

## Configure the adapter and schema

Choose compatible ORM and Drizzle Kit releases. If the official example targets a prerelease, select and record the intended release channel.

For the `pg` driver, install `drizzle-orm` and `pg` as runtime dependencies. Install `drizzle-kit` and `@types/pg` as development dependencies. Add environment loading if the runtime needs it.

Keep table definitions in the database adapter, migration output in `drizzle/`, and connection configuration in `drizzle.config.ts`. Use inferred insert and select types inside persistence code. Map rows to domain values at the adapter boundary.

Generate SQL with the installed `drizzle-kit generate`. Inspect the migration before applying it with the installed migration command. Keep one migration owner for the schema.

## Verify

Apply migrations to a fresh development database. Write and read through the application's Drizzle adapter. If durable events are selected, force a transaction failure and confirm both state and outbox writes roll back.
