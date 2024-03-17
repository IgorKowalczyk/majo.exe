# This file is moved to the root directory before building the image

ARG NODE_VERSION=20-alpine
ARG APP_PKG_NAME=@majoexe/bot

# Pruner
FROM node:${NODE_VERSION} AS pruner
ARG APP_PKG_NAME
RUN apk update && apk upgrade openssl
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo telemetry disable
RUN turbo prune --scope=$APP_PKG_NAME --docker
RUN find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Base
FROM node:${NODE_VERSION} AS base
RUN apk update && apk upgrade openssl
RUN corepack enable
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Builder
FROM base AS builder
ARG APP_PKG_NAME
WORKDIR /app
RUN pnpm install --prod
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm run prisma:generate
#RUN pnpm run prisma:push
RUN pnpm run build --filter=$APP_PKG_NAME --only 

# Runner
FROM base AS runner
COPY --from=pruner /app/out/full/ .
COPY --from=builder /app/ . 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

ENTRYPOINT ["node", "apps/bot/index.js"]
CMD ["node", "apps/bot/index.js"]
