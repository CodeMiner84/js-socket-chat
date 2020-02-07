import redisClient from '../../redis-client';
import config from '../../config';
import RoomDto from "./room.dto";

export async function getAllRooms(): Promise<string[]> {
  const rawRooms = await redisClient.getAsync(config.room);

  return JSON.parse(rawRooms) || [];
}

export async function addRoom(room: RoomDto): Promise<RoomDto> {
  const rooms = await getAllRooms();

  const exists = rooms.filter((name:string) => name === room.name);
  if (exists.length) {
    throw ("Duplicate entry");
  }

  return room;
}
