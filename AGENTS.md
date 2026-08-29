# AGENTS.md

Project-specific Agent constitution. Keep this file short and stable.

Do not accumulate implementation history here.

## Identity

- Name: Depthmap Studio
- Purpose: Local-first web, Docker, and macOS studio that turns video into depth maps and optional pose-aware motion data in the browser.
- Repository: `suyaleo/Depthmap_Studio`
- License: Apache-2.0 (do not invent or change)
- Canonical checkout:
  - Ubuntu deploy: `/srv/leostudio/apps/depthmap-studio`
  - Ubuntu agent worktrees: `~/Developer/worktrees/depthmap-studio-*`
  - macOS: `~/Developer/Depthmap_Studio`

## Read first

1. `AGENTS.md` (this file)
2. `docs/product/BRIEF.md`
3. `docs/decisions/DECISIONS.md`
4. `docs/continuity/HANDOFF.md`
5. `git status`, recent `git log`, relevant `git diff`
6. files that will actually be modified

## Constraints

- Inspect before modifying.
- Repository evidence outranks Agent memory.
- One Primary Agent owns the active slice.
- One checkout or worktree has exactly one writing Agent session at a time.
- A Primary Agent may use any provider. Provider and model choice do not change
  ownership, approval, or verification requirements.
- Host handoff uses Git state plus `HANDOFF.md`; it does not move a live agent
  session between machines.
- Do not invent secrets, licenses, or remote repository settings.
- Container port binds `127.0.0.1` only. External access is Tailscale Serve,
  never Funnel or a public reverse proxy.
- Persistent data is `/srv/leostudio/data/depthmap-studio`. Do not move Docker
  engine storage.
- Do not write the Ubuntu deploy checkout and an agent worktree at the same time.

## Commands

```text
lint: npm run validate:release
typecheck: NOT APPLICABLE
test: npm run validate:release && npm run build:web
build: npm run build:web
docker-build: docker build --build-arg APP_VERSION=1.0.0 --tag depthmap-studio:local .
macos-smoke: npm run test:smoke
macos-dist: npm run dist:mac
```

Electron smoke, e2e, visual, and `dist:mac` run on a Mac execution host.
On Ubuntu record them `NOT RUN` unless that host is explicitly used.

## Prohibited

- force push / rewrite shared history without Level 3 approval
- production deploy, public exposure, license change without Level 3 approval
- silent overwrite of existing user files
- storing secrets in Git, handoff, or prompt history
- installing Hermes Agent or guessed OAuth connector services

## Verification gate

Ubuntu CI (`self-hosted, Linux, X64, depthmap-studio`) is the Linux verification
canonical. Mark skipped layers `NOT RUN` or `NOT APPLICABLE`.

## Continuity

Update `docs/continuity/HANDOFF.md` before context loss, provider switch, or session end.
