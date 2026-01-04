import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

@Controller('catagories')
export class CatagoriesController {
  constructor(private readonly catagoriesService: CatagoriesService) {}

  @Post()
  create(@Body() createCatagoryDto: CreateCatagoryDto) {
    return this.catagoriesService.create(createCatagoryDto);
  }

  @Post('post')
  add_to_posts(@Body() request: { post_id: number; catagory_id: number }) {
    return this.catagoriesService.add_to_post(request);
  }

  @Get()
  findAll() {
    return this.catagoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catagoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatagoryDto: UpdateCatagoryDto,
  ) {
    return this.catagoriesService.update(+id, updateCatagoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catagoriesService.remove(+id);
  }
}
