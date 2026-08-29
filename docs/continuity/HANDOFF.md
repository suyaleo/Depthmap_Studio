# HANDOFF

## Current handoff

- Objective: Apply ARK contracts and the Cursor adapter to Depthmap Studio without touching the Ubuntu deploy checkout.
- Execution host: Ubuntu
- Branch / base commit: `docs/ark-init` / `94e34d8`
- Worktree: `/home/leo/Developer/worktrees/depthmap-studio-ark-init`
- Changes made: created AGENTS / BRIEF / DECISIONS / HANDOFF and installed `.cursor/` from agent-rules-kit
- Files changed: `AGENTS.md`, `docs/product/BRIEF.md`, `docs/decisions/DECISIONS.md`, `docs/continuity/HANDOFF.md`, `.cursor/**`
- Verification run: `ark init .` dry-run → CREATE only; `ark init . --apply` → CREATE; Cursor adapter dry-run → CREATE only; adapter `--apply` → CREATE; `ark rehydrate` after fill → contracts present; existing deploy `curl http://127.0.0.1:8790/api/health` → `{"status":"ok","service":"depthmap-studio"}`; Tailnet `/api/health` → HTTP 200
- Not run / not applicable: `npm run validate:release` and `npm run build:web` in this worktree (no `node_modules`; Linux canonical is Ubuntu self-hosted CI on the PR). Electron `test:smoke` / `test:e2e` / `test:visual` / `dist:mac` require a Mac execution host. Existing deploy health is not verification of this documentation PR.
- Known issues / risks: Paseo daemon is not installed on Ubuntu. Do not guess an installer. Deploy checkout `/srv/leostudio/apps/depthmap-studio` stays on `main` until this PR merges.
- Next exact action: Push `docs/ark-init`, open PR, wait for Ubuntu self-hosted CI PASS, merge, then fast-forward the deploy checkout. Do not change the Hub card; Depthmap is already deployed.
- Ownership after handoff: Primary Agent owns this worktree and branch only.

## Objective

Make Depthmap Studio Agent-managed under ARK on the Ubuntu execution host.

## Current State

Product code is on `main` at `94e34d8`. Ubuntu container `depthmap-studio` is
healthy on `127.0.0.1:8790` with Tailscale Serve. This slice adds contracts
only.

## Decisions This Slice

- D-20260829-01 Ubuntu self-hosted CI and loopback Docker deploy
- D-20260829-02 ARK contracts without overwriting product docs

## Files Changed

- `AGENTS.md`
- `docs/product/BRIEF.md`
- `docs/decisions/DECISIONS.md`
- `docs/continuity/HANDOFF.md`
- `.cursor/` adapter generated from `agent-rules-kit`

## Verification Evidence

See Current handoff.

## Risks / Blockers

Paseo is missing on this host. Git global identity is unset; this worktree uses
the existing commit identity `suyaleo <110736360+suyaleo@users.noreply.github.com>`.

## Next Exact Actions

1. Create the PR from `docs/ark-init`.
2. Confirm Ubuntu runner `ubuntu-depthmap-studio` CI PASS.
3. Merge, then fast-forward `/srv/leostudio/apps/depthmap-studio`. No compose
   recreate is required for documentation-only files.

## Resume Point

ARK contracts exist in this worktree and are not yet on `origin/main`.

<!-- ark:git-state -->
Checkpoint captured: 2026-08-29T20:45:11Z
Branch at checkpoint: docs/ark-init
HEAD at checkpoint: 94e34d8

Working tree at checkpoint:
```text
?? .cursor/
?? AGENTS.md
?? docs/continuity/
?? docs/decisions/
?? docs/product/
```
<!-- /ark:git-state -->
