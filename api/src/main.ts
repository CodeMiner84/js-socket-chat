import { NestFactory } from '@nestjs/core';
import * as Store from 'connect-redis';
import * as session from 'express-session';
import { EventsModule } from './events/events.module';
import { redis } from './redis';

async function bootstrap() {
  const RedisStore = Store(session);
  const app = await NestFactory.create(EventsModule);
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'js-chat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    }));
  await app.listen(8080);
}
bootstrap();
