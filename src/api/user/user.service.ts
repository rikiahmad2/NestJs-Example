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

  public async getAllUsers(): Promise<any> {
    const content = await this.repository
      .createQueryBuilder('user')
      .getMany();
      
    return content;
  }
}
