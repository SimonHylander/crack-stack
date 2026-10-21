# Set up Neo4j

Read the [JavaScript driver installation guide](https://neo4j.com/docs/javascript-manual/current/install/).

## Configure the driver and schema

Choose a local instance or Aura development database. Install `neo4j-driver` in the server package. Configure `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`, and the database name as server-only settings.

Create one driver per process. Scope sessions to operations, and close sessions and the driver at their lifecycle boundaries. Put parameterized Cypher in adapters. Add constraints for identities used by writes.

If Neo4j projects another store's data, define event identity, retries, and a rebuild command. Keep primary transactions in the store that owns the data.

## Verify

Run the driver's connectivity check. Through the adapter, create a node and relationship in a transaction. Confirm a parameterized traversal returns the expected relationship.
