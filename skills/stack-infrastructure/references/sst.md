# Set up SST

Read [SST's documentation](https://sst.dev/docs/) and the selected framework's deployment guide. Check the current major, provider support, and runtime requirements.

## Configure the project

Follow the guide's CLI installation and initialization steps. Keep `sst.config.ts` where the CLI expects it. Define resources with that major's components and link them to application code through the documented mechanism.

Use named stages for environments. Store secrets in SST or the provider's secret store. Account for resources created by SST development commands when defining deployment scope.

## Verify

Type-check the configuration and build the selected framework. Use the installed CLI's supported diff or preview workflow before deployment. After an authorized development deployment, exercise the deployed route and any selected storage operation.
