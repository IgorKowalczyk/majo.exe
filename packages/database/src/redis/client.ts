import Redis, { type Redis as RedisType } from "ioredis";
import { Logger } from ".././logger";

declare const globalThis: {
 redisGlobal: RedisType;
} & typeof global;

const createRedisClient = () => {
 if (!process.env.REDIS_URL) throw new Error("No Redis URL found! Please set the REDIS_URL environment variable.");
 Logger("info", "Creating Redis client...");

 return new Redis(process.env.REDIS_URL);
};

const redisClient = globalThis.redisGlobal ?? createRedisClient();

if (process.env.NODE_ENV !== "production") globalThis.redisGlobal = redisClient;

export default redisClient;
