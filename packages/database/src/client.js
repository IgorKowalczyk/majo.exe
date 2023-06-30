/* eslint-disable global-require */

import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import { Logger } from "./logger.js";

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
 prisma.$use(logger);
}

if (process.env.REDIS_URL) {
 Logger("info", "Redis URL found, setting up Redis cache...");
 const redis = new Redis(process.env.REDIS_URL);

 const cache = createPrismaRedisCache({
  models: [
   { model: "User", excludeMethods: ["findMany"] },
   { model: "Guild", excludeMethods: ["findMany"] },
   { model: "GuildLogs", cacheTime: 15 },
   { model: "GuildXp", cacheTime: 15 },
  ],
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 300 } } },
  cacheTime: 30,
  excludeModels: ["Session"],
  onHit: (key) => {
   if (process.env.NODE_ENV !== "production") {
    Logger("info", `Cache hit for key ${key}`);
   }
  },
  onMiss: (key) => {
   if (process.env.NODE_ENV !== "production") {
    Logger("info", `Cache miss for key ${key}`);
   }
  },
  onError: (key) => {
   if (process.env.NODE_ENV !== "production") {
    Logger("info", `Cache error for key ${key}`);
   }
  },
 });
 prisma.$use(cache);
} else {
 Logger("warn", "No Redis URL found, skipping Redis cache");
}

export default prisma;
