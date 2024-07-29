import { debuggerConfig } from "@majoexe/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import ws from "ws";
import { Logger } from "./logger.js";
import Redis from "./redis.js";

neonConfig.webSocketConstructor = ws;

const logger = (params, next) => {
 const before = Date.now();
 const result = next(params);
 const after = Date.now();
 Logger("info", `Query ${params.model}.${params.action} took ${after - before}ms`);
 return result;
};

const prismaClientWrapper = (prisma) => {
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
   // Prettier
   type: Redis instanceof Map ? "memory" : "redis",
   options: {
    // Prettier
    client: Redis instanceof Map ? undefined : Redis,
    invalidation: { referencesTTL: 300 },
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

 if (debuggerConfig.displayDatabaseLogs) prisma.$use(logger);

 prisma.$use(cache);
 return prisma;
};

const connectionString = `${process.env.DATABASE_URL}`;

const prismaClientSingleton = () => {
 if (process.env.DATABASE_URL?.includes("neon.tech")) {
  Logger("info", "Neon Database URL found, setting up Neon Database...");
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return prismaClientWrapper(new PrismaClient({ adapter }));
 } else {
  Logger("info", "No Neon Database URL found, setting up Prisma...");
  return prismaClientWrapper(new PrismaClient());
 }
};

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
