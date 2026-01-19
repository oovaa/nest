import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RmqService } from './rmq.service';



@Controller('rmq')
export class RmqController {
  constructor(private readonly rmqService: RmqService) {}
  @EventPattern('my_topic')
  handleRMQ(@Payload() data) {
    return this.rmqService.handleRMQ(data);
  }
}
