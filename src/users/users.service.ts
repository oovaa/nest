import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/drizzle/drizzle.connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  async createUser(user: typeof schema.users.$inferInsert) {
    console.log(user);

    await this.database.insert(schema.users).values(user);
  }
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany({ with: { posts: true } });
  }
}
