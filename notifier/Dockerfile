FROM node:22-alpine@sha256:025b8e975a61d94e33abeafaad1255ef44e4898cf1a1b6446860009c72e6d284 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY server.js ./

FROM node:22-alpine@sha256:025b8e975a61d94e33abeafaad1255ef44e4898cf1a1b6446860009c72e6d284 AS runtime

WORKDIR /app

RUN apk upgrade --no-cache \
  && rm -rf /usr/local/lib/node_modules/npm \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY --from=build --chown=node:node /app/package*.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/server.js ./

USER node
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))" || exit 1

CMD ["node", "server.js"]
