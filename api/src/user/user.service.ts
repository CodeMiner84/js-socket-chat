import { Injectable } from '@nestjs/common';
import {redis} from "../redis";
import UserModel from "./user.model";
import {RoomService} from "../room/room.service";
import RoomModel from "../room/room.model";

@Injectable()
export class UserService {
  constructor(
    private readonly roomService: RoomService
  ) {
  }

  async getAllUsers(): Promise<UserModel[]> {
    const users = await redis.smembers('user');

    return users.map((user: string) => JSON.parse(user));
  }

  async addUser(payload: any): Promise<UserModel> {
    const user = new UserModel(payload.value);

    await redis.sadd('user', JSON.stringify(user));

    return user;
  }

  async getUser(userId: string): Promise<UserModel> {
    const user = (await this.getAllUsers()).filter((user: UserModel) => {
      return user.id === userId;
    });
    if (!user) {
      throw Error("User does not exists");
    }

    return user[0];
  }

  async changeUserRoom(userId: string, roomId: string): Promise<void> {
    await redis.hset('user_room', userId, roomId);
  }

  async getUserRoom(userId: string): Promise<any> {
    const userRoomId = await redis.hget('user_room', userId) as string;

    return this.roomService.getRoom(userRoomId);
  }
}
