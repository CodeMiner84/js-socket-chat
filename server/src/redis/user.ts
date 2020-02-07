import redisClient from '../redis-client';
import config from '../config';

export async function getAllUsers(): Promise<string[]> {
  const rawUsers = await redisClient.getAsync(config.user);

  return JSON.parse(rawUsers) || [];
}

export async function addUser(user: string): Promise<string> {
  const users = await getAllUsers();

  const exists = users.filter((name:string) => name === user);
  if (exists.length) {
    throw ("Duplicate entry");
  }

  users.push(user);

  await redisClient.setAsync(config.user, JSON.stringify(users));

  return user;
}
