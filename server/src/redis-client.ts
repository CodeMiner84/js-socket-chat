import * as redis from 'redis';
import { promisify } from 'util';
export const client = redis.createClient(process.env.REDIS_URL || 'redis://cache');

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  lrangeAsync: promisify(client.lrange).bind(client),
  hgetAsync: promisify(client.hget).bind(client)
};
