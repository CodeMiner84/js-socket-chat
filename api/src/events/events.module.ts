import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {UserModule} from "../user/user.module";
import {RoomModule} from "../room/room.module";
import {MessageModule} from "../message/message.module";
import {RoomService} from "../room/room.service";

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  providers: [EventsGateway, RoomService],
})
export class EventsModule {}
