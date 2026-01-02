import { PartialType } from '@nestjs/mapped-types';
import { CreateNingaDto } from './create-ninga.dto';

export class UpdateNingaDto extends PartialType(CreateNingaDto) {}
