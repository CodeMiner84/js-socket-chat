import redisClient, {client} from '../redis-client';
import config from '../config';
import UserDto from "../models/user.dto";
import RoomDto from "../models/room.dto";
import {getRoom} from "./room";

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
  const userRoomId = await redisClient.hgetAsync(config.user_room, userId) as string;

  return getRoom(userRoomId);
}

export async function addUser(user: UserDto): Promise<UserDto> {
  const users = await getAllUsers();

  users.push(user);
  await redisClient.setAsync(config.user, JSON.stringify(users));

  return user;
}
