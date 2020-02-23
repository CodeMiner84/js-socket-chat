import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import {RoomGateway} from "./room.gateway";
import {UserService} from "../user/user.service";

@Module({
  providers: [RoomGateway, UserService, RoomService],
})
export class RoomModule {}
