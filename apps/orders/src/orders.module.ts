import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, Order } from '@app/common';
import { NatsClientModule } from 'apps/api-gateway/src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NatsClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_URI: Joi.string().required(),
        MYSQL_SYNCHRONIZE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
