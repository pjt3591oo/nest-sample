import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from '../../../src/cat/cat.controller';
import { CatService } from '../../../src/cat/cat.service';
import { CreateCatDto } from '../../../src/cat/dto/cat-create.dto';

import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';

import DatabaseConfig from '../../config/database.config';
import AppConfig from '../../../src/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from '../../../src/cat/entities/cat.entity';

describe('CatController', () => {
  let catController: CatController;
  const data0: CreateCatDto = {
    name: 'test',
    age: 1,
    breed: 'test',
  };
  beforeEach(async () => {
    const cat: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Cat]),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [AppConfig, DatabaseConfig],
          envFilePath: '.test.env',
        }),
      ],
      controllers: [CatController],
      providers: [
        CatService,
        {
          provide: 'TEST',
          useValue: 'TEST',
        },
        {
          provide: 'TEST1',
          useClass: CatService,
        },
      ],
    }).compile();

    catController = cat.get<CatController>(CatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(catController.getHello(data0)).toBe('Hello World!');
    });
  });

  describe('/use/value', () => {
    it('should return "test"', () => {
      expect(catController.getHello0(data0)).toBe('TEST');
    });
  });

  describe('/use/class', () => {
    it('should return "Hello World!"', () => {
      expect(catController.getHello1(data0)).toBe('Hello World!');
    });
  });

  describe('/config', () => {
    it('should return "development"', () => {
      expect(catController.getConfig()).toBe(3000);
    });
  });
  describe('get cats', () => {
    it('should return []', async () => {
      const rst = await catController.getCats();
      expect(rst).toStrictEqual([]);
    });
  });
});
