# Set up SST

Read [SST's documentation](https://sst.dev/docs/) and its guide for the selected framework. Verify the current major, provider support, runtime, and framework deployment component before initializing. Use the current CLI installation and initialization steps in that guide.

Keep `sst.config.ts` at the location required by SST. Use named stages to separate environments. Define resources with the selected major's components and link them to application code using its documented mechanism. Use SST secrets or the provider's secret store. Check which resources and state SST owns before integrating with existing infrastructure.

SST manages infrastructure using its own conventions. Do not add a second Pulumi project for the same resources. Check the current CLI's supported diff or preview workflow before deployment. SST development commands may create cloud resources, so include them in the deployment scope.

Complete when configuration type checking passes and the selected framework's build succeeds. After an authorized development deployment, verify the actual route and a selected storage operation through its deployed endpoint.
