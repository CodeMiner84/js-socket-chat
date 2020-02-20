import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import {RoomGateway} from "./room.gateway";

@Module({
  exports: [RoomService],
  imports: [RoomService],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
