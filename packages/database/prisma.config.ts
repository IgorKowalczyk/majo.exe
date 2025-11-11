import { defineConfig } from "prisma/config";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DATABASE_DIRECT_URL,
  },
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx ./src/seed.ts",
  },
});
