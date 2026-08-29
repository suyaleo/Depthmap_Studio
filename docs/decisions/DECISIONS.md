# Decisions

Durable approved decisions. Do not repeat Git commit history.

## D-20260829-01 — Ubuntu self-hosted CI and loopback Docker deploy

Date: 2026-08-29
Status: active

### Context

Depthmap Studio ships a static web client, a Docker nginx runtime, and a macOS
desktop package. Private CI and Linux container deploy needed a canonical host.

### Decision

Run private GitHub Actions on the Ubuntu self-hosted runner labeled
`depthmap-studio`. Bind the container to `127.0.0.1:8790` and publish it on the
tailnet with Tailscale Serve. Keep application data under
`/srv/leostudio/data/depthmap-studio`.

### Alternatives rejected

- GitHub-hosted runners as the private-CI canonical
- Public reverse proxy or Tailscale Funnel
- Binding the app port on all interfaces

### Consequences

macOS remains the host for Electron smoke, e2e, visual, and `dist:mac`.
Linux verification and deploy complete only after Ubuntu CI PASS, merge,
fast-forward of the deploy checkout, healthy container, and Tailnet response.

## D-20260829-02 — ARK contracts without overwriting product docs

Date: 2026-08-29
Status: active

### Context

The repository had product `docs/screenshots` but no Agent-managed contract
files.

### Decision

Add `AGENTS.md`, `docs/product/BRIEF.md`, `docs/decisions/DECISIONS.md`,
`docs/continuity/HANDOFF.md`, and the Cursor adapter under `.cursor/`. Do not
replace README, LICENSE, or screenshot docs.

### Alternatives rejected

- Writing contracts into the Ubuntu deploy checkout while it tracks `main`
- Skipping the Cursor adapter after a CREATE-only dry-run on this execution host
