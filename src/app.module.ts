import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CatagoriesModule } from './catagories/catagories.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    PostsModule,
    CatagoriesModule,
    AuthModule,
    ScheduleModule.forRoot(),
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
