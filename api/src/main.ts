import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(8080);
}
bootstrap();
