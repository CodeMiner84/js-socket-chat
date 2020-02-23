import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events/events.module';
import {redis} from './redis';
import {RedisIoAdapter} from "./utils/redis.adapter";

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
