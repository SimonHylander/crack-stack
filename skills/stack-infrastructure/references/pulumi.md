# Set up Pulumi

Read [Pulumi's getting started guide](https://www.pulumi.com/docs/get-started/) and choose the provider's TypeScript template.

## Configure the project

Install the CLI for the operating system and confirm `pulumi version`. Initialize the provider template under `infra/pulumi/`. Declare dependencies in that project. Follow the repository's workspace and lockfile conventions.

Select the state backend and environment stack. Use provider credential chains for access and Pulumi secret configuration for secrets. Before committing stack configuration, confirm sensitive values are encrypted.

## Verify

Run the infrastructure TypeScript check. When credentials and state access are available, run `pulumi preview` for the development stack. Inspect the preview for unintended changes. After an authorized deployment, verify outputs and the application's endpoint.
