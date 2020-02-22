import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {RoomService} from "../room/room.service";
import {MessageService} from "../message/message.service";
import MessageFactory from "../message/message.factory";
import {UserService} from "../user/user.service";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  public constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket | any) {
    if (client.username !== undefined) {
      this.logger.log(`Client disconnected: ${client.id}, and user ${client.username}`);
      const connectedRoomId = await this.roomService.getConnectedRoom(client.username);

      const user = await this.userService.getUser(client.username);
      const message = MessageFactory.createDisconnectedNotification(user.id, user.name);

      client.broadcast.in(connectedRoomId).emit('incomingNotification', message);
      await this.roomService.removeUserFromRoom(client.username);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
