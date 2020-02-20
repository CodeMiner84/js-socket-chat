import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from "socket.io";
import {RoomService} from "./room.service";
import InputModel from "../common/input.model";
import {RoomModule} from "./room.module";

@WebSocketGateway()
export class RoomGateway {
  constructor(
    private readonly roomService: RoomService
  ) {}

  @SubscribeMessage('addRoom')
  async setUser(client: Socket, payload: InputModel): Promise<void> {
    client.emit('roomAdded', await this.roomService.addRoom(payload));
  }

  @SubscribeMessage('getRooms')
  async getRooms(client: Socket): Promise<void> {
    console.log('getRooms');
    client.emit('roomsFetched', await this.roomService.getRooms());
  }
}

