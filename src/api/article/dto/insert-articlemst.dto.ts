import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertArticleMstDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'sample.jpg',
  })
  @IsString()
  public cover: string;

  @ApiProperty({
    example : 'Ini adalah sebuah article yang membahas tentang ...',
  })
  @IsString()
  public content : string;

  @ApiProperty({
    example : 'Name Of mst tag',
  })
  @IsString()
  public name_mst : string;

  @ApiProperty({
    example : 27,
  })
  public id_user : number;
}
