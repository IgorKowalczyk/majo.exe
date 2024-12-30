import Redis, { type Redis as RedisType } from "ioredis";
import { Logger } from ".././logger";

declare const globalThis: {
 redisGlobal: RedisType;
} & typeof global;

const createRedisClient = () => {
 if (!process.env.REDIS_URL) Logger("warn", "No Redis URL found! Please set the REDIS_URL environment variable! Defaulting to redis://localhost:6379");
 Logger("info", "Creating Redis client...");

 return new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");
};

const redisClient = globalThis.redisGlobal ?? createRedisClient();

if (process.env.NODE_ENV !== "production") globalThis.redisGlobal = redisClient;

export default redisClient;
