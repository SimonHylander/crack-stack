# Set up Neo4j

Read the [JavaScript driver installation guide](https://neo4j.com/docs/javascript-manual/current/install/). Choose a local Neo4j instance or Aura development database. Install `neo4j-driver` in the server package.

Configure server-only `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`, and the database name. Create one driver per process, scope sessions to operations, and close sessions and the driver at their lifecycle boundaries. Put parameterized Cypher in adapters. Create constraints for identities used by writes.

When Neo4j projects data owned by another database, define event identity, retry behavior, and a rebuild command. Keep primary transactions in one store.

Complete when connectivity verification passes, a transaction creates a node and relationship, and a parameterized traversal returns the expected result through the adapter.
