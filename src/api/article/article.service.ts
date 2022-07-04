import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { ArticleMsttag } from 'src/entities/ArticleMsttag';
import { Msttag } from 'src/entities/Msttag';
import { Pagination } from 'src/helpers/pagination';
import { Repository } from 'typeorm';
import { ArticleResponseInterface } from './interface/article-response.interface';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  @InjectRepository(Msttag)
  private readonly repository: Repository<Article>;
  constructor() {}

  public async getAllArticle(
    payload,
  ): Promise<Pagination<ArticleResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .where(`article.name ilike :search`, { search: `%${payload.search}%` })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .where(`article.name ilike :search`, { search: `%${payload.search}%` })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<ArticleResponseInterface>({
      content,
      totalData,
    });
  }

  public async getAllArticleMany(
    payload,
  ): Promise<Pagination<ArticleResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.msttags', 'msttag')
      .where(`article.name ilike :search`, { search: `%${payload.search}%` })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.msttags', 'msttag')
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

    const mstInsert = {
      name: payload.name_mst,
    };

    const inputmst = await this.repository
      .createQueryBuilder('msttag')
      .insert()
      .into(Msttag)
      .values(mstInsert)
      .execute();

    const test = await this.repository
      .createQueryBuilder('article')
      .insert()
      .into(Article)
      .values(articleInsert)
      .execute();

    const arcitleMstInsert = {
      msttagIdMst: inputmst.identifiers[0].id_mst,
      articleIdArticle: test.identifiers[0].id_article,
    };

    await this.repository
      .createQueryBuilder('article_msttag')
      .insert()
      .into(ArticleMsttag)
      .values(arcitleMstInsert)
      .execute();

    return test;
  }
}
