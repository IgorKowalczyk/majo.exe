import path from "path";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { defineConfig } from "prisma/config";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  experimental: {
    studio: true,
    adapter: true,
  },
  engine: "js",
  /* @ts-expect-error Adapter type */
  async adapter() {
    if (process.env.DATABASE_URL?.includes("neon.tech")) {
      return new PrismaNeon({ connectionString: process.env.DATABASE_URL });
    } else {
      return new PrismaPg({ connectionString: process.env.DATABASE_URL });
    }
  },
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma", "migrations"),
    seed: "tsx ./src/seed.ts",
  },
});
