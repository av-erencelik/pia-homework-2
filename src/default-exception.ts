import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  @ApiProperty({ type: Number, example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;
  @ApiProperty({ example: 'Bad Request' })
  message: any;
  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
