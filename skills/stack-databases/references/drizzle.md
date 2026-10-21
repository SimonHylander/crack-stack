# Set up Drizzle with PostgreSQL

Read [Drizzle's PostgreSQL setup](https://orm.drizzle.team/docs/get-started/postgresql-new). This template's Drizzle recipe requires `postgres`. Verify the ORM and Drizzle Kit release channels together. The official guide may target a prerelease, so choose and record stable or prerelease explicitly.

For the `pg` driver, install `drizzle-orm` and `pg` as runtime dependencies, and `drizzle-kit` and `@types/pg` as development dependencies. Add environment loading only if the runtime does not supply it. Put table definitions in the database adapter, migration output in `drizzle/`, and connection settings in `drizzle.config.ts`.

Use Drizzle's inferred select and insert types inside persistence code. Map rows into domain values at the adapter boundary. Generate versioned SQL with the installed `drizzle-kit generate`, inspect it, and apply it with the installed migration command. Keep one schema migration owner.

Complete when migrations apply to a fresh development database and a use case writes and reads through the Drizzle adapter. Verify a transaction rolls back both state and outbox writes on failure when events are selected.
