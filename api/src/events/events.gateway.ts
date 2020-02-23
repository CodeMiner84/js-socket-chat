import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {RoomService} from "../room/room.service";
import MessageFactory from "../message/message.factory";
import {UserService} from "../user/user.service";
import CustomSocket from "./custom.socket";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  public constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: CustomSocket) {
    if (client.userId !== undefined) {
      this.logger.log(`Client disconnected: ${client.id}, and user ${client.userId}`);
      const connectedRoomId = await this.roomService.getConnectedRoom(client.userId);

      const user = await this.userService.getUser(client.userId);
      const message = MessageFactory.createDisconnectedNotification(user.id, user.name);

      client.broadcast.in(connectedRoomId).emit('incomingNotification', message);
      await this.roomService.removeUserFromRoom(client.userId);
    }
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
