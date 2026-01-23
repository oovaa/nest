import { RmqOptions, Transport } from '@nestjs/microservices';

export function getRmqConfig(queue = 'iot'): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL || 'amqp://guest:guest@142.93.134.175:5672',
      ],
      queue: queue,
      queueOptions: {
        durable: false,
      },
    },
  };
}
