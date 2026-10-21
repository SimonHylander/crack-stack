# Set up Pinecone

Read the [official Node.js SDK guide](https://docs.pinecone.io/reference/sdks/node/overview). Install `@pinecone-database/pinecone` in the server package. Check the current SDK runtime requirements and API version.

Configure server-only `PINECONE_API_KEY` and an index host or name. Define the embedding model, dimension, similarity metric, and namespace strategy before creating an index. Match SDK calls to the installed SDK version.

Record which store owns source documents. Use stable vector IDs so retried upserts replace the same record. Define update, delete, and rebuild behavior for the vector projection. Query only the authorized namespace and metadata scope. Account for index readiness and eventual consistency in verification.

Complete when a known document is indexed and a query returns that document, then verify that deletion removes it from results. Run this against a development index through the real server adapter.
