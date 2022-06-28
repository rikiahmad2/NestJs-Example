import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/entities/User";

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    getHello(): string {
        return 'Hehe World!';
    }

    getallUser(): any {
        return this.repository
        .createQueryBuilder('user')
        .getMany();
    }
}