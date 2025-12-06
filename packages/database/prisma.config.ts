import { defineConfig } from "prisma/config";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx ./src/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
