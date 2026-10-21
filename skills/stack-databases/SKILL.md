---
name: stack-databases
description: Set up PostgreSQL, Convex, Neo4j, Pinecone, or Drizzle for PostgreSQL. Use when adding or integrating selected persistence.
---

# Set up persistence

Read the recipe for each selected store or ORM:

- For `postgres`, read [PostgreSQL setup](references/postgres.md).
- For `convex`, read [Convex setup](references/convex.md).
- For `neo4j`, read [Neo4j setup](references/neo4j.md).
- For `pinecone`, read [Pinecone setup](references/pinecone.md).
- For `drizzle`, read [Drizzle with PostgreSQL setup](references/drizzle.md).

Keep private credentials and direct database clients on the server. Document environment variable names in `.env.example`.

When several stores are selected, record which store owns each entity. Define how projections update, retry, and recover across stores. Keep transactions within the store that owns the invariant.

Keep schema changes and migrations in version control. Verify each selected adapter against its development service using the recipe's checks.
