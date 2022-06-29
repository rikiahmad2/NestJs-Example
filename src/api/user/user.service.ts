import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  getHello(): string {
    return 'Hehe World!';
  }

  public async getAllUsers(payload): Promise<any> {
    const content = await this.repository
      .createQueryBuilder('user')
      .where("user.name like :search", { search:`%${payload.search}%` })
      .getMany();
      
    return content;
  }

  public async insertUsers(payload): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(payload)
      .execute();
  }
}
