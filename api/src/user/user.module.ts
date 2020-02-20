import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserGateway} from "./user.gateway";
import {RoomService} from "../room/room.service";

@Module({
  providers: [UserService, UserGateway],
})
export class UserModule {}
