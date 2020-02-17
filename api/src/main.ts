import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {WebSocketGateway} from "@nestjs/websockets";

@WebSocketGateway(81, { transports: ['websocket'] })
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
