ARG APP_PKG_NAME=@majoexe/bot

FROM node:22

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN curl -sfS https://dotenvx.sh/install.sh | sh

COPY . .

RUN pnpm install --recursive --prod

# Rebuild packages
RUN pnpm rebuild -r

CMD ["dotenvx", "run", "--", "pnpm", "run", "deploy", "--filter", "!@majoexe/dashboard"]