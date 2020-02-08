import redisClient, {client} from '../redis-client';
import config from '../config';
import UserDto from "../models/user.dto";
import RoomDto from "../models/room.dto";

export async function getAllUsers(): Promise<UserDto[]> {
  const rawUsers = await redisClient.getAsync(config.user);

  return JSON.parse(rawUsers) || [];
}

export async function getUser(userId: string): Promise<UserDto> {
  const user = (await getAllUsers()).filter((user: UserDto) => user.id === userId);

  if (!user) {
    throw Error("User does not exists");
  }

  return user[0];
}


export async function changeUserRoom(userId: string, roomId: string): Promise<void> {
  await client.hset(config.user_room, userId, roomId);
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
