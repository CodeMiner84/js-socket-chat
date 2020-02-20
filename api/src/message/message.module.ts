import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import {UserService} from "../user/user.service";
import {RoomService} from "../room/room.service";

@Module({
  exports: [],
  imports: [],
  providers: [MessageGateway, MessageService, RoomService, UserService]
})
export class MessageModule {}
