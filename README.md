# SUMOBOTS Website

This is the official website for the UNSW MTRNSoc SUMOBOTS competition. Built with **Next.js**, styled with **TailwindCSS**, and deployed on **Cloudflare Workers** via [OpenNext.js](https://github.com/sst/next-on-pages).

⚠️ **Important Note**: Do **not** use `yarn` as this project is deployed to Cloudflare Workers. Having both `yarn.lock` and `package-lock.json` in the project may **overload the build** during deployment.

## 🚀 Getting Started

To set up the development environment:

1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd ramsoc-sumobots-website
   ```
2. Create a `.env` file and a `.dev.vars` file at project root. Ask the IT directors for the env keys.
2. Install dependencies (use npm, not yarn!)
    ```bash
    npm install
    ```

3.	Run the local development server
    ```bash
    npm run dev
    ```

## 🚦 Pre-Deployment Checklist

Before deploying, make sure to:
1. Lint the project:
    ```bash
    npm run lint
    ```

2. Preview the site locally to confirm all features work:
    ```bash
    npm run preview
    ```

## 🌐 Deploying to Cloudflare Workers

This website is automatically built and deployed when changes are merged into the dev branch.

Deployment Workflow
1.	Create a pull request with your changes.
2.	Once approved and merged into the dev branch, deployment will begin automatically via Cloudflare Workers.

> Note: Cloudflare Workers does not support preview URLs for PRs at this time. Use `npm run preview` locally to verify your implementation before submitting a PR.

## 📦 Scripts Overview
- `npm run dev` – Launches local development server with Turbopack
- `npm run preview` – Starts local preview using Cloudflare Workers
- `npm run lint` – Lints codebase
- `npm run deploy` – Runs preview and deploys using Wrangler (DO NOT RUN THIS)
- `npm run cf-typegen` – Generates Cloudflare environment typings

## 📎 Tech Stack
- Framework: Next.js 15
- Styling: TailwindCSS, Radix UI, Framer Motion
- Icons: Lucide & React Icons
- Content: Contentful CMS
- Data Fetching: SWR
- Deployment: Cloudflare Workers via opennextjs-cloudflare

## 🛠 Authors & Maintainers

Developed and maintained by the UNSW RAMSoc IT team. For issues or support, please contact us at technical@ramsocunsw.org.

## 📄 License

This project is private and intended for internal RAMSoc use only. Contact the maintainers for permission to use or contribute.
