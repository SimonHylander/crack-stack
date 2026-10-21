# Set up Pinecone

Read the [official Node.js SDK guide](https://docs.pinecone.io/reference/sdks/node/overview). Check the current runtime requirements and SDK API version.

## Configure the index and client

Install `@pinecone-database/pinecone` in the server package. Configure a server-only `PINECONE_API_KEY` and the index host or name.

Before creating an index, define the embedding model, dimension, similarity metric, and namespace strategy. Use the installed SDK's API.

Record which store owns source documents. Use stable vector IDs for retried upserts. Define update, deletion, and rebuild behavior for the index. Scope queries to authorized namespaces and metadata.

## Verify

Through the server adapter, index a known document and confirm a query returns it. Delete the document and confirm it disappears from results. Account for index readiness and eventual consistency when checking results.
