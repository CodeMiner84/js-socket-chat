import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomService } from './room.service';
import InputModel from '../common/input.model';
import ChangeRoomModel from './change-room.model';
import RoomModel from './room.model';
import { UserService } from '../user/user.service';
import Logger from '../common/logger.service';

@WebSocketGateway()
export class RoomGateway {
  private logger: Logger = new Logger('RoomGateway');

  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('addRoom')
  async setUser(client: Socket, payload: InputModel): Promise<void> {
    this.logger.onStartEvent('addRoom');
    client.emit('roomAdded', await this.roomService.addRoom(payload));
    this.logger.onLeaveEvent('addRoom');
  }

  @SubscribeMessage('getRooms')
  async getRooms(client: Socket): Promise<void> {
    this.logger.onStartEvent('getRooms');
    client.emit('roomsFetched', await this.roomService.getRooms());
    this.logger.onLeaveEvent('getRooms');
  }

  @SubscribeMessage('changeRoom')
  async function(client: Socket, input: ChangeRoomModel) {
    this.logger.onStartEvent('changeRoom');
    try {
      let room: RoomModel = await this.roomService.getRoom(
        input.roomId as string,
      );

      if (!room) {
        const userRoom = await this.userService.getUserRoom(input.userId);
        if (!userRoom) {
          throw Error(`No selected room for user ${input.userId}`);
        }
        room = (await this.roomService.getRoom(userRoom.id)) as RoomModel;
      }

      const currentRoom = await this.roomService.getConnectedRoom(input.userId);
      const user = await this.userService.getUser(input.userId);
      await this.roomService.broadcastDisconnectedMessage(
        client,
        room.id,
        currentRoom,
        user,
      );

      client.join(room.id);
      await this.userService.changeUserRoom(input.userId, room.id);
      await client.emit('roomChanged', room);
      await this.roomService.broadcastConnectedMessage(
        client,
        room.id,
        currentRoom,
        user,
      );
    } catch (error) {
      client.emit('roomChangeError');
      this.logger.error(error.message);
    }
    this.logger.onLeaveEvent('changeRoom');
  }
}
