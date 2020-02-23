import {Injectable} from '@nestjs/common';
import {redis} from "../redis";
import RoomModel from "./room.model";
import InputModel from "../common/input.model";
import {Socket} from "socket.io";
import UserModel from "../user/user.model";
import MessageFactory from "../message/message.factory";
import Logger from "../common/logger.service";

@Injectable()
export class RoomService {
  private logger: Logger = new Logger('RoomService');

  async addRoom(payload: InputModel): Promise<RoomModel[]> {
    const room = new RoomModel(payload.value);

    try {
      await redis.sadd('room', JSON.stringify(room));
    } catch (error) {
      this.logger.error(error.message);
    }

    return this.getRooms();
  }

  async getRooms(): Promise<RoomModel[]> {
    try {
      const rooms = await redis.smembers('room');

      return rooms.map((room: string) => JSON.parse(room));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getRoom(roomId: string): Promise<RoomModel> {
    const room = (await this.getRooms()).filter((room: RoomModel) => room.id === roomId);

    if (!room) {
      throw Error("Room does not exists");
    }

    return room[0];
  }

  async getConnectedRoom (userId: string): Promise<null|string> {
    return await redis.hget('user_room', userId);
  }

  async removeUserFromRoom (userId: any): Promise<void> {
    await redis.hdel('user_room', userId);
  }

  async broadcastConnectedMessage(
    client: Socket,
    previousRoom: string,
    currentRoom: string,
    user: UserModel
  ): Promise<void> {
    if (previousRoom !== currentRoom)
    {
      await client.broadcast.in(previousRoom).emit(
        'incomingNotification',
        MessageFactory.createConnectedNotification(user.id, user.name)
      );
    }
  }

  async broadcastDisconnectedMessage(
    client: Socket,
    previousRoom: string,
    currentRoom: string,
    user: UserModel
  ): Promise<void> {
    if (previousRoom !== currentRoom)
    {
      await client.broadcast.in(previousRoom).emit(
        'incomingNotification',
        MessageFactory.createDisconnectedNotification(user.id, user.name)
      );
    }
  }
}

