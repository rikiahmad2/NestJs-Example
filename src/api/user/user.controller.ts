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
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BaseResponse } from 'src/helpers/response';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/helpers/pagination';
import { UserResponseInterface } from './interfaces/user-response.interface';
import { InsertUserDto, SearchUserDto } from './dto';
import { Response } from 'express';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MailService } from '../mail/mail.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService, private mailService: MailService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiOperation({summary: 'Get all user list'})
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Alll Users List',
  })
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'User Has Been Created',
  })
  @ApiBearerAuth()
  public async createUser(@Body() body: InsertUserDto): Promise<any> {
    const result = await this.userService.insertUsers(body);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiOperation({summary: 'Get detail user by id'})
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Detail User',
  })
  @ApiBearerAuth()
  public async getUserById(@Param('id') id): Promise<any> {
    const result = await this.userService.getUserById(id);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiOperation({summary: 'Delete user by id'})
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Delete User',
  })
  @ApiBearerAuth()
  public async deleteUser(@Param('id') id): Promise<any> {
    const result = await this.userService.deleteUser(id);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'User Has Logged In Successfully',
  })
  @ApiOperation({summary: 'Login to get token'})
  @ApiBearerAuth()
  public async login(@Request() req, @Res() res: Response) {
    const jwt_token = await this.userService.generateToken(req.user)
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'success',
      token : jwt_token,
      data: req.user,
    });
  }
  
  @Get('/sendemail/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Send email',
  })
  @ApiOperation({summary: 'Send email to user'})
  @ApiBearerAuth()
  public async sendEmail(@Param('id') id): Promise<any> {
    const result = await this.userService.getUserById(id);

    //SendEmail
    await this.mailService.sendUserConfirmation(result, "asdsad%$&*@@*#");
    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }
}
