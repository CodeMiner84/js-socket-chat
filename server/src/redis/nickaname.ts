import redisClient from '../redis-client';
import config from '../config';

export async function getAllNickNames(): Promise<string[]> {
  const rawNicknames = await redisClient.getAsync(config.nickName);

  return JSON.parse(rawNicknames) || [];
}

export async function addNickName(nickName: string): Promise<string> {
  const nickNames = await getAllNickNames();

  const exists = nickNames.filter((name:string) => name === nickName);
  if (exists.length) {
    throw ("Duplicate entry");
  }

  nickNames.push(nickName);

  await redisClient.setAsync(config.nickName, JSON.stringify(nickNames));

  return nickName;
}
