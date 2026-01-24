import { RmqOptions, Transport } from '@nestjs/microservices';

export function getRmqConfig(queue = 'iot'): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://iot:iot@142.93.134.175:5672?heartbeat=60'],
      queue: 'iot', 
      queueOptions: {
        durable: false,
      },
    },
  };
}
