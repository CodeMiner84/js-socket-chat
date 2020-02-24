import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
