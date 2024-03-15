import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  });

  app.startAllMicroservices();
}
bootstrap();
