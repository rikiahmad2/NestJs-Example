import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Article } from 'src/entities/Article';
import { ArticleMsttag } from 'src/entities/ArticleMsttag';
import { Msttag } from 'src/entities/Msttag';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Msttag, ArticleMsttag]), 
    MulterModule.register({
      fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'application/pdf') {
          return cb(new Error('Only images files are allowed'), false);
        }
        cb(null, true)
      },
      storage: diskStorage({
        destination: './upload',
          filename: function ( req, file, cb ) {
            cb( null, Date.now()+'-'+file.originalname);
          }
      })
    })
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
