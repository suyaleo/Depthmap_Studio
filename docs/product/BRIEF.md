# Product brief

Durable product intent. Not a session log.

## Problem

Creators need temporal depth maps and optional pose landmarks from ordinary
video without uploading source frames to a remote application API.

## Target users

People who process short local video clips in a browser, Docker-hosted web app,
or macOS desktop package and want depth-styled output plus optional pose data.

## Primary workflow

Load a local video, trim a segment up to 30 seconds, run Depth Anything V2
(and optional MediaPipe pose) in the renderer, style the depth output, and save
frame-accurate local files.

## Desired final artifact / outcome

One implementation across web, Docker, and macOS titled "Depthmap Studio",
published at `suyaleo/Depthmap_Studio`. Ubuntu Docker Compose is the Linux
runtime, bound to loopback and published on the tailnet only.

## Scope

- Depth Anything V2 through Transformers.js with WebGPU → WASM fallback
- Optional MediaPipe skeleton overlay and `poses.json`
- WebCodecs MP4 with MediaRecorder fallback
- Korean, English, Japanese, and Chinese UI
- Light, Dark, and System themes
- Docker image `ghcr.io/suyaleo/depthmap-studio` with health and version endpoints

## Non-goals

- Uploading source video to an application API
- Public reverse-proxy or Tailscale Funnel ingress
- Python runtime or global npm installs for the web app
- Replacing the Ubuntu self-hosted CI runner with GitHub-hosted or Mac runners
  as the private-CI canonical

## Product constraints

- Product title is exactly "Depthmap Studio".
- License is Apache-2.0.
- Container runs as UID 101 and binds `127.0.0.1:8790`.
- Compose data directory is `/srv/leostudio/data/depthmap-studio`.
- First model run needs network; afterward the browser profile caches models.

## Acceptance direction

`npm run validate:release` and `npm run build:web` pass. Ubuntu CI docker job
proves image user 101, license label, health `status: ok`, and version. Live
deploy is a healthy container plus Tailnet response at port 8790.
