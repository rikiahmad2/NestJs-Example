import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Pagination } from 'src/helpers/pagination';
import { UserResponseInterface } from './interfaces/user-response.interface';

@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  constructor(private jwtService: JwtService) {}

  getHello(): string {
    return 'Hehe World!';
  }

  public async getAllUsers(
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

  public async insertUsers(payload): Promise<any> {
    //Encrypt Password
    payload.password = await bcrypt.hash(payload.password, 10);

    return await this.repository
      .createQueryBuilder('user')
      .insert()
      .into(Users)
      .values(payload)
      .execute();
  }

  public async loginUsers(payload): Promise<any> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('email = :email', { email: payload.email })
      .getOne();

    if (user) {
      const isValid = await bcrypt.compare(payload.password, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  public async getUserById(id): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .where('id = :id', { id: id })
      .getOne();
  }

  public async deleteUser(id): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .delete()
      .from(Users)
      .where('id = :id', { id: id })
      .execute();
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('email = :email', { email: email })
      .getOne();

    if (user) {
      const isValid = await bcrypt.compare(pass, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  public async generateToken(user: any) {
    const payload = await { email: user.email, password: user.password };
    return this.jwtService.sign(payload);
  }
}
