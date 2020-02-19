import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EventsModule, UserModule],
})
export class AppModule {}
