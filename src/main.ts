import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const transform = true;
  const whitelist = true;
  app.useGlobalPipes(new ValidationPipe({ transform, whitelist }));
  await app.listen(3000);
}
bootstrap();
