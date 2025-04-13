ARG APP_PKG_NAME=@majoexe/bot

FROM node:22-alpine

RUN apk add vips vips-tools curl

RUN apk info -L vips

RUN vips --version

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV npm_config_sharp_libvips=system

RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && curl -sfS https://dotenvx.sh/install.sh | sh

COPY . .

RUN pnpm install --recursive --prod
RUN pnpm rebuild -r

CMD ["dotenvx", "run", "--", "pnpm", "run", "deploy", "--filter", "!@majoexe/dashboard"]