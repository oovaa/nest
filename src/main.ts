import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getRmqConfig } from 'src/rmq.conf';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connect the RMQ microservice
  app.connectMicroservice<MicroserviceOptions>(getRmqConfig('rmq_queue'));

  // Connect the Cars microservice
  app.connectMicroservice<MicroserviceOptions>(getRmqConfig('cars'));

  // Start microservices along with the HTTP server
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
