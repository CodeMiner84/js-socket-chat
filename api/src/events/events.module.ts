import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {UserModule} from "../user/user.module";
import {RoomModule} from "../room/room.module";
import {MessageModule} from "../message/message.module";

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  providers: [EventsGateway],
})
export class EventsModule {}
