import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from './user.service';
import Logger from '../common/logger.service';

@WebSocketGateway()
export class UserGateway {
  private logger: Logger = new Logger('UserGateway');

  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('setUser')
  async setUser(client: Socket | any, payload: any): Promise<void> {
    this.logger.onStartEvent('setUser');
    client.userId = payload.value;
    client.emit('userAdded', await this.userService.addUser(payload));
    this.logger.onLeaveEvent('setUser');
  }

  @SubscribeMessage('reconnected')
  async reconnectUser(client: Socket | any, payload: any): Promise<void> {
    this.logger.onStartEvent('reconnected');
    client.userId = payload.value;
    this.logger.onLeaveEvent('reconnected');
  }

  @SubscribeMessage('getUsers')
  async getUsers(client: Socket, roomId: string): Promise<void> {
    this.logger.onStartEvent('getUsers');
    try {
      await client.server.sockets.emit(
        'usersFetched',
        await this.userService.getAllUsersFromRoom(roomId),
      );
    } catch (error) {
      this.logger.error(error.message);
    }
    this.logger.onLeaveEvent('getUsers');
  }
}
