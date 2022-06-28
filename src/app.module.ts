import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import AppConfig from './config/app.config';
import DatabaseConfig from './config/database.config';

import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
      envFilePath: '.env',
    }),
    CatModule,
  ],
})
export class AppModule {}
