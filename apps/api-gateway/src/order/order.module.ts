import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [OrderController],
})
export class OrderModule {}
