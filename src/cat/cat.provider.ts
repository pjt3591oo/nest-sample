import { DataSource } from 'typeorm';
import { Cat } from './entities/cat.entity';

export const CatProvider = {
  provide: 'CAT_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Cat),
  inject: ['CAT_REPOSITORY'],
};
