import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Pagination } from 'src/helpers/pagination';
import { Repository } from 'typeorm';
import { UserResponseInterface } from '../user/interfaces/user-response.interface';

@Injectable()
export class ArticleService {
    @InjectRepository(Users)
    private readonly repository: Repository<Users>;
    constructor() {}

    public async getAllArticle(
        payload,
      ): Promise<Pagination<UserResponseInterface>> {
        const totalData = await this.repository
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            'user.organization',
            'organization',
            'user.organization = organization.id_organization',
          )
          .where(`user.name ilike :search`, { search: `%${payload.search}%` })
          .getCount();
    
        const content = await this.repository
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            'user.organization',
            'organization',
            'user.organization = organization.id_organization',
          )
          .where(`user.name ilike :search`, { search: `%${payload.search}%` })
          .take(payload.size)
          .skip(payload.page)
          .getMany();
    
        return new Pagination<UserResponseInterface>({
            content,
            totalData,
        });
      }
}
