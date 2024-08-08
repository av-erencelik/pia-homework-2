import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../database/database';

@Injectable()
export class ProductService {
  constructor(@InjectKysely() private readonly db: Database) {}

  async getProducts() {
    return await this.db
      .selectFrom('product')
      .orderBy('id', 'asc')
      .selectAll()
      .execute();
  }

  async buyProduct(productId: number) {
    // stock cannot be less than 0

    const product = await this.db
      .selectFrom('product')
      .where('id', '=', productId)
      .select('stock')
      .executeTakeFirstOrThrow(() => new NotFoundException());

    if (product.stock === 0) {
      throw new BadRequestException('Product out of stock');
    }

    return await this.db
      .updateTable('product')
      .set((eb) => ({ stock: eb('stock', '-', 1) }))
      .where('id', '=', productId)
      .returningAll()
      .executeTakeFirstOrThrow(() => new NotFoundException());
  }
}
