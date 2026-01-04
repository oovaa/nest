import { Module } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CatagoriesController } from './catagories.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
})
export class CatagoriesModule {}
