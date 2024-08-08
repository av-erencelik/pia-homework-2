import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('product')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('price', 'decimal', (col) => col.notNull())
    .addColumn('stock', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db
    .insertInto('product')
    .values([
      {
        name: 'Smartphone X',
        description:
          'Latest model with 5G capabilities and high-resolution camera',
        price: 799.99,
        stock: 100,
      },
      {
        name: 'Laptop Pro',
        description:
          'Powerful laptop for professionals with 16GB RAM and 512GB SSD',
        price: 1299.99,
        stock: 50,
      },
      {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with noise cancellation',
        price: 149.99,
        stock: 200,
      },
      {
        name: '4K Smart TV',
        description: '55-inch 4K Smart TV with HDR and built-in streaming apps',
        price: 599.99,
        stock: 30,
      },
      {
        name: 'Fitness Tracker',
        description: 'Water-resistant fitness tracker with heart rate monitor',
        price: 79.99,
        stock: 150,
      },
      {
        name: 'Gaming Console',
        description: 'Next-gen gaming console with 4K gaming capabilities',
        price: 499.99,
        stock: 75,
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 39.99,
        stock: 300,
      },
      {
        name: 'Portable SSD',
        description: '1TB portable SSD with USB-C connection',
        price: 159.99,
        stock: 120,
      },
      {
        name: 'Smart Home Hub',
        description: 'Central hub for controlling all your smart home devices',
        price: 129.99,
        stock: 80,
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Waterproof Bluetooth speaker with 20-hour battery life',
        price: 89.99,
        stock: 180,
      },
    ])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('product').execute();
}
