import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqController } from './rmq.controller';
import { RmqService } from './rmq.service';
import { getRmqConfig } from 'src/rmq.conf';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQ_SERVICE',
        ...getRmqConfig(),
      },
    ]),
  ],
  controllers: [RmqController],
  providers: [RmqService],
})
export class RmqModule {}
