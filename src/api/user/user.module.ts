import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { LocalStrategy } from '../../guards/local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { jwtConstants } from 'src/guards/constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]), 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expireTime },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy, JwtStrategy]
})
export class UserModule {}
