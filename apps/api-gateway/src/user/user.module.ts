import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UserController],
})
export class UserModule {}
