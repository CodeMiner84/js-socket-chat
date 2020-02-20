import { Injectable } from '@nestjs/common';
import MessageModel from "./message.model";
import {redis} from "../redis";

@Injectable()
export class MessageService {
  async addMessage(roomId: string, message: MessageModel): Promise<MessageModel> {
    await redis.rpush(`message_${roomId}`, JSON.stringify(message));

    return message;
  }

  async getMessages(roomId: string): Promise<MessageModel[]> {
    const messages = await redis.lrange(`message_${roomId}`,-10 , -1);

    return messages.map((message: string) => JSON.parse(message));
  }


}
