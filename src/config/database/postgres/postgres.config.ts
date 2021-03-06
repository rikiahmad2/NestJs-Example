import * as dotenv from 'dotenv';

dotenv.config();

export const PgConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: `${process.env.DATABASE_PASSWORD}`,
  entities: ['dist/**/*.entity.{ts,js}'],
  subscribers: [],
  migrations: ['dist/src/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: "src/migrations"
  }
};
