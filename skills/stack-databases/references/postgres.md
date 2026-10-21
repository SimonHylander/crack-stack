# Set up PostgreSQL

Read [PostgreSQL's installation guide](https://www.postgresql.org/docs/current/tutorial-install.html). Choose a supported server release and record whether development uses a local installation, container, or hosted database. Use a named persistent volume for a local container.

Set a server-only `DATABASE_URL` and put its variable name in `.env.example`. Configure TLS according to the provider. Use one connection pool per server process, or a host-compatible driver for short-lived and edge runtimes. Create and close pools at the composition boundary.

If Drizzle is selected, follow [its recipe](drizzle.md). Otherwise choose a driver from PostgreSQL's supported client ecosystem and keep SQL in a persistence adapter. Use parameterized queries. Commit aggregate state and outbox rows in one transaction when durable events are selected.

Complete when the application connects, applies its schema, writes a record, and reads it back through the actual adapter. Verify rollback for a failed multi-write transaction.
