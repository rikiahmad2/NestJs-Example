import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const sampleConfig: PostgresConnectionOptions = {
    type: 'postgres',
    database: 'nestjs-example',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsTableName: 'typeorm_migrations',
    subscribers: [],
}

export default sampleConfig;