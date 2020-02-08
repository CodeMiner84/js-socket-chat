import redisClient from '../redis-client';
import config from '../config';
import UserDto from "../models/user.dto";

export async function getAllUsers(): Promise<UserDto[]> {
  const rawUsers = await redisClient.getAsync(config.user);

  return JSON.parse(rawUsers) || [];
}

export async function addUser(user: UserDto): Promise<UserDto> {
  const users = await getAllUsers();

  // const exists = users.filter((item: UserDto) => item.name === user.name);
  // if (exists.length) {
  //   throw ("Duplicate entry");
  // }

  users.push(user);

  await redisClient.setAsync(config.user, JSON.stringify(users));

  return user;
}
