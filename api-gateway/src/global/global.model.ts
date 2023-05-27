import { ApiProperty } from '@nestjs/swagger';

export class ErrorModel {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({ type: [String] })
  message: string | string[];
}

export class SuccessResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: any;
}
