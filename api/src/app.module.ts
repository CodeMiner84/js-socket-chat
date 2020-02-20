import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { Room } from './room/room';
import { RoomGateway } from './room/room.gateway';
import { CommonModule } from './common/common.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {RoomService} from "./room/room.service";

@Module({
  imports: [EventsModule, UserModule, RoomModule, CommonModule],
  providers: [
  ]
})
export class AppModule {}
