import { Body, Controller, Get, HttpCode, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {UserService} from './user.service';
import { BaseResponse } from 'src/helpers/response';
import { ApiResponse } from '@nestjs/swagger';
import { Pagination } from 'src/helpers/pagination';
import { UserResponseInterface } from './interfaces/user-response.interface';
import { InsertUserDto, SearchUserDto } from './dto';

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
  public async getAllUsers(@Query() queryparam: SearchUserDto): Promise<BaseResponse> {
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
}
