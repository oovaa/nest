import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CatagoriesModule } from './catagories/catagories.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer/producer.service';
import { RmqModule } from './rmq/rmq.module';
import { getRmqConfig } from 'src/rmq.conf';
import { CarsqModule } from './carsq/carsq.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    PostsModule,
    CatagoriesModule,
    AuthModule,
    // 1. Enable the scheduler
    ScheduleModule.forRoot(),

    // 2. Configure the client to SEND messages
    // ClientsModule.register([
    //   {
    //     name: 'RABBITMQ_SERVICE', // Injection token
    //     ...getRmqConfig(),
    //   },
    // ]),

    // RmqModule,

    CarsqModule,
  ],
  controllers: [],
  // providers: [ProducerService],
})
export class AppModule {}
