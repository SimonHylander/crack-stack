# Set up Pulumi

Read [Pulumi's getting started guide](https://www.pulumi.com/docs/get-started/) and choose the cloud provider and TypeScript template. Install the CLI for the operating system and confirm with `pulumi version`.

Initialize a project under `infra/pulumi/` with the selected provider's TypeScript template. Keep its package dependencies and lockfile local to that project or workspace. Select a state backend and a separate stack for each environment. Use Pulumi secret configuration for secrets and provider credential chains for access. Commit project and stack configuration only after checking that sensitive values are encrypted.

Run the infrastructure TypeScript check and `pulumi preview` against the selected development stack. Keep resource ownership separate from any existing Terraform or SST project.

Complete when type checking passes and the preview contains only intended changes. Verify deployment outputs and the application's actual endpoint after an authorized deployment.
