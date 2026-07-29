# Security Policy

## Supported versions

Security fixes are applied to the latest release on the `main` branch.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting feature on the repository
Security tab. Do not open a public issue for a suspected vulnerability or
include private media, credentials, or exploit details in public discussions.

Include the affected version, reproduction steps, impact, and any suggested
mitigation. You should receive an initial acknowledgement within seven days.

## Privacy boundary

Depthmap Studio processes source video in the browser or Electron renderer.
The web and Docker servers distribute static application files; they do not
receive source videos. AI libraries and model files are fetched from the
upstream providers listed in `THIRD_PARTY_NOTICES.md`.
