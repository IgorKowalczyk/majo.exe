import { debuggerConfig } from "@majoexe/config";
import Redis, { type Redis as RedisType } from "ioredis";
import { Logger } from "./logger";

let cache: Map<string, string> | RedisType;

if (process.env.REDIS_URL) {
 Logger("info", "Redis URL found, setting up Global Redis cache...");
 cache = new Redis(process.env.REDIS_URL);
} else {
 Logger("warn", "No Redis URL found, setting up Memory cache...");
 cache = new Map();
}

export default cache;

export async function cacheSet(key: string, value: object | string, ttl: number = 60): Promise<void> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Setting key ${key} to ${JSON.stringify(value)} with a TTL of ${ttl}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  await cache.set(key, JSON.stringify(value));
  await cache.expire(key, ttl * 1000);
  return;
 } else if (cache instanceof Map) {
  cache.set(key, JSON.stringify(value));
  setTimeout(() => {
   cache.delete(key);
  }, ttl * 1000);
  return;
 }
}

export async function cacheGet(key: string): Promise<string | null> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Getting key ${key}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  const get = await cache.get(key);
  return get ? JSON.parse(JSON.stringify(get)) : null;
 } else if (cache instanceof Map) {
  const get = cache.get(key);
  return get ? get : JSON.stringify({});
 }
 return null;
}

export async function cacheDel(key: string): Promise<void> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Deleting key ${key}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  await cache.del(key);
 } else if (cache instanceof Map) {
  cache.delete(key);
 }
}
