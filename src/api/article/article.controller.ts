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
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pagination } from 'src/helpers/pagination';
import { BaseResponse } from 'src/helpers/response';
import { ArticleService } from './article.service';
import { InsertArticleMstDto } from './dto/insert-articlemst.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { ArticleResponseInterface } from './interface/article-response.interface';

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
    description: 'Get All Users List',
  })
  public async getAllUsers(
    @Query() queryparam: SearchArticleDto,
  ): Promise<BaseResponse> {
    const result: Pagination<ArticleResponseInterface> =
      await this.articleService.getAllArticle(queryparam);

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
    description: 'Article Has Been Created',
  })
  public async createArticle(@Body() body: InsertArticleMstDto): Promise<any> {
    const result = await this.articleService.insertArticleMst(body);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }
}
