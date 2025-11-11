import { defineConfig, env } from "prisma/config";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
    directUrl: env("DATABASE_URL_UNPOOLED"),
  },
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
    seed: "node ./src/seed.ts",
  },
});
