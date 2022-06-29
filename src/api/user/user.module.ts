import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { LocalStrategy } from './guards/local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), PassportModule],
    controllers: [UserController],
    providers: [UserService, LocalStrategy]
})
export class UserModule {}
