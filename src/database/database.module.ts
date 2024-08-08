import { Module } from '@nestjs/common';
import { KyselyModule } from 'nestjs-kysely';
import {
  CamelCasePlugin,
  ParseJSONResultsPlugin,
  PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  imports: [
    KyselyModule.forRootAsync({
      useFactory: () => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: `postgresql://homework:secret@postgres:5432/mydb?schema=public`,
          }),
        }),
        plugins: [new CamelCasePlugin(), new ParseJSONResultsPlugin()],
      }),
    }),
  ],
})
export class DatabaseModule {}
