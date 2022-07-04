import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { Msttag } from 'src/entities/Msttag';
import { Pagination } from 'src/helpers/pagination';
import { Repository } from 'typeorm';
import { ArticleResponseInterface } from './interface/article-response.interface';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  @InjectRepository(Msttag)
  private readonly repository: Repository<Article>;
  private readonly repository_mst: Repository<Msttag>;
  constructor() {}

  public async getAllArticle(
    payload,
  ): Promise<Pagination<ArticleResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.id_user', 'user')
      .where(`article.name ilike :search`, { search: `%${payload.search}%` })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.id_user', 'user')
      .where(`article.name ilike :search`, { search: `%${payload.search}%` })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<ArticleResponseInterface>({
      content,
      totalData,
    });
  }

  public async insertArticleMst(payload): Promise<any> {
    const articleInsert = {
      name: payload.name,
      cover: payload.cover,
      content: payload.content,
      user: payload.id_user,
    };

    return await this.repository
      .createQueryBuilder('article')
      .insert()
      .into(Article)
      .values(articleInsert)
      .execute();
  }
}
