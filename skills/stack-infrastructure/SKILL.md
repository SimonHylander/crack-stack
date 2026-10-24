---
name: stack-infrastructure
description: Set up Vercel, Terraform, Pulumi, SST, or Alchemy. Use when initializing infrastructure or preparing a deployment for the selected stack.
---

# Set up infrastructure

Read the recipe for the selected tool. When no tool is selected, default to Vercel if the app runs on a framework Vercel supports.

- For `vercel`, read [Vercel setup](references/vercel.md).
- For `terraform`, read [Terraform setup](references/terraform.md).
- For `pulumi`, read [Pulumi setup](references/pulumi.md).
- For `sst`, read [SST setup](references/sst.md).
- For `alchemy`, read [Alchemy setup](references/alchemy.md).

Assign one tool and repository to each managed resource. Before provisioning, record the provider, region, environment, and state backend. Keep development and production state separate.

Put infrastructure under `infra/` unless the tool requires a root configuration. Run deployments within the task's authorized scope. A setup or planning request alone does not authorize cloud deployment.

Report local validation, preview, and deployment results separately. State which stages could not run and why.
