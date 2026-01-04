import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/drizzle/drizzle.connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateProfileDto } from './dto/createUserdto';

@Injectable()
export class UsersService {
  async createProfile(request: CreateProfileDto) {
    console.log(request);

    await this.database.insert(schema.profile).values(request);
  }
  async createUser(user: typeof schema.users.$inferInsert) {
    console.log(user);

    await this.database.insert(schema.users).values(user);
  }
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany({
      with: { posts: true, profile: true },
    });
  }
}
