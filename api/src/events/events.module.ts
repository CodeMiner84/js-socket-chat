import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {UserModule} from "../user/user.module";
import {RoomModule} from "../room/room.module";

@Module({
  imports: [UserModule, RoomModule],
  providers: [EventsGateway],
})
export class EventsModule {}
