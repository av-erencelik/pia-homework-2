import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { DefaultException } from '../default-exception';

@ApiTags('Product')
@Controller({
  path: 'product',
})
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  @ApiOkResponse({
    type: ProductDto,
    isArray: true,
    description: 'Get all products',
  })
  async getPosts() {
    const products = await this.productService.getProducts();

    return products.map((product) => new ProductDto(product));
  }

  @Post('/:id/stock')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({
    type: ProductDto,
    description: 'Buy product, decrement stock by 1 until stock is 0',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: DefaultException,
  })
  @ApiBadRequestResponse({
    description: 'Product out of stock',
    type: DefaultException,
  })
  async buyProduct(@Param('id', ParseIntPipe) productId: number) {
    const product = await this.productService.buyProduct(productId);

    return new ProductDto(product);
  }
}
