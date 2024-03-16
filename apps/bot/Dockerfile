# This file is moved to the root directory before building the image

ARG NODE_VERSION=20-bookworm-slim
ARG APP_DIRNAME=majoexe-bot
ARG APP_PKG_NAME=@majoexe/bot

FROM node:${NODE_VERSION} AS pruner
ARG APP_PKG_NAME
RUN apt update && apt install -y openssl
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=$APP_PKG_NAME --docker
RUN find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

FROM node:${NODE_VERSION} AS base
RUN apt update && apt install -y openssl
RUN corepack enable
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

FROM base AS dev-deps
WORKDIR /app
RUN pnpm install

FROM base AS production-deps
WORKDIR /app
ENV NODE_ENV production
RUN pnpm install --prod
COPY --from=pruner /app/out/full/packages/database/prisma/schema.prisma /app/packages/database/prisma/schema.prisma
RUN pnpm dlx prisma generate --schema /app/packages/database/prisma/schema.prisma

FROM base AS builder
ARG APP_PKG_NAME
WORKDIR /app
RUN corepack enable
ENV NODE_ENV production
COPY --from=pruner /app/out/full/ .
COPY --from=dev-deps /app/ .
COPY turbo.json turbo.json
RUN pnpm run prisma:generate
RUN pnpm run build --filter=$APP_PKG_NAME --only 

# Runner
FROM base AS runner
ARG APP_DIRNAME

ENV NODE_ENV production
COPY --from=pruner /app/out/full/ .
COPY --from=production-deps /app .
COPY --from=builder /app/ . 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

ENTRYPOINT ["node", "apps/bot/index.js"]

# release_command = "pnpx prisma migrate deploy --schema packages/database/prisma/schema.prisma"
CMD ["node", "apps/bot/index.js"]
