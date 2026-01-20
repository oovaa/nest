import { Controller, Logger, Sse } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CarsqService } from './carsq.service';
import { Observable } from 'rxjs';
// import { RmqService } from 'src/rmq/rmq.service';

@Controller('carsq')
export class CarsqController {
  private readonly logger = new Logger(CarsqController.name);

  constructor(private readonly carsqService: CarsqService) {}

  // 👇 Add this handler to fix the error properly
  @EventPattern('my_cars')
  handleCars(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('CarsqController.name', CarsqController.name);
    console.log('Car received:', data);
    this.carsqService.emitToSse(data);
  }

  @Sse('sse') // SSE endpoint at /carsq/sse
  sse(): Observable<MessageEvent> {
    return this.carsqService.getSseObservable();
  }
}
