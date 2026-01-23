import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

@Controller('rmq')
export class RmqController {
  constructor(private readonly rmqService: RmqService) {}

}
