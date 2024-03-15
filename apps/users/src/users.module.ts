import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_URI: Joi.string().required(),
        MYSQL_SYNCHRONIZE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
