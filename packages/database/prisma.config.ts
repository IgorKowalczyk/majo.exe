import { defineConfig } from "prisma/config";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { PrismaPg } from "@prisma/adapter-pg";
// import "@dotenvx/dotenvx/config";

export default defineConfig({
  // experimental: {
  //   studio: true,
  //   adapter: true,
  // },
  // engine: "js",
  // /* @ts-expect-error Adapter type */
  // async adapter() {
  //   if (process.env.DATABASE_URL?.includes("neon.tech")) {
  //     return new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  //   } else {
  //     return new PrismaPg({ connectionString: process.env.DATABASE_URL });
  //   }
  // },
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx ./src/seed.ts",
  },
});
