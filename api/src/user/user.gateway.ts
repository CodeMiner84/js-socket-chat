import {
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {UserService} from "./user.service";

@WebSocketGateway()
export class UserGateway {
  constructor(
    private readonly userService: UserService
  ) {}

  @SubscribeMessage('setUser')
  async setUser(client: Socket | any, payload: any): Promise<void> {
    client.username = payload.value;
    client.emit('userAdded', await this.userService.addUser(payload));
  }

  @SubscribeMessage('reconnected')
  async reconnectUser(client: Socket | any, payload: any): Promise<void> {
    client.username = payload.value;
  }

  @SubscribeMessage('getUsers')
  async getUsers(client: Socket, roomId: string): Promise<void> {
    try {
      await client.server.sockets.emit('usersFetched', await this.userService.getAllUsersFromRoom(roomId));
    } catch (error) {
    }
  }
}
