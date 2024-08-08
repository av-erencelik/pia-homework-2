import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Product {
  created_at: Generated<Timestamp>;
  description: string | null;
  id: Generated<number>;
  name: string;
  price: Numeric;
  stock: number;
}

export interface DB {
  product: Product;
}
