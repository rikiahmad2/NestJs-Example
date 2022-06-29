import { Controller, Get, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import {UserService} from './user.service';
import { BaseResponse } from 'src/helpers/response';
import { ApiResponse } from '@nestjs/swagger';

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
  public async getAllUsers(): Promise<any> {
    const result_data = await this.userService.getAllUsers();

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result_data,
    });
  }
}
