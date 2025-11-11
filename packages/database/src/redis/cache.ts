import { debuggerConfig } from "@majoexe/config";
import { Logger } from ".././logger";
import redisClient from "./client";

/**
 *
 * @param key  The key to set
 * @param value  The value to set
 * @param ttl  The time to live in seconds
 * @returns void
 */
export async function cacheSet(key: string, value: object | string, ttl: number = 60): Promise<void> {
  if (debuggerConfig.displayCacheMessages) Logger("info", `Setting key ${key} to ${JSON.stringify(value)} with a TTL of ${ttl}`);

  await redisClient.set(key, JSON.stringify(value));
  await redisClient.expire(key, ttl);
  return;
}

/**
 *
 * @param key  The key to get
 * @returns The value of the key
 */
export async function cacheGet(key: string): Promise<string | null> {
  if (debuggerConfig.displayCacheMessages) Logger("info", `Getting key ${key}`);
  const get = await redisClient.get(key);
  return get ? JSON.parse(JSON.stringify(get)) : null;
}

/**
 *
 * @param key  The key to get
 * @returns The time to live of the key in seconds
 */
export async function cacheTTL(key: string): Promise<number> {
  if (debuggerConfig.displayCacheMessages) Logger("info", `Getting TTL of key ${key}`);
  return await redisClient.ttl(key);
}

/**
 *
 * @param key  The key to delete
 * @returns void
 */
export async function cacheDel(key: string): Promise<void> {
  if (debuggerConfig.displayCacheMessages) Logger("info", `Deleting key ${key}`);
  await redisClient.del(key);
  return;
}
