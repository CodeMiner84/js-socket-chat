import { Injectable } from '@nestjs/common';
import {redis} from "../redis";
import UserModel from "./user.model";

@Injectable()
export class UserService {
  async addUser(payload: any): Promise<UserModel> {
    const user = new UserModel(payload.value);

    await redis.sadd('user', JSON.stringify(user));

    return user;
  }
}
