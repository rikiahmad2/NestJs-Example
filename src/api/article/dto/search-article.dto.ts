import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SearchArticleDto {
  @ApiProperty({
    description: 'Search by article name',
    example: 'How to basic',
    required: false,
  })
  public search? : string;

  @ApiProperty({
    example: 0,
    required: false,
  })
  @IsNumber()
  public page : number;

  @ApiProperty({
    example: 5,
    required: false,
  })
  @IsNumber()
  public size : number;

  public constructor() {
    this.search = '';
    this.page = 0;
    this.size = 10;
  }
}
