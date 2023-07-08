import Redis from "ioredis";
import { Logger } from "./logger.js";

const globalForRedis = global;
let cache;

if (process.env.REDIS_URL) {
 Logger("info", "Redis URL found, setting up Global Redis cache...");
 if (!globalForRedis.cache) {
  globalForRedis.prisma = new Redis(process.env.REDIS_URL);
 }
 cache = globalForRedis.cache;
} else {
 Logger("warn", "No Redis URL found, setting up Memory cache...");
 cache = new Set();
}

if (process.env.NODE_ENV !== "production") {
 globalForRedis.prisma = cache;
}

export default cache;
