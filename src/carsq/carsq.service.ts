import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class CarsqService {
  constructor(@Inject('CARS_SERVER') private readonly client: ClientProxy) {}

  @Interval(1000)
  sendHeartbeat() {
    const payload = {
      timestamp: new Date().toISOString(),
      message: 'Automatic heartbeat message',
      id: Math.floor(Math.random() * 1000),
    };

    console.log('🚔, Sending CAR to RabbitMQ...');

    this.send('my_cars', payload); // 2. Send to the 'my_topic' pattern (matches your Consumer in AppController)
  }
  async send(pattern: string, data) {
    return this.client.emit(pattern, data).toPromise();
  }
}
