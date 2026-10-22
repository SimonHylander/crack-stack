# Set up Vercel

Read [Vercel's CLI documentation](https://vercel.com/docs/cli) and the selected framework's guide under [Vercel frameworks](https://vercel.com/docs/frameworks). Check the framework's supported versions and runtime requirements.

## Configure the project

Install the CLI and confirm `vercel --version`. Run `vercel link` from the app directory to connect it to a Vercel project. In a monorepo, link each deployed app and set its root directory in the project settings. Keep `.vercel/` out of Git.

Rely on framework detection before adding `vercel.json`. Add it only for settings the framework cannot express, such as rewrites, headers, or function configuration. Provision databases and storage through the [Vercel Marketplace](https://vercel.com/marketplace) so their credentials are injected as environment variables.

Store secrets as project environment variables, scoped to Development, Preview, or Production. Run `vercel env pull` to write local values and keep the pulled file out of Git.

## Verify

Run `vercel build` locally to confirm the project builds with Vercel's settings. When the project is linked and deployment is authorized, run `vercel deploy` for a preview deployment and exercise the deployed routes. Promote to production with `vercel deploy --prod` only when production deployment is in scope.
