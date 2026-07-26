# DepthMap Maker

Browser-local depth-map video maker inspired by [depth.cards](https://depth.cards/).  
Ubuntu serves static files only; all inference runs in the user's browser.

## Features

- **Depth Anything V2** via Transformers.js (WebGPU → WASM fallback)
- Optional **MediaPipe Pose** skeleton overlay
- Segment trim (max 30s), colormap styles, temporal smoothing
- Export MP4/WebM + optional `poses.json`
- **Click-to-download only** (no auto download)
- EN / JP / KR / CN UI

## Architecture

| Layer | Role |
|-------|------|
| Static host | Python `http.server` or any static server |
| Client | Transformers.js + MediaPipe + WebCodecs/mp4-muxer |
| Privacy | Source videos never leave the browser |

## Local run

```bash
python3 -m http.server 8790 --bind 127.0.0.1
# open http://127.0.0.1:8790
```

Use **HTTPS** (e.g. Tailscale Serve) for WebGPU and File System Access APIs.

## Deploy (Ubuntu + Total Hub)

Typical layout used in this lab:

```text
App files:     ~/apps/depth-studio  (or this repo checkout)
Local port:    127.0.0.1:8790
Tailscale:     https://<host>:8451  →  proxy to 8790
Total Hub:     registers "Depth Studio" health card
```

```bash
# user systemd unit example
systemctl --user enable --now depth-studio.service
tailscale serve --bg --https=8451 http://127.0.0.1:8790
```

## Usage

1. Select / drop a video  
2. Adjust mode, model, resolution  
3. Press **Start** (header)  
4. When finished, click the **download** button under the output panel  

## License

Private lab project. Model weights are subject to their upstream licenses
(Depth Anything V2, MediaPipe, Transformers.js).
