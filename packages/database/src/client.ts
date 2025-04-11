import { debuggerConfig } from "@majoexe/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import ws from "ws";
import { Logger } from "./logger";
import redisClient from "./redis/client";

neonConfig.webSocketConstructor = ws;

const prismaClientWrapper = (prisma: PrismaClient) => {
 const cache = createPrismaRedisCache({
  models: [
   { model: "User", excludeMethods: ["findMany"] },
   { model: "Guild", excludeMethods: ["findMany"], invalidateRelated: ["GuildDisabledCommands", "GuildDisabledCategories"] },
   { model: "GuildDisabledCommands", excludeMethods: ["findMany"], invalidateRelated: ["Guild"] },
   { model: "GuildDisabledCategories", excludeMethods: ["findMany"], invalidateRelated: ["Guild"] },
   { model: "GuildLogs", cacheTime: 15 },
   { model: "GuildXp", cacheTime: 15 },
  ],
  storage: {
   type: "redis",
   options: {
    /* @ts-expect-error Invalid types in cacheOptions */
    client: redisClient,
   },
  },
  cacheTime: 30,
  excludeModels: ["Session", "Account"],
  onHit: (key) => {
   if (debuggerConfig.displayCacheMessages) {
    Logger("info", `Cache hit for key ${key}`);
   }
  },
  onMiss: (key) => {
   if (debuggerConfig.displayCacheMessages) {
    Logger("info", `Cache miss for key ${key}`);
   }
  },
  onError: (key) => {
   if (debuggerConfig.displayCacheMessages) {
    Logger("info", `Cache error for key ${key}`);
   }
  },
 });

 prisma.$use(cache);

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

const prismaClientSingleton = () => {
 if (process.env.DATABASE_URL?.includes("neon.tech")) {
  Logger("info", "Neon Database URL found, setting up Neon Database...");
  const adapter = new PrismaNeon({ connectionString: `${process.env.DATABASE_URL}` });
  return prismaClientWrapper(new PrismaClient({ adapter }));
 } else {
  Logger("info", "No Neon Database URL found, setting up Prisma...");
  return prismaClientWrapper(new PrismaClient());
 }
};

declare const globalThis: {
 prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
