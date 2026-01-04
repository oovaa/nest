import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DATABASE_CONNECTION } from 'src/drizzle/drizzle.connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.database.insert(schema.posts).values(createPostDto);
  }

  findAll() {
    return this.database.query.posts.findMany({ with: { user: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
