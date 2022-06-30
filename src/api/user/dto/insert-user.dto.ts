import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'ahmadriki9512@gmail.com',
  })
  @IsString()
  public email: string;

  @ApiProperty({
    example : '12345678',
  })
  @IsString()
  public password : string;

  @ApiProperty({
    example : 'admin/user',
  })
  @IsString()
  public role : string;
}
