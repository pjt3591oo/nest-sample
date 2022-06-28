import { registerAs } from '@nestjs/config';
import { Cat } from '../../src/cat/entities/cat.entity';

export default registerAs('database', () => ({
  name: process.env.DATABASE_NAME,
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_PATH,
}));
