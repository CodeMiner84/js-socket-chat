import redisClient, {client} from '../redis-client';
import tables from '../config/tables';
import UserDto from "../models/user.dto";
import RoomDto from "../models/room.dto";
import {getRoom} from "./room";

export async function getAllUsers(): Promise<UserDto[]> {
  const rawUsers = await redisClient.getAsync(tables.user);

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
  await client.hset(tables.user_room, userId, roomId);
}

export async function getUserRoom(userId: string): Promise<RoomDto> {
  const userRoomId = await redisClient.hgetAsync(tables.user_room, userId) as string;

  return getRoom(userRoomId);
}

export async function addUser(user: UserDto): Promise<UserDto> {
  const users = await getAllUsers();

  users.push(user);
  await redisClient.setAsync(tables.user, JSON.stringify(users));

  return user;
}
