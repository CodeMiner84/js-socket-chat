import redisClient from '../redis-client';
import config from '../config';
import RoomDto from "../models/room.dto";

export async function getAllRooms(): Promise<RoomDto[]> {
  const rawRooms = await redisClient.getAsync(config.room);

  return JSON.parse(rawRooms) || [];
}

export async function addRoom(room: RoomDto): Promise<RoomDto> {
  const rooms = await getAllRooms();

  const exists = rooms.filter((existedRoom: RoomDto) => existedRoom.name === room.name);
  if (exists.length) {
    throw ("Duplicate entry");
  }

  rooms.push(room);

  await redisClient.setAsync(config.room, JSON.stringify(rooms));

  return room;
}
