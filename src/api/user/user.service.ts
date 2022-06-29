import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  constructor(private jwtService : JwtService){}

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
    //Encrypt Password
    payload.password = await bcrypt.hash(payload.password, 10);

    return await this.repository
      .createQueryBuilder('user')
      .insert()
      .into(Users)
      .values(payload)
      .execute();
  }

  public async loginUsers(payload): Promise<any>{
    const user = await this.repository
    .createQueryBuilder('user')
    .where("email = :email", { email: payload.email })
    .getOne();

    if(user){
      const isValid = await bcrypt.compare(payload.password, user.password);
      if(isValid){
        return user;
      }
    }
    return null;
  }

  public async getUserById(id): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .where("id = :id", { id: id })
      .getOne();
  }

  public async deleteUser(id): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .delete()
      .from(Users)
      .where("id = :id", { id: id })
      .execute();
  }

  public async validateUser(email : string, pass:string): Promise<any>{
    const user = await this.repository
    .createQueryBuilder('user')
    .where("email = :email", { email: email })
    .getOne();

    if(user){
      const isValid = await bcrypt.compare(pass, user.password);
      if(isValid){
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
