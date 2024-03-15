import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        url: configService.get('MYSQL_URI'),
        entities: [],
        synchronize: configService.get("MYSQL_SYNCHRONIZE")
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
