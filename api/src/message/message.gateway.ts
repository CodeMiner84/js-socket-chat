import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import InputModel from "../common/input.model";
import {RoomService} from "../room/room.service";
import {UserService} from "../user/user.service";
import MessageModel from "./message.model";
import {MessageService} from "./message.service";
import {Socket} from "socket.io";

@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) {}

  @SubscribeMessage('fetchMessages')
  async fetchMessages(client: Socket, payload: InputModel): Promise<void> {
    const connectedRoom = await this.userService.getUserRoom(payload.value);
    if (!connectedRoom) {
      throw Error("You need to connect to room");
    }

    const messages = await this.messageService.getMessages(connectedRoom.id);
    await client.emit('messagesFetched', messages);
  }

  @SubscribeMessage('addMessage')
  async addMessage(client: Socket, payload: MessageModel): Promise<void> {
    try {
      const connectedRoom = await this.userService.getUserRoom(payload.user);
      if (!connectedRoom.id) {
        throw Error("You need to connect to room");
      }
      const user = await this.userService.getUser(payload.user);
      const message = new MessageModel(
        payload.message,
        user.name,
        (new Date()).toLocaleString()
      );

      await this.messageService.addMessage(connectedRoom.id, message);

      await client.server.sockets.in(connectedRoom.id).emit('messageReceived', message);
    } catch (error) {
      console.log('error', error);
    }
  }
}
