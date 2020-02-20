import {Injectable} from '@nestjs/common';
import {redis} from "../redis";
import RoomModel from "./room.model";
import InputModel from "../common/input.model";

@Injectable()
export class RoomService {
  async addRoom(payload: InputModel): Promise<RoomModel[]> {
    const room = new RoomModel(payload.value);

    try {
      await redis.sadd('room', JSON.stringify(room));
    } catch (error) {
      console.log('error.message', error.message);
    }

    return this.getRooms();
  }

  async getRooms(): Promise<RoomModel[]> {
    try {
      const rooms = await redis.smembers('room');

      return rooms.map((room: string) => JSON.parse(room));
    } catch (error) {
      console.log('error.message', error.message);
    }
  }
}

