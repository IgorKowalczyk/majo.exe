import { debuggerConfig } from "@majoexe/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import ws from "ws";
import { PrismaClient } from "../prisma/client/client";
import { Logger } from "./logger";
import "@dotenvx/dotenvx/config";

neonConfig.webSocketConstructor = ws;

const prismaClientWrapper = (prisma: PrismaClient) => {
  if (debuggerConfig.displayDatabaseLogs)
    prisma.$extends({
      query: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          Logger("info", `Query ${model}.${operation} took ${time}ms`);
          return result;
        },
      },
    });
  return prisma;
};

const connectionString = process.env.DATABASE_URL;

const prismaClientSingleton = () => {
  if (process.env.DATABASE_URL?.includes("neon.tech")) {
    Logger("info", "Neon Database URL found, setting up Neon Database...");
    const adapter = new PrismaNeon({ connectionString });
    return prismaClientWrapper(new PrismaClient({ adapter }));
  } else {
    Logger("info", "No Neon Database URL found, setting up Prisma...");
    const adapter = new PrismaPg({ connectionString });
    return prismaClientWrapper(new PrismaClient({ adapter }));
  }
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
