import {
  Controller,
  Get,
  HttpCode,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Pagination } from 'src/helpers/pagination';
import { BaseResponse } from 'src/helpers/response';
import { SearchOrganizationDto } from './dto/search-organization.dto';
import { OrganizationResponseInterface } from './interface/organization.interface';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get Alll Users List',
  })
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
}
