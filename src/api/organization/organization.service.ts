import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entities/Organization';
import { Pagination } from 'src/helpers/pagination';
import { Repository } from 'typeorm';
import { OrganizationResponseInterface } from './interface/organization.interface';

@Injectable()
export class OrganizationService {
  @InjectRepository(Organization)
  private readonly repository: Repository<Organization>;

  constructor() {}

  public async getAllOrganizations(payload): Promise<Pagination<OrganizationResponseInterface>> {
    const totalData = await this.repository
    .createQueryBuilder('organization')
    .leftJoinAndSelect("organization.users", "user")
    .where(`organization.name ilike :search`, { search: `%${payload.search}%` })
    .getCount();

    const content = await this.repository
      .createQueryBuilder('organization')
      .leftJoinAndSelect("organization.users", "user")
      .where(`organization.name ilike :search`, { search: `%${payload.search}%` })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

      return new Pagination<OrganizationResponseInterface>({
        content,
        totalData,
      });
  }

  public async insertOrganization(payload): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .insert()
      .into(Organization)
      .values(payload)
      .execute();
  }
}
