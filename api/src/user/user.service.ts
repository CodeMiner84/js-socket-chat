import { Injectable } from '@nestjs/common';
import {redis} from "../redis";
import UserModel from "./user.model";
import {RoomService} from "../room/room.service";

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

  async getAllUsersFromRoom(roomId: any): Promise<UserModel[]> {
    try {
      const getAllConnectedUsers: any = await redis.hgetall('user_room');
      const roomKeys = Object.values(getAllConnectedUsers);
      const results: any = await Object.keys(getAllConnectedUsers).map(async (user: any, index: number) => {
        if (roomKeys[index] === roomId.roomId) {
          const users = await redis.sscan('user', 0, 'match', `{\"id\":\"${user}*`);
          if (undefined !== users[1][0]) {
            return users[1][0];
          }
        }
      });

      const activeUsers = await Promise.all(results).then((completed) => {
        return completed;
      });

      return activeUsers.filter((user: any) => undefined !== user).map((user: string) => JSON.parse(user));
    } catch (e) {
      console.log('e.message', e.message);
    }
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
