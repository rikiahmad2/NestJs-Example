import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { Pagination } from 'src/helpers/pagination';
import { Repository } from 'typeorm';
import { ArticleResponseInterface } from './interface/article-response.interface';

@Injectable()
export class ArticleService {
    @InjectRepository(Article)
    private readonly repository: Repository<Article>;
    constructor() {}

    public async getAllArticle(
        payload,
      ): Promise<Pagination<ArticleResponseInterface>> {
        const totalData = await this.repository
          .createQueryBuilder('article')
          .leftJoinAndSelect("article.id_user", "user")
          .where(`article.name ilike :search`, { search: `%${payload.search}%` })
          .getCount();
    
        const content = await this.repository
          .createQueryBuilder('article')
          .leftJoinAndSelect("article.id_user", "user")
          .where(`article.name ilike :search`, { search: `%${payload.search}%` })
          .take(payload.size)
          .skip(payload.page)
          .getMany();
    
        return new Pagination<ArticleResponseInterface>({
            content,
            totalData,
        });
      }
}
