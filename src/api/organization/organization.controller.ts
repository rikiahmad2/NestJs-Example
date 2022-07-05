import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pagination } from 'src/helpers/pagination';
import { BaseResponse } from 'src/helpers/response';
import { InsertOrganizationDto } from './dto/insert-organization.dto';
import { SearchOrganizationDto } from './dto/search-organization.dto';
import { OrganizationResponseInterface } from './interface/organization.interface';
import { OrganizationService } from './organization.service';

@Controller('organization')
@ApiTags('Organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Alll Users List',
  })
  @ApiOperation({summary: 'Get all organization'})
  @ApiBearerAuth()
  public async getAllOrganizations(
    @Query() queryparam: SearchOrganizationDto,
  ): Promise<BaseResponse> {
    const result: Pagination<OrganizationResponseInterface> =
      await this.organizationService.getAllOrganizations(queryparam);

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
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Organization Has Been Created',
  })
  @ApiOperation({summary: 'create new organization'})
  @ApiBearerAuth()
  public async createUser(@Body() body: InsertOrganizationDto): Promise<any> {
    const result = await this.organizationService.insertOrganization(body);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }
}
