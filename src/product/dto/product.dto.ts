import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ProductDto {
  constructor({ ...partial }: Partial<ProductDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  price: number | string;
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  stock: number;
}
