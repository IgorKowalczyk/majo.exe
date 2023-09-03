import { debuggerConfig } from "@majoexe/config";
import Redis from "ioredis";
import { Logger } from "./logger.js";

let cache;

if (process.env.REDIS_URL) {
 Logger("info", "Redis URL found, setting up Global Redis cache...");
 cache = new Redis(process.env.REDIS_URL);
} else {
 Logger("warn", "No Redis URL found, setting up Memory cache...");
 cache = new Map();
}

export default cache;

/**
 * Set a key in the cache
 * @param {string} key
 * @param {string} value
 * @param {number} ttl
 * @returns {void}
 * */
export async function cacheSet(key, value, ttl = 60) {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Setting key ${key} to ${JSON.stringify(value)} with a TTL of ${ttl}`);
 }
 if (process.env.REDIS_URL) {
  await cache.set(key, JSON.stringify(value));
  await cache.expire(key, ttl * 1000);
  return;
 } else {
  await cache.set(key, JSON.stringify(value));
  setTimeout(() => {
   cache.delete(key);
  }, ttl * 1000);
  return;
 }
}

/**
 * Get a key from the cache
 * @param {string} key
 * @returns {string}
 * */
export async function cacheGet(key) {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Getting key ${key}`);
 }
 if (process.env.REDIS_URL) {
  const get = await cache.get(key);
  return get ? JSON.parse(JSON.stringify(get)) : null;
 } else {
  const get = await cache.get(key);
  return get ? get : JSON.stringify({});
 }
}

/**
 * Delete a key from the cache
 * @param {string} key
 * @returns {void}
 * */
export function cacheDel(key) {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Deleting key ${key}`);
 }
 if (process.env.REDIS_URL) {
  cache.del(key);
 } else {
  cache.delete(key);
 }
}
