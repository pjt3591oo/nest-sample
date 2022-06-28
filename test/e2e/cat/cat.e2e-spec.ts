import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';

import { CatModule } from '../../../src/cat/cat.module';
import { DatabaseModule } from '../../database/database.module';

import DatabaseConfig from '../../config/database.config';
import AppConfig from '../../config/app.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CatModule,
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [AppConfig, DatabaseConfig],
          envFilePath: '.test.env',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (post): 201', () => {
    return request(app.getHttpServer())
      .post('/cat')
      .type('application/json')
      .send({ name: 'modolee', breed: 'test', age: 30 })
      .expect(201)
      .expect('Hello World!');
  });
  it('/ (post): 400', () => {
    return request(app.getHttpServer())
      .post('/cat')
      .type('application/json')
      .expect(400);
  });
  it('/use/value (post): 201', () => {
    return request(app.getHttpServer())
      .post('/cat/use/value')
      .type('application/json')
      .send({ name: 'modolee', breed: 'test', age: 30 })
      .expect(201)
      .expect('TEST');
  });
  it('/use/value (post): 400', () => {
    return request(app.getHttpServer())
      .post('/cat')
      .type('application/json')
      .expect(400);
  });

  it('/use/class (post): 201', () => {
    return request(app.getHttpServer())
      .post('/cat/use/class')
      .type('application/json')
      .send({ name: 'modolee', breed: 'test', age: 30 })
      .expect(201)
      .expect('Hello World!');
  });
  it('/use/class (post): 400', () => {
    return request(app.getHttpServer())
      .post('/cat/use/class')
      .type('application/json')
      .expect(400);
  });

  it('get config', () => {
    return request(app.getHttpServer())
      .get('/cat/config')
      .type('application/json')
      .expect(200)
      .expect('3000');
  });
  it('get cats', () => {
    return request(app.getHttpServer())
      .get('/cat')
      .type('application/json')
      .expect(200)
      .expect([]);
  });
});
