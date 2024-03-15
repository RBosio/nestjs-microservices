import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  });

  app.startAllMicroservices();
}
bootstrap();
