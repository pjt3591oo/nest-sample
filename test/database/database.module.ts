import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { Cat } from '../../src/cat/entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (options: ConfigService) => {
        return {
          name: options.get('database.name'),
          type: options.get('database.type'),
          database: options.get('database.database'),
          entities: [Cat],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
