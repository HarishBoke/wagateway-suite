# Render Deployment Notes

## Key requirements verified from Render docs

Render web services host dynamic applications and expose them at an `onrender.com` subdomain with TLS. A Render web service must bind its public HTTP server to host `0.0.0.0` and preferably to the port provided by the `PORT` environment variable. The default expected port is `10000`, but Render can detect or be configured for a different port.

A Blueprint file must be named `render.yaml` and placed at the repository root. For Node.js services using the native runtime, Render requires build and start commands. A Blueprint can also define service environment variables, health check paths, regions, branches, and automatic deploy behavior.

Render services use an ephemeral filesystem by default. A persistent disk is required if runtime data must survive deploys and restarts. Render persistent disks are available only on paid web services, private services, and background workers. Only files written under the disk mount path survive. A service with a disk cannot scale to multiple instances and zero-downtime deploys are not available for disk-backed services.

For WA Gateway Suite, persistent runtime data is needed for SQLite database files, WhatsApp/session storage, and logs/uploads if kept locally. Therefore the production Render configuration should mount a disk, for example at `/var/data/wagateway`, and configure runtime paths under that mount.

Sources reviewed:

- https://render.com/docs/web-services
- https://render.com/docs/blueprint-spec
- https://render.com/docs/disks
- https://render.com/docs/configure-environment-variables
