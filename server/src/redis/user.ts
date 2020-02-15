import redisClient, {client} from '../redis-client';
import config from '../config';
import UserDto from "../models/user.dto";
import RoomDto from "../models/room.dto";

export async function getAllUsers(): Promise<UserDto[]> {
  const rawUsers = await redisClient.getAsync(config.user);

  return JSON.parse(rawUsers) || [];
}

export async function getUser(userId: string): Promise<UserDto> {
  const user = (await getAllUsers()).filter((user: UserDto) => {
    return user.id === userId;
  });
  if (!user) {
    throw Error("User does not exists");
  }

  return user[0];
}

export async function changeUserRoom(userId: string, roomId: string): Promise<void> {
  await client.hset(config.user_room, userId, roomId);
}

export async function getUserRoom(userId: string): Promise<RoomDto> {
  const userRoomId = await (
      new Promise((resolve, reject) => {
        return client.hget(config.user_room, userId, (err: any, result: any) => {
          resolve(result);
        });
      })
  ) as string;

  return JSON.parse(await redisClient.getAsync(config.room)).filter((room: RoomDto) => room.id == userRoomId)[0];
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
