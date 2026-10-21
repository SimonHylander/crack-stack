---
name: stack-databases
description: Set up PostgreSQL, Convex, Neo4j, Pinecone, or Drizzle ORM. Use when installing or integrating a selected crack-stack data store.
---

# Set up databases

Read only the selected store's recipe. Keep credentials and database clients on the server. Record which store owns each entity when more than one is selected.

- Read [PostgreSQL](references/postgres.md) for relational persistence.
- Read [Convex](references/convex.md) for Convex schema, functions, and reactive clients.
- Read [Neo4j](references/neo4j.md) for graph persistence.
- Read [Pinecone](references/pinecone.md) for a vector index and its synchronization contract.
- Read [Drizzle](references/drizzle.md) for PostgreSQL schema and migrations.

Use transactions for invariants within a store. For projections across stores, define asynchronous updates, retries, and recovery. Keep schema changes and generated migrations in version control. Run each selected recipe's integration check before reporting storage complete.
