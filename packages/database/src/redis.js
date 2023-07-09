import Redis from "ioredis";
import { Logger } from "./logger.js";

let cache;

if (process.env.REDIS_URL) {
 Logger("info", "Redis URL found, setting up Global Redis cache...");
 cache = new Redis(process.env.REDIS_URL);
} else {
 Logger("warn", "No Redis URL found, setting up Memory cache...");
 cache = new Set();
}

export default cache;
