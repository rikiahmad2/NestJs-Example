import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  getHello(): string {
    return 'Hehe World!';
  }

  public async getAllUsers(payload): Promise<any> {
    const content = await this.repository
      .createQueryBuilder('user')
      .where(`name ilike :search`, { search:`%${payload.search}%` })
      .getMany();
      
    return content;
  }

  public async insertUsers(payload): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .insert()
      .into(Users)
      .values(payload)
      .execute();
  }
}
