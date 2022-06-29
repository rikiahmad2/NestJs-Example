import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseInterface } from './base-response.interface';

export class BaseResponse {
  @ApiProperty()
  public status: boolean;
  
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: any;

  constructor(response: BaseResponseInterface) {
    this.status = response.status;
    this.message = response.message;
    this.data = response.data;
  }
}
