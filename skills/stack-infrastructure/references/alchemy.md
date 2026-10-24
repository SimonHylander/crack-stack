# Set up Alchemy

Read [Alchemy's documentation](https://alchemy.run/getting-started/) and the provider pages for the resources the app needs. Alchemy v2 is in beta with breaking changes, so check the installed major, its Effect peer dependency, and the runtime requirements.

## Configure the project

Install `alchemy`, the provider packages, and the Effect packages the guide lists. Keep the stack in `alchemy.run.ts` where the CLI expects it. Define resources as Effect programs and bind them to application code through the documented mechanism.

Connect provider credentials with `alchemy profile`, and keep a separate profile for production. Local state in `.alchemy/` works for solo development only. For shared or CI deploys, set the stack's `state` to a remote store that matches the provider, such as `Cloudflare.state()`, `AWS.state()`, or `postgresState()`. Keep `.alchemy/` out of Git.

Use stages for environments. The default stage is per developer, so name preview and production stages explicitly.

## Verify

Type-check `alchemy.run.ts` and build the selected framework. Run `alchemy plan` before deployment. After an authorized development deployment, exercise the deployed route and any selected storage operation. Run `alchemy destroy` for stages the task created and no longer needs.
