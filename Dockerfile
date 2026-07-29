FROM node:24-alpine AS web-builder

WORKDIR /src
COPY index.html studio.css icon.svg icon-192.png manifest.json studio.json ./
COPY LICENSE NOTICE THIRD_PARTY_NOTICES.md TRADEMARKS.md ./
COPY assets ./assets
COPY schemas ./schemas
COPY scripts/build-web.cjs ./scripts/build-web.cjs
RUN node scripts/build-web.cjs

FROM nginxinc/nginx-unprivileged:1.29.4-alpine

ARG APP_VERSION=1.0.0
ARG VCS_REF=development
ARG SOURCE_URL=https://github.com/suyaleo/Depthmap_Studio

LABEL org.opencontainers.image.title="Depthmap Studio" \
      org.opencontainers.image.description="Local-first browser depth map and pose video studio" \
      org.opencontainers.image.source="$SOURCE_URL" \
      org.opencontainers.image.revision="$VCS_REF" \
      org.opencontainers.image.version="$APP_VERSION" \
      org.opencontainers.image.licenses="Apache-2.0"

USER root
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=web-builder --chown=101:101 /src/web-dist /usr/share/nginx/html
RUN mkdir -p /data && chown 101:101 /data

USER 101
EXPOSE 8790
VOLUME ["/data"]
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=4 \
  CMD wget -qO- http://127.0.0.1:8790/api/health || exit 1
