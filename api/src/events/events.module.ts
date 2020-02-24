import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { MessageModule } from '../message/message.module';
import { RoomService } from '../room/room.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  providers: [EventsGateway, RoomService, MessageService, UserService],
})
export class EventsModule {}
