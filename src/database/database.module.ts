import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { Cat } from '../cat/entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (options: ConfigService) => {
        return {
          type: options.get('database.type'),
          host: options.get('database.host'),
          port: options.get('database.port'),
          username: options.get('database.username'),
          password: options.get('database.password'),
          database: options.get('database.database'),
          entities: [Cat],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
