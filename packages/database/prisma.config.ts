import { defineConfig } from "prisma/config";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  experimental: {
    studio: true,
    adapter: true,
  },
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx ./src/seed.ts",
  },
});
