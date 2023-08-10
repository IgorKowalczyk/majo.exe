/* eslint-disable global-require */

import { debuggerConfig } from "@majoexe/config";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import { Logger } from "./logger.js";
import Redis from "./redis.js";

const globalForPrisma = global;
let prisma;

const logger = (params, next) => {
 const before = Date.now();
 const result = next(params);
 const after = Date.now();
 Logger("info", `Query ${params.model}.${params.action} took ${after - before}ms`);
 return result;
};

if (process.env.RUNTIME === "edge") {
 const { PrismaClient } = require("@prisma/client/edge.js");
 prisma = new PrismaClient();
} else {
 if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
 }
 prisma = globalForPrisma.prisma;
}

if (process.env.NODE_ENV !== "production") {
 globalForPrisma.prisma = prisma;
}

const cache = createPrismaRedisCache({
 models: [
  { model: "User", excludeMethods: ["findMany"] },
  { model: "Guild", excludeMethods: ["findMany"] },
  { model: "GuildLogs", cacheTime: 15 },
  { model: "GuildXp", cacheTime: 15 },
 ],
 storage: {
  // Prettier
  type: Redis instanceof Set ? "redis" : "memory",
  options: {
   // Prettier
   client: Redis instanceof Set ? Redis : undefined,
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

prisma.$use(cache);

if (debuggerConfig.displayDatabaseLogs) {
 prisma.$use(logger);
}

export default prisma;
