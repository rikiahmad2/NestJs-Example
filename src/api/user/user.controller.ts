import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BaseResponse } from 'src/helpers/response';
import { ApiResponse } from '@nestjs/swagger';
import { Pagination } from 'src/helpers/pagination';
import { UserResponseInterface } from './interfaces/user-response.interface';
import { InsertUserDto, LoginUserDto, SearchUserDto } from './dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Alll Users List',
  })
  public async getAllUsers(
    @Query() queryparam: SearchUserDto,
  ): Promise<BaseResponse> {
    const result: Pagination<UserResponseInterface> =
      await this.userService.getAllUsers(queryparam);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'User Has Been Created',
  })
  public async createUser(@Body() body: InsertUserDto): Promise<any> {
    const result = await this.userService.insertUsers(body);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'User Has Been Created',
  })
  @ApiResponse({
    status: 401,
    type: BaseResponse,
    description: 'unauthorized',
  })
  public async loginUser(
    @Body() body: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.loginUsers(body);

    if(result == null){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: false,
        message: 'unauthorized',
        data : result,
      });
    }

    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'success',
      data : result,
    });
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Detail User',
  })
  public async getUserById(@Param('id') id): Promise<any> {
    const result = await this.userService.getUserById(id);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Delete User',
  })
  public async deleteUser(@Param('id') id): Promise<any> {
    const result = await this.userService.deleteUser(id);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }
}
