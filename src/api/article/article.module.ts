import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { ArticleMsttag } from 'src/entities/ArticleMsttag';
import { Msttag } from 'src/entities/Msttag';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Msttag, ArticleMsttag]), 
    MulterModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
