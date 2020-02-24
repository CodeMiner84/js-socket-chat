import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [EventsModule, RoomModule, UserModule, MessageModule],
  providers: [],
})
export class AppModule {}
