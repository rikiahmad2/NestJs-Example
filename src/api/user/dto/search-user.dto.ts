import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SearchUserDto {
  @ApiProperty()
  public search = '';

  @IsNumber()
  public page = 0;

  @IsNumber()
  public size = 10;
}
