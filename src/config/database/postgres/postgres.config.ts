import * as dotenv from 'dotenv';
import {Users} from '../../../entities/Users';
import {Organization} from '../../../entities/Organization';
import { Article } from 'src/entities/Article';
import { Comment } from 'src/entities/Comment';
import { Msttag } from 'src/entities/Msttag';
import { ArticleMsttag } from 'src/entities/ArticleMsttag';

dotenv.config();

export const PgConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: `${process.env.DATABASE_PASSWORD}`,
  entities: [Organization, Users, Article, Comment, Msttag, ArticleMsttag],
  subscribers: [],
  migrations: ['src/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: "src/migrations"
  }
};
