import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  // 1. Run this method every 900 milliseconds
  @Interval(900)
  sendHeartbeat() {
    const payload = {
      timestamp: new Date().toISOString(),
      message: 'Automatic heartbeat message',
      id: Math.floor(Math.random() * 1000),
    };

    console.log('⚡ Sending message to RabbitMQ...');

    // 2. Send to the 'my_topic' pattern (matches your Consumer in AppController)
    this.client.emit('my_topic', payload);
  }
}
