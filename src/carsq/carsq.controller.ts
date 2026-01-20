import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
// import { RmqService } from 'src/rmq/rmq.service';

@Controller('carsq')
export class CarsqController {

  // 👇 Add this handler to fix the error properly
  @EventPattern('my_cars')
  handleCars(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('Car received:', data);
    // If you turned off auto-ack, remember to ack!
    // context.getChannelRef().ack(context.getMessage());
  }
}
