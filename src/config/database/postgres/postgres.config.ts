import * as dotenv from 'dotenv';
import {User} from '../../../entities/User';
import {Organization} from '../../../entities/Contact';

dotenv.config();

export const PgConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: `${process.env.DATABASE_PASSWORD}`,
  entities: [Organization, User],
  migrations: ['dist/database/migrations/*.{ts,js}'],
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
};
