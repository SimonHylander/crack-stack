# Set up PostgreSQL

Read [PostgreSQL's installation guide](https://www.postgresql.org/docs/current/tutorial-install.html).

## Configure the server and client

Choose a supported release. Record whether development uses a local installation, container, or hosted database. For a container, use a named persistent volume.

Configure a server-only `DATABASE_URL` and the provider's required TLS settings. Use one connection pool per server process. For short-lived or edge runtimes, choose a compatible driver and connection strategy. Acquire and close connections at the application lifecycle boundary.

If Drizzle is selected, follow [Drizzle setup](drizzle.md). Otherwise, keep parameterized SQL in a persistence adapter. For durable events, commit aggregate state and outbox rows in one transaction.

## Verify

Apply the schema to a development database. Write a record and read it through the actual adapter. If the feature uses a multi-write transaction, force a failure and verify rollback.
