import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pagination } from 'src/helpers/pagination';
import { BaseResponse } from 'src/helpers/response';
import { ArticleService } from './article.service';
import { InsertArticleMstDto } from './dto/insert-articlemst.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { ArticleResponseInterface } from './interface/article-response.interface';

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('author')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get All Article List',
  })
  @ApiOperation({summary: 'Get all article author & comments'})
  @ApiBearerAuth()
  public async getAllArticle(
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
  @UseInterceptors(FileInterceptor('cover'))
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Article Has Been Created',
  })
  @ApiOperation({summary: 'Create new article'})
  @ApiBearerAuth()
  public async createArticle(
    @Body() body: InsertArticleMstDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<any> {
    body.cover = cover.filename;
    const result = await this.articleService.insertArticleMst(body);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }

  @Get('many')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get All Article List',
  })
  @ApiOperation({summary: 'Get all article with all tags'})
  @ApiBearerAuth()
  public async getAllManytoManyArticle(
    @Query() queryparam: SearchArticleDto,
  ): Promise<BaseResponse> {
    const result: Pagination<ArticleResponseInterface> =
      await this.articleService.getAllArticleMany(queryparam);

    return new BaseResponse({
      status: true,
      message: 'Success',
      data: result,
    });
  }
}
