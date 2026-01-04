import { Inject, Injectable } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { DATABASE_CONNECTION } from 'src/drizzle/drizzle.connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../users/schema';
@Injectable()
export class CatagoriesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  create(createCatagoryDto: CreateCatagoryDto) {
    return this.database.insert(schema.catagories).values(createCatagoryDto);
  }

  findAll() {
    return this.database.query.catagories.findMany({
      with: {
        post_to_catagories: true,
      },
    });
  }

  async add_to_post(request: typeof schema.post_to_catagories.$inferInsert) {
    await this.database.insert(schema.post_to_catagories).values(request);
  }

  findOne(id: number) {
    return `This action returns a #${id} catagory`;
  }

  update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    return `This action updates a #${id} catagory`;
  }

  remove(id: number) {
    return `This action removes a #${id} catagory`;
  }
}
