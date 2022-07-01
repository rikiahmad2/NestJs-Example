import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entities/Organization';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  @InjectRepository(Organization)
  private readonly repository: Repository<Organization>;

  constructor() {}

  public async getAllOrganizations(payload): Promise<any> {
    const content = await this.repository
      .createQueryBuilder('organization')
      .innerJoinAndSelect("organization.users", "user")
      .where(`organization.name ilike :search`, { search: `%${payload.search}%` })
      .getMany();

    return content;
  }
}
