import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({
    description: 'Search by name',
    example: 'John Doe',
    required: false,
  })
  public search? : string;

  @ApiProperty({
    example: 0,
    required: false,
  })
  @IsNumber()
  public page? : number;

  @ApiProperty({
    example: 5,
    required: false,
  })
  @IsNumber()
  public size? : number;

  public constructor() {
    this.search = '';
    this.page = 0;
    this.size = 10;
  }
}
