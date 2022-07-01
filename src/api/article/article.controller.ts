import { Controller, Get, HttpCode, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pagination } from 'src/helpers/pagination';
import { BaseResponse } from 'src/helpers/response';
import { UserResponseInterface } from '../user/interfaces/user-response.interface';
import { ArticleService } from './article.service';
import { SearchArticleDto } from './dto/search-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    @HttpCode(200)
    @ApiResponse({
      status: 200,
      type: BaseResponse,
      description: 'Get Alll Users List',
    })
    public async getAllUsers(
      @Query() queryparam: SearchArticleDto,
    ): Promise<BaseResponse> {
      const result: Pagination<UserResponseInterface> =
        await this.articleService.getAllArticle(queryparam);
  
      return new BaseResponse({
        status: true,
        message: 'Success',
        data: result,
      });
    }
}