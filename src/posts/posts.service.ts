import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DATABASE_CONNECTION } from 'src/drizzle/drizzle.connection';
import * as schema from '../users/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.database.insert(schema.posts).values(createPostDto);
  }

  async findAll() {
    return await this.database.query.posts.findMany({
      where: eq(schema.posts.id, 1),
      with: { user: true, post_to_catagories: true },
    });
  }

  findOne(id: number) {
    return this.database.query.posts.findFirst({
      where: eq(schema.posts.id, id),
      with: {
        post_to_catagories: true,
        user: true,
      },
    });
  }

  update(id: number, content: string) {
    console.log(content);

    return this.database
      .update(schema.posts)
      .set({ content: content })
      .where(eq(schema.posts.id, id));
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
