import * as Redis from 'ioredis';

export const redis = new Redis(
  parseInt(process.env.REDIS_PORT, 10) || 6379,
  process.env.REDIS_HOST || "redis://cache"
);
