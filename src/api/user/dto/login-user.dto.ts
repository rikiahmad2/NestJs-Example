import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'ahmadriki9512@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public email : string;

  @ApiProperty({
    description: 'Password of user',
    example: 'rikiriki2123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public password : string;
}
