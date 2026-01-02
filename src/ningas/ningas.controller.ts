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
  Sse,
} from '@nestjs/common';
import { CreateNingaDto } from './dto/create-ninga.dto';
import { UpdateNingaDto } from './dto/update-ninga.dto';
import * as ningasService from './ningas.service';
import { interval, map, Observable } from 'rxjs';

@Controller('ningas')
export class NingasController {
  constructor(private readonly ningas: ningasService.NingasService) {}
  @Get()
  findAll(@Query() query: any) {
    // return a list, optionally filtered/paginated via query

    return this.ningas.getNingas();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // return a single resource by weapon

    return this.ningas.getNingas(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateNingaDto) {
    // create a new resource
    this.ningas.createNinga(payload);
    return {
      ...payload,
    };
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() payload: UpdateNingaDto) {
    // replace/overwrite an existing resource
    return this.ningas.updateNinga(+id, payload);
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
    return this.ningas.removeNinga(+id);
  }
}
