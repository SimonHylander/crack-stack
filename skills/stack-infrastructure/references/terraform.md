# Set up Terraform

Read [HashiCorp's CLI installation guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) and the selected provider's getting started guide.

## Configure the project

Install the CLI for the operating system and confirm `terraform version`. Put HCL in `infra/terraform/`. Declare Terraform and provider version constraints.

Configure state and locking for the chosen backend. Supply credentials through the environment or provider credential chain. Keep state and saved plans out of Git because they can contain secrets. Commit `.terraform.lock.hcl`.

## Verify

Run `terraform fmt -check`, `terraform init -backend=false`, and `terraform validate` in the configuration directory.

When credentials and the backend are available, initialize that backend and inspect an environment-specific `terraform plan`. Report local validation and plan results separately. After an authorized deployment, verify its outputs and the deployed feature.
