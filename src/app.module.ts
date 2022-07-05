import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PostgresService } from './config/database/postgres/postgres.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({useClass: PostgresService}),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}
