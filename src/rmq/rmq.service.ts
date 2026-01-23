import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { randomUUID } from 'crypto';

@Injectable()
export class RmqService {
  constructor(@Inject('RMQ_SERVICE') private readonly client: ClientProxy) {}

  handleRMQ(data) {
    console.log('data received', data);
  }
  eui = randomUUID();
  @Interval(900)
  sendHeartbeat() {
    const payload = {
      eui: this.eui,
      beacons: [
        { eui: randomUUID(), rssi: -59 },
        { eui: randomUUID(), rssi: -59 },
        { eui: randomUUID(), rssi: -59 },
        { eui: randomUUID(), rssi: -59 },
      ],
      timestamp: Date.now(),
    };

    console.log('⚡ Sending message to RabbitMQ (rmq_queue)...', payload);

    this.client.emit('iot', payload);
  }
}
