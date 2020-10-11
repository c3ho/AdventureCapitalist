const Redis = require("ioredis");
// const MockRedis = require('ioredis-mock');
const url = require("url");

const REDIS_URL = "localhost://127.0.0.1";
const REDIS_PORT = 6379;
// If you need to set the Redis URL, do it in REDIS_URL
const redisUrl = `${REDIS_URL}:${REDIS_PORT}` || "redis://127.0.0.1:6379";

// Set MOCK_REDIS=1 to mock, MOCK_REDIS= to use real redis
// const useMockRedis = process.env.MOCK_REDIS;

// RedisConstructor is one of Redis or MockRedis
const RedisConstructor = Redis;

function createRedisClient() {
  try {
    const { port, host } = url.parse(redisUrl, true);
    return new RedisConstructor(port, host, {
      password: process.env.REDIS_PASSWORD,
    });
  } catch (error) {
    const message = `Unable to parse port and host from "${redisUrl}"`;
    console.log(message);
    throw new Error(message);
  }
}

module.exports = {
  // If callers need to create a new redis instance, they'll use the ctor
  createRedisClient,
  // Otherwise they can use this shared instance (most should use this)
  redis: new Redis(),
};
