import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { Msttag } from 'src/entities/Msttag';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Msttag])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
