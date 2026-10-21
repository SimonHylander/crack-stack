# Set up Terraform

Read [HashiCorp's CLI installation guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) and the selected provider's official getting started guide. Install the CLI using the method for the current operating system. Confirm with `terraform version`.

Keep HCL in `infra/terraform/`. Declare Terraform and provider version constraints. Configure state and locking for the selected backend, with separate state per environment. Use provider credentials from the environment or credential chain. State can contain secrets, so keep local state and plans out of Git. Commit `.terraform.lock.hcl`.

Run `terraform fmt -check`, `terraform init -backend=false`, and `terraform validate` for local verification. Run an environment-specific `terraform plan` when credentials and a backend are configured. Provision only the selected resources within the authorized deployment scope.

Complete when local validation passes and the intended environment's plan has been inspected. A successful plan does not verify that the application is deployed.
