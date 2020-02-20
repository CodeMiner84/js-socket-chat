import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from "socket.io";
import {RoomService} from "./room.service";
import InputModel from "../common/input.model";

@WebSocketGateway()
export class RoomGateway {
  constructor(
    private readonly roomService: RoomService
  ) {}

  @SubscribeMessage('addRoom')
  async setUser(client: Socket, payload: InputModel): Promise<void> {
    console.log('testtestsetset');
    client.emit('roomAdded', await this.roomService.addRoom(payload));
  }
}

