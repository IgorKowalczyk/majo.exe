import { config } from "@majoexe/config";
import Redis from "ioredis";
import { Logger } from "./logger.js";

let cache;

if (process.env.REDIS_URL) {
 if (config.debugger.displayCacheMessages) {
  Logger("info", "Redis URL found, setting up Global Redis cache...");
 }
 cache = new Redis(process.env.REDIS_URL);
} else {
 if (config.debugger.displayCacheMessages) {
  Logger("warn", "No Redis URL found, setting up Memory cache...");
 }
 cache = new Set();
}

export default cache;
