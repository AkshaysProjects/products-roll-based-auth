import RedisStore from "connect-redis";
import Redis, { type RedisOptions } from "ioredis";
import { env } from "../env";

const redisConfig: RedisOptions = {
	host: env.REDIS_HOST,
	port: env.REDIS_PORT,
	password: env.REDIS_PASSWORD,
};

export const client = new Redis(redisConfig);
export const store = new RedisStore({
	client,
	ttl: 60 * 60, // 1 hour
});
