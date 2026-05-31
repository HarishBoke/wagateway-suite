# WA Gateway Suite — Permanent Render Deployment

This repository is now prepared for a **permanent Render deployment** using a single Docker web service. The Render service hosts the whitelabeled dashboard and backend API from the same origin, so the public Render URL will serve both the web UI and API endpoints.

## Deployment model

| Component | Render setup | Notes |
| --- | --- | --- |
| Dashboard UI | Served by the backend Docker image from `gateway/dashboard/dist` | The dashboard is built during the Docker image build and served at `/`. |
| Backend API | Render Docker web service | API endpoints remain under `/api/*`. |
| API docs | Same Render service | Swagger is available at `/api/docs`. |
| Health check | Same Render service | Render checks `/api/health`. |
| Runtime storage | Render persistent disk mounted at `/app/data` | Stores SQLite database, WhatsApp sessions, API key file, and local media. |
| WhatsApp engine | Chromium inside Docker | The Docker image installs Chromium and sets Puppeteer environment variables for Render. |

## Files added or changed

| File | Purpose |
| --- | --- |
| `render.yaml` | Render Blueprint defining the permanent Docker web service, disk, health check, and production environment variables. |
| `gateway/Dockerfile` | Builds the dashboard and backend, packages dashboard static assets, installs Chromium, and uses a dynamic health check port. |
| `gateway/src/main.ts` | Binds to `0.0.0.0` and serves the production dashboard from the same service as the API. |
| `RENDER_DEPLOYMENT_NOTES.md` | Internal deployment notes based on Render documentation review. |

## Render Blueprint settings

The root `render.yaml` defines one service named `wagateway-suite` with these important settings.

| Setting | Value |
| --- | --- |
| Runtime | Docker |
| Dockerfile | `./gateway/Dockerfile` |
| Docker context | `./gateway` |
| Region | Singapore |
| Plan | Starter |
| Persistent disk | `wagateway-data` mounted at `/app/data`, 5 GB |
| Health check | `/api/health` |
| Auto deploy | Enabled |

A persistent disk is required because Render's normal filesystem is ephemeral. Without a disk, WhatsApp sessions, the SQLite database, and generated API key file would be lost on deploy or restart.

## Required Render steps

1. Open [Render Blueprints](https://dashboard.render.com/blueprints) and choose **New Blueprint Instance**.
2. Connect the GitHub repository `HarishBoke/wagateway-suite`.
3. Select the repository root so Render can detect `render.yaml`.
4. Review the service named `wagateway-suite`.
5. Keep the persistent disk enabled. A paid Render web service is required for persistent disks.
6. Deploy the Blueprint.
7. After the first successful deploy, open the service logs and copy the generated admin API key shown in the startup banner.
8. Set these two environment variables to the deployed public URL, then redeploy once:

| Key | Example value |
| --- | --- |
| `BASE_URL` | `https://wagateway-suite.onrender.com` |
| `DASHBOARD_URL` | `https://wagateway-suite.onrender.com` |

The exact URL may differ depending on the Render service hostname.

## Post-deployment checks

After Render finishes deploying, verify these URLs.

| URL | Expected result |
| --- | --- |
| `https://YOUR_RENDER_URL/` | Dashboard loads. |
| `https://YOUR_RENDER_URL/api/health` | JSON health response with HTTP 200. |
| `https://YOUR_RENDER_URL/api/docs` | Swagger API documentation loads. |

## Operational notes

The default production configuration uses SQLite on the Render persistent disk. This is the simplest permanent setup for a single-instance deployment. Render services with persistent disks cannot scale horizontally, which is acceptable for the current SQLite/session-based architecture. If you later need high availability or multiple instances, migrate the database to Render Postgres and session/media storage to an external object store.

The first production API key is generated automatically on initial startup and stored at `/app/data/.api-key` on the persistent disk. If the disk is deleted, Render will create a new database and a new initial API key on next startup.

## Local validation completed

The production build was validated locally by running the dashboard build, backend build, and a production-mode smoke server. The following checks succeeded.

| Check | Result |
| --- | --- |
| Dashboard production build | Passed |
| Backend TypeScript/Nest build | Passed |
| `render.yaml` YAML parse | Passed |
| Production `/api/health` smoke test | Passed |
| Production dashboard `/` smoke test | Passed |
| SPA route fallback `/sessions` smoke test | Passed |
