ARG APP_PKG_NAME=@majoexe/bot

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable 
RUN corepack prepare pnpm@latest --activate

RUN curl -sfS https://dotenvx.sh/install.sh | sh

COPY . .

RUN pnpm install --recursive --prod

CMD ["dotenvx", "run", "--", "pnpm", "run", "deploy", "--filter", "!@majoexe/dashboard"]