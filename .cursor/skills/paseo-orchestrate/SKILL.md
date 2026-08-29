---
name: paseo-orchestrate
description: Orchestrates bounded cross-provider work through Paseo while preserving ARK ownership, worktree isolation, verification, and continuity.
---

# Paseo orchestration under ARK

Use this skill only when Paseo tools are available in the current Agent session.
Paseo is the launcher; repository contracts and ARK Core remain authoritative.

## Before delegation

1. Run `ark rehydrate` in the active checkout and inspect live Git state.
2. State the active slice, the Primary Agent, and whether the task is read-only
   or writing.
3. Keep a single Agent by default. A second active Agent needs a bounded,
   useful task. A third needs explicit user approval.

## Writing workers

For every writing worker:

1. Create a dedicated Paseo worktree workspace and branch.
2. Give it a capsule based on `handoff/delegation-task.md` with objective,
   inputs, owned paths, forbidden paths, constraints, expected output,
   verification, and stop condition.
3. Do not assign two writing workers to the same checkout or worktree.
4. Require its report to name changed files, commands run, results, and work
   left unverified.

## Review workers

Review, exploration, log analysis, and test workers should be read-only unless
they receive their own isolated worktree. Give reviewers a concrete diff,
branch, or question; do not forward the whole conversation by default.

## Completion and transition

The Primary Agent integrates results, runs the relevant repository verification
plus `ark verify` when applicable, and updates `HANDOFF.md` before a provider,
context, or host change. Treat skipped layers as `NOT RUN` or `NOT APPLICABLE`.

For a different execution host, transfer the Git branch/commit and the handoff
document, then start a new session there. Never describe a live provider
session as migrated.
