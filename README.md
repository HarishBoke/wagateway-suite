# WA Gateway Suite

WA Gateway Suite is a whitelabeled, self-hosted messaging gateway suite built from two components:

| Component | Path | Purpose |
| --- | --- | --- |
| Gateway API and dashboard | `gateway/` | Backend API, dashboard, session management, webhooks, SDKs, and infrastructure helpers. |
| n8n community nodes | `n8n-nodes/` | Automation nodes and credentials for connecting n8n workflows to the gateway API. |

## Local development

The gateway can be run locally with Node.js by copying `gateway/.env.minimal` to `gateway/.env`, installing dependencies, and running `npm run dev` from `gateway/`. The n8n node package can be built from `n8n-nodes/` with `npm install && npm run build`.

## Repository

Canonical repository: [https://github.com/HarishBoke/wagateway-suite](https://github.com/HarishBoke/wagateway-suite)

## Whitelabel changes

Visible product names, package names, dashboard titles, documentation links, container labels, and n8n node labels have been changed to **WA Gateway** / **WA Gateway Suite**. Legal license attribution is preserved separately in `NOTICE.md`.
