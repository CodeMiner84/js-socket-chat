import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as uuidv4 from 'uuid/v4';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {UserService} from "../user/user.service";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('msgToServer', payload);
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('setUser')
  async setUser(client: Socket, payload: any): Promise<void> {
    client.emit('userAdded', await this.userService.addUser(payload));
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
