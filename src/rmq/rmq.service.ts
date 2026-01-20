import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class RmqService {
  constructor(@Inject('RMQ_SERVICE') private readonly client: ClientProxy) {}

  handleRMQ(data) {
    console.log('data received', data);
  }

  @Interval(4000)
  sendHeartbeat() {
    const payload = {
      timestamp: new Date().toISOString(),
      message: 'Automatic heartbeat message from RmqService',
      id: Math.floor(Math.random() * 1000),
    };

    console.log('⚡ Sending message to RabbitMQ (rmq_queue)...');

    this.client.emit('my_topic', payload);
  }
}
