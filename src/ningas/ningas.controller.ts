import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateNingaDto } from './dto/create-ninga.dto';
import { UpdateNingaDto } from './dto/update-ninga.dto';

@Controller('ningas')
export class NingasController {
  @Get()
  findAll(@Query() query: any) {
    // return a list, optionally filtered/paginated via query
    return {
      data: [],
      query,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('type') type: string) {
    // return a single resource by id
    return {
      id,
      type,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateNingaDto) {
    // create a new resource
    return {
      id: 'new-id',
      ...payload,
    };
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() payload: UpdateNingaDto) {
    // replace/overwrite an existing resource
    return {
      id,
      ...payload,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    // partially update an existing resource
    return {
      id,
      ...payload,
    };
  }

  @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    // delete an existing resource
    return {
      id,
    };
  }
}
