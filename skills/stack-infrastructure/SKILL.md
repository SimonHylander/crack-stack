---
name: stack-infrastructure
description: Set up Terraform, Pulumi, or SST for a selected crack-stack deployment. Use for infrastructure initialization, configuration, and deployment planning.
---

# Set up infrastructure

Choose one owner for each resource. A project can integrate with resources managed elsewhere, but two tools must not manage the same resource.

- Read [Terraform](references/terraform.md) for HCL infrastructure.
- Read [Pulumi](references/pulumi.md) for TypeScript infrastructure.
- Read [SST](references/sst.md) for SST application infrastructure and framework deployment.

Record the provider, region, environment, state backend, and resource owner before provisioning. Keep infrastructure code under `infra/` unless the tool requires a root configuration. Use separate development and production state. Keep resource creation and deployment within the user's authorized scope. Generating code or a plan does not itself authorize cloud deployment.

Complete the selected guide's local validation, and report preview or deployment work that could not run because of credentials.
