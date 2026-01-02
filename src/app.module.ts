import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NingasModule } from './ningas/ningas.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [NingasModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
