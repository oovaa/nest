import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getRmqConfig } from 'src/rmq.conf';
import { CarsqService } from './carsq.service';
import { CarsqController } from './carsq.controller';

@Module({
  imports: [
    ClientsModule.register([{ name: 'CARS_SERVER', ...getRmqConfig('cars') }]),
  ],
  providers: [CarsqService],
  exports: [CarsqService],
  controllers: [CarsqController],
})
export class CarsqModule {}
