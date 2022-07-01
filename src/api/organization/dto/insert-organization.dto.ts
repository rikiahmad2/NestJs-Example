import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertOrganizationDto {
  @ApiProperty({
    example: 'Org Community',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;
}

