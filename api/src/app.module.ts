import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { CommonModule } from './common/common.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [EventsModule, RoomModule, UserModule, CommonModule, MessageModule],
  providers: []
})
export class AppModule {}
